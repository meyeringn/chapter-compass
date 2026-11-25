# Accessibility Statement

Chapter Compass is built by a Disabled developer for chapters that include Disabled members, leaders, and guests. Access is a requirement here, not a feature.

**Target:** WCAG 2.2 Level AA. Many parts meet AAA.
**Last reviewed:** November 2026

## What's built in

### Seeing and reading
- **Typeface:** Atkinson Hyperlegible Next, designed by the Braille Institute to improve character recognition for low-vision readers. Headings use Big Shoulders Display. Readable system fonts take over if web fonts don't load.
- **Text size:** 18px base, and a **Large print** button in the header raises everything 25% and opens up line spacing. The setting is remembered.
- **Contrast:** every text color meets 6:1 or better against its background (AA needs 4.5:1). Body text is 14:1 or better. Bright UN blue (#009EDB) is only 3:1 on white, so it is used for shapes and lines, never text; text-sized blue uses a deeper UN blue (#005B9A, 7.1:1).
- **Color is never the only signal.** Planned days have a dashed UN-blue edge *and* a tinted background *and* a checked box *and* the words "In our plan". Access items say "Confirmed" or "To confirm" in text.
- **Reduced motion:** the one animation (the compass needle) is turned off when your system asks for reduced motion.
- **Windows High Contrast / forced colors:** pressed toggles and the route keep a visible outline.

### Keyboard and switch access
- Every action works by keyboard. The first Tab press reveals a **Skip to main content** link.
- Focus is always visible: a 3px navy ring (white on the blue header).
- Switching tools moves focus to the new page heading, so screen-reader and keyboard users know where they landed.
- Buttons and controls are at least 44px tall.
- Destructive actions (clearing a draft or the log) ask for a second press instead of a pop-up dialog.

### Screen readers
- Real headings, landmarks (`header`, `nav`, `main`, `aside`, `footer`), labeled form fields, and fieldsets with legends.
- Toggle buttons use `aria-pressed` and include the day's name ("Add to plan: World Water Day").
- A polite live region announces changes: "World Water Day added to the plan," "Copied," "Logged."
- **The year dial is visual only** and hidden from screen readers. The list right below it holds the same information and every action.

### Language
- All six UN languages: Arabic, Chinese, English, French, Russian, and Spanish. The page's `lang` and `dir` attributes update when you switch, so screen readers use the right voice and Arabic reads right to left. Each language option in the menu is marked with its own `lang`, so screen readers pronounce it correctly.
- Scripts that Atkinson Hyperlegible doesn't cover get fonts drawn for them (Noto Sans, Noto Sans SC, Noto Sans Arabic).
- Plain-language copy throughout. Identity-first disability language ("Disabled people") in our own writing. Official UN titles are quoted as the UN publishes them.

### Print
- The year plan and the event brief each have print styles: no navigation, black on white, checklists in two columns.

## Event access checklist

The checklist in *Plan an event* draws on:
- [CRPD Article 9](https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-rights-persons-disabilities) (accessibility) and Article 29 (participation in political and public life)
- The Americans with Disabilities Act's requirements for public accommodations
- Lived experience from Philadelphia's disability community events

It isn't a legal compliance tool. It's a planning list that makes gaps visible early.

## Recently fixed
- **November 2026:** on phone-width screens in English, Spanish, French, and Russian, the "Days to plan around" list was wider than the screen, so the page scrolled sideways and the right edge of each day was cut off (WCAG 1.4.10 Reflow). It now fits. A browser test checks every view in every language at 390px on every change.
- **November 2026:** copying text on a page opened from your own computer (not the website) failed and asked you to copy by hand. It now copies in most browsers.

## Known limitations
- Automated checks run on every change (`tests/smoke.py`: one heading per view, no sideways scrolling, right-to-left Arabic, skip link first) on top of an earlier custom script (labels, names, headings, IDs, target sizes, keyboard flow). It hasn't been tested yet with every screen reader and browser pair. **Testing with JAWS, NVDA, VoiceOver, and TalkBack is the most valuable contribution you can make.**
- All five translations are AI-assisted drafts awaiting native-speaker review, ideally including Disabled speakers of each language. See [docs/LANGUAGES.md](docs/LANGUAGES.md) for the disability terms chosen in each language and why.
- Data you enter is saved only in your browser. If you clear site data, it's gone, so download a backup.

## Report a barrier
Please [open an issue](https://github.com/meyeringn/chapter-compass/issues) with the label `accessibility`, or contact the author through [LinkedIn](https://www.linkedin.com/in/nicolasmeyering). Access bugs jump the queue.
