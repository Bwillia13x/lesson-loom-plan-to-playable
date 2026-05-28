# Lesson Loom — Plan to Playable

High-fidelity interactive prototype for the Google Stitch Challenge. Turn a teacher-approved lesson plan into an interactive classroom app.

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

Runs build, lint, and Playwright smoke tests.

## Submission screenshots

Generates judge-ready PNGs in `submission-screenshots/`:

```bash
npm run capture:screenshots
```

Captures: hero, teaching signals, fraction garden, teacher console, review/export, and mobile student view.

## What is real vs prototype

- **Real:** UI, interactions, sample lesson data, copy-to-clipboard on export cards
- **Demo / not implemented:** AI generation, auth, database, LMS, real zip download, automated grading, official curriculum claims

## Flow

Hero → Lesson Intake → Lesson Weave → Teaching Signal → Fraction Garden → Teacher Console → UDL → Review & Safety → Export Pack → Device previews → Made with Stitch

## Judge demo (60s)

Click **Run judge demo** in the top bar to auto-weave, open Fraction Garden with `1/2`, `2/4`, `3/6`, approve for classroom use, and land on the export pack.

Or walk manually:

1. **Weave Lesson** on the hero
2. **Student view** → select tiles → **Check**
3. **Teacher console** → review timeline
4. **Approve for Classroom Use**
5. **Copy** on an export card
