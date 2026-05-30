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

1. **Production deploy URL** — After [GitHub Pages](../../README.md#deploy-github-pages) workflow succeeds (or Vercel), confirm the live URL below and smoke-test **Run judge demo** on that host.
2. **Walkthrough video (60–90s)** — Record following [WALKTHROUGH.md](./WALKTHROUGH.md). Suggested arc: hero → weave → teaching signals → Fraction Garden → teacher console → review/export → Made with Stitch.
3. **Safari / Mobile Safari** — Playwright covers Chromium only; spot-check on Safari if available before posting.
4. **Final challenge rules** — Re-read official Stitch / Contra requirements manually before submit.

Do not paste a fake deploy URL in this repo.

### One-time: enable GitHub Pages (required for deploy workflow)

The [Deploy GitHub Pages](../../.github/workflows/deploy-pages.yml) workflow runs on every push to `main` and via **workflow_dispatch**. Until Pages is enabled in repo Settings, the **build** job usually succeeds while the public site stays **404** (observed on baseline `4a9ba91`).

**Enable (founder, one time):**

1. Open the repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Save. No branch-based `gh-pages` branch is required for this workflow.

**Deploy:**

1. **Actions** → **Deploy GitHub Pages** → open the latest run → **Re-run all jobs**,  
   **or** push an empty commit / any commit to `main` to trigger `on: push`.
2. Wait for both jobs: **build** (Vite with `VITE_BASE_PATH: /<repo-name>/`) then **deploy** (`deploy-pages@v4`).
3. When green, GitHub shows the environment URL on the deploy job (also under **Settings → Pages**).

**Expected URL pattern:**

- `https://<github-user>.github.io/<repository-name>/`
- This repo: https://bwillia13x.github.io/lesson-loom-plan-to-playable/

**Live smoke (human, before Contra):**

1. Open the Pages URL — confirm HTML loads (not “There isn’t a GitHub Pages site here”).
2. Click **Run judge demo** in the top bar; confirm auto-weave through export.
3. Open shareable student deep link: `?w=1#student` on the same host.
4. Optional manual path: **Weave lesson** (hero `weave-lesson-hero`) → student tiles → **Check** → **Approve for Classroom Use** → export **Copy**.

If deploy logs show permission errors, confirm **Settings → Actions → General** allows workflows and that the `github-pages` environment exists after first Pages enable.

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

Commit screenshots only if repo policy allows binaries; otherwise gitignore and attach to Contra upload.

## Walkthrough video

Record 60–90s following [WALKTHROUGH.md](./WALKTHROUGH.md). Suggested flow: hero → weave → teaching signals → fraction garden → teacher console → review/export → Made with Stitch.

## Copy for Contra

See [CONTRA_COPY.md](./CONTRA_COPY.md).
