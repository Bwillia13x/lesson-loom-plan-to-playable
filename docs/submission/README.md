# Lesson Loom — Submission Assets

## Manual steps remaining

These items are **not** automated in CI and must be completed before Contra submission:

1. **Production deploy URL** — After [GitHub Pages](../../README.md#deploy-github-pages) workflow succeeds (or Vercel), confirm the live URL below and smoke-test **Run judge demo** on that host.
2. **Walkthrough video (60–90s)** — Record following [WALKTHROUGH.md](./WALKTHROUGH.md). Suggested arc: hero → weave → teaching signals → Fraction Garden → teacher console → review/export → Made with Stitch.
3. **Safari / Mobile Safari** — Playwright covers Chromium only; spot-check on Safari if available before posting.
4. **Final challenge rules** — Re-read official Stitch / Contra requirements manually before submit.

Do not paste a fake deploy URL in this repo.

### One-time: enable GitHub Pages (required for deploy workflow)

1. Repo **Settings → Pages → Build and deployment → Source:** **GitHub Actions**.
2. Re-run the latest **Deploy GitHub Pages** workflow (Actions tab → workflow → Re-run all jobs), or push to `main`.
3. Confirm the site loads at the URL below before Contra submit.

## Live demo

- **URL (GitHub Pages):** https://bwillia13x.github.io/lesson-loom-plan-to-playable/ _(after Pages is enabled + deploy succeeds)_
- **Shareable demo:** https://bwillia13x.github.io/lesson-loom-plan-to-playable/?w=1#student
- **Alt:** Vercel — see [README deploy](../../README.md#deploy-vercel). Re-verify URL after first Pages deploy (Settings → Pages → GitHub Actions).
- **Repo:** https://github.com/Bwillia13x/lesson-loom-plan-to-playable

## Quick judge path

1. Open live URL.
2. Click **Run judge demo** (top bar) — auto-weave, teaching signals, fraction success, Extend lane, teacher console, approval, export (presenter captions).
3. Or manual: **Weave lesson** (hero) → Student tiles → **Check** → **Approve for Classroom Use** → Export **Copy**.

## Capture screenshots

```bash
npm run build
npx playwright install chromium --with-deps
npm run capture:screenshots
```

Output: `submission-screenshots/01-hero.png` … `06-mobile-student.png`.

Screenshots are gitignored by default; generate locally before submitting or attach from CI artifacts.

## Screenshot artifacts

After `npm run capture:screenshots`, expect:

| File | Section |
|------|---------|
| `submission-screenshots/01-hero.png` | Hero |
| `submission-screenshots/02-weave.png` | Lesson Weave |
| `submission-screenshots/03-student.png` | Fraction Garden |
| `submission-screenshots/04-teacher.png` | Teacher Console |
| `submission-screenshots/05-export.png` | Export Pack |
| `submission-screenshots/06-mobile-student.png` | Student @ 390px |

Commit screenshots only if repo policy allows binaries; otherwise gitignore and attach to Contra upload.

## Walkthrough video

Record 60–90s following [WALKTHROUGH.md](./WALKTHROUGH.md). Suggested flow: hero → weave → teaching signals → fraction garden → teacher console → review/export → Made with Stitch.

## Copy for Contra

See [CONTRA_COPY.md](./CONTRA_COPY.md).
