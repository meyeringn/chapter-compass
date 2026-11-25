# Contributing to Chapter Compass

Thanks for helping chapters plan better years. You don't need to be a developer: most useful changes are edits to plain data files.

## Ways to help
- **Correct a chapter reminder.** UNA-USA deadlines change. If one is out of date, open an issue with a link to the current source.
- **Add an observance.** Use the [UN list of international days](https://www.un.org/en/observances/list-days-weeks).
- **Review a translation.** All five non-English languages are AI-assisted drafts. A native speaker's review of one file in `lang/` is the most valuable contribution there is. See [docs/LANGUAGES.md](docs/LANGUAGES.md).
- **Test with assistive technology** and report what breaks.
- **Add a local issue** that chapters keep asking about.

## Ground rules
1. **All six languages, every time.** Every new string needs English, Spanish, and an entry in each `lang/*.js` file. If you can't write a language, copy the English in and open an issue asking for a translation; the check flags missing keys so nothing is forgotten.
2. **Identity-first language** in our own copy ("Disabled people," "personas Discapacitadas"). Quote official UN titles exactly.
3. **Cite sources.** Treaty articles, SDG targets, and chapter deadlines all need a link someone can check.
4. **Stay nonpartisan.** UNA-USA chapters don't endorse candidates or parties, and neither does this tool.
5. **No tracking, no accounts, no APIs.** Data stays in the user's browser.
6. **Access is part of done.** Keyboard, focus, labels, contrast, large print, and a narrow screen.

## How to make a change
```bash
# 1. Fork and clone
git clone https://github.com/<you>/chapter-compass.git
cd chapter-compass

# 2. Edit files in data/ or assets/

# 3. Check your work (Node 18+, no installs needed)
node tests/validate.mjs

# 4. Open index.html in a browser and try your change in English and Arabic
#    (or run: npm run test:browser)

# 5. Commit and open a pull request describing what changed and your source
```

## Working with Claude Code
This repo includes a `CLAUDE.md` with the project's rules and a skill at `.claude/skills/add-observance/`. A good starting prompt:

> Read CLAUDE.md. Add World Habitat Day's 2027 theme as the idea text for `habitat-day` in both languages. Run `node tests/validate.mjs` and show me the output.

See [docs/PROMPTS.md](docs/PROMPTS.md) for how the project was built.

## Code of conduct
Be kind, assume good faith, and remember that the people most affected by a barrier are the experts on it.
