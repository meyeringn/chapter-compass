# 🧭 Chapter Compass — A Year-Round Planning Toolkit for UNA-USA Chapters

**Plot your chapter's year.** A free, open-source, bilingual (English/Spanish) planning toolkit for United Nations Association of the USA chapter leaders. Built Disabled-led and accessibility-first.

*Data last verified: November 2026*

🔗 **Live site:** [meyeringn.github.io/chapter-compass](https://meyeringn.github.io/chapter-compass/)

> **Independent community tool.** Chapter Compass is not an official product of UNA-USA, the UN Foundation, or the United Nations, and it doesn't speak for them. It uses no UN or UNA-USA logos or emblems.

---

## What Is Chapter Compass?

Chapter Compass helps the volunteers who run UNA-USA's chapters do four things that usually live in four different spreadsheets:

1. **Plan the year** around UN international days and chapter deadlines.
2. **Plan accessible events** and turn them into a printable brief, an access statement, and posts to share.
3. **Connect a local issue** (transit, housing, heat, voting access, and more) to the UN's goals, so members see the UN on their own street.
4. **Track impact** so January's annual report starts with a first draft instead of a blank page.

It runs entirely in the browser. No accounts, no server, no API keys, and nothing you type is sent anywhere.

## The Problem

UNA-USA counts more than 200 chapters, and most are run by volunteers between jobs, classes, and family life. Chapter leaders juggle UN Day, membership drives, IRS paperwork, and the annual report, while also trying to answer the question every chapter faces: *what does the UN have to do with my city?*

The open-source tools that already exist are excellent, but they serve other jobs. [SDG Tracker](https://sdg-tracker.org/) charts global progress. [Open SDG](https://open-sdg.org/) publishes official SDG data. Model UN timers run conferences. None of them help a chapter plan its year, run an accessible event, or report on what it did. Chapter Compass fills that gap.

Accessibility is usually an afterthought in event planning. Here it's step 2 of 4, and anything left unchecked shows up on the event brief as a to-do.

## Features

### Plan the year
- A **year dial** showing every UN international day and chapter reminder, with a compass needle pointing at today.
- Add days to your plan and the dial draws your route in magenta.
- Filter by UN days, chapter reminders, or any of the 17 Sustainable Development Goals.
- Download the plan as a **calendar file (.ics)** for Google Calendar, Outlook, or Apple Calendar, or print it.

### Plan an event
- Four steps: basics, access, run of show, share.
- A 17-item **access checklist** written by and for Disabled organizers (step-free entry, ASL, CART captions, microphones, quiet space, labeled food, and more).
- Builds a **printable one-page brief**, an **access statement**, a **social post**, and an **email invitation**, all ready to copy.
- Download the event as a calendar file, or send it straight to the impact log.

### Connect a local issue
- Eleven issues, each with SDG targets in plain language, one concrete UN connection (a treaty article, a target, a resolution), discussion questions, partner types to invite, and related days to build an event around.
- Local partner suggestions come from `data/chapter.js`, so every chapter sees its own city.

### Track impact
- Log events, attendance, new members, partners, and goals.
- Running totals for the year, a CSV download, and a backup/restore file.
- An **annual report first draft**, generated from your log.

### Everywhere
- English and Spanish, switchable at any time.
- Large print mode, high-contrast palette (AA or better everywhere, most text AAA), full keyboard support, and reduced motion respected.

## Two Standout Features

### 1. The Year Dial
Most planning tools show a list or a grid. Chapter Compass draws the chapter's year as an aeronautical chart: months around a compass ring, UN days as waypoints, chapter deadlines as diamonds, and your chosen days joined into a magenta flight route. The needle swings to today when the page loads. It's the same information as the list below it (the list is the accessible version), but it answers a question a list can't: *is our year lopsided?*

### 2. Access-First Event Briefs
The event planner treats access as part of the plan, not a footnote. Every checked item becomes a sentence in a public access statement. Every unchecked item appears on the printed brief as **To confirm**, so the gap is visible to the whole planning team before the event, not to a Disabled attendee at the door.

## Data Sources

| Data | Source | Notes |
|---|---|---|
| UN international days | [UN list of international days and weeks](https://www.un.org/en/observances/list-days-weeks) | Official titles kept verbatim |
| Sustainable Development Goals | [sdgs.un.org/goals](https://sdgs.un.org/goals) | Official English and Spanish short titles |
| SDG targets | [sdgs.un.org/goals](https://sdgs.un.org/goals) | Paraphrased in plain language, with target numbers |
| Chapter reminders | UNA-USA's public [Fall Semester Checklist](https://unausa.org/fall-kick-off-checklist), Chapter Leader Updates, and UN Day toolkit | **Confirm every date** with UNA-USA's current Chapter Leader Guide |
| Treaty references | UN Charter, UDHR, CRPD, CEDAW, 1951 Refugee Convention, GA resolution 64/292 | Linked in `data/issues.js` |

See [`data/methodology.md`](data/methodology.md) for how the data was chosen and how to keep it current.

## Getting Started

### Use Immediately (No Install)
Download the repo and open `index.html` in any modern browser. No server, no API keys, no build step required.

### GitHub Pages (Recommended for Sharing)
1. Fork this repo.
2. Go to **Settings → Pages**, set the source to the `main` branch and `/ (root)`.
3. Your site appears at `https://<your-username>.github.io/chapter-compass/`.

### Make It Your Chapter's
Edit one file, [`data/chapter.js`](data/chapter.js): your chapter's name, city, join link, hashtag, and local partners. See [`docs/FORKING.md`](docs/FORKING.md).

### Check Your Changes
```bash
node tests/validate.mjs
```
Checks every date, both languages, every SDG number, and translation parity. It runs automatically on every push through GitHub Actions.

## Repository Structure

```
chapter-compass/
├── index.html              # The whole app: five views, no framework
├── assets/
│   ├── css/compass.css     # Design system (aeronautical-chart palette)
│   ├── js/app.js           # App logic: dial, planner, issues, log, routing
│   ├── js/i18n.js          # Every interface string, English and Spanish
│   └── favicon.svg
├── data/
│   ├── observances.js      # UN days and chapter reminders
│   ├── sdgs.js             # The 17 goals
│   ├── issues.js           # Local issues mapped to the UN
│   ├── access.js           # Event access checklist
│   ├── chapter.js          # ← edit this to make it your chapter's
│   └── methodology.md
├── docs/
│   ├── DESIGN.md           # Design tokens and the reasoning behind them
│   ├── FORKING.md          # Customizing for your chapter
│   └── PROMPTS.md          # How this was vibe coded with Claude
├── tests/validate.mjs      # Data + translation check (node, no dependencies)
├── .claude/skills/         # Reusable Claude Code workflows for this repo
├── .github/workflows/      # Runs the check on every push
├── CLAUDE.md               # Project context for Claude Code sessions
├── ACCESSIBILITY.md
├── CONTRIBUTING.md
├── LICENSE
└── og-image.png
```

Data lives in `.js` files instead of `.json` so the app works when opened straight from your computer (browsers block `fetch()` on `file://` pages).

## Connection to Civic Tech Portfolio

Chapter Compass is part of a portfolio of open-source civic tools for Philadelphia and beyond, built by [Nico Meyering](https://github.com/meyeringn):

- [CanopyWatch](https://meyeringn.github.io/canopy-watch/): tree canopy, heat, and disability equity mapper
- [FloodRisk Philly](https://meyeringn.github.io/floodrisk-philly/): flood risk for renters, with a Spanish toggle
- [BallotGap PHL](https://meyeringn.github.io/ballotgap-phl/): polling place accessibility checker
- [Transit Carbon Calculator](https://meyeringn.github.io/transit-carbon-calculator/): commute carbon savings for 11 PA agencies
- [Gateway Atlas](https://meyeringn.github.io/gateway-atlas/): built for the World Affairs Council of Philadelphia

Chapter Compass grows directly out of the "Houston, We Have a Plan" workshop (Chapter Leader Track, 2026 UNA-USA Leadership Summit), where the Flight Plan worksheets and resource guides became the seed for this tool.

## Who This Is For

- **Community and campus chapter leaders** planning a year of programs
- **Event chairs** who want access handled before the day, not during it
- **Board secretaries** facing the annual report
- **Members** who want to connect their local work to the UN's goals
- **Other civic groups**: fork it and swap the data for your own calendar

## Accessibility

Chapter Compass targets **WCAG 2.2 AA** and is built by a Disabled developer who uses it. Highlights: 18px base text in Atkinson Hyperlegible Next (designed by the Braille Institute for low-vision readers), a large-print mode, contrast of 6.2:1 or higher for all text, visible focus everywhere, every action reachable by keyboard, screen-reader status announcements, reduced-motion support, and print styles for every output. Full details and known limitations: [ACCESSIBILITY.md](ACCESSIBILITY.md).

Found a barrier? Please [open an issue](https://github.com/meyeringn/chapter-compass/issues). Access bugs are treated as the highest priority.

## Contributing

Contributions are welcome, especially translations, new observances, chapter reminder corrections, and access testing with assistive technology. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE). Use it, fork it, adapt it for your chapter.

## Author

**Nico Meyering** · Philadelphia, PA
Civic tech builder · Chairman, Philadelphia Mayor's Commission on People with Disabilities · UNA-Greater Philadelphia board member

[LinkedIn](https://www.linkedin.com/in/nicolasmeyering) · [GitHub](https://github.com/meyeringn)

*Built with AI assistance (Claude). Every fact, date, and line of copy was reviewed against its source. See [docs/PROMPTS.md](docs/PROMPTS.md).*
