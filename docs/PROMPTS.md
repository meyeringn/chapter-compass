# How Chapter Compass was vibe coded

Chapter Compass was built with Claude (Opus 5.5) in one working session in November 2026, following Anthropic's published [best practices for Claude Code](https://code.claude.com/docs/en/best-practices). This file records the process so others can reuse it.

## The workflow
1. **Interview first.** Before writing anything, Claude asked four questions with real tradeoffs: which app, which audience, how to handle UNA-USA branding, and which languages. (Answers: a chapter-leader toolkit; national, with a Philadelphia pilot; independent with a disclaimer; English and Spanish.)
2. **Explore, then plan, then code.** Research came first: Claude Code best practices, UNA-USA's chapter requirements, the current US–UN context, the author's existing repos (to match their structure), existing UN/SDG tools (to find the gap), and the visual tells of vibe-coded sites (to avoid them).
3. **Design plan before CSS.** A palette, type, and layout plan was written and then reviewed against "what would a generic AI site do here?" The first palette (cream and vermilion) failed that test and was replaced.
4. **Give Claude a check it can run.** `tests/validate.mjs` checks every date, both languages, and translation parity. A browser script checked accessible names, headings, keyboard flow, and the calendar export. Screenshots at desktop and phone widths, in both languages, were reviewed after each major view.
5. **Keep CLAUDE.md short.** It holds only what Claude can't infer from the code: the `file://` constraint, the bilingual rule, identity-first language, the design guardrails.

## The optimized prompt
This is the prompt the session ran, after the interview:

> **ROLE:** Senior civic technologist and accessibility-first front-end designer working with Nico Meyering: Disabled civic tech builder in Philadelphia, Chairman of the Mayor's Commission on People with Disabilities, UNA-Greater Philadelphia board member, and 2026 UNA-USA Leadership Summit speaker ("Houston, We Have a Plan").
>
> **GOAL:** Build a complete open-source GitHub repo for **Chapter Compass**, a vibe-coded toolkit that helps UNA-USA chapter leaders plan events, run programming, and grow membership. It should work for any chapter, with UNA-GP as the built-in Philadelphia pilot.
>
> **RESEARCH FIRST (cite sources):** (1) Anthropic's current Claude Code best practices, baked into the repo so future sessions can extend it. (2) The UN, the current US–UN relationship, and UNA-USA's mission, chapters, and programs. (3) Nico's GitHub: repo structure, README pattern, licensing, Pages deployment, analytics. (4) Existing tools supporting the UN and UNA-USA missions, so this fills a gap. (5) What vibe-coded sites usually look like, so this one is deliberately distinct but cohesive.
>
> **BUILD:** No framework; static HTML/CSS/JS on GitHub Pages, mirroring Nico's repos. WCAG 2.2 AA+ (keyboard, screen-reader labels, reduced motion, high contrast, large print, printable outputs). Identity-first disability language. EN/ES toggle. Independent tool with a clear "not an official UNA-USA product" disclaimer and no UN/UNA-USA emblems. Editable data files so any chapter can fork it. README, LICENSE, CLAUDE.md, CONTRIBUTING, ACCESSIBILITY, docs/. A distinct visual identity: warm, credible, community-oriented, a little witty.
>
> **VERIFY:** Render and screenshot every view, test both languages, run accessibility and contrast checks, and confirm every fact against a source.
>
> **DELIVER:** The repo, ready to upload to GitHub.

## Prompts for extending it
- *"Read CLAUDE.md and docs/DESIGN.md. Add a 'Membership drive' view that tracks the Plus One campaign. Keep it bilingual, run the validator, and screenshot it at 1280px and 390px."*
- *"Use a subagent to review index.html and app.js for keyboard traps and missing labels. Report only real barriers."*
- *"Translate the interface into French. Add `fr` to i18n.js and data files, extend the validator to check it, and add a third option to the language button."*
