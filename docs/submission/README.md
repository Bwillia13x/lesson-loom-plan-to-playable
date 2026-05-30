# Lesson Loom — Submission Assets

**Verify on `main` @ `4a9ba91` (post–plan 004/005; agent lane plan 006):**

See also [`SUBMISSION_READINESS.md`](./SUBMISSION_READINESS.md) for agent-complete vs human-required gates.

```bash
npm install
npx playwright install chromium
npm run verify
```

CI runs the same gate on push to `main` (`.github/workflows/ci.yml`).

## Manual steps remaining

These items are **not** automated in CI and must be completed before Contra submission:

1. **Production deploy URL** — After [Vercel](#one-time-import-on-vercel-required-for-deploys) imports the repo, confirm the live URL below and smoke-test **Run judge demo** on that host.
2. **Walkthrough video (60–90s)** — Record following [WALKTHROUGH.md](./WALKTHROUGH.md). Suggested arc: hero → weave → teaching signals → Fraction Garden → teacher console → review/export → Made with Stitch.
3. **Safari / Mobile Safari** — Playwright covers Chromium only; spot-check on Safari if available before posting.
4. **Final challenge rules** — Re-read official Stitch / Contra requirements manually before submit.

Do not paste a fake deploy URL in this repo.

### One-time: import on Vercel (required for deploys)

Lesson Loom deploys via the **Vercel GitHub integration** — every push to `main` auto-builds and publishes. No deploy workflow file is checked in; `vercel.json` (root) configures framework, output, SPA rewrites, and security headers.

**Import (founder, one time):**

1. Open [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → select `Bwillia13x/lesson-loom-plan-to-playable`.
2. Confirm auto-detected settings (from `vercel.json`):
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm ci` (default)
3. Leave **Environment Variables** empty — no secrets are required for the static prototype.
4. Click **Deploy**. Vercel returns the production URL on success.

**Subsequent deploys:**

- Push to `main` → Vercel builds and promotes to production automatically.
- Pull requests get unique preview URLs (no manual step).
- Manual rebuild: `vercel --prod` from a local checkout, or **Redeploy** in the Vercel dashboard.

**Expected URL pattern:**

- `https://lesson-loom.vercel.app` (default; based on `package.json` name).
- May resolve as `https://lesson-loom-<team-slug>.vercel.app` depending on team prefix.
- Update [`docs/submission/CONTRA_COPY.md`](./CONTRA_COPY.md) and the Live demo section below with the actual assigned URL after first deploy.

**Live smoke (human, before Contra):**

1. Open the Vercel URL — confirm HTML loads.
2. Click **Run judge demo** in the top bar; confirm auto-weave through export.
3. Open shareable student deep link: `?w=1#student` on the same host.
4. Optional manual path: **Weave lesson** (hero `weave-lesson-hero`) → student tiles → **Check** → **Approve for Classroom Use** → export **Copy**.

If the build fails on Vercel, run `npm run build` locally — `vercel.json` mirrors the local script, so a green local build typically means a green Vercel build.

## Live demo

- **URL (Vercel):** https://lesson-loom.vercel.app _(update with actual alias after first deploy)_
- **Shareable demo:** `<live-url>/?w=1#student`
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

Output: `submission-screenshots/01-hero.png` … `06-mobile-student.png` (see artifact table for exact filenames).

Screenshots are gitignored by default; generate locally before submitting or attach from CI artifacts.

## Screenshot artifacts

After `npm run capture:screenshots`, expect:

| File | Section |
|------|---------|
| `submission-screenshots/01-hero.png` | Hero |
| `submission-screenshots/02-teaching-signals.png` | Teaching signals (post-weave) |
| `submission-screenshots/03-fraction-garden.png` | Fraction Garden |
| `submission-screenshots/04-teacher-console.png` | Teacher Console |
| `submission-screenshots/05-review-export.png` | Review & export |
| `submission-screenshots/06-mobile-student.png` | Student @ 390px |

**Last captured:** 2026-05-30 on `main` @ `4a9ba91` (`npm run capture:screenshots` exit 0; PNGs local only, gitignored).

**After plan 007 design polish:** Re-run `npm run capture:screenshots` from `feat/frontend-design-polish-007` to refresh the six artifacts above. Polish wave changes the hero/eyebrow contrast, fraction-garden gold success state, StatusPip tones, and `.app-nav` chrome — visual baselines drift accordingly. PNGs stay gitignored.


Commit screenshots only if repo policy allows binaries; otherwise gitignore and attach to Contra upload.

## Walkthrough video

Record 60–90s following [WALKTHROUGH.md](./WALKTHROUGH.md). Suggested flow: hero → weave → teaching signals → fraction garden → teacher console → review/export → Made with Stitch.

## Copy for Contra

See [CONTRA_COPY.md](./CONTRA_COPY.md).
