/*
 * Chapter Compass app logic. No framework, no build step.
 * Sections: helpers, storage, i18n, dates, year dial + list, plan,
 * event planner, issue matcher, impact log, routing, startup.
 */
(function () {
  "use strict";

  var CC = window.CC;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  // Lookup tables keyed by ids that can arrive from share links and backup files.
  // No prototype, so an id like "constructor" or "__proto__" is never found by accident.
  function dict() { return Object.create(null); }

  /* ---------- storage (never throws; works in private mode) ---------- */
  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem("cc." + k); return v === null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem("cc." + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ }
    }
  };

  /* ---------- i18n ---------- */
  // Merge each language pack from lang/*.js into the shared data, so L() finds every language.
  function mergeLang(code, pack) {
    CC.strings[code] = pack.strings || {};
    CC.sdgs.forEach(function (g) { if (pack.sdgs && pack.sdgs[g.n]) g[code] = pack.sdgs[g.n]; });
    CC.observances.forEach(function (o) {
      var tr = pack.observances && pack.observances[o.id];
      if (tr) { o.name[code] = tr[0]; o.idea[code] = tr[1]; }
    });
    CC.issues.forEach(function (iss) {
      var tr = pack.issues && pack.issues[iss.id];
      if (!tr) return;
      iss.name[code] = tr.name; iss.un[code] = tr.un;
      iss.targets.forEach(function (tg) { if (tr.targets && tr.targets[tg.t]) tg[code] = tr.targets[tg.t]; });
      iss.prompts.forEach(function (pr, i) { if (tr.prompts && tr.prompts[i]) pr[code] = tr.prompts[i]; });
      if (tr.partners) iss.partners[code] = tr.partners;
    });
    CC.access.forEach(function (g, gi) {
      if (pack.access && pack.access.groups && pack.access.groups[gi]) g.group[code] = pack.access.groups[gi];
      g.items.forEach(function (it) {
        var tr = pack.access && pack.access.items && pack.access.items[it.id];
        if (tr) { it[code] = tr[0]; it.says[code] = tr[1]; }
      });
    });
    CC.explainers.forEach(function (x) {
      var tr = pack.explainers && pack.explainers[x.id];
      if (tr) { x.title[code] = tr[0]; x.body[code] = tr[1]; x.prompt[code] = tr[2]; }
    });
  }
  Object.keys(CC.lang || {}).forEach(function (code) { mergeLang(code, CC.lang[code]); });

  var langCodes = CC.languages.map(function (l) { return l.code; });
  var navLang = (navigator.language || "en").toLowerCase().slice(0, 2);
  var lang = store.get("lang", langCodes.indexOf(navLang) !== -1 ? navLang : "en");
  if (langCodes.indexOf(lang) === -1) lang = "en";
  function langInfo() { return CC.languages.filter(function (l) { return l.code === lang; })[0]; }

  function t(key, vars) {
    var s = (CC.strings[lang] && CC.strings[lang][key]);
    if (s === undefined) s = CC.strings.en[key];
    if (s === undefined) s = key;
    if (vars) s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : ""; });
    return s;
  }
  function L(obj) { return obj ? (obj[lang] !== undefined ? obj[lang] : obj.en) : ""; }
  function esc(s) {
    return String(s === undefined || s === null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function applyStrings() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":"); el.setAttribute(p[0], t(p[1]));
      });
    });
    document.title = t("meta.title");
    document.documentElement.dir = langInfo().dir;
    var sel = $("#lang-select");
    sel.innerHTML = CC.languages.map(function (l) {
      return '<option value="' + l.code + '" lang="' + l.code + '" dir="' + l.dir + '"' + (l.code === lang ? " selected" : "") + ">" + esc(l.label) + "</option>";
    }).join("");
    sel.setAttribute("aria-label", t("lang.label"));
  }

  var statusTimer;
  function say(msg) {
    var s = $("#status");
    s.textContent = "";
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { s.textContent = msg; }, 60);
  }

  /* ---------- dates ---------- */
  function nthWeekday(year, month, weekday, nth) {
    var first = new Date(year, month - 1, 1);
    var offset = (weekday - first.getDay() + 7) % 7;
    return new Date(year, month - 1, 1 + offset + (nth - 1) * 7);
  }
  function dateFor(o, year) {
    return o.rule ? nthWeekday(year, o.month, o.rule.weekday, o.rule.nth) : new Date(year, o.month - 1, o.day);
  }
  function endFor(o, year) { return o.endMonth ? new Date(year, o.endMonth - 1, o.endDay) : null; }
  function fmt(d, opts) { return new Intl.DateTimeFormat(lang, opts || { month: "short", day: "numeric" }).format(d); }
  function fmtLong(d) { return fmt(d, { weekday: "long", month: "long", day: "numeric", year: "numeric" }); }
  function daysInYear(y) { return ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) ? 366 : 365; }
  function dayOfYear(d) {
    return Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 1)) / 864e5) + 1;
  }
  function ymd(d) {
    return d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
  }
  function isoDate(d) { var s = ymd(d); return s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6); }
  function parseISO(s) { if (!s) return null; var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtTime(hhmm) {
    if (!hhmm) return "";
    var p = hhmm.split(":"); var d = new Date(2000, 0, 1, +p[0], +p[1]);
    return new Intl.DateTimeFormat(lang, { hour: "numeric", minute: "2-digit" }).format(d);
  }

  var today = new Date();
  var obsById = dict();
  CC.observances.forEach(function (o) { obsById[o.id] = o; });
  var sdgByN = dict();
  CC.sdgs.forEach(function (g) { sdgByN[g.n] = g; });

  function sdgTag(n) {
    return '<span class="tag" title="' + esc(L(sdgByN[n])) + '">' + esc(t("sdg.prefix") + " " + n) + "</span>";
  }

  /* ---------- downloads ---------- */
  function download(filename, text, type) {
    var blob = new Blob([text], { type: type || "text/plain" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function icsEscape(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
  // RFC 5545 asks for lines of at most 75 octets, continued on the next line after a space.
  // Count UTF-8 bytes, so Arabic, Chinese, and Russian titles fold without splitting a character.
  function icsFold(line) {
    var out = [], cur = "", bytes = 0;
    Array.from(line).forEach(function (ch) {
      var n = unescape(encodeURIComponent(ch)).length;
      if (bytes + n > 75) { out.push(cur); cur = " "; bytes = 1; }
      cur += ch; bytes += n;
    });
    out.push(cur);
    return out.join("\r\n");
  }
  function icsWrap(lines) {
    return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Chapter Compass//EN", "CALSCALE:GREGORIAN"]
      .concat(lines, ["END:VCALENDAR"]).map(icsFold).join("\r\n") + "\r\n";
  }
  function stamp() { return new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z"); }

  /* =====================================================================
   * PLAN THE YEAR
   * ===================================================================== */
  var defaultYear = today.getMonth() >= 10 ? today.getFullYear() + 1 : today.getFullYear();
  var planYear = store.get("year", defaultYear);
  if (!Number.isInteger(planYear) || planYear < 2000 || planYear > 2100) planYear = defaultYear;
  var plans = store.get("plan", {});
  plans = cleanPlans(plans);
  var filters = { type: "all", sdg: "" };

  function planIds() { return plans[planYear] || []; }
  function inPlan(id) { return planIds().indexOf(id) !== -1; }
  function togglePlan(id, force) {
    var ids = planIds().slice();
    var i = ids.indexOf(id);
    var add = force === undefined ? i === -1 : force;
    if (add && i === -1) ids.push(id);
    if (!add && i !== -1) ids.splice(i, 1);
    plans[planYear] = ids;
    store.set("plan", plans);
    say(t(add ? "status.added" : "status.removed", { name: L(obsById[id].name) }));
    renderYear();
  }

  function sortedObs() {
    return CC.observances.slice().sort(function (a, b) { return dateFor(a, planYear) - dateFor(b, planYear); });
  }

  function dateLabel(o) {
    var d = dateFor(o, planYear), e = endFor(o, planYear);
    return e ? t("obs.range", { a: fmt(d), b: fmt(e) }) : fmt(d);
  }

  function renderYearSelect() {
    var sel = $("#plan-year");
    var y = today.getFullYear();
    var years = [y, y + 1, y + 2];
    // A plan saved for a year that has passed stays reachable instead of showing the wrong year.
    if (years.indexOf(planYear) === -1) years.unshift(planYear);
    sel.innerHTML = years.map(function (v) {
      return '<option value="' + v + '"' + (v === planYear ? " selected" : "") + ">" + v + "</option>";
    }).join("");
  }

  function renderSdgFilter() {
    var sel = $("#sdg-filter");
    sel.innerHTML = '<option value="">' + esc(t("filter.allGoals")) + "</option>" +
      CC.sdgs.map(function (g) {
        return '<option value="' + g.n + '"' + (String(g.n) === filters.sdg ? " selected" : "") + ">" +
          esc(t("sdg.prefix") + " " + g.n + ": " + L(g)) + "</option>";
      }).join("");
  }

  function renderList() {
    var list = sortedObs().filter(function (o) {
      if (filters.type !== "all" && o.type !== filters.type) return false;
      if (filters.sdg && o.sdgs.indexOf(+filters.sdg) === -1) return false;
      return true;
    });
    var count = $("#obs-count");
    count.textContent = list.length === 0 ? t("obs.none") : list.length === 1 ? t("obs.countOne") : t("obs.count", { n: list.length });

    $("#obs-list").innerHTML = list.map(function (o) {
      var d = dateFor(o, planYear);
      var on = inPlan(o.id);
      var past = planYear === today.getFullYear() && (endFor(o, planYear) || d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      var month = fmt(d, { month: "short" });
      var meta = o.sdgs.map(sdgTag).join("");
      if (o.type === "admin") meta = '<span class="tag tag-admin">' + esc(t("obs.reminder")) + "</span>" + meta;
      if (o.signature) meta = '<span class="tag tag-sig">' + esc(t("obs.signature")) + "</span>" + meta;
      return '<li class="obs' + (on ? " is-planned" : "") + (past ? " is-past" : "") + '" id="obs-' + o.id + '" data-type="' + o.type + '" tabindex="-1">' +
        '<p class="obs-date"><span class="obs-m">' + esc(month) + '</span><span class="obs-d">' + esc(fmt(d, { day: "numeric" })) + "</span></p>" +
        '<div class="obs-body">' +
          "<h3>" + esc(L(o.name)) + "</h3>" +
          (o.endMonth ? '<p class="obs-range">' + esc(dateLabel(o)) + "</p>" : "") +
          "<p>" + esc(L(o.idea)) + "</p>" +
          '<p class="tags">' + meta + "</p>" +
          (o.source ? '<p class="obs-source"><a href="' + esc(o.source) + '">' + esc(t("obs.confirm")) + "</a></p>" : "") +
          (past ? '<p class="obs-past">' + esc(t("obs.past")) + "</p>" : "") +
        "</div>" +
        '<button type="button" class="toggle" data-plan="' + o.id + '" aria-pressed="' + on + '">' +
          '<span class="toggle-box" aria-hidden="true"></span>' + esc(on ? t("obs.added") : t("obs.add")) +
          '<span class="visually-hidden">: ' + esc(L(o.name)) + "</span></button>" +
      "</li>";
    }).join("");
  }

  function renderPlan() {
    var ids = planIds().filter(function (id) { return obsById[id]; })
      .sort(function (a, b) { return dateFor(obsById[a], planYear) - dateFor(obsById[b], planYear); });
    $("#plan-empty").hidden = ids.length > 0;
    $("#plan-list").innerHTML = ids.map(function (id) {
      var o = obsById[id], name = L(o.name);
      return "<li><p><strong>" + esc(dateLabel(o)) + "</strong> " + esc(name) + "</p>" +
        '<p class="plan-idea">' + esc(L(o.idea)) + "</p>" +
        '<p class="plan-row-actions">' +
          '<button type="button" class="linkish" data-plan-event="' + id + '" aria-label="' + esc(t("plan.planEventLabel", { name: name })) + '">' + esc(t("plan.planEvent")) + "</button>" +
          '<button type="button" class="linkish" data-plan-remove="' + id + '" aria-label="' + esc(t("plan.removeLabel", { name: name })) + '">' + esc(t("plan.remove")) + "</button>" +
        "</p></li>";
    }).join("");
  }

  /* The year dial: the page's signature element. Purely visual; the list is the accessible version. */
  function renderDial(target, counts) {
    target = target || "#dial";
    var size = 640, c = size / 2, rRing = 286, rMark = 236, rLabel = 262;
    var days = daysInYear(planYear);
    function pt(angleDeg, r) {
      var a = (angleDeg - 90) * Math.PI / 180;
      return [c + r * Math.cos(a), c + r * Math.sin(a)];
    }
    function angleOf(d) { return (dayOfYear(d) - 1) / days * 360; }
    var out = [];
    out.push('<svg viewBox="0 0 ' + size + " " + size + '" role="presentation" focusable="false" aria-hidden="true">');

    // Contour lines, like an aeronautical chart. Deterministic wobble so it doesn't jitter between renders.
    for (var k = 0; k < 5; k++) {
      var r0 = 70 + k * 34, pts = [];
      for (var s = 0; s <= 72; s++) {
        var ang = s * 5;
        var wob = Math.sin((ang + k * 40) * Math.PI / 60) * (5 + k) + Math.cos((ang * 2 + k * 17) * Math.PI / 90) * 4;
        var p = pt(ang, r0 + wob);
        pts.push((s ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1));
      }
      out.push('<path class="contour" d="' + pts.join(" ") + 'Z"/>');
    }

    out.push('<circle class="ring" cx="' + c + '" cy="' + c + '" r="' + rRing + '"/>');
    out.push('<circle class="ring-inner" cx="' + c + '" cy="' + c + '" r="' + (rMark + 22) + '"/>');

    // Month ticks and labels.
    for (var m = 0; m < 12; m++) {
      var start = new Date(planYear, m, 1);
      var a0 = angleOf(start);
      var p1 = pt(a0, rMark + 22), p2 = pt(a0, rRing);
      out.push('<line class="tick" x1="' + p1[0] + '" y1="' + p1[1] + '" x2="' + p2[0] + '" y2="' + p2[1] + '"/>');
      var mid = angleOf(new Date(planYear, m, 15));
      var lp = pt(mid, rLabel + 2);
      out.push('<text class="month" x="' + lp[0].toFixed(1) + '" y="' + lp[1].toFixed(1) + '" text-anchor="middle" dominant-baseline="central">' +
        esc(fmt(start, { month: "short" }).replace(".", "")) + "</text>");
    }
    // Weekly minor ticks.
    for (var w = 0; w < days; w += 7) {
      var wa = w / days * 360, q1 = pt(wa, rRing - 6), q2 = pt(wa, rRing);
      out.push('<line class="tick-minor" x1="' + q1[0] + '" y1="' + q1[1] + '" x2="' + q2[0] + '" y2="' + q2[1] + '"/>');
    }

    // Route between planned stops.
    var planned = planIds().filter(function (id) { return obsById[id]; }).map(function (id) { return obsById[id]; })
      .sort(function (a, b) { return dateFor(a, planYear) - dateFor(b, planYear); });
    if (planned.length > 1 && !counts) {
      var route = planned.map(function (o, i) {
        var p = pt(angleOf(dateFor(o, planYear)), rMark);
        return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1);
      }).join(" ") + "Z";
      out.push('<path class="route" d="' + route + '"/>');
    }

    // Markers.
    CC.observances.forEach(function (o) {
      var a = angleOf(dateFor(o, planYear));
      var p = pt(a, rMark);
      var on = inPlan(o.id);
      if (counts) {
        var n = (counts[o.id] || []).length;
        var title2 = "<title>" + esc(dateLabel(o) + ": " + L(o.name) + (n ? " (" + t("cohost.chapters", { n: n }) + ")" : "")) + "</title>";
        if (!n) { out.push('<circle class="mark mark-faint" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4">' + title2 + "</circle>"); return; }
        var r = Math.min(7 + (n - 1) * 5, 20);
        out.push('<circle class="mark mark-count' + (n > 1 ? " is-shared" : "") + '" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + r + '">' + title2 + "</circle>");
        if (n > 1) out.push('<text class="mark-n" x="' + p[0].toFixed(1) + '" y="' + p[1].toFixed(1) + '" text-anchor="middle" dominant-baseline="central">' + n + "</text>");
        return;
      }
      var cls = "mark mark-" + o.type + (on ? " is-planned" : "");
      var title = "<title>" + esc(dateLabel(o) + ": " + L(o.name)) + "</title>";
      if (o.type === "admin") {
        out.push('<rect class="' + cls + '" data-jump="' + o.id + '" x="' + (p[0] - 6) + '" y="' + (p[1] - 6) + '" width="12" height="12" transform="rotate(45 ' + p[0] + " " + p[1] + ')">' + title + "</rect>");
      } else {
        out.push('<circle class="' + cls + '" data-jump="' + o.id + '" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (on ? 9 : 7) + '">' + title + "</circle>");
      }
    });

    // Needle pointing at today's place in the year.
    var ta = (dayOfYear(today) - 1) / daysInYear(today.getFullYear()) * 360;
    out.push('<g class="needle" style="--needle:' + ta.toFixed(2) + 'deg">' +
      '<path class="needle-n" d="M' + c + " " + (c - 196) + " L" + (c + 13) + " " + c + " L" + (c - 13) + " " + c + 'Z"/>' +
      '<path class="needle-s" d="M' + c + " " + (c + 70) + " L" + (c + 13) + " " + c + " L" + (c - 13) + " " + c + 'Z"/>' +
      '<circle class="needle-hub" cx="' + c + '" cy="' + c + '" r="9"/></g>');
    out.push("</svg>");

    // Center readout (HTML so it wraps and scales with large print).
    var todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var nextYear = today.getFullYear();
    var byThisYear = CC.observances.slice().sort(function (a, b) { return dateFor(a, nextYear) - dateFor(b, nextYear); });
    var next = byThisYear.filter(function (o) { return dateFor(o, nextYear) >= todayStart; })[0];
    if (!next) {
      // Late December: nothing left this year, so the next stop is early next year.
      nextYear += 1;
      next = CC.observances.slice().sort(function (a, b) { return dateFor(a, nextYear) - dateFor(b, nextYear); })[0];
    }
    if (counts) {
      var shared = Object.keys(counts).filter(function (k) { return counts[k].length > 1; }).length;
      out.push('<div class="dial-readout"><p class="readout-label">' + esc(t("cohost.overlapH")) + "</p>" +
        '<p class="readout-name readout-big">' + esc(shared.toLocaleString(lang)) + "</p>" +
        '<p class="readout-date">' + esc(String(planYear)) + "</p></div>");
      $(target).innerHTML = out.join("");
      return;
    }
    var stops = planned.length === 0 ? t("dial.nothing") : planned.length === 1 ? t("dial.stopsOne") : t("dial.stops", { n: planned.length });
    out.push('<div class="dial-readout"><p class="readout-label">' + esc(t("dial.next")) + "</p>" +
      '<p class="readout-name">' + esc(L(next.name)) + "</p>" +
      '<p class="readout-date">' + esc(fmt(dateFor(next, nextYear), { month: "long", day: "numeric" })) + "</p>" +
      '<p class="readout-stops">' + esc(stops) + "</p></div>");

    $(target).innerHTML = out.join("");
  }

  function renderYear() { renderDial(); renderList(); renderPlan(); renderShareLink(); renderCohost(); }

  function printWith(mode) {
    document.body.setAttribute("data-print", mode);
    if (mode === "plan") {
      document.body.setAttribute("data-print-title", t("plan.printTitle", { chapter: CC.chapter.name, year: planYear }));
    }
    window.print();
  }
  window.addEventListener("afterprint", function () { document.body.removeAttribute("data-print"); });

  function planIcs() {
    var ids = planIds().filter(function (id) { return obsById[id]; });
    if (!ids.length) { say(t("plan.emptyIcs")); return; }
    var lines = [];
    ids.forEach(function (id) {
      var o = obsById[id], d = dateFor(o, planYear), e = endFor(o, planYear) || d;
      var after = new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1);
      lines.push("BEGIN:VEVENT", "UID:" + id + "-" + planYear + "@chapter-compass", "DTSTAMP:" + stamp(),
        "DTSTART;VALUE=DATE:" + ymd(d), "DTEND;VALUE=DATE:" + ymd(after),
        "SUMMARY:" + icsEscape(L(o.name)), "DESCRIPTION:" + icsEscape(L(o.idea) + (o.source ? "\n" + o.source : "")),
        "END:VEVENT");
    });
    download("chapter-plan-" + planYear + ".ics", icsWrap(lines), "text/calendar");
  }

  /* =====================================================================
   * PLAN AN EVENT
   * ===================================================================== */
  var accessItems = [];
  CC.access.forEach(function (g) { g.items.forEach(function (i) { accessItems.push(i); }); });
  var accessById = dict();
  accessItems.forEach(function (i) { accessById[i.id] = i; });

  function defaultRos() {
    return [
      { time: "18:00", seg: t("ros.d1"), who: "" },
      { time: "18:15", seg: t("ros.d2"), who: "" },
      { time: "18:30", seg: t("ros.d3"), who: "" },
      { time: "19:30", seg: t("ros.d4"), who: "" }
    ];
  }
  // The event draft is read back from storage and backups; keep strings, known checklist ids, and well-formed rows.
  var DRAFT_FIELDS = ["title", "observance", "date", "start", "end", "goal", "venue", "address", "transit", "partners", "contact", "deadline"];
  function cleanDraft(d) {
    d = d && typeof d === "object" ? d : {};
    var out = { format: ["inperson", "virtual", "hybrid"].indexOf(d.format) !== -1 ? d.format : "inperson" };
    DRAFT_FIELDS.forEach(function (k) { if (typeof d[k] === "string") out[k] = d[k].slice(0, 500); });
    out.access = (Array.isArray(d.access) ? d.access : []).filter(function (id) { return typeof id === "string" && accessById[id]; });
    out.ros = Array.isArray(d.ros) ? d.ros.filter(function (r) { return r && typeof r === "object"; }).map(function (r) {
      return { time: typeof r.time === "string" ? r.time : "", seg: typeof r.seg === "string" ? r.seg : "", who: typeof r.who === "string" ? r.who : "" };
    }) : null;
    return out;
  }
  var draft = cleanDraft(store.get("event", null));

  function renderObsSelect() {
    var sel = $("#event-observance");
    sel.innerHTML = '<option value="">' + esc(t("event.none")) + "</option>" +
      sortedObs().filter(function (o) { return o.type === "un"; }).map(function (o) {
        return '<option value="' + o.id + '">' + esc(fmt(dateFor(o, planYear)) + ": " + L(o.name)) + "</option>";
      }).join("");
  }

  function renderAccessGroups() {
    $("#access-groups").innerHTML = CC.access.map(function (g, gi) {
      return '<fieldset class="access-group"><legend>' + esc(L(g.group)) + "</legend>" +
        g.items.map(function (i) {
          return '<label class="check"><input type="checkbox" name="access" value="' + i.id + '"> <span>' + esc(L(i)) + "</span></label>";
        }).join("") + "</fieldset>";
    }).join("");
  }

  function renderRos() {
    if (!draft.ros) draft.ros = defaultRos();
    $("#ros-body").innerHTML = draft.ros.map(function (r, i) {
      var n = i + 1;
      return "<tr>" +
        '<td><input type="time" data-ros="' + i + '" data-key="time" value="' + esc(r.time) + '" aria-label="' + esc(t("ros.time") + " " + n) + '"></td>' +
        '<td><input type="text" data-ros="' + i + '" data-key="seg" value="' + esc(r.seg) + '" aria-label="' + esc(t("ros.segment") + " " + n) + '"></td>' +
        '<td><input type="text" data-ros="' + i + '" data-key="who" value="' + esc(r.who) + '" aria-label="' + esc(t("ros.who") + " " + n) + '"></td>' +
        '<td><button type="button" class="linkish" data-ros-remove="' + i + '">' + esc(t("ros.remove")) + '<span class="visually-hidden"> ' + n + "</span></button></td>" +
      "</tr>";
    }).join("");
  }

  function fillEventForm() {
    var f = $("#event-form");
    DRAFT_FIELDS.forEach(function (k) {
      if (f.elements[k]) f.elements[k].value = draft[k] || "";
    });
    $$('input[name="format"]', f).forEach(function (r) { r.checked = r.value === (draft.format || "inperson"); });
    $$('input[name="access"]', f).forEach(function (c) { c.checked = (draft.access || []).indexOf(c.value) !== -1; });
    renderRos();
    updateAccessCount();
  }

  function readEventForm() {
    var f = $("#event-form");
    DRAFT_FIELDS.forEach(function (k) {
      draft[k] = f.elements[k].value.trim();
    });
    var fm = $('input[name="format"]:checked', f);
    draft.format = fm ? fm.value : "inperson";
    draft.access = $$('input[name="access"]:checked', f).map(function (c) { return c.value; });
    store.set("event", draft);
  }

  function updateAccessCount() {
    $("#access-count").textContent = t("event.confirmedOf", { n: (draft.access || []).length, total: accessItems.length });
  }

  function whenText() {
    var d = parseISO(draft.date);
    if (!d) return t("brief.tbd");
    var s = fmtLong(d);
    if (draft.start) s += ", " + fmtTime(draft.start) + (draft.end ? " – " + fmtTime(draft.end) : "");
    return s;
  }
  function whereText() {
    return [draft.venue, draft.address].filter(Boolean).join(", ") || t("brief.tbd");
  }

  function accessStatement() {
    var lines = (draft.access || []).map(function (id) { return accessById[id] && L(accessById[id].says); }).filter(Boolean);
    var out = [];
    if (!lines.length) { out.push(t("out.noAccess")); }
    else { out.push(t("out.accessIntro")); lines.forEach(function (l) { out.push("- " + l); }); }
    var contact = draft.contact || CC.chapter.accessContact;
    if (contact) {
      var dl = parseISO(draft.deadline);
      out.push("", dl ? t("out.request", { contact: contact, deadline: fmt(dl, { month: "long", day: "numeric" }) }) : t("out.requestNoDate", { contact: contact }));
    } else { out.push("", t("out.requestNoContact")); }
    return out.join("\n");
  }

  function buildKit() {
    readEventForm();
    if (!draft.title) {
      say(t("event.needTitle"));
      var ti = $("#event-form").elements.title;
      ti.setAttribute("aria-invalid", "true");
      ti.focus();
      return;
    }
    $("#event-form").elements.title.removeAttribute("aria-invalid");
    var o = obsById[draft.observance];
    var title = draft.title;
    var chapter = CC.chapter.name;

    // Brief
    var checked = draft.access || [];
    var accessRows = CC.access.map(function (g) {
      return "<h4>" + esc(L(g.group)) + "</h4><ul class=\"brief-checks\">" + g.items.map(function (i) {
        var on = checked.indexOf(i.id) !== -1;
        return '<li class="' + (on ? "ok" : "todo") + '"><span class="brief-flag">' + esc(on ? t("brief.confirmed") : t("brief.todo")) + "</span> " + esc(L(i)) + "</li>";
      }).join("") + "</ul>";
    }).join("");
    var ros = (draft.ros || []).filter(function (r) { return r.seg || r.time; }).map(function (r) {
      return "<tr><td>" + esc(fmtTime(r.time)) + "</td><td>" + esc(r.seg) + "</td><td>" + esc(r.who) + "</td></tr>";
    }).join("");
    var meta = [
      [t("brief.when"), whenText()],
      [t("brief.where"), whereText()],
      [t("brief.format"), t("format." + draft.format)],
      draft.transit ? [t("brief.transit"), draft.transit] : null,
      o ? [t("brief.observance"), L(o.name)] : null,
      o ? [t("brief.goals"), o.sdgs.map(function (n) { return t("sdg.prefix") + " " + n + " (" + L(sdgByN[n]) + ")"; }).join(", ")] : null,
      draft.partners ? [t("brief.partners"), draft.partners] : null,
      draft.goal ? [t("brief.goal"), draft.goal] : null
    ].filter(Boolean).map(function (r) { return "<dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("");

    $("#brief").innerHTML =
      '<header class="brief-head"><p class="brief-chapter">' + esc(chapter) + "</p><h3>" + esc(title) + "</h3></header>" +
      '<dl class="brief-meta">' + meta + "</dl>" +
      (ros ? "<h4>" + esc(t("brief.ros")) + '</h4><table class="brief-ros"><tbody>' + ros + "</tbody></table>" : "") +
      '<div class="brief-access"><h4 class="brief-sub">' + esc(t("brief.access")) + "</h4>" + accessRows + "</div>" +
      "<h4>" + esc(t("brief.statement")) + '</h4><p class="brief-statement">' + esc(accessStatement()).replace(/\n/g, "<br>") + "</p>";

    // Access statement
    $("#out-access").value = accessStatement();

    // Social post
    var shortList = ["step-free", "asl", "cart", "human-captions", "quiet"].filter(function (id) { return checked.indexOf(id) !== -1; })
      .map(function (id) { return t("out.short." + id); });
    var social = [
      t("out.socialJoin", { chapter: CC.chapter.shortName || chapter, title: title }) + ".",
      whenText() + ". " + whereText() + ".",
      o ? t("out.socialMarking", { observance: L(o.name) }) : "",
      shortList.length ? t("out.socialAccess", { list: shortList.join(", ") }) : "",
      t("out.socialRsvp"),
      CC.chapter.hashtag || ""
    ].filter(Boolean).join("\n");
    $("#out-social").value = social;

    // Email
    var email = [
      t("out.emailSubject", { title: title }), "",
      t("out.emailHello"), "",
      t("out.emailBody", { chapter: chapter, title: title }) + (o ? " " + t("out.socialMarking", { observance: L(o.name) }) : ""), "",
      t("out.emailWhen", { when: whenText() }),
      t("out.emailWhere", { where: whereText() }),
      draft.transit ? t("out.emailGetting", { transit: draft.transit }) : "",
      "", accessStatement(), "",
      t("out.emailClose"), "",
      t("out.emailSign", { chapter: CC.chapter.shortName || chapter })
    ].filter(function (l, i, a) { return !(l === "" && a[i - 1] === ""); }).join("\n");
    $("#out-email").value = email;

    var outEl = $("#event-output");
    outEl.hidden = false;
    outEl.focus();
    say(t("event.built"));
  }

  function eventIcs() {
    readEventForm();
    var d = parseISO(draft.date);
    if (!d) { say(t("brief.when") + ": " + t("brief.tbd")); return; }
    var lines = ["BEGIN:VEVENT", "UID:event-" + ymd(d) + "-" + Date.now() + "@chapter-compass", "DTSTAMP:" + stamp()];
    if (draft.start) {
      var st = draft.start.replace(":", "") + "00", en = (draft.end || draft.start).replace(":", "") + "00";
      lines.push("DTSTART:" + ymd(d) + "T" + st, "DTEND:" + ymd(d) + "T" + en);
    } else {
      var nd = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      lines.push("DTSTART;VALUE=DATE:" + ymd(d), "DTEND;VALUE=DATE:" + ymd(nd));
    }
    lines.push("SUMMARY:" + icsEscape(draft.title || t("brief.untitled")), "LOCATION:" + icsEscape(whereText()),
      "DESCRIPTION:" + icsEscape(accessStatement()), "END:VEVENT");
    // Keep letters from any script; fall back to "event" if nothing usable is left.
    var slug = (draft.title || "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 60).replace(/-+$/, "");
    download((slug || "event") + "-" + ymd(d) + ".ics", icsWrap(lines), "text/calendar");
  }

  function startEventFor(obsId, title) {
    var o = obsById[obsId];
    draft = { format: "inperson", access: [], ros: null, observance: obsId || "",
      title: title || (o ? L(o.name) : ""), date: o ? isoDate(dateFor(o, planYear)) : "" };
    store.set("event", draft);
    fillEventForm();
    $("#event-output").hidden = true;
    go("event");
  }

  /* two-press confirm for destructive buttons */
  function armConfirm(btn, confirmKey, labelKey, action) {
    if (btn.getAttribute("data-armed") === "1") {
      btn.removeAttribute("data-armed");
      btn.textContent = t(labelKey);
      action();
      return;
    }
    btn.setAttribute("data-armed", "1");
    btn.textContent = t(confirmKey);
    say(t(confirmKey));
    setTimeout(function () {
      if (btn.getAttribute("data-armed") === "1") { btn.removeAttribute("data-armed"); btn.textContent = t(labelKey); }
    }, 6000);
  }

  /* =====================================================================
   * CONNECT AN ISSUE
   * ===================================================================== */
  var issueId = store.get("issue", CC.issues[0].id);

  function renderIssueChips() {
    var fs = $("#issue-chips");
    $$("label", fs).forEach(function (l) { l.remove(); });
    CC.issues.forEach(function (iss) {
      var lab = document.createElement("label");
      lab.className = "chip";
      lab.innerHTML = '<input type="radio" name="issue" value="' + iss.id + '"' + (iss.id === issueId ? " checked" : "") + "> <span>" + esc(L(iss.name)) + "</span>";
      fs.appendChild(lab);
    });
  }

  function renderIssue() {
    var iss = CC.issues.filter(function (i) { return i.id === issueId; })[0] || CC.issues[0];
    var local = (CC.chapter.localPartners || {})[iss.id];
    var html = '<h2 class="issue-name">' + esc(L(iss.name)) + "</h2>" +
      '<div class="issue-grid">' +
        '<div class="issue-un"><h3>' + esc(t("issue.un")) + "</h3><p>" + esc(L(iss.un)) + "</p></div>" +
        "<div><h3>" + esc(t("issue.targets")) + '</h3><ul class="targets">' + iss.targets.map(function (g) {
          var n = +g.t.split(".")[0];
          return '<li><span class="target-n">' + esc(t("issue.target", { t: g.t })) + "</span> " + esc(L(g)) +
            ' <span class="target-goal">' + esc(t("sdg.prefix") + " " + n + ": " + L(sdgByN[n])) + "</span></li>";
        }).join("") + "</ul></div>" +
        "<div><h3>" + esc(t("issue.prompts")) + '</h3><ul class="prompts">' + iss.prompts.map(function (p) { return "<li>" + esc(L(p)) + "</li>"; }).join("") + "</ul></div>" +
        "<div><h3>" + esc(t("issue.partners")) + '</h3><ul class="plain">' + L(iss.partners).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" +
          (local && local.length ? '<p class="local"><strong>' + esc(t("issue.local", { city: CC.chapter.city })) + ":</strong> " + esc(local.join(", ")) + "</p>" : "") +
        "</div>" +
        '<div class="issue-days"><h3>' + esc(t("issue.days")) + '</h3><ul class="day-list">' + iss.days.filter(function (id) { return obsById[id]; }).map(function (id) {
          var o = obsById[id], on = inPlan(id);
          return "<li><span><strong>" + esc(dateLabel(o)) + "</strong> " + esc(L(o.name)) + "</span>" +
            '<button type="button" class="toggle toggle-small" data-plan="' + id + '" aria-pressed="' + on + '"><span class="toggle-box" aria-hidden="true"></span>' +
            esc(on ? t("obs.added") : t("obs.add")) + '<span class="visually-hidden">: ' + esc(L(o.name)) + "</span></button></li>";
        }).join("") + "</ul></div>" +
      "</div>" +
      '<p><button type="button" class="btn btn-primary" data-issue-event="' + iss.id + '">' + esc(t("issue.plan")) + "</button></p>";
    $("#issue-result").innerHTML = html;
  }

  /* =====================================================================
   * LEARN THE UN
   * ===================================================================== */
  function renderLearn() {
    $("#learn-cards").innerHTML = CC.explainers.map(function (x) {
      return '<article class="card" aria-labelledby="card-' + x.id + '">' +
        '<h2 id="card-' + x.id + '">' + esc(L(x.title)) + "</h2>" +
        "<p>" + esc(L(x.body)) + "</p>" +
        '<div class="card-try"><h3>' + esc(t("learn.try")) + "</h3><p>" + esc(L(x.prompt)) + "</p></div>" +
        '<p class="card-source"><a href="' + esc(x.source) + '">' + esc(t("learn.source")) + "</a></p>" +
      "</article>";
    }).join("");
  }

  /* =====================================================================
   * SHARE LINKS AND CO-HOSTING
   * A shared plan is a link with ?plan=<base64url JSON>: { v, n: chapter, y: year, d: [ids] }.
   * The plan lives in the link itself, so nothing is stored online.
   * ===================================================================== */
  function b64e(str) { return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function b64d(str) { str = str.replace(/-/g, "+").replace(/_/g, "/"); while (str.length % 4) str += "="; return decodeURIComponent(escape(atob(str))); }
  function shareUrl() {
    var base = location.href.split("#")[0].split("?")[0];
    return base + "?plan=" + b64e(JSON.stringify({ v: 1, n: CC.chapter.name, y: planYear, d: planIds() })) + "#cohost";
  }
  function parseShare(text) {
    try {
      var str = String(text || "").trim();
      var m = str.match(/[?&]plan=([A-Za-z0-9_-]+)/);
      var o = JSON.parse(b64d(m ? m[1] : str));
      return cleanPlan(o);
    } catch (e) { return null; }
  }
  // Plans come from links other people send and from this browser's storage, so check their shape.
  function cleanPlan(o) {
    if (!o || o.v !== 1 || !Array.isArray(o.d) || !Number.isInteger(o.y) || o.y < 2000 || o.y > 2100) return null;
    var seen = dict();
    var days = o.d.filter(function (id) {
      if (typeof id !== "string" || !obsById[id] || seen[id]) return false;
      seen[id] = true; return true;
    });
    return { v: 1, n: String(o.n || "").slice(0, 80) || "?", y: o.y, d: days };
  }
  function renderShareLink() {
    var box = $("#share-link");
    if (box) box.value = planIds().length ? shareUrl() : "";
  }

  var others = (Array.isArray(store.get("others", [])) ? store.get("others", []) : []).map(cleanPlan).filter(Boolean);
  var incoming = null;

  function addOther(plan) {
    others = others.filter(function (o) { return !(o.n === plan.n && o.y === plan.y); });
    others.push(plan);
    store.set("others", others);
    renderCohost();
    say(t("cohost.added", { name: plan.n }));
  }

  function cohostCounts() {
    var counts = dict();
    function add(name, ids) { ids.forEach(function (id) { (counts[id] = counts[id] || []).push(name); }); }
    add(CC.chapter.name, planIds());
    others.forEach(function (o) { if (o.y === planYear) add(o.n, o.d); });
    return counts;
  }

  function renderCohost() {
    if (!$("#cohost-dial")) return;
    var counts = cohostCounts();
    renderDial("#cohost-dial", counts);
    $("#cohost-year").textContent = t("cohost.year", { year: planYear });

    function daysText(n) { return n === 1 ? t("cohost.daysOne") : t("cohost.days", { n: n }); }
    var mine = '<li><strong>' + esc(t("cohost.you", { name: CC.chapter.name })) + "</strong> " + esc(daysText(planIds().length)) + "</li>";
    $("#chapter-list").innerHTML = mine + others.map(function (o, i) {
      var note = o.y === planYear ? daysText(o.d.length) : t("cohost.otherYear", { year: o.y });
      return "<li><strong>" + esc(o.n) + "</strong> " + esc(note) +
        ' <button type="button" class="linkish" data-other-remove="' + i + '" aria-label="' + esc(t("cohost.removeLabel", { name: o.n })) + '">' + esc(t("cohost.remove")) + "</button></li>";
    }).join("");

    var shared = Object.keys(counts).filter(function (id) { return counts[id].length > 1; })
      .sort(function (a, b) { return counts[b].length - counts[a].length || dateFor(obsById[a], planYear) - dateFor(obsById[b], planYear); });
    $("#overlap-empty").hidden = shared.length > 0;
    $("#overlap-list").innerHTML = shared.map(function (id) {
      var o = obsById[id], on = inPlan(id), name = L(o.name);
      return '<li class="overlap"><p class="overlap-count">' + esc(counts[id].length.toLocaleString(lang)) + "</p>" +
        '<div><h3>' + esc(name) + '</h3><p class="obs-range">' + esc(dateLabel(o)) + "</p>" +
        '<p class="fine">' + esc(t("cohost.chapters", { n: counts[id].length }) + ": " + counts[id].join(", ")) + "</p></div>" +
        '<div class="overlap-actions">' +
          '<button type="button" class="toggle toggle-small" data-plan="' + id + '" aria-pressed="' + on + '"><span class="toggle-box" aria-hidden="true"></span>' +
            esc(on ? t("obs.added") : t("obs.add")) + '<span class="visually-hidden">: ' + esc(name) + "</span></button>" +
          '<button type="button" class="btn btn-small" data-cohost-email="' + id + '" aria-label="' + esc(t("cohost.draftLabel", { name: name })) + '">' + esc(t("cohost.draft")) + "</button>" +
        "</div></li>";
    }).join("");
  }

  function draftCohostEmail(id) {
    var o = obsById[id];
    var names = (cohostCounts()[id] || []).filter(function (n) { return n !== CC.chapter.name; });
    var joined = names.length > 1 ? names.slice(0, -1).join(", ") + " " + t("cohost.and") + " " + names[names.length - 1] : names.join("");
    $("#cohost-email").value = [
      t("cohost.emailSubject", { observance: L(o.name) }), "",
      t("cohost.emailHello", { names: joined }), "",
      t("cohost.emailBody", { observance: L(o.name), date: fmt(dateFor(o, planYear), { month: "long", day: "numeric" }), year: planYear }), "",
      t("cohost.emailAsk"), "",
      t("cohost.emailSign"), CC.chapter.name
    ].join("\n");
    $("#cohost-email-wrap").hidden = false;
    $("#cohost-email").focus();
    say(t("cohost.emailReady"));
  }

  function checkIncoming() {
    var m = location.search.match(/[?&]plan=([A-Za-z0-9_-]+)/);
    if (!m) return;
    incoming = parseShare(m[1]);
    if (!incoming) return;
    $("#share-banner-text").textContent = t("share.incoming", { name: incoming.n, year: incoming.y, n: incoming.d.length });
    $("#share-banner").hidden = false;
  }
  function clearIncoming() {
    incoming = null;
    $("#share-banner").hidden = true;
    try { history.replaceState(null, "", location.pathname + location.hash); } catch (e) { /* file:// or sandboxed */ }
  }

  /* =====================================================================
   * TRACK IMPACT
   * ===================================================================== */
  // Log entries come from storage and from backup files people send each other. Keep only known fields.
  function cleanEntry(e) {
    if (!e || typeof e !== "object") return null;
    var str = function (v, max) { return typeof v === "string" || typeof v === "number" ? String(v).slice(0, max) : ""; };
    var num = function (v) { var n = parseInt(v, 10); return isFinite(n) && n >= 0 ? String(n) : ""; };
    var date = /^\d{4}-\d{2}-\d{2}$/.test(e.date) ? e.date : "";
    var title = str(e.title, 200).trim();
    if (!title || !date) return null;
    return {
      id: str(e.id, 40).replace(/[^\w-]/g, "") || "e" + Math.random().toString(36).slice(2),
      title: title, date: date, attendance: num(e.attendance), newMembers: num(e.newMembers),
      partners: str(e.partners, 500), notes: str(e.notes, 2000),
      sdgs: (Array.isArray(e.sdgs) ? e.sdgs : []).map(Number).filter(function (n, i, a) {
        return Number.isInteger(n) && n >= 1 && n <= 17 && a.indexOf(n) === i;
      })
    };
  }
  function cleanLog(list) { return (Array.isArray(list) ? list : []).map(cleanEntry).filter(Boolean); }
  var log = cleanLog(store.get("log", []));
  var reportYear = null;

  function renderLogSdgs() {
    $("#log-sdgs").innerHTML = CC.sdgs.map(function (g) {
      return '<label class="check check-sdg"><input type="checkbox" name="sdg" value="' + g.n + '"> <span>' +
        esc(t("sdg.prefix") + " " + g.n) + '<span class="sdg-name">' + esc(L(g)) + "</span></span></label>";
    }).join("");
  }

  function yearsInLog() {
    var ys = dict();
    log.forEach(function (e) { if (e.date) ys[e.date.slice(0, 4)] = true; });
    ys[String(today.getFullYear())] = true;
    return Object.keys(ys).sort().reverse();
  }

  function renderImpact() {
    var ys = yearsInLog();
    if (!reportYear || ys.indexOf(reportYear) === -1) reportYear = ys[0];
    $("#report-year").innerHTML = ys.map(function (y) { return '<option value="' + y + '"' + (y === reportYear ? " selected" : "") + ">" + y + "</option>"; }).join("");

    var rows = log.slice().sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
    var inYear = rows.filter(function (e) { return (e.date || "").slice(0, 4) === reportYear; });

    var people = 0, members = 0, goals = dict(), partners = dict();
    inYear.forEach(function (e) {
      people += +e.attendance || 0; members += +e.newMembers || 0;
      (e.sdgs || []).forEach(function (n) { goals[n] = true; });
      (e.partners || "").split(",").map(function (p) { return p.trim(); }).filter(Boolean).forEach(function (p) { partners[p] = true; });
    });
    var goalList = Object.keys(goals).map(Number).sort(function (a, b) { return a - b; });
    var partnerList = Object.keys(partners);

    $("#ledger").innerHTML = [
      [t("led.events"), inYear.length], [t("led.people"), people], [t("led.members"), members],
      [t("led.goals"), goalList.length], [t("led.partners"), partnerList.length]
    ].map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + r[1].toLocaleString(lang) + "</dd></div>"; }).join("");

    $("#log-empty").hidden = rows.length > 0;
    $("#log-body").innerHTML = rows.map(function (e) {
      var d = parseISO(e.date);
      return "<tr><td>" + esc(d ? fmt(d, { month: "short", day: "numeric", year: "numeric" }) : "") + "</td>" +
        '<th scope="row">' + esc(e.title) + (e.notes ? '<span class="log-notes">' + esc(e.notes) + "</span>" : "") + "</th>" +
        "<td>" + esc(e.attendance || 0) + "</td><td>" + esc(e.newMembers || 0) + "</td>" +
        '<td><span class="tags">' + (e.sdgs || []).map(sdgTag).join("") + "</span></td>" +
        '<td><button type="button" class="linkish" data-log-delete="' + esc(e.id) + '" aria-label="' + esc(t("impact.deleteLabel", { name: e.title })) + '">' + esc(t("impact.delete")) + "</button></td></tr>";
    }).join("");

    // Report draft
    var draftText;
    if (!inYear.length) {
      draftText = t("report.empty");
    } else {
      var parts = [t("report.intro", { year: reportYear, chapter: CC.chapter.name, events: inYear.length, people: people.toLocaleString(lang), members: members })];
      if (goalList.length) parts.push(t("report.goals", { n: goalList.length, list: goalList.map(function (n) { return n + " (" + L(sdgByN[n]) + ")"; }).join(", ") }));
      if (partnerList.length) parts.push(t("report.partners", { n: partnerList.length, list: partnerList.slice(0, 5).join(", ") }));
      var top = inYear.slice().sort(function (a, b) { return (+b.attendance || 0) - (+a.attendance || 0); }).slice(0, 5);
      parts.push("", t("report.highlights"));
      top.forEach(function (e) {
        var d = parseISO(e.date);
        parts.push("- " + t("report.item", { date: d ? fmt(d, { month: "long", day: "numeric" }) : "", title: e.title, people: e.attendance || 0 }) + (e.notes ? " " + e.notes : ""));
      });
      parts.push("", t("report.close"));
      draftText = parts.join("\n");
    }
    $("#report-draft").value = draftText;
  }

  function addLogEntry(e) {
    e.preventDefault();
    var f = e.target;
    var entry = {
      id: "e" + Date.now().toString(36),
      title: f.elements.title.value.trim(),
      date: f.elements.date.value,
      attendance: f.elements.attendance.value,
      newMembers: f.elements.newMembers.value,
      partners: f.elements.partners.value.trim(),
      sdgs: $$('input[name="sdg"]:checked', f).map(function (c) { return +c.value; }),
      notes: f.elements.notes.value.trim()
    };
    var err = $("#log-error");
    if (!entry.title || !entry.date) {
      err.textContent = t("impact.needTitle");
      (entry.title ? f.elements.date : f.elements.title).focus();
      return;
    }
    err.textContent = "";
    log.push(entry);
    store.set("log", log);
    reportYear = entry.date.slice(0, 4);
    f.reset();
    renderImpact();
    say(t("impact.added"));
    f.elements.title.focus();
  }

  function csvCell(v) { v = String(v === undefined ? "" : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  function exportCsv() {
    var head = ["date", "title", "attendance", "new_members", "partners", "sdgs", "notes"];
    var lines = [head.join(",")].concat(log.map(function (e) {
      return [e.date, e.title, e.attendance, e.newMembers, e.partners, (e.sdgs || []).join(" "), e.notes].map(csvCell).join(",");
    }));
    download("chapter-impact-log.csv", lines.join("\n"), "text/csv");
  }
  function exportBackup() {
    download("chapter-compass-backup-" + isoDate(today) + ".json",
      JSON.stringify({ app: "chapter-compass", version: 1, saved: new Date().toISOString(), plan: plans, log: log, event: draft, others: others }, null, 2),
      "application/json");
  }
  function restoreBackup(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (data.app !== "chapter-compass" || !Array.isArray(data.log)) throw new Error("not ours");
        log = cleanLog(data.log);
        plans = cleanPlans(data.plan);
        if (data.event && typeof data.event === "object" && !Array.isArray(data.event)) draft = cleanDraft(data.event);
        if (Array.isArray(data.others)) others = data.others.map(cleanPlan).filter(Boolean);
        store.set("log", log); store.set("plan", plans); store.set("event", draft); store.set("others", others);
        renderAll();
        say(t("impact.restored"));
      } catch (e) { say(t("impact.restoreFail")); }
    };
    reader.readAsText(file);
  }

  // { "2027": ["un-day", ...] }: keep real years and known days only.
  function cleanPlans(p) {
    var out = {};
    if (!p || typeof p !== "object" || Array.isArray(p)) return out;
    Object.keys(p).forEach(function (y) {
      if (!/^\d{4}$/.test(y) || !Array.isArray(p[y])) return;
      var c = cleanPlan({ v: 1, y: +y, d: p[y] });
      if (c) out[y] = c.d;
    });
    return out;
  }
  function prefillLogFromEvent() {
    readEventForm();
    var f = $("#log-form");
    f.elements.title.value = draft.title || "";
    f.elements.date.value = draft.date || "";
    f.elements.partners.value = draft.partners || "";
    var o = obsById[draft.observance];
    $$('input[name="sdg"]', f).forEach(function (c) { c.checked = !!(o && o.sdgs.indexOf(+c.value) !== -1); });
    go("impact");
    say(t("impact.prefilled"));
  }

  /* ---------- copy ---------- */
  function copyFrom(id) {
    var el = document.getElementById(id);
    var text = el.value;
    copyText(el, text, "status.copied");
  }
  // The Clipboard API needs https. On file:// and in older browsers, select the text and use
  // the older copy command; only if that also fails, leave it selected and say so.
  function copyText(el, text, okKey) {
    function legacy() {
      el.focus(); el.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      say(t(ok ? okKey : "status.copyFail"));
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { say(t(okKey)); }, legacy);
    } else { legacy(); }
  }

  /* =====================================================================
   * ROUTING
   * ===================================================================== */
  var routes = ["year", "event", "issue", "learn", "cohost", "impact", "resources"];
  var current = null;
  function go(route) {
    if (location.hash !== "#" + route) { location.hash = route; return; }
    show(route, true);
  }
  function show(route, moveFocus) {
    if (routes.indexOf(route) === -1) route = "year";
    $$(".view").forEach(function (v) { v.hidden = v.getAttribute("data-view") !== route; });
    $$("[data-route]").forEach(function (a) {
      if (a.getAttribute("data-route") === route) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    if (moveFocus && current !== null) {
      var h = $("#view-" + route + " h1");
      if (h) h.focus();
      window.scrollTo(0, 0);
    }
    current = route;
  }
  window.addEventListener("hashchange", function () { show(location.hash.slice(1), true); });

  /* =====================================================================
   * EVENTS
   * ===================================================================== */
  function bind() {
    $("#lang-select").addEventListener("change", function (e) {
      lang = e.target.value;
      store.set("lang", lang);
      renderAll();
      if (incoming) $("#share-banner-text").textContent = t("share.incoming", { name: incoming.n, year: incoming.y, n: incoming.d.length });
      $("#lang-select").focus();
    });
    $("#learn-print").addEventListener("click", function () { printWith("learn"); });
    $("#share-copy").addEventListener("click", function () {
      if (!planIds().length) { say(t("share.emptyPlan")); return; }
      renderShareLink();
      var box = $("#share-link");
      copyText(box, box.value, "share.copied");
    });
    $("#share-accept").addEventListener("click", function () {
      var p = incoming; clearIncoming();
      if (p) { addOther(p); go("cohost"); }
    });
    $("#share-dismiss").addEventListener("click", function () { clearIncoming(); $("#main").focus(); });
    $("#cohost-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target, p = parseShare(f.elements.link.value);
      var err = $("#cohost-error");
      if (!p) { err.textContent = t("cohost.bad"); f.elements.link.setAttribute("aria-invalid", "true"); f.elements.link.focus(); return; }
      err.textContent = ""; f.elements.link.removeAttribute("aria-invalid"); f.reset();
      addOther(p);
    });

    var largePrint = store.get("largePrint", false);
    function applyLarge() {
      document.documentElement.classList.toggle("large-print", largePrint);
      $("#print-toggle").setAttribute("aria-pressed", String(largePrint));
    }
    applyLarge();
    $("#print-toggle").addEventListener("click", function () {
      largePrint = !largePrint; store.set("largePrint", largePrint); applyLarge();
      say(t(largePrint ? "status.largeOn" : "status.largeOff"));
    });

    $("#plan-year").addEventListener("change", function (e) {
      planYear = +e.target.value; store.set("year", planYear); renderObsSelect(); renderYear(); renderIssue();
    });
    $$('input[name="type"]').forEach(function (r) {
      r.addEventListener("change", function () { filters.type = r.value; renderList(); });
    });
    $("#sdg-filter").addEventListener("change", function (e) { filters.sdg = e.target.value; renderList(); });
    $("#add-un-day").addEventListener("click", function () {
      togglePlan("un-day", true);
      var row = $("#obs-un-day"); if (row) { row.scrollIntoView({ block: "center" }); }
    });

    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-plan]");
      if (b) {
        var id = b.getAttribute("data-plan");
        togglePlan(id);
        if (current === "issue") renderIssue();
        var again = document.querySelector('[data-plan="' + id + '"]');
        if (again && current === "year") again.focus();
        if (current === "issue") { var ib = $('#issue-result [data-plan="' + id + '"]'); if (ib) ib.focus(); }
        if (current === "cohost") { var cb = $('#overlap-list [data-plan="' + id + '"]'); if (cb) cb.focus(); }
        return;
      }
      var j = e.target.closest("[data-jump]");
      if (j) {
        var jid = j.getAttribute("data-jump");
        if (!document.getElementById("obs-" + jid)) {
          // The day is filtered out; clear filters so it can be shown.
          filters.type = "all"; filters.sdg = "";
          $('input[name="type"][value="all"]').checked = true;
          $("#sdg-filter").value = "";
          renderList();
        }
        var row = document.getElementById("obs-" + jid);
        if (row) {
          row.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
          row.focus({ preventScroll: true });
        }
        return;
      }
      var pr = e.target.closest("[data-plan-remove]");
      if (pr) { togglePlan(pr.getAttribute("data-plan-remove"), false); $("#plan-h").focus(); return; }
      var pe = e.target.closest("[data-plan-event]");
      if (pe) { startEventFor(pe.getAttribute("data-plan-event")); return; }
      var ie = e.target.closest("[data-issue-event]");
      if (ie) {
        var iss = CC.issues.filter(function (i) { return i.id === ie.getAttribute("data-issue-event"); })[0];
        startEventFor(iss.days[0], t("issue.titleSuggest", { issue: L(iss.name) }));
        return;
      }
      var ce = e.target.closest("[data-cohost-email]");
      if (ce) { draftCohostEmail(ce.getAttribute("data-cohost-email")); return; }
      var orm = e.target.closest("[data-other-remove]");
      if (orm) {
        var gone = others.splice(+orm.getAttribute("data-other-remove"), 1)[0];
        store.set("others", others); renderCohost(); say(t("cohost.removed", { name: gone.n })); $("#cohost-h").focus();
        return;
      }
      var cp = e.target.closest("[data-copy]");
      if (cp) { copyFrom(cp.getAttribute("data-copy")); return; }
      var rr = e.target.closest("[data-ros-remove]");
      if (rr) { draft.ros.splice(+rr.getAttribute("data-ros-remove"), 1); store.set("event", draft); renderRos(); $("#ros-add").focus(); return; }
      var ld = e.target.closest("[data-log-delete]");
      if (ld) {
        var lid = ld.getAttribute("data-log-delete");
        log = log.filter(function (x) { return x.id !== lid; }); store.set("log", log); renderImpact(); say(t("impact.deleted"));
        $("#log-form").elements.title.focus();
      }
    });

    // Dial markers are visual only, but keyboard users get the same list below.
    $("#plan-ics").addEventListener("click", planIcs);
    $("#plan-print").addEventListener("click", function () { printWith("plan"); });

    var ef = $("#event-form");
    ef.addEventListener("input", function (e) {
      var r = e.target.getAttribute("data-ros");
      if (r !== null) { draft.ros[+r][e.target.getAttribute("data-key")] = e.target.value; store.set("event", draft); return; }
      readEventForm(); updateAccessCount();
    });
    ef.addEventListener("change", function () { readEventForm(); updateAccessCount(); });
    ef.addEventListener("submit", function (e) { e.preventDefault(); buildKit(); });
    $("#event-observance").addEventListener("change", function (e) {
      var o = obsById[e.target.value];
      if (o && !ef.elements.date.value) { ef.elements.date.value = isoDate(dateFor(o, planYear)); readEventForm(); }
    });
    $("#ros-add").addEventListener("click", function () {
      draft.ros.push({ time: "", seg: "", who: "" }); store.set("event", draft); renderRos();
      var inputs = $$("#ros-body tr:last-child input"); if (inputs[1]) inputs[1].focus();
    });
    $("#event-reset").addEventListener("click", function (e) {
      armConfirm(e.currentTarget, "event.resetConfirm", "event.reset", function () {
        draft = { format: "inperson", access: [], ros: null };
        store.set("event", draft); fillEventForm(); $("#event-output").hidden = true;
        say(t("event.cleared")); ef.elements.title.focus();
      });
    });
    $("#brief-print").addEventListener("click", function () { printWith("brief"); });
    $("#brief-ics").addEventListener("click", eventIcs);
    $("#brief-log").addEventListener("click", prefillLogFromEvent);

    $("#issue-chips").addEventListener("change", function (e) {
      if (e.target.name === "issue") { issueId = e.target.value; store.set("issue", issueId); renderIssue(); }
    });

    $("#log-form").addEventListener("submit", addLogEntry);
    $("#report-year").addEventListener("change", function (e) { reportYear = e.target.value; renderImpact(); });
    $("#log-csv").addEventListener("click", exportCsv);
    $("#log-backup").addEventListener("click", exportBackup);
    $("#log-restore").addEventListener("change", function (e) { if (e.target.files[0]) restoreBackup(e.target.files[0]); e.target.value = ""; });
    $("#log-clear").addEventListener("click", function (e) {
      armConfirm(e.currentTarget, "impact.clearConfirm", "impact.clear", function () {
        log = []; store.set("log", log); renderImpact(); say(t("impact.cleared"));
      });
    });
  }

  function renderAll() {
    applyStrings();
    renderYearSelect();
    renderSdgFilter();
    renderYear();
    renderObsSelect();
    renderAccessGroups();
    fillEventForm();
    renderIssueChips();
    renderIssue();
    renderLogSdgs();
    renderImpact();
    renderLearn();
    renderCohost();
  }

  renderAll();
  bind();
  checkIncoming();
  show(location.hash.slice(1) || "year", false);
  // One orchestrated moment: the needle swings to today once the page has painted.
  requestAnimationFrame(function () { requestAnimationFrame(function () { document.documentElement.classList.add("is-ready"); }); });
})();
