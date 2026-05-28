# Lesson Loom — Submission Readiness & Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the gap between the working Fraction Garden prototype and a contest-ready submission package — polished copy, complete QA coverage, captured assets, and deployment verification.

**Architecture:** Keep the existing single-page React + Vite SPA and centralized `App.tsx` state. Add submission artifacts under `docs/submission/` and `submission-screenshots/`, tighten Playwright coverage for gaps found in review, and align hero/copy/interaction details with `17_COPY_DECK.md` and `16_INTERACTION_AND_MOTION_SPEC.md` without expanding product scope.

**Tech Stack:** React 19, TypeScript, Vite 6, CSS variables (`src/styles.css`), Playwright e2e, Vercel static deploy.

---

## Review baseline (2026-05-28)

### What is already done

| Area | Status |
|------|--------|
| Full page flow (Hero → Stitch) | Implemented in `src/App.tsx` + section components |
| Weave sequence + teaching signals | `runWeaveSequence`, `LessonWeave`, `TeachingSignal` |
| Fraction Garden interaction | Tile select, check, success pulse, garden beds update |
| Teacher / Student workspace toggle | `WorkspaceModeToggle` + CSS `data-workspace-mode` |
| UDL Support / Core / Extend | `DifferentiationUDL` + smoke test |
| Review & Safety + printable preview | `ReviewSafety` + `PrintableFallback` |
| Export pack copy feedback | `handleExportCopy` + demo download notice |
| Judge demo autoplay | `runJudgeDemo` + e2e test |
| Build / lint / e2e | `npm run verify` passes; full `npm run test:e2e` passes (7 tests) |
| Meta title + description | `index.html` |
| CI workflow | `.github/workflows/ci.yml` runs build, lint, all e2e |

### Gaps driving this plan

1. **Submission assets missing:** No `submission-screenshots/` in repo; no packaged `docs/submission/` walkthrough copy; video/recording is manual.
2. **`npm run verify` under-tests:** Runs only `e2e/smoke.spec.ts`; accessibility + responsive specs skipped locally.
3. **Copy deck drift:** Hero headline/CTA differ from `17_COPY_DECK.md` (screenshot/judge clarity risk).
4. **Interaction spec gap:** No gentle feedback when fraction check fails (`16_INTERACTION_AND_MOTION_SPEC.md` incorrect/incomplete state).
5. **Design meta drift:** `theme-color` is `#e85d04` while design system centers ivory/sage/navy (`03_DESIGN.md`).
6. **Manual QA checklist:** `08_QA_ACCEPTANCE_CHECKLIST.md` items not tracked in-repo.

---

## File map (this plan)

| File | Responsibility |
|------|----------------|
| `docs/submission/README.md` | Judge-facing asset index, live URL placeholder, capture commands |
| `docs/submission/WALKTHROUGH.md` | 60–90s script from `10_SUBMISSION_AND_DEMO_PACKAGE.md` |
| `docs/submission/CONTRA_COPY.md` | Ready-to-paste Contra post + social variant |
| `docs/qa/ACCEPTANCE_STATUS.md` | Checkbox mirror of `08_QA_ACCEPTANCE_CHECKLIST.md` with pass/fail notes |
| `submission-screenshots/*.png` | Playwright capture output (gitignored or committed per team preference) |
| `.gitignore` | Optionally ignore `submission-screenshots/` if binaries should not ship |
| `package.json` | `verify` runs full e2e; optional `verify:submission` script |
| `e2e/fraction-check.spec.ts` | Incorrect-check feedback test |
| `e2e/copy-deck.spec.ts` | Hero copy assertions |
| `src/components/sections/HeroLanding.tsx` | Copy deck alignment |
| `src/components/sections/StudentFractionGarden.tsx` | Check feedback UI |
| `index.html` | `theme-color` aligned to design tokens |

---

### Task 1: Submission documentation pack

**Files:**
- Create: `docs/submission/README.md`
- Create: `docs/submission/WALKTHROUGH.md`
- Create: `docs/submission/CONTRA_COPY.md`
- Modify: `README.md` (link to `docs/submission/`)

- [ ] **Step 1: Create submission README**

Create `docs/submission/README.md`:

```markdown
# Lesson Loom — Submission Assets

## Live demo

- **URL:** _[paste Vercel production URL after deploy]_
- **Repo:** https://github.com/Bwillia13x/lesson-loom-plan-to-playable

## Quick judge path

1. Open live URL.
2. Click **Run judge demo** (top bar) — auto-weave, fraction success, approval, export.
3. Or manual: **Weave Lesson** → Student tiles → **Check** → **Approve for Classroom Use** → Export **Copy**.

## Capture screenshots

```bash
npm run build
npx playwright install chromium --with-deps
npm run capture:screenshots
```

Output: `submission-screenshots/01-hero.png` … `06-mobile-student.png`.

## Walkthrough video

Record 60–90s following `WALKTHROUGH.md`. Suggested flow: hero → weave → teaching signals → fraction garden → teacher console → review/export → Made with Stitch.

## Copy for Contra

See `CONTRA_COPY.md`.
```

