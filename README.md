# Lesson Loom — Plan to Playable

High-fidelity interactive prototype for the Google Stitch Challenge. Turn a teacher-approved lesson plan into an interactive classroom app.

**Repository:** [github.com/Bwillia13x/lesson-loom-plan-to-playable](https://github.com/Bwillia13x/lesson-loom-plan-to-playable)

## Demo lesson

**Fraction Garden** — Grade 5 equivalent fractions

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Verify

```bash
npm run verify
```

Runs build, lint, and the full Playwright e2e suite (smoke, accessibility, responsive).

## Submission screenshots

Generates judge-ready PNGs in `submission-screenshots/`:

```bash
npm run capture:screenshots
```

Captures: hero, teaching signals, fraction garden, teacher console, review/export, and mobile student view.

## Submission package

Judge-ready copy and walkthrough: [`docs/submission/`](docs/submission/).

## What is real vs prototype

- **Real:** UI, interactions, sample lesson data, copy-to-clipboard on export cards
- **Demo / not implemented:** AI generation, auth, database, LMS, automated grading, official curriculum claims
- **Client-side only:** Export pack downloads as `lesson-loom-fraction-garden.zip` (markdown artifacts; no server)

## Flow

Hero → Lesson Intake → Lesson Weave → Teaching Signal → Fraction Garden → Teacher Console → UDL → Review & Safety → Export Pack → Device previews → Made with Stitch

## Deploy

This project is a Vite SPA. `vercel.json` sets build output to `dist` and rewrites client routes to `index.html`.

### Deploy (GitHub Pages)

On push to `main`, [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) builds with `VITE_BASE_PATH=/lesson-loom-plan-to-playable/` and publishes to GitHub Pages.

1. In the repo: **Settings → Pages → Build and deployment → Source:** GitHub Actions.
2. After the workflow succeeds, open: **https://bwillia13x.github.io/lesson-loom-plan-to-playable/**
3. Smoke-test **Run judge demo** on that URL.

### Deploy (Vercel)

### Option A — GitHub import (recommended for custom domain)

1. Push this repo to [lesson-loom-plan-to-playable](https://github.com/Bwillia13x/lesson-loom-plan-to-playable).
2. In [Vercel](https://vercel.com/new), import the repository.
3. Confirm settings (usually auto-detected from `vercel.json`):
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy. Use the preview URL Vercel assigns after the build succeeds.

### Option B — Vercel CLI

```bash
npm install
npm run build
npx vercel          # preview deployment
npx vercel --prod   # production (when ready)
```

Requires the [Vercel CLI](https://vercel.com/docs/cli) and an authenticated account. Do not commit API tokens.

### Local production preview

After a successful build, serve the `dist` folder locally:

```bash
npm run build
npm run preview
# or, to match dev host/port:
npm run preview:host
```

Open `http://127.0.0.1:5173` (or the URL printed in the terminal).

## Judge demo (60s)

Click **Run judge demo** in the top bar to auto-weave, open Fraction Garden with `1/2`, `2/4`, `3/6`, approve for classroom use, and land on the export pack.

Or walk manually:

1. **Weave Lesson** on the hero
2. **Student view** → select tiles → **Check**
3. **Teacher console** → review timeline
4. **Approve for Classroom Use**
5. **Copy** on an export card

## Submission checklist

Use before posting to Contra / the challenge portal. Full QA detail lives in `08_QA_ACCEPTANCE_CHECKLIST.md`.

### Product & demo

- [ ] Concept is clear within 30 seconds (lesson plan → interactive classroom app).
- [ ] Demo stays on one lesson: **Fraction Garden**.
- [ ] Student app feels interactive; teacher console and export pack feel practical.
- [ ] Review & Safety section is visible with teacher-review language.

### Core interactions

- [ ] **Weave lesson** updates app state and reveals teaching signals.
- [ ] Student / Teacher toggle works.
- [ ] Fraction tiles select; equivalent-fraction success state works.
- [ ] Support / Core / Extend toggle works.
- [ ] Export Pack copy buttons show feedback.

### Visual & responsive

- [ ] Warm ivory palette, clear typography, refined cards (no generic SaaS clutter).
- [ ] Fraction Garden reads as the visual centerpiece.
- [ ] Spot-check desktop (~1280px) and mobile (~390px): no horizontal scroll; controls remain usable.

### Trust & claims

- [ ] No claims of official curriculum, district approval, teacher replacement, or full privacy compliance.
- [ ] Copy includes safe framing: teacher-reviewed draft, no student data required, printable fallback, human approval before classroom use.

### Technical & submission assets

- [ ] `npm run build` succeeds.
- [ ] `npm run verify` passes (build + lint + full e2e suite).
- [ ] Page title and meta description are set.
- [ ] Live deployment URL loads and deep links work (after you deploy).
- [ ] Screenshots captured (`npm run capture:screenshots`).
- [ ] 60–90 second walkthrough recorded.
- [ ] Contra submission copy and credits ready; challenge rules re-read before submit.
