# Design

## The idea
Chapter Compass looks like an **aeronautical sectional chart**, the maps pilots use to plan a route: pale green ground, navy ink, chart-blue labels, tan terrain contours, and magenta routes. It came from the "Houston, We Have a Plan" workshop's flight-plan theme. A chapter year *is* a route: waypoints (UN days), restricted airspace (deadlines), and a needle telling you where you are now.

## Why it looks different from most vibe-coded sites
AI-built sites tend to converge on the same defaults: a purple-to-blue gradient, the Inter font, a centered hero with a pill badge, three rounded feature cards with soft gray shadows, and emoji or Lucide icons. Writers have catalogued these tells ([dev.to](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p), [codemyspec](https://codemyspec.com/blog/vibe-coded-websites-look-the-same), [SaaStr](https://www.saastr.com/gemini-3-solves-one-of-the-biggest-headaches-with-vibe-coding-now-your-site-doesnt-have-to-look-like-it-was-vibe-coded/)). Two other common generated looks are cream paper with a terracotta accent, and near-black with one acid accent.

| Generic default | Chapter Compass |
|---|---|
| Purple/blue gradients | Flat chart colors. No gradients anywhere. |
| Inter / system sans | Atkinson Hyperlegible Next (body) + Big Shoulders Display (headings) |
| Centered hero + stat cards | Left-aligned headline beside a working instrument: the year dial |
| Identical rounded cards with soft shadows | Square panels with 2px ink borders, like map insets. Rounded corners only on controls. |
| Accent color used everywhere | Magenta has one meaning: *in your plan* |
| Fade-in on every section | One motion: the needle swings to today, once |
| Emoji / icon-font icons | One hand-drawn SVG compass mark |

The first plan was cream paper with a vermilion accent. It was rejected for being exactly the terracotta-on-cream default.

## Tokens
| Name | Hex | Use | Contrast on chart |
|---|---|---|---|
| chart | `#E6EEE3` | Page background | — |
| paper | `#F7FAF4` | Panels, inputs | — |
| ink | `#14283A` | Text, borders, primary buttons | 12.7:1 |
| magenta | `#9E1468` | Your route: planned days, pressed toggles, focus ring | 6.4:1 |
| blue | `#1D5A84` | Chart labels, dates, links, tags | 6.2:1 |
| muted | `#435668` | Secondary text | 6.4:1 |
| tan | `#CDB98A` | Terrain contours (decoration only) | — |

**Type scale** (ratio 1.333, base 18px): 16 / 18 / 24 / 32 / 42 / fluid 48–90px.

**Fonts** load from [Bunny Fonts](https://fonts.bunny.net), a privacy-friendly mirror of Google Fonts (no cookies, no IP logging). To self-host instead, download the two families into `assets/fonts/` and replace the `<link>` with `@font-face` rules.

## Rules for new UI
- Left-align. Keep lines under about 70 characters.
- Use numbered markers only for real sequences (the four event steps).
- Sentence case for every label. No all-caps eyebrows.
- If it needs a new color, it probably needs a new word instead.