- [ ] **Step 2: Add walkthrough script**

Create `docs/submission/WALKTHROUGH.md` by copying the 60–90 second script block from `10_SUBMISSION_AND_DEMO_PACKAGE.md` lines 30–47 verbatim (no edits to claims).

- [ ] **Step 3: Add Contra copy file**

Create `docs/submission/CONTRA_COPY.md` with the "Contra post copy", "Process note", and "Social version" blocks from `10_SUBMISSION_AND_DEMO_PACKAGE.md` lines 58–84.

- [ ] **Step 4: Link from root README**

In `README.md`, after the "Submission screenshots" section, add:

```markdown
## Submission package

Judge-ready copy and walkthrough: [`docs/submission/`](docs/submission/).
```

- [ ] **Step 5: Commit**

```bash
git add docs/submission/ README.md
git commit -m "docs: add submission asset pack for Contra demo"
```

---

### Task 2: QA acceptance status tracker

**Files:**
- Create: `docs/qa/ACCEPTANCE_STATUS.md`

- [ ] **Step 1: Write failing-by-default checklist**

Create `docs/qa/ACCEPTANCE_STATUS.md` with sections from `08_QA_ACCEPTANCE_CHECKLIST.md`. For each item, use format:

```markdown
- [x] **Weave lesson** changes app state — _verified: e2e/smoke.spec.ts_
- [ ] **1440px desktop** spot-check — _manual_
```

Pre-check all items already covered by automated tests (smoke, accessibility, responsive). Leave submission-only items unchecked.

- [ ] **Step 2: Run full e2e and mark automated items**

Run: `npm run test:e2e`
Expected: 7 passed

Update checkboxes for: weave, fractions, UDL, judge demo, skip link, hint toggle, workspace toggle, mobile overflow.

- [ ] **Step 3: Commit**

```bash
git add docs/qa/ACCEPTANCE_STATUS.md
git commit -m "docs: add QA acceptance status tracker"
```

---

### Task 3: Screenshot capture pipeline + gitignore policy

**Files:**
- Modify: `.gitignore`
- Modify: `package.json`
- Modify: `docs/submission/README.md` (if needed)

- [ ] **Step 1: Decide screenshot git policy**

Add to `.gitignore` (recommended — keeps repo lean):

```
submission-screenshots/
```

Document in `docs/submission/README.md` that judges run `npm run capture:screenshots` locally or CI uploads artifacts.

Alternative: commit PNGs if Contra requires files in-repo — skip gitignore line if so.

- [ ] **Step 2: Add verify:submission script**

In `package.json` scripts:

```json
"verify:submission": "npm run verify && npm run capture:screenshots"
```

- [ ] **Step 3: Run capture once locally**

```bash
npm run build
npm run preview:host &
sleep 2
npm run capture:screenshots
```

Expected: six PNG files under `submission-screenshots/`.

Kill preview server after capture.

- [ ] **Step 4: Commit**

```bash
git add .gitignore package.json docs/submission/README.md
git commit -m "chore: add submission screenshot capture script"
```

---

### Task 4: Expand `verify` to run full e2e suite

**Files:**
- Modify: `package.json`
- Modify: `AGENTS.md` (Cursor Cloud verify note)

- [ ] **Step 1: Write failing expectation note**

Current `verify` only runs smoke (3 tests). Full suite has 7 tests including accessibility and responsive.

- [ ] **Step 2: Update package.json**

Change:

```json
"verify": "npm run build && npm run lint && npm run test:e2e"
```

Remove separate smoke-only from verify path. Keep `"test:smoke"` for fast iteration.

- [ ] **Step 3: Run verify**

```bash
npm run verify
```

Expected: build OK, lint OK, 7 e2e tests passed.

- [ ] **Step 4: Update AGENTS.md Cloud section**

Replace smoke-only verify description with full e2e note.

- [ ] **Step 5: Commit**

```bash
git add package.json AGENTS.md
git commit -m "chore: run full e2e suite in npm run verify"
```

---

### Task 5: Fraction check — incorrect/incomplete feedback (spec gap)

**Files:**
- Create: `e2e/fraction-check.spec.ts`
- Modify: `src/components/sections/StudentFractionGarden.tsx`
- Modify: `src/data/lessonLoomData.ts` (only if message string missing)

