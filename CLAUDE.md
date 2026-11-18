# Chapter Compass

Static, no-framework planning toolkit for UNA-USA chapter leaders. Deployed on GitHub Pages. Opening `index.html` from disk must keep working.

## Commands
- Check data and translations: `node tests/validate.mjs` (must PASS before any commit)
- Preview: open `index.html` directly, or `python3 -m http.server` and visit localhost:8000

## Architecture
- `index.html` holds all five views; `assets/js/app.js` shows one at a time by URL hash (#year, #event, #issue, #impact, #resources).
- Data is in `data/*.js` as `window.CC.*` globals, NOT JSON. `fetch()` fails on `file://`, so don't convert them.
- All saved state goes through the `store` helper in app.js (localStorage, wrapped in try/catch). Keys are prefixed `cc.`.
- Nothing leaves the browser. Don't add APIs, trackers, or third-party scripts. GoatCounter (cookie-free) is the only exception.

## Rules
- IMPORTANT: every interface string goes in `assets/js/i18n.js` in BOTH `en` and `es`, with the same {placeholders}. Static HTML uses `data-i18n="key"`.
- Identity-first disability language in app copy ("Disabled people", "personas Discapacitadas"). Keep official UN titles verbatim, even when they use person-first wording.
- Chapter reminders (`type: "admin"`) need an https `source`. These dates change; never present them as official.
- Never use UN or UNA-USA logos, emblems, or the SDG color wheel. Keep the "not an official product" disclaimer.
- Design tokens live at the top of `assets/css/compass.css`; read `docs/DESIGN.md` before visual changes. Magenta means "in your plan" and nothing else. No gradients, no soft drop shadows, no Inter.
- Accessibility is a requirement, not polish: keyboard path, visible focus, labels, 44px targets, contrast 4.5:1 or better. Check large print mode and a 390px-wide screen after any layout change.
- Avoid em dashes in interface copy.

## Verifying UI changes
Take a screenshot of the changed view at 1280px and 390px, in English and Spanish, and compare against the intent. Run the validator. Tab through the changed view.
