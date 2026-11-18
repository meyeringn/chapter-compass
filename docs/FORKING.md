# Make Chapter Compass your chapter's

About 15 minutes, no coding.

## 1. Fork and publish
1. Sign in to GitHub and click **Fork** on [meyeringn/chapter-compass](https://github.com/meyeringn/chapter-compass).
2. In your fork: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**.
3. In a minute or two your site is live at `https://<your-username>.github.io/chapter-compass/`.

## 2. Edit `data/chapter.js`
Click the file, then the pencil icon. Change:

| Field | Example |
|---|---|
| `name` | `"UNA-USA Southern New Jersey"` |
| `shortName` | `"UNA-SNJ"` (used in social posts) |
| `city` | `"Camden"` |
| `joinUrl` | Your chapter's join or donate page |
| `hashtag` | `"#UNASNJ"` |
| `accessContact` | A default email or phone for access requests |
| `localPartners` | Organizations near you, by issue id (`transit`, `housing`, `heat`, `voting`, `disability`, `refugees`, `food`, `water`, `gender`, `youth`, `peace`) |

Partner names are suggestions shown to your members, not endorsements. Ask before listing an organization.

Click **Commit changes**. Your site updates in about a minute.

## 3. Update the footer and analytics
- In `index.html`, the footer credits the original author. Keep that line (the MIT license asks you to keep the copyright notice), and add your chapter if you like.
- The last `<script>` line in `index.html` sends cookie-free visit counts to the original author's GoatCounter. **Delete it, or replace `meyeringn` with your own free [GoatCounter](https://www.goatcounter.com) code.**
- The **See the code on GitHub** link in Resources can point to your fork.

## 4. Add your own chapter dates
In `data/observances.js`, copy a `type: "admin"` entry and change the `id`, date, `name`, and `idea`. Include a `source` link. Run `node tests/validate.mjs` if you have Node installed, or open the page and check that your date shows on the dial.

## Keeping data current
Each fall, check the chapter reminders against UNA-USA's latest Chapter Leader Guide and the UN's list of international days, then update "Data last verified" in the README and footer.
