# Judge Wow Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close contest submission gaps, elevate visual perception of the unified classroom session, and add second-order state coupling (approval, class mode, reflection) plus judge-demo legibility — without backend, fake AI, or scope creep.

**Architecture:** Keep `App.tsx` as orchestrator. Extend `lessonLoomData.ts` with small copy maps. Propagate derived session labels to Export, Teacher Console, Devices, Weave banner, and system map. Automate viewport QA where manual matrix is slow. Phases E→H can ship as separate PRs.

**Tech Stack:** React 19, TypeScript, Vite 6, CSS tokens, GSAP (existing), Playwright e2e, GitHub Pages static deploy.

**Design spec:** `docs/superpowers/specs/2026-05-29-judge-wow-phase-2-design.md`

---

## File map

| File | Responsibility |
|------|----------------|
| `docs/qa/ACCEPTANCE_STATUS.md` | Evidence for manual + automated checks |
| `docs/submission/README.md` | Live URL verification, screenshot paths |
| `docs/submission/RECORDING.md` | Video checklist |
| `e2e/viewports.spec.ts` | 1440/1280/1024/430 overflow + hero |
| `src/data/lessonLoomData.ts` | `classMode` segment overrides, export gate copy |
| `src/App.tsx` | Pass new props; optional judge demo beat |
| `src/components/sections/ExportPackSection.tsx` | Review-pending vs approved banner |
| `src/components/sections/TeacherConsole.tsx` | Class mode + reflection excerpt |
| `src/components/sections/ResponsivePreview.tsx` | Mirror approval + classMode |
| `src/components/WeaveCompleteBanner.tsx` | Session summary line |
| `src/components/sections/StudentFractionGarden.tsx` | Progress rail reflection step |
| `src/styles/sections.css` | Hero/garden/focus polish |
| `src/styles/tokens.css` | Focus ring token if missing |
| `e2e/unified-session.spec.ts` | Class mode copy assertion |
| `e2e/judge-demo.spec.ts` | Demo progress rail |
| `e2e/export-zip.spec.ts` | Approval note in zip |
| `src/utils/buildExportZip.ts` | `teacher-console-notes.txt` when reflection saved |

---

## Phase E — Submission closure

### Task E1: Viewport overflow e2e

**Files:**
- Create: `e2e/viewports.spec.ts`
- Modify: `package.json` (ensure spec runs in `test:e2e` — no change if glob picks `e2e/*.spec.ts`)

- [ ] **Step 1: Write viewport spec**

Create `e2e/viewports.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

const widths = [1440, 1280, 1024, 430] as const;

for (const width of widths) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}
```

- [ ] **Step 2: Run spec**

Run: `npx playwright test e2e/viewports.spec.ts --project=chromium`
Expected: PASS (4 tests)

- [ ] **Step 3: Commit**

```bash
git add e2e/viewports.spec.ts
git commit -m "test(e2e): viewport overflow matrix for submission QA"
```

---

### Task E2: ACCEPTANCE_STATUS evidence pass

**Files:**
- Modify: `docs/qa/ACCEPTANCE_STATUS.md`

- [ ] **Step 1: Mark automated viewport items**

In `docs/qa/ACCEPTANCE_STATUS.md`, update responsive section:

```markdown
- [x] 1440px desktop. — _e2e/viewports.spec.ts_
- [x] 1280px laptop. — _e2e/viewports.spec.ts_
- [x] 1024px tablet landscape. — _e2e/viewports.spec.ts_
- [x] 430px mobile. — _e2e/viewports.spec.ts_
```

- [ ] **Step 2: Add submission verification note**

Under Submission checks, set Live URL entry to:

```markdown
- [x] Live URL works. — _manual 2026-05-29: https://bwillia13x.github.io/lesson-loom-plan-to-playable/ loads; judge demo e2e green_
```

(Adjust date/URL if deploy differs.)

- [ ] **Step 3: Commit**

```bash
git add docs/qa/ACCEPTANCE_STATUS.md
git commit -m "docs(qa): record viewport e2e and live URL verification"
```

---

### Task E3: Submission README screenshot index

**Files:**
- Modify: `docs/submission/README.md`

- [ ] **Step 1: Add capture output table**

