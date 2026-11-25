"""Browser smoke test for Chapter Compass. Opens index.html from disk, offline.

Setup once:  pip install playwright && python -m playwright install chromium
Run:         python3 tests/smoke.py          (or: npm run test:browser)
Screenshots: SCREENSHOTS=shots python3 tests/smoke.py
             Saves every view at 1280px and 390px in English and Arabic. Look at them.

Checks, in every language and view at both widths:
  - no script errors, exactly one visible h1, no sideways page scroll
  - Arabic sets dir="rtl"; the first Tab lands on the skip link
Plus the things most likely to break quietly: the share-link round trip,
a hostile share link, calendar files, and backup/restore.
"""
import base64, json, os, pathlib, sys, tempfile
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = (ROOT / "index.html").as_uri()
SHOTS = os.environ.get("SCREENSHOTS")
VIEWS = ["year", "event", "issue", "learn", "cohost", "impact", "resources"]
LANGS = ["en", "es", "fr", "ru", "zh", "ar"]
problems = []


def expect(ok, msg):
    if not ok:
        problems.append(msg)


def b64url(obj):
    return base64.urlsafe_b64encode(json.dumps(obj).encode()).decode().rstrip("=")


def new_page(browser, width, errors):
    # A fixed clock keeps the dial, "past" markers, and screenshots stable between runs.
    ctx = browser.new_context(viewport={"width": width, "height": 900}, reduced_motion="reduce", accept_downloads=True)
    ctx.add_init_script("""(() => {
      const fixed = new Date(2026, 10, 24, 12, 0, 0).getTime();
      const Real = Date;
      class FixedDate extends Real { constructor(...a) { if (a.length) super(...a); else super(fixed); } static now() { return fixed; } }
      window.Date = FixedDate;
    })();""")
    page = ctx.new_page()
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    # Offline on purpose: fonts and GoatCounter are outside the page's control.
    page.route("**/*", lambda r: r.continue_() if r.request.url.startswith("file:") else r.abort())
    return ctx, page


def real_errors(errors):
    return [e for e in errors if "ERR_FAILED" not in e and "net::" not in e]


