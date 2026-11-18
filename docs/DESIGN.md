# Design

## The idea
Chapter Compass is an **aeronautical chart drawn in UN white and blue**. The layout borrows from the sectional charts pilots use to plan a route, which came from the "Houston, We Have a Plan" workshop's flight-plan theme: a chapter year *is* a route, with waypoints (UN days), restricted airspace (deadlines), and a needle showing where you are now. The colors come from the UN's own white and blue, so the tool feels at home in UNA-USA's world while the chart layout keeps it distinct.

Using the UN's colors is not using its emblem. There is still no UN or UNA-USA logo, no laurel wreath, no SDG color wheel, and the "not an official product" disclaimer stays on every page.

## Why it looks different from most vibe-coded sites
AI-built sites tend to converge on the same defaults: a purple-to-blue gradient, the Inter font, a centered hero with a pill badge, three rounded feature cards with soft gray shadows, and emoji or Lucide icons. Writers have catalogued these tells ([dev.to](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p), [codemyspec](https://codemyspec.com/blog/vibe-coded-websites-look-the-same), [SaaStr](https://www.saastr.com/gemini-3-solves-one-of-the-biggest-headaches-with-vibe-coding-now-your-site-doesnt-have-to-look-like-it-was-vibe-coded/)).

| Generic default | Chapter Compass |
|---|---|
| Purple/blue gradients | Flat UN white and blue. No gradients anywhere. |
| Inter / system sans | Atkinson Hyperlegible Next (body) + Big Shoulders Display (headings) |
| Centered hero + stat cards | Left-aligned headline beside a working instrument: the year dial |
| Identical rounded cards with soft shadows | Square panels with 2px navy borders, like map insets. Rounded corners only on controls. |
| Accent color used everywhere | UN blue marks one thing: *in your plan* (route, planned markers, pressed toggles) |
| Fade-in on every section | One motion: the needle swings to today, once |
| Emoji / icon-font icons | One hand-drawn SVG compass mark |

**History:** v1 used an aeronautical-chart green with a magenta route. In November 2026 it moved to UN white and blue at the author's request, keeping the chart layout.

## Tokens
| Name | Hex | Use | Contrast on white |
|---|---|---|---|
| page | `#FFFFFF` | Page background | — |
| panel | `#EEF6FC` | Pale UN-blue tint for panels | — |
| ink | `#0B2545` | Navy text, borders, primary buttons | 15.4:1 |
| unblue | `#009EDB` | UN blue: dial ring, route, planned markers, rules. **Never text.** | 3.0:1 |
| blue | `#005B9A` | Deep UN blue: header, links, dates, pressed toggles | 7.1:1 |
| muted | `#3E5770` | Secondary text | 7.5:1 |
| sky | `#BFE3F7` | Contours (decoration only) | — |
| danger | `#B3261E` | To-dos, errors, destructive buttons only | 6.5:1 |

**Type scale** (ratio 1.333, base 18px): 16 / 18 / 24 / 32 / 42 / fluid 48–90px.

**Fonts** load from [Bunny Fonts](https://fonts.bunny.net), a privacy-friendly mirror of Google Fonts (no cookies, no IP logging). To self-host instead, download the two families into `assets/fonts/` and replace the `<link>` with `@font-face` rules.

## Rules for new UI
- Left-align. Keep lines under about 70 characters.
- Use numbered markers only for real sequences (the four event steps).
- Sentence case for every label. No all-caps eyebrows.
- If it needs a new color, it probably needs a new word instead.
- Bright UN blue never carries text. If text needs to be blue, use `--blue`.