- [ ] **Step 1: Write failing Playwright test**

Create `e2e/fraction-check.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';

test('fraction check shows gentle hint when selection is wrong', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('workspace-student').click();
  await page.locator('#student').scrollIntoViewIfNeeded();

  await page.getByTestId('tile-one-half').click();
  await page.getByTestId('tile-one-fourth').click();
  await page.getByTestId('tile-three-fourths').click();

  await page.getByTestId('fraction-check').click();
  await expect(page.getByTestId('fraction-check-feedback')).toBeVisible();
  await expect(page.getByTestId('fraction-check-feedback')).toContainText(
    'Compare how much of the whole',
  );
  await expect(page.getByText('Equivalent? Yes!')).not.toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx playwright test e2e/fraction-check.spec.ts
```

Expected: FAIL — `fraction-check-feedback` not found.

- [ ] **Step 3: Implement feedback in StudentFractionGarden**

Add prop or derive state: show feedback when user has clicked Check with 3 tiles selected and `!checkSuccess`.

After the Check button row, add:

```tsx
{checkAttempted && !checkSuccess && selectedTileIds.length >= 1 && (
  <div
    className="garden-hint-callout garden-hint-callout--soft"
    role="status"
    data-testid="fraction-check-feedback"
    aria-live="polite"
  >
    {studentActivity.hint}
  </div>
)}
```

Track `checkAttempted` with `useState(false)`; set `true` in a wrapper around `onCheck` from parent, **or** lift `checkAttempted` to `App.tsx` alongside `checkSuccess` (preferred for single source of truth):

In `App.tsx` `handleCheck`:

```typescript
const handleCheck = useCallback(() => {
  setCheckAttempted(true);
  const success = isEquivalentTileSelection(selectedTileIds);
  setCheckSuccess(success);
  // ... existing pulse logic
}, [selectedTileIds]);
```

Reset `checkAttempted` in `handleResetTiles` and when toggling tiles (optional — reset on tile change keeps UX fresh).

Pass `checkAttempted` and `checkFeedbackVisible={checkAttempted && !checkSuccess}` to `StudentFractionGarden`.

- [ ] **Step 4: Run test to verify it passes**

```bash
npx playwright test e2e/fraction-check.spec.ts
```

Expected: PASS

- [ ] **Step 5: Run full e2e**

```bash
npm run test:e2e
```

Expected: 8 passed

- [ ] **Step 6: Commit**

```bash
git add e2e/fraction-check.spec.ts src/App.tsx src/components/sections/StudentFractionGarden.tsx
git commit -m "feat: gentle fraction check feedback on incorrect selection"
```

---

### Task 6: Hero copy alignment with copy deck

**Files:**
- Create: `e2e/copy-deck.spec.ts`
- Modify: `src/components/sections/HeroLanding.tsx`
- Modify: `e2e/smoke.spec.ts` (if CTA label assertions exist)

- [ ] **Step 1: Write failing copy test**

Create `e2e/copy-deck.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';

test('hero matches copy deck primary messages', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#hero-title')).toContainText(
    'Turn lesson plans into interactive classroom apps',
  );
  await expect(page.getByRole('button', { name: 'View student app' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Weave lesson' })).toBeVisible();
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx playwright test e2e/copy-deck.spec.ts
```

- [ ] **Step 3: Update HeroLanding.tsx**

Replace headline block:

```tsx
<h1 id="hero-title" className="hero-headline">
  Turn lesson plans into interactive classroom apps.
</h1>
```

Add product name in eyebrow or subline:

```tsx
<p className="ll-section__eyebrow">Lesson Loom · AI-native lesson interface studio</p>
```

Change secondary button label:

```tsx
<IndustrialButton variant="secondary" size="lg" onClick={onViewDemo}>
  View student app
</IndustrialButton>
```

Normalize primary CTA casing to match test: `Weave lesson` (sentence case per copy deck).

Update `data-testid="weave-lesson"` button children to `Weave lesson`.

- [ ] **Step 4: Fix smoke test title assertion if needed**

In `e2e/responsive.spec.ts`, change:

```typescript
await expect(page.locator('#hero-title')).toContainText('Lesson Loom');
```

to:

```typescript
await expect(page.locator('#hero-title')).toContainText('interactive classroom apps');
```

- [ ] **Step 5: Run tests**

```bash
npx playwright test e2e/copy-deck.spec.ts e2e/responsive.spec.ts e2e/smoke.spec.ts
```