Append to `docs/submission/README.md`:

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add docs/submission/README.md
git commit -m "docs(submission): screenshot artifact index"
```

---

### Task E4: Manual matrix session (human)

**Files:**
- Modify: `docs/qa/ACCEPTANCE_STATUS.md`

- [ ] **Step 1: Run manual pass**

Commands:

```bash
npm run dev
# Tab through hero → export; note focus visibility
# Toggle OS reduced motion; re-run judge demo
```

Check boxes for: concept in 30s, not generic SaaS, useful to teacher, visual items, heading order, focus, contrast, jank.

- [ ] **Step 2: Record walkthrough**

Follow `docs/submission/WALKTHROUGH.md`; upload per `docs/submission/RECORDING.md`.

- [ ] **Step 3: Commit notes only**

```bash
git add docs/qa/ACCEPTANCE_STATUS.md docs/submission/RECORDING.md
git commit -m "docs(qa): manual perception and recording checklist complete"
```

**Verify Phase E:** `npm run verify`

---

## Phase F — Perception polish

### Task F1: Focus-visible token

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/primitives.css`

- [ ] **Step 1: Add focus token**

In `src/styles/tokens.css` add:

```css
:root {
  --ll-focus-ring: 0 0 0 3px rgba(45, 74, 62, 0.35);
}
```

- [ ] **Step 2: Apply to buttons and tiles**

In `src/styles/primitives.css`:

```css
button:focus-visible,
.ll-tile:focus-visible,
a:focus-visible {
  outline: none;
  box-shadow: var(--ll-focus-ring);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/tokens.css src/styles/primitives.css
git commit -m "style(a11y): shared focus-visible ring token"
```

---

### Task F2: Hero and garden visual hierarchy

**Files:**
- Modify: `src/styles/sections.css`

- [ ] **Step 1: Hero plan-app visual**

Add to `sections.css`:

```css
.hero-visual__plan {
  box-shadow: 0 12px 40px rgba(26, 35, 50, 0.08);
  border: 1px solid var(--ll-border);
}

.hero-visual__app {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(45, 74, 62, 0.12);
}
```

- [ ] **Step 2: Fraction tile tactile depth**

```css
.ll-tile {
  box-shadow: 0 2px 0 rgba(26, 35, 50, 0.06), 0 4px 12px rgba(26, 35, 50, 0.04);
}

.ll-tile[aria-pressed='true'] {
  box-shadow: 0 0 0 2px var(--ll-sage), 0 6px 16px rgba(45, 74, 62, 0.15);
}
```

- [ ] **Step 3: Visual check + commit**

Run: `npm run build`
Expected: success

```bash
git add src/styles/sections.css
git commit -m "style: hero depth and tactile fraction tiles"
```

---

## Phase G — Second-order session coupling

### Task G1: Data — class mode overrides and export gate copy

**Files:**
- Modify: `src/data/lessonLoomData.ts`

- [ ] **Step 1: Add types and maps**

```typescript
export type ClassMode = 'whole' | 'groups';

export const exportGateCopy = {
  pending: 'Complete teacher review before classroom handoff. Exports remain preview drafts.',
  approved: 'Teacher reviewed this draft. Artifacts are ready for your workflow.',
} as const;

export const teacherSegmentClassOverrides: Partial<
  Record<ClassMode, Partial<Record<TimelineId, { watch?: string; prompts?: string[] }>>>
> = {
  groups: {
    partner: {
      watch: 'Circulate pairs; listen for equal parts language, not just matching numbers.',
      prompts: [
        'Partner A models one bed; Partner B builds an equivalent with different denominators.',
        'Switch roles and justify why the beds show the same amount.',
      ],
    },
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add src/data/lessonLoomData.ts
git commit -m "feat(data): class mode overrides and export gate copy"
```

---

### Task G2: TeacherConsole merge overrides + reflection excerpt

**Files:**
- Modify: `src/components/sections/TeacherConsole.tsx`

- [ ] **Step 1: Extend props**

```typescript
type TeacherConsoleProps = {
  activeSegment: TimelineId;
  classMode: ClassMode;
  reflectionSaved: boolean;
  reflectionText: string;
  // ...existing props
};
```

- [ ] **Step 2: Merge segment body**

