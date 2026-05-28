# Lesson Loom — Submission Assets

## Live demo

- **URL:** _Pending — deploy via [README deploy steps](../../README.md#deploy-vercel) and paste production URL here._
- **Repo:** https://github.com/Bwillia13x/lesson-loom-plan-to-playable

## Quick judge path

1. Open live URL.
2. Click **Run judge demo** (top bar) — auto-weave, fraction success, approval, export.
3. Or manual: **Weave lesson** → Student tiles → **Check** → **Approve for Classroom Use** → Export **Copy**.

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