Expected: all PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/HeroLanding.tsx e2e/copy-deck.spec.ts e2e/responsive.spec.ts
git commit -m "fix: align hero copy with copy deck for judge clarity"
```

---

### Task 7: Design token — theme-color and OG polish

**Files:**
- Modify: `index.html`
- Optional: `public/og-image.svg` (only if contrast audit fails)

- [ ] **Step 1: Update theme-color**

In `index.html`, change:

```html
<meta name="theme-color" content="#e85d04" />
```

to navy from design system:

```html
<meta name="theme-color" content="#1e2a3b" />
```

(`--ll-navy` equivalent from `03_DESIGN.md` / `src/styles.css`)

- [ ] **Step 2: Manual check**

```bash
npm run build && npm run preview:host
```

Open mobile browser emulator — browser chrome should match calm navy, not orange.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "fix: align theme-color with Lesson Loom navy palette"
```

---

### Task 8: Tablet viewport regression test

**Files:**
- Create: `e2e/responsive-tablet.spec.ts`

- [ ] **Step 1: Write tablet test**

```typescript
import { expect, test } from '@playwright/test';

test.describe('tablet viewport (768px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
  });

  test('no horizontal overflow after weave', async ({ page }) => {
    await page.getByTestId('weave-lesson').first().click();
    await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 5000 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });
});
```

- [ ] **Step 2: Run test**

```bash
npx playwright test e2e/responsive-tablet.spec.ts
```

Expected: PASS (fix CSS only if fail)

- [ ] **Step 3: Commit**

```bash
git add e2e/responsive-tablet.spec.ts
git commit -m "test: add 768px tablet overflow regression"
```

---

### Task 9: Deploy verification + fill live URL

**Files:**
- Modify: `docs/submission/README.md`
- Modify: `docs/qa/ACCEPTANCE_STATUS.md`

- [ ] **Step 1: Deploy to Vercel**

Follow `README.md` deploy section. Record production URL.

- [ ] **Step 2: Smoke live URL**

```bash
PLAYWRIGHT_BASE_URL=https://YOUR_DEPLOYMENT.vercel.app npx playwright test e2e/smoke.spec.ts
```

Expected: 3 passed against production.

- [ ] **Step 3: Update docs with live URL**

Paste URL into `docs/submission/README.md` and mark deployment items in `docs/qa/ACCEPTANCE_STATUS.md`.

- [ ] **Step 4: Commit**

```bash
git add docs/submission/README.md docs/qa/ACCEPTANCE_STATUS.md
git commit -m "docs: record production demo URL for submission"
```

---

### Task 10: Final verification gate

**Files:** none (validation only)

- [ ] **Step 1: Run full verify**

```bash
npm run verify
```

Expected: build, lint, 9+ e2e tests passed.

- [ ] **Step 2: Capture fresh screenshots**

```bash
npm run capture:screenshots
```

- [ ] **Step 3: Manual 5-minute judge pass**

1. Cold load — understand concept in 10s.
2. Run judge demo — no console errors.
3. Tab through hero CTAs and fraction tiles — visible focus rings.
4. Read Review & Safety — no overclaims.

- [ ] **Step 4: Update acceptance doc**

Mark remaining manual items in `docs/qa/ACCEPTANCE_STATUS.md`.

- [ ] **Step 5: Commit**

```bash
git add docs/qa/ACCEPTANCE_STATUS.md
git commit -m "docs: mark submission QA acceptance complete"
```

---

## Self-review (plan vs spec)

| Requirement | Task |
|-------------|------|
| Hero clarity in 10s | Task 6 copy alignment |
| Student app centerpiece | Already done; screenshots Task 3 |
| Weave interaction | Already done |
| Teacher console credibility | Already done |
| Review/export Stitch workflow | Already done; docs Task 1 |
| Responsive 390px | Task 8 + existing responsive spec |
| Reduced motion | Existing hook; judge demo respects it |
| Incorrect fraction hint (motion spec) | Task 5 |
| Export copy feedback | Already done |
| Submission screenshots + walkthrough | Tasks 1, 3, 9 |
| No backend/AI/student data | Out of scope — do not add |
| Claim-safe language | Audit in Task 10 manual pass |

**Placeholder scan:** None — all steps include concrete paths, commands, or code.

**Type consistency:** `checkAttempted` introduced in Task 5 only in `App.tsx` + `StudentFractionGarden` props.

---

## Execution handoff

**Plan saved to:** `docs/superpowers/plans/2026-05-28-lesson-loom-submission-and-polish.md`

**Recommended execution:** Subagent-Driven — dispatch one subagent per task (10 tasks), run `npm run verify` between tasks 4–10, human only for video recording (Task 9 notes) and Contra portal submit.

**Out of scope for this plan (post-contest):** real AI, auth, second lesson, LMS, PrairieSignal case study site — see `04_STRATEGIC_ROADMAP.md` Phase 2+.
