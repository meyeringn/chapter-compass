# Accessibility Statement

Chapter Compass is built by a Disabled developer for chapters that include Disabled members, leaders, and guests. Access is a requirement here, not a feature.

**Target:** WCAG 2.2 Level AA. Many parts meet AAA.
**Last reviewed:** November 2026

## What's built in

### Seeing and reading
- **Typeface:** Atkinson Hyperlegible Next, designed by the Braille Institute to improve character recognition for low-vision readers. Headings use Big Shoulders Display. Readable system fonts take over if web fonts don't load.
- **Text size:** 18px base, and a **Large print** button in the header raises everything 25% and opens up line spacing. The setting is remembered.
- **Contrast:** every text color meets 6.2:1 or better against its background (AA needs 4.5:1). Body text is 12.7:1 or better.
- **Color is never the only signal.** Planned days have a magenta dashed edge *and* a checked box *and* the words "In our plan". Access items say "Confirmed" or "To confirm" in text.
- **Reduced motion:** the one animation (the compass needle) is turned off when your system asks for reduced motion.
- **Windows High Contrast / forced colors:** pressed toggles and the route keep a visible outline.

### Keyboard and switch access
- Every action works by keyboard. The first Tab press reveals a **Skip to main content** link.
- Focus is always visible: a 3px magenta ring.
- Switching tools moves focus to the new page heading, so screen-reader and keyboard users know where they landed.
- Buttons and controls are at least 44px tall.
- Destructive actions (clearing a draft or the log) ask for a second press instead of a pop-up dialog.

### Screen readers
- Real headings, landmarks (`header`, `nav`, `main`, `aside`, `footer`), labeled form fields, and fieldsets with legends.
- Toggle buttons use `aria-pressed` and include the day's name ("Add to plan: World Water Day").
- A polite live region announces changes: "World Water Day added to the plan," "Copied," "Logged."
- **The year dial is visual only** and hidden from screen readers. The list right below it holds the same information and every action.

### Language
- Full English and Spanish interface. The page's `lang` attribute updates when you switch, so screen readers use the right voice.
- Plain-language copy throughout. Identity-first disability language ("Disabled people") in our own writing. Official UN titles are quoted as the UN publishes them.

### Print
- The year plan and the event brief each have print styles: no navigation, black on white, checklists in two columns.

## Event access checklist

The checklist in *Plan an event* draws on:
- [CRPD Article 9](https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-rights-persons-disabilities) (accessibility) and Article 29 (participation in political and public life)
- The Americans with Disabilities Act's requirements for public accommodations
- Lived experience from Philadelphia's disability community events

It isn't a legal compliance tool. It's a planning list that makes gaps visible early.

## Known limitations
- Automated checks were run with a custom script (labels, names, headings, IDs, target sizes, keyboard flow). It hasn't been tested yet with every screen reader and browser pair. **Testing with JAWS, NVDA, VoiceOver, and TalkBack is the most valuable contribution you can make.**
- Spanish copy should be reviewed by native speakers, including Disabled Spanish speakers, for tone and disability terms.
- Data you enter is saved only in your browser. If you clear site data, it's gone, so download a backup.

## Report a barrier
Please [open an issue](https://github.com/meyeringn/chapter-compass/issues) with the label `accessibility`, or contact the author through [LinkedIn](https://www.linkedin.com/in/nicolasmeyering). Access bugs jump the queue.
