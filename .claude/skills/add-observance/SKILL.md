---
name: add-observance
description: Add or update a UN international day or UNA-USA chapter reminder in Chapter Compass, in English and Spanish, and verify it.
---
# Add an observance

Arguments: $ARGUMENTS (the day's name, or a link to its UN page)

1. Confirm the date and official English and Spanish titles on https://www.un.org/en/observances/list-days-weeks (Spanish: https://www.un.org/es/observances/list-days-weeks). For a chapter reminder, find a UNA-USA source URL.
2. Add an entry to `data/observances.js`, keeping the array in date order:
   - `id`: short kebab-case, unique
   - `type`: `"un"` or `"admin"` (admin needs `source`)
   - fixed date `{ month, day }`, or moving date `{ month, rule: { weekday, nth } }` (0 = Sunday)
   - `sdgs`: 1 to 3 goal numbers
   - `name` and `idea` in both `en` and `es`. The idea is one practical, specific sentence. Identity-first disability language. No em dashes.
3. If it fits an issue in `data/issues.js`, add its id to that issue's `days`.
4. Run `node tests/validate.mjs` and show the output. It must PASS.
5. Open the year view and confirm the marker appears in the right month on the dial.
