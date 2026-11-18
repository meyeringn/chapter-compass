# Languages

Chapter Compass speaks the six official languages of the United Nations: Arabic, Chinese, English, French, Russian, and Spanish.

| Language | Code | File | Direction | Status |
|---|---|---|---|---|
| English | `en` | `assets/js/i18n.js` + `data/*.js` | left to right | Source |
| Español | `es` | `assets/js/i18n.js` + `data/*.js` | left to right | Draft, needs native review |
| Français | `fr` | `lang/fr.js` | left to right | Draft, needs native review |
| Русский | `ru` | `lang/ru.js` | left to right | Draft, needs native review |
| 中文（简体） | `zh` | `lang/zh.js` | left to right | Draft, needs native review |
| العربية | `ar` | `lang/ar.js` | **right to left** | Draft, needs native review |

All five non-English translations were drafted with AI assistance (Claude) in November 2026. **They have not yet been reviewed by native speakers.** Please don't rely on them for official communication until they have been. Reviews are the most valuable contribution you can make; see "Reviewing a language" below.

## How it works
- English and Spanish live inline in the data files (`{ en: "...", es: "..." }`) and in `assets/js/i18n.js`.
- Each other language is one self-contained file in `lang/`, so a reviewer can work on a single file without touching code. At startup, `app.js` merges each pack into the shared data.
- Choosing Arabic sets `dir="rtl"` on the page. The stylesheet uses logical properties (`margin-inline-start`, `border-inline-start`), so the layout mirrors on its own. The year dial deliberately stays clockwise, because that's how a calendar reads.
- Latin-script fonts (Atkinson Hyperlegible Next, Big Shoulders Display) don't cover Cyrillic, Chinese, or Arabic, so those languages switch to Noto Sans, Noto Sans SC, and Noto Sans Arabic, with system fallbacks.
- Dates and numbers are formatted by the browser (`Intl.DateTimeFormat`) in the chosen language.
- `node tests/validate.mjs` fails if any language is missing a string, a day, an issue, an access item, or an explainer, or if any `{placeholder}` differs from English.

## Disability language
The project's rule is identity-first language ("Disabled people"). How that carries into other languages depends on what each language's disability community prefers:

| Language | Term used in app copy | Why |
|---|---|---|
| Spanish | personas Discapacitadas | Identity-first, as the project's author requested |
| French | personnes handicapées | The term French disability-rights groups commonly use |
| Russian | люди с инвалидностью | The closest identity-first word, «инвалиды», reads as dated or demeaning to many Russian speakers |
| Chinese | 残障人士 | The term many Chinese-speaking disability advocates prefer |
| Arabic | الأشخاص ذوو الإعاقة | Used by Arab disability-rights movements and the CRPD; «المعاقون» reads as dated or demeaning to many |

**Official UN titles are never changed.** "International Day of Persons with Disabilities" appears as the UN publishes it in each language (for example, «Международный день инвалидов», 国际残疾人日).

These choices are open to review by Disabled speakers of each language. If a community prefers a different term, change it in that language's file.

## Reviewing a language
1. Open the language's file in `lang/` (or `assets/js/i18n.js` and `data/*.js` for Spanish).
2. Read each string next to its English version in `assets/js/i18n.js`. Keep every `{placeholder}` exactly as it is.
3. Check official UN titles against the UN's list of international days in that language.
4. Run `node tests/validate.mjs`, open `index.html`, choose the language, and click through every tab.
5. Open a pull request, and in the language's status row above, change "Draft" to "Reviewed by [name], [month year]".

## Adding a language
Copy `lang/fr.js` to `lang/xx.js`, translate it, add `{ code: "xx", label: "...", dir: "ltr" }` to `CC.languages` in `assets/js/i18n.js`, add a `<script src="lang/xx.js">` line to `index.html`, and add the file to `langFiles` in `tests/validate.mjs`.