```typescript
const base = teacherSegmentBodies[activeSegment];
const override = teacherSegmentClassOverrides[classMode]?.[activeSegment];
const body = {
  ...base,
  watch: override?.watch ?? base.watch,
  prompts: override?.prompts ?? base.prompts,
};

const reflectionNote =
  reflectionSaved && activeSegment === 'ticket' && reflectionText.trim()
    ? `Demo reflection on file: “${reflectionText.trim().slice(0, 120)}${reflectionText.length > 120 ? '…' : ''}”`
    : null;
```

Render `reflectionNote` in a subdued panel below prompts when present.

- [ ] **Step 3: Wire from App.tsx**

Pass `classMode`, `reflectionSaved`, `reflectionText` from `App.tsx` to `TeacherConsole`.

- [ ] **Step 4: E2e class mode**

In `e2e/unified-session.spec.ts` add:

```typescript
test('groups class mode shows partner rotation copy', async ({ page }) => {
  await page.goto('/?w=1#teacher');
  await page.getByRole('button', { name: /groups/i }).click();
  await page.getByRole('button', { name: /partner/i }).click();
  await expect(page.getByText(/Partner A models/i)).toBeVisible();
});
```

- [ ] **Step 5: Run test and commit**

Run: `npx playwright test e2e/unified-session.spec.ts -g groups`
Expected: PASS

```bash
git add src/components/sections/TeacherConsole.tsx src/App.tsx e2e/unified-session.spec.ts
git commit -m "feat(teacher): class mode segment overrides and reflection excerpt"
```

---

### Task G3: Export pack review gate + system map

**Files:**
- Modify: `src/components/sections/ExportPackSection.tsx`
- Modify: `src/App.tsx` (`systemMapStep` logic)

- [ ] **Step 1: Export banner**

When `!approved`, render above cards:

```tsx
<p className="export-gate text-mono" data-testid="export-gate-pending">
  {exportGateCopy.pending}
</p>
```

When `approved`, use `exportGateCopy.approved` with `data-testid="export-gate-approved"`.

- [ ] **Step 2: systemMapStep**

In `App.tsx` ensure:

```typescript
const systemMapStep = useMemo(() => {
  if (approved) return 4;
  if (studentAppActive) return 3;
  if (hasWoven) return 1;
  return 0;
}, [approved, studentAppActive, hasWoven]);
```

- [ ] **Step 3: E2e**

```typescript
test('export gate shows pending until approved', async ({ page }) => {
  await page.goto('/?w=1#export');
  await expect(page.getByTestId('export-gate-pending')).toBeVisible();
  await page.getByRole('button', { name: /approve/i }).click();
  await expect(page.getByTestId('export-gate-approved')).toBeVisible();
});
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ExportPackSection.tsx src/App.tsx e2e/smoke.spec.ts
git commit -m "feat(export): review gate copy and system map approval step"
```

---

### Task G4: Devices snapshot + weave banner

**Files:**
- Modify: `src/data/lessonLoomData.ts` (`DevicesSnapshot` type)
- Modify: `src/components/sections/ResponsivePreview.tsx`
- Modify: `src/components/WeaveCompleteBanner.tsx`

- [ ] **Step 1: Extend DevicesSnapshot**

```typescript
export type DevicesSnapshot = {
  // existing fields...
  approved: boolean;
  classMode: ClassMode;
};
```

- [ ] **Step 2: Display labels**

In `ResponsivePreview`, add rows:

```tsx
<li>Review: {snapshot.approved ? 'Teacher approved' : 'Pending review'}</li>
<li>Class: {snapshot.classMode === 'groups' ? 'Small groups' : 'Whole class'}</li>
```

- [ ] **Step 3: WeaveCompleteBanner summary**

```tsx
<p className="weave-banner__session text-mono">
  Lane: {activeSupport} · {approved ? 'Approved' : 'Review pending'}
  {checkSuccess ? ' · Equivalence complete' : ''}
</p>
```

- [ ] **Step 4: Update unified-session e2e**

Assert devices show "Pending review" then "Teacher approved" after approve click.

- [ ] **Step 5: Commit**

```bash
git add src/data/lessonLoomData.ts src/App.tsx src/components/sections/ResponsivePreview.tsx src/components/WeaveCompleteBanner.tsx e2e/unified-session.spec.ts
git commit -m "feat(session): devices and banner mirror approval state"
```

---

### Task G5: Zip includes teacher notes

