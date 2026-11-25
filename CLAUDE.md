# Chapter Compass

Static, no-framework planning toolkit for UNA-USA chapter leaders. Deployed on GitHub Pages. Opening `index.html` from disk must keep working.

## Commands
- Check data and translations: `npm test` or `node tests/validate.mjs` (must PASS before any commit). Also checks that every `t("key")` in app.js exists.
- Browser test: `npm run test:browser` (needs `pip install playwright && python -m playwright install chromium`). Every view x six languages at 1280px and 390px, offline. `SCREENSHOTS=shots npm run test:browser` saves English and Arabic screenshots; look at them.
- Preview: open `index.html` directly, or `python3 -m http.server` and visit localhost:8000

## Architecture
- `index.html` holds all seven views; `assets/js/app.js` shows one at a time by URL hash (#year, #event, #issue, #learn, #cohost, #impact, #resources).
- Shared plans travel in the URL as `?plan=<base64url JSON {v,n,y,d}>`; other chapters' plans are stored under `cc.others`. Explainer cards hold lasting facts only, never current events.
- Data is in `data/*.js` as `window.CC.*` globals, NOT JSON. `fetch()` fails on `file://`, so don't convert them.
- All saved state goes through the `store` helper in app.js (localStorage, wrapped in try/catch). Keys are prefixed `cc.`.
- Share links, backup files, and storage are untrusted input. Run them through `cleanPlan`, `cleanPlans`, `cleanEntry`/`cleanLog`, and `cleanDraft`, and key lookup tables with `dict()` (no prototype), never `{}`. Escape everything rendered with `esc()`.
- GoatCounter counts `location.pathname` only, because `?plan=` carries a chapter's plan. Keep it that way.
- Nothing leaves the browser. Don't add APIs, trackers, or third-party scripts. GoatCounter (cookie-free) is the only exception.

## Rules
- IMPORTANT: six languages. Every new string goes in `assets/js/i18n.js` (`en`, `es`) AND in each `lang/{fr,ru,zh,ar}.js`, with identical {placeholders}. Data content follows the same rule. Static HTML uses `data-i18n="key"`. The validator fails on any gap.
- Arabic is right to left: use logical CSS properties (`margin-inline-start`, `border-inline-start`, `text-align: start`), never left/right. The dial stays `direction: ltr`.
- Disability terms differ by language on purpose; see `docs/LANGUAGES.md` before changing them.
- Identity-first disability language in app copy ("Disabled people", "personas Discapacitadas"). Keep official UN titles verbatim, even when they use person-first wording.
- Chapter reminders (`type: "admin"`) need an https `source`. These dates change; never present them as official.
- Never use UN or UNA-USA logos, emblems, or the SDG color wheel. Keep the "not an official product" disclaimer.
- Design tokens live at the top of `assets/css/compass.css`; read `docs/DESIGN.md` before visual changes. UN blue (#009EDB) is for shapes and lines only, never text (3:1); text-sized blue is #005B9A. UN blue marks "in your plan". Red is only for to-dos, errors, and destructive actions. No gradients, no soft drop shadows, no Inter.
- Accessibility is a requirement, not polish: keyboard path, visible focus, labels, 44px targets, contrast 4.5:1 or better. Check large print mode and a 390px-wide screen after any layout change.
- Avoid em dashes in interface copy.

## Verifying UI changes
Run `SCREENSHOTS=shots npm run test:browser` and look at the changed view at 1280px and 390px, in English and Arabic (right to left). Run the validator. Tab through the changed view. Then ask the `a11y-reviewer` agent to review the diff. Ship through a branch and pull request; a push to `main` goes live on GitHub Pages.
