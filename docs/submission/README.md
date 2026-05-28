# Lesson Loom — Submission Assets

## Manual steps remaining

These items are **not** automated in CI and must be completed before Contra submission:

1. **Production deploy URL** — Deploy via [README deploy steps](../../README.md#deploy-vercel) (or your host). Replace the placeholder under [Live demo](#live-demo) with the real HTTPS URL and smoke-test **Run judge demo** on that URL.
2. **Walkthrough video (60–90s)** — Record following [WALKTHROUGH.md](./WALKTHROUGH.md). Suggested arc: hero → weave → teaching signals → Fraction Garden → teacher console → review/export → Made with Stitch.
3. **Safari / Mobile Safari** — Playwright covers Chromium only; spot-check on Safari if available before posting.
4. **Final challenge rules** — Re-read official Stitch / Contra requirements manually before submit.

Do not paste a fake deploy URL in this repo.

## Live demo

- **URL:** _Pending — deploy via [README deploy steps](../../README.md#deploy-vercel) and paste production URL here._
- **Repo:** https://github.com/Bwillia13x/lesson-loom-plan-to-playable

## Quick judge path

1. Open live URL.
2. Click **Run judge demo** (top bar) — auto-weave, fraction success, approval, export.
3. Or manual: **Weave lesson** (hero) → Student tiles → **Check** → **Approve for Classroom Use** → Export **Copy**.

## Capture screenshots

```bash
npm run build
npx playwright install chromium --with-deps
npm run capture:screenshots
```

Output: `submission-screenshots/01-hero.png` … `06-mobile-student.png`.

Screenshots are gitignored by default; generate locally before submitting or attach from CI artifacts.

## Walkthrough video

Record 60–90s following [WALKTHROUGH.md](./WALKTHROUGH.md). Suggested flow: hero → weave → teaching signals → fraction garden → teacher console → review/export → Made with Stitch.

## Copy for Contra

See [CONTRA_COPY.md](./CONTRA_COPY.md).