**Files:**
- Modify: `src/utils/buildExportZip.ts`
- Modify: `e2e/export-zip.spec.ts`

- [ ] **Step 1: Add file when reflection saved**

```typescript
if (reflectionSaved && reflectionText.trim()) {
  zip.file(
    'teacher-console-notes.txt',
    `Exit ticket reflection (demo, no student data):\n${reflectionText.trim()}\n`,
  );
}
```

- [ ] **Step 2: E2e**

Save reflection → download zip → assert archive contains `teacher-console-notes.txt`.

- [ ] **Step 3: Commit**

```bash
git add src/utils/buildExportZip.ts e2e/export-zip.spec.ts
git commit -m "feat(export): zip teacher-console-notes when reflection saved"
```

**Verify Phase G:** `npm run verify`

---

## Phase H — Judge presentation layer

### Task H1: Demo progress rail

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles/layout.css`

- [ ] **Step 1: Caption count constant**

```typescript
const JUDGE_DEMO_STEPS = 8;
```

- [ ] **Step 2: Top bar UI when demoRunning**

```tsx
{demoRunning && (
  <div className="judge-demo-rail" data-testid="judge-demo-rail" aria-live="polite">
    <span className="sr-only">
      Demo step {demoCaptionIndex} of {JUDGE_DEMO_STEPS}
    </span>
    <span aria-hidden="true">
      {demoCaptionIndex}/{JUDGE_DEMO_STEPS}
    </span>
    <span className="judge-demo-rail__caption">
      {judgeDemoPresenterCaptions[demoCaptionIndex]}
    </span>
  </div>
)}
```

- [ ] **Step 3: CSS**

```css
.judge-demo-rail {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.8rem;
  color: var(--ll-graphite);
}
```

- [ ] **Step 4: E2e**

In `e2e/judge-demo.spec.ts`:

```typescript
await page.getByRole('button', { name: /run judge demo/i }).click();
await expect(page.getByTestId('judge-demo-rail')).toBeVisible();
```

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/styles/layout.css e2e/judge-demo.spec.ts
git commit -m "feat(demo): judge demo step progress rail"
```

---

### Task H2: Optional class mode beat in judge demo

**Files:**
- Modify: `src/App.tsx` (`runJudgeDemo`)
- Modify: `src/data/presenterCaptions.ts`

- [ ] **Step 1: Add caption**

```typescript
// index 6.5 or renumber — insert before review:
'Whole class or small groups — the console adapts pacing prompts.',
```

- [ ] **Step 2: Insert beat after teacher scroll**

```typescript
setClassMode('groups');
setDemoCaptionIndex(/* groups caption index */);
await delay(prefersReducedMotion ? 150 : 500);
setClassMode('whole');
```

Skip entire beat when `prefersReducedMotion` if timing budget tight.

- [ ] **Step 3: Update walkthrough**

Add one sentence in `docs/submission/WALKTHROUGH.md` about class mode toggle.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/data/presenterCaptions.ts docs/submission/WALKTHROUGH.md
git commit -m "feat(demo): class mode beat in judge autoplay"
```

**Verify Phase H:** `npm run verify`

---

## Final verification

- [ ] `npm run verify` — build, lint, full e2e
- [ ] `npm run verify:submission` — if screenshots required for Contra
- [ ] Update `docs/qa/ACCEPTANCE_STATUS.md` for Phase G/H items
- [ ] PR description links design spec + lists phases shipped

---

## Execution handoff

**Plan saved to:** `docs/superpowers/plans/2026-05-29-judge-wow-phase-2.md`

**Two execution options:**

1. **Subagent-Driven (recommended)** — Fresh subagent per phase (E, F, G, H); review between phases.
2. **Inline Execution** — Same session; complete Phase E first (submission), then F–H.

**Which approach?**

---

## Plan self-review

| Spec requirement | Task |
|------------------|------|
| Submission confidence | E1–E4 |
| Perception polish | F1–F2 |
| Approval propagation | G3 |
| Class mode coupling | G1–G2, H2 |
| Reflection propagation | G2, G5 |
| Judge presentation | H1–H2 |
| Testing | All e2e steps |
| Claim safety | copy-deck unchanged; gate copy uses "draft" language |

No TBD placeholders. Phases are independently shippable.