with sync_playwright() as p:
    browser = p.chromium.launch()

    # ---------- Every view, every language, both widths ----------
    for width in (1280, 390):
        errors = []
        ctx, page = new_page(browser, width, errors)
        page.goto(URL, wait_until="load")
        page.keyboard.press("Tab")
        expect(page.evaluate("document.activeElement.classList.contains('skip')"), f"{width}px: first Tab should focus the skip link")
        for lang in LANGS:
            page.select_option("#lang-select", lang)
            expect(page.evaluate("document.documentElement.lang") == lang, f"{width}px {lang}: <html lang> not updated")
            want_dir = "rtl" if lang == "ar" else "ltr"
            expect(page.evaluate("document.documentElement.dir") == want_dir, f"{width}px {lang}: dir should be {want_dir}")
            for view in VIEWS:
                page.evaluate(f"location.hash = '{view}'")
                page.wait_for_timeout(60)
                h1s = page.locator(f"#view-{view} h1:visible").count()
                expect(h1s == 1, f"{width}px {lang} #{view}: expected one visible h1, found {h1s}")
                over = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
                expect(over <= 1, f"{width}px {lang} #{view}: page scrolls sideways by {over}px")
                if SHOTS and lang in ("en", "ar"):
                    pathlib.Path(SHOTS).mkdir(parents=True, exist_ok=True)
                    page.screenshot(path=f"{SHOTS}/{view}-{lang}-{width}.png", full_page=True)
        expect(not real_errors(errors), f"{width}px: script errors {real_errors(errors)}")
        ctx.close()

    # ---------- Share links ----------
    errors = []
    ctx, page = new_page(browser, 1280, errors)
    page.goto(URL, wait_until="load")
    page.evaluate("localStorage.clear()")
    page.reload(wait_until="load")
    page.click('[data-plan="un-day"]')
    link = page.input_value("#share-link")
    expect("?plan=" in link, "Share link should be filled once a day is planned")
    # Round trip: the same link, opened by another chapter, offers to add the plan.
    page.goto(link, wait_until="load")
    expect(page.is_visible("#share-banner"), "Opening a share link should show the banner")
    # A hostile link must not break the app or survive in storage.
    evil = b64url({"v": 1, "n": "<img src=x onerror=alert(1)>", "y": 2027, "d": ["constructor", "__proto__", "toString", "un-day"]})
    page.goto(URL + "?plan=" + evil + "#cohost", wait_until="load")
    page.click("#share-accept")
    page.wait_for_timeout(100)
    expect(page.locator("#chapter-list img").count() == 0, "Chapter names from links must be shown as text")
    stored = page.evaluate("JSON.parse(localStorage.getItem('cc.others'))")
    expect(stored and stored[-1]["d"] == ["un-day"], f"Unknown day ids should be dropped from shared plans, got {stored}")
    page.reload(wait_until="load")
    expect(page.locator("#chapter-list li").count() >= 2, "Co-host view should still render after a hostile link")

    # ---------- Calendar files ----------
    page.evaluate("location.hash = 'year'")
    with page.expect_download() as dl:
        page.click("#plan-ics")
    ics = pathlib.Path(dl.value.path()).read_bytes()
    lines = ics.split(b"\r\n")
    expect(lines[0] == b"BEGIN:VCALENDAR" and b"END:VCALENDAR" in lines, "Plan .ics should be a calendar")
    expect(all(len(l) <= 75 for l in lines), "Calendar lines must be folded at 75 octets (RFC 5545)")

    page.select_option("#lang-select", "zh")
    page.evaluate("location.hash = 'event'")
    page.fill('#event-form [name="title"]', "联合国日活动 " + "很长的标题" * 20)
    page.fill('#event-form [name="date"]', "2027-10-24")
    page.click('#event-form [type="submit"]')
    with page.expect_download() as dl:
        page.click("#brief-ics")
    name = dl.value.suggested_filename
    expect(name.endswith(".ics") and len(name) > 4, f"Event .ics needs a real file name in every language, got {name!r}")
    ics = pathlib.Path(dl.value.path()).read_bytes()
    expect(all(len(l) <= 75 for l in ics.split(b"\r\n")), "Event .ics lines must be folded at 75 octets")
    page.select_option("#lang-select", "en")

    # ---------- Backup and restore ----------
    page.evaluate("location.hash = 'impact'")
    bad = {"app": "chapter-compass", "version": 1, "plan": {}, "event": None,
           "log": [{"id": "x\"><b>", "title": "Test", "date": "2027-01-05", "attendance": "12", "newMembers": "2",
                    "partners": "", "sdgs": ["<img src=x onerror=alert(1)>", 4, 99], "notes": ""}]}
    path = pathlib.Path(tempfile.mkdtemp()) / "backup.json"
    path.write_text(json.dumps(bad))
    page.set_input_files("#log-restore", str(path))
    page.wait_for_timeout(200)
    expect(page.locator("#log-body img, #log-body b").count() == 0, "Restored backups must be shown as text")
    expect(page.locator("#log-body tr").count() == 1, "Restored log should show one event")
    tags = page.locator("#log-body .tag").all_inner_texts()
    expect(len(tags) == 1 and tags[0].endswith("4"), f"Only real goal numbers 1 to 17 should survive a restore, got {tags}")

    expect(not real_errors(errors), f"Share/calendar/backup checks: script errors {real_errors(errors)}")
    ctx.close()
    browser.close()

if problems:
    print("FAIL\n" + "\n".join(f"  - {m}" for m in problems))
    sys.exit(1)
print(f"PASS  browser smoke test: {len(VIEWS)} views x {len(LANGS)} languages at 1280px and 390px, share links, calendar files, backups")
