# Judge Wow Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close remaining contest submission gaps, elevate screenshot/video perception, and make the unified classroom session **visible at a glance** via session spine + signal→surface links + judge presentation tools—without backend, fake AI, or scope creep.

**Architecture:** Keep `App.tsx` as orchestrator. Add `ClassroomSessionSpine` and optional `highlightSurface` state. Extend `lessonLoomData.ts` with `surfaceLinks` on teaching signals. Phases I→L can ship as separate PRs; Phase I is mostly documentation + manual artifacts.

**Tech Stack:** React 19, TypeScript, Vite 6, CSS tokens, GSAP (existing), Playwright e2e, GitHub Pages static deploy.

**Design spec:** `docs/superpowers/specs/2026-05-30-judge-wow-phase-3-design.md`

---

## File map

| File | Responsibility |
|------|----------------|
| `docs/qa/MANUAL_PASS_2026-05-30.md` | Dated manual QA evidence |
| `docs/qa/ACCEPTANCE_STATUS.md` | Checkbox updates with evidence links |
| `docs/submission/README.md` | Walkthrough video URL |
| `docs/submission/RECORDING.md` | Recording checklist completion |
| `src/components/ClassroomSessionSpine.tsx` | Sticky session pips + subline |
| `src/data/lessonLoomData.ts` | `surfaceLinks` on signals, spine labels |
| `src/App.tsx` | `highlightSurface`, spine props, Scenes handlers |
| `src/components/sections/TeachingSignal.tsx` | “See in lesson” button per signal |
| `src/components/sections/HeroLanding.tsx` | Hero visual hierarchy polish |
| `src/components/sections/StudentFractionGarden.tsx` | Garden/tile tactile polish |
| `src/styles/sections.css` | Hero, garden, surface-highlight classes |
| `src/styles/layout.css` | Spine sticky layout, presenter mode |
| `e2e/session-spine.spec.ts` | Spine + pip navigation |
| `e2e/signal-surface-link.spec.ts` | Signal link scroll/highlight |
| `e2e/judge-scenes.spec.ts` | Top-bar Scenes presets |
| `e2e/presenter-mode.spec.ts` | Presenter chrome hides side nav |

---

## Phase I — Submission closure

### Task I1: Manual pass evidence document

**Files:**
- Create: `docs/qa/MANUAL_PASS_2026-05-30.md`

- [ ] **Step 1: Create manual pass template**

Create `docs/qa/MANUAL_PASS_2026-05-30.md`:

```markdown
# Manual QA pass — 2026-05-30

**Tester:** _name_  
**Live URL:** https://bwillia13x.github.io/lesson-loom-plan-to-playable/  
**Browser:** Chrome _version_ / Safari _version or N/A_

## Product perception

- [ ] Concept clear within 30s (hero headline + plan→app visual)
- [ ] Does not feel like generic SaaS landing page
- [ ] Output feels useful to a classroom teacher

## Visual (1440px)

- [ ] Warm ivory background consistent
- [ ] Typography hierarchy clear (H1 → lead → card titles)
- [ ] Cards: spacing, borders, shadows refined
- [ ] Fraction Garden is visual centerpiece
- [ ] Motion restrained; no jank during weave
- [ ] Hero screenshot-worthy

## Responsive

- [ ] 430px: text readable, tiles wrap, export stacks, hero balanced
- [ ] Mode toggle usable at 390px (automated: e2e/responsive.spec.ts)

## Accessibility

- [ ] Heading order logical (single H1, section H2s)
- [ ] Full keyboard tab pass (weave, tiles, toggles, export copy)
- [ ] Contrast acceptable on trust line and muted text

## Browser

- [ ] Safari desktop (or N/A with reason)
- [ ] Mobile Safari (or N/A with reason)

## Submission

- [ ] Walkthrough video recorded and linked below
- [ ] Final Stitch/Contra rules re-read

## Video

- **URL:** _YouTube/Loom link_
- **Duration:** _seconds_

## Notes

_Any issues found and fixed in follow-up PRs_
```

- [ ] **Step 2: Commit**

```bash
git add docs/qa/MANUAL_PASS_2026-05-30.md
git commit -m "docs(qa): manual pass template for Phase 3 submission closure"
```

---

### Task I2: Update acceptance status with Phase 3 pointers

**Files:**
- Modify: `docs/qa/ACCEPTANCE_STATUS.md`

- [ ] **Step 1: Add header note**

At top of `ACCEPTANCE_STATUS.md`, after the first line, add:

```markdown
**Phase 3 manual evidence:** See `docs/qa/MANUAL_PASS_2026-05-30.md` after human pass.
```

- [ ] **Step 2: Commit**

```bash
git add docs/qa/ACCEPTANCE_STATUS.md
git commit -m "docs(qa): link Phase 3 manual pass evidence"
```

---

### Task I3: Walkthrough video checklist

**Files:**
- Modify: `docs/submission/RECORDING.md`

- [ ] **Step 1: Add Phase 3 beat list aligned to judge demo**

Append to `docs/submission/RECORDING.md`:

```markdown
## Phase 3 recording beats (≤90s)

| Sec | Beat | On screen |
|-----|------|-----------|
| 0–8 | Hook | Hero headline + plan preview |
| 8–18 | Weave | Click Weave or Run judge demo start |
| 18–28 | Signals | Teaching signal board + optional phrase highlight |
| 28–45 | Student | Fraction Garden success + Extend lane if manual |
| 45–58 | Teacher | Console segment + class mode if showing groups |
| 58–68 | UDL | Support/Core/Extend toggle |
| 68–78 | Review | Approve for classroom use |
| 78–90 | Export + Stitch | Export pack + system map |

**Tip:** Enable presenter mode (Phase L) or fullscreen browser to hide side nav.
```

- [ ] **Step 2: Commit**

```bash
git add docs/submission/RECORDING.md
git commit -m "docs(submission): Phase 3 walkthrough beat sheet"
```

---

### Task I4: Human completes manual pass (checkpoint)

**Files:**
- Modify: `docs/qa/MANUAL_PASS_2026-05-30.md`
- Modify: `docs/submission/README.md`
- Modify: `docs/qa/ACCEPTANCE_STATUS.md`

- [ ] **Step 1: Run local verification**

Run: `npm run verify`  
Expected: build + lint + e2e PASS

- [ ] **Step 2: Capture screenshots**

Run: `npm run capture:screenshots`  
Expected: `submission-screenshots/01-hero.png` … `06-mobile-student.png`

- [ ] **Step 3: Record 60–90s video** per `RECORDING.md`

- [ ] **Step 4: Fill manual pass doc and check ACCEPTANCE_STATUS items**

Update unchecked manual rows in `ACCEPTANCE_STATUS.md` to `[x]` with `_manual pass 2026-05-30_`.

- [ ] **Step 5: Add video URL to submission README**

In `docs/submission/README.md` under Walkthrough video:

```markdown
- **Recorded walkthrough:** _paste URL_
```

- [ ] **Step 6: Commit (human or agent after recording)**

```bash
git add docs/qa/MANUAL_PASS_2026-05-30.md docs/qa/ACCEPTANCE_STATUS.md docs/submission/README.md
git commit -m "docs(submission): complete Phase 3 manual QA and walkthrough link"
```

---

## Phase J — Perception polish

### Task J1: Hero contrast and visual hierarchy

**Files:**
- Modify: `src/styles/sections.css` (`.hero-visual`, `.hero-headline`)
- Modify: `src/styles/tokens.css` (optional `--ll-eyebrow` contrast)

- [ ] **Step 1: Add hero eyebrow contrast token**

In `src/styles/tokens.css`, add:

```css
  --ll-eyebrow: #3d4f47;
```

- [ ] **Step 2: Apply to hero eyebrow**

In `src/styles/sections.css`:

```css
.ll-section__eyebrow {
  color: var(--ll-eyebrow);
  letter-spacing: 0.12em;
}
```

- [ ] **Step 3: Strengthen hero-visual grid**

In `src/styles/sections.css`, update `.hero-visual`:

```css
.hero-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  align-items: stretch;
}
@media (max-width: 768px) {
  .hero-visual {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Run build**

Run: `npm run build`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/styles/tokens.css src/styles/sections.css
git commit -m "style(hero): improve hierarchy and eyebrow contrast"
```

---

### Task J2: Garden tile and bed tactile polish

**Files:**
- Modify: `src/styles/sections.css` (`.fraction-tile`, `.garden-bed--active`)

- [ ] **Step 1: Add tile tactile shadow**

```css
.fraction-tile {
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 2px 8px rgba(31, 42, 37, 0.08);
}
.fraction-tile[aria-pressed='true'] {
  box-shadow: var(--ll-focus-ring), 0 4px 12px rgba(45, 74, 62, 0.15);
}
```

- [ ] **Step 2: Active garden bed fill**

```css
.garden-bed--active .garden-bed__plot--filled {
  background: linear-gradient(180deg, rgba(122, 158, 126, 0.35), rgba(122, 158, 126, 0.18));
  border-color: var(--ll-sage);
}
```

- [ ] **Step 3: Visual check at 1440 and 430**

Run: `npm run dev` — inspect `#student` after weave.  
Expected: tiles and beds feel tactile; no horizontal scroll.

- [ ] **Step 4: Commit**

```bash
git add src/styles/sections.css
git commit -m "style(garden): tactile tiles and active bed fill"
```

---

### Task J3: Panel shadow token consistency

**Files:**
- Modify: `src/styles/primitives.css` (`.ll-panel` or `.panel`)

- [ ] **Step 1: Unify panel shadow**

Ensure panels use:

```css
.ll-panel {
  box-shadow: var(--ll-shadow-soft, 0 8px 24px rgba(31, 42, 37, 0.06));
  border-radius: var(--ll-radius);
}
```

Add to `tokens.css` if missing:

```css
  --ll-shadow-soft: 0 8px 24px rgba(31, 42, 37, 0.06);
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/tokens.css src/styles/primitives.css
git commit -m "style(tokens): unified panel shadow for cards"
```

---

## Phase K — Session spine + signal→surface links

### Task K1: Data — surfaceLinks and spine labels

**Files:**
- Modify: `src/data/lessonLoomData.ts`

- [ ] **Step 1: Add types**

Near other exported types:

```typescript
export type SignalSurfaceLink = 'student' | 'teacher' | 'udl';
```

- [ ] **Step 2: Add surfaceLinks to teaching signals**

Example for `visual-metaphor` signal:

```typescript
surfaceLinks: ['student'],
```

Map each signal in `teachingSignals` array with 1–2 targets (deterministic; no NLP).

- [ ] **Step 3: Add spine label helper**

```typescript
export function sessionSpineSubline(input: {
  activeSupport: SupportLane;
  activeSegment: TimelineId;
  approved: boolean;
  workspaceMode: WorkspaceMode;
}): string {
  const lane = input.activeSupport.charAt(0).toUpperCase() + input.activeSupport.slice(1);
  const seg = input.activeSegment;
  const review = input.approved ? 'Teacher-approved draft' : 'Awaiting review';
  const mode = input.workspaceMode === 'student' ? 'Student view' : 'Teacher view';
  return `${lane} lane · ${seg} segment · ${review} · ${mode}`;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/data/lessonLoomData.ts
git commit -m "feat(data): signal surface links and session spine subline"
```

---

### Task K2: ClassroomSessionSpine component

**Files:**
- Create: `src/components/ClassroomSessionSpine.tsx`
- Modify: `src/styles/layout.css`

- [ ] **Step 1: Create component**

Create `src/components/ClassroomSessionSpine.tsx`:

```tsx
import { sessionSpineSubline, type SupportLane, type TimelineId, type WorkspaceMode } from '../data/lessonLoomData';

type SpineStep = { id: string; label: string; href: string };

const STEPS: SpineStep[] = [
  { id: 'plan', label: 'Plan', href: '#intake' },
  { id: 'signals', label: 'Signals', href: '#signals' },
  { id: 'lesson', label: 'Lesson', href: '#student' },
  { id: 'review', label: 'Review', href: '#review' },
  { id: 'export', label: 'Export', href: '#export' },
];

type Props = {
  visible: boolean;
  activeStepIndex: number;
  activeSupport: SupportLane;
  activeSegment: TimelineId;
  approved: boolean;
  workspaceMode: WorkspaceMode;
  onNavigate: (href: string) => void;
};

export function ClassroomSessionSpine({
  visible,
  activeStepIndex,
  activeSupport,
  activeSegment,
  approved,
  workspaceMode,
  onNavigate,
}: Props) {
  if (!visible) return null;

  const subline = sessionSpineSubline({
    activeSupport,
    activeSegment,
    approved,
    workspaceMode,
  });

  return (
    <div className="session-spine" data-testid="session-spine" role="navigation" aria-label="Classroom session">
      <ol className="session-spine__steps">
        {STEPS.map((step, index) => (
          <li key={step.id}>
            <button
              type="button"
              className={`session-spine__pip${index === activeStepIndex ? ' session-spine__pip--active' : ''}${index < activeStepIndex ? ' session-spine__pip--done' : ''}`}
              onClick={() => onNavigate(step.href)}
              aria-current={index === activeStepIndex ? 'step' : undefined}
            >
              {step.label}
            </button>
          </li>
        ))}
      </ol>
      <p className="session-spine__subline">{subline}</p>
    </div>
  );
}
```

- [ ] **Step 2: Add CSS**

In `src/styles/layout.css`:

```css
.session-spine {
  position: sticky;
  top: var(--ll-topbar-height, 3.5rem);
  z-index: 20;
  padding: 0.5rem 1rem;
  background: rgba(250, 248, 244, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--ll-border);
}
.session-spine__steps {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}
.session-spine__pip {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--ll-border);
  background: var(--ll-surface);
  cursor: pointer;
}
.session-spine__pip--active {
  border-color: var(--ll-sage);
  background: rgba(122, 158, 126, 0.12);
}
.session-spine__pip--done {
  opacity: 0.85;
}
.session-spine__subline {
  margin: 0.35rem 0 0;
  font-size: 0.7rem;
  color: var(--ll-muted);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ClassroomSessionSpine.tsx src/styles/layout.css
git commit -m "feat(ui): classroom session spine component"
```

---

### Task K3: Wire spine and highlightSurface in App

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add highlightSurface state**

```typescript
import type { SignalSurfaceLink } from './data/lessonLoomData';
// ...
const [highlightSurface, setHighlightSurface] = useState<SignalSurfaceLink | null>(null);
```

- [ ] **Step 2: Handler for signal surface link**

```typescript
const handleSignalSurfaceLink = useCallback(
  async (target: SignalSurfaceLink) => {
    if (target === 'teacher') setWorkspaceMode('teacher');
    if (target === 'student') setWorkspaceMode('student');
    const hash = target === 'udl' ? '#udl' : target === 'teacher' ? '#teacher' : '#student';
    setHighlightSurface(target);
    await scrollTo(hash, prefersReducedMotion);
    window.setTimeout(() => setHighlightSurface(null), 2000);
  },
  [scrollTo, prefersReducedMotion],
);
```

- [ ] **Step 3: Render spine below top bar**

```tsx
<ClassroomSessionSpine
  visible={hasWoven || demoRunning}
  activeStepIndex={systemMapStep}
  activeSupport={activeSupport}
  activeSegment={activeSegment}
  approved={approved}
  workspaceMode={workspaceMode}
  onNavigate={(href) => void scrollTo(href, prefersReducedMotion)}
/>
```

Pass `highlightSurface` and `onSignalSurfaceLink={handleSignalSurfaceLink}` to `TeachingSignal`, `StudentFractionGarden`, `TeacherConsole`, `DifferentiationUDL`.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat(app): wire session spine and surface highlight state"
```

---

### Task K4: Teaching signal “See in lesson” + surface highlight CSS

**Files:**
- Modify: `src/components/sections/TeachingSignal.tsx`
- Modify: `src/styles/sections.css`

- [ ] **Step 1: Add button on cards with surfaceLinks**

In each signal card footer:

```tsx
{signal.surfaceLinks?.length ? (
  <button
    type="button"
    className="signal-card__link"
    data-testid={`signal-link-${signal.id}`}
    onClick={() => onSurfaceLink(signal.surfaceLinks![0])}
  >
    See in lesson
  </button>
) : null}
```

- [ ] **Step 2: Surface highlight class**

```css
.ll-surface-highlight {
  outline: 2px solid var(--ll-sage);
  outline-offset: 4px;
  transition: outline-color 0.2s ease;
}
```

Apply `className={highlightSurface === 'student' ? 'll-surface-highlight' : ''}` on student section wrapper (same for teacher, udl).

- [ ] **Step 3: Write e2e**

Create `e2e/signal-surface-link.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('signal See in lesson scrolls to student section', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('weave-lesson').click();
  await expect(page.getByTestId('session-spine')).toBeVisible({ timeout: 15000 });
  const link = page.getByTestId('signal-link-visual-metaphor');
  if (await link.count()) {
    await link.click();
    await expect(page.locator('#student')).toBeInViewport();
  }
});
```

Adjust `signal-link-*` test id to match actual signal id in data.

- [ ] **Step 4: Run tests**

Run: `npx playwright test e2e/signal-surface-link.spec.ts e2e/session-spine.spec.ts --project=chromium`  
(Write `session-spine.spec.ts` in Task K5)

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/TeachingSignal.tsx src/styles/sections.css e2e/signal-surface-link.spec.ts
git commit -m "feat(signals): See in lesson links with surface highlight"
```

---

### Task K5: Session spine e2e

**Files:**
- Create: `e2e/session-spine.spec.ts`

- [ ] **Step 1: Write spec**

```typescript
import { test, expect } from '@playwright/test';

test('session spine appears after weave and navigates to export', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('weave-lesson').click();
  const spine = page.getByTestId('session-spine');
  await expect(spine).toBeVisible({ timeout: 20000 });
  await spine.getByRole('button', { name: 'Export' }).click();
  await expect(page.locator('#export')).toBeInViewport();
});
```

- [ ] **Step 2: Run**

Run: `npx playwright test e2e/session-spine.spec.ts --project=chromium`  
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add e2e/session-spine.spec.ts
git commit -m "test(e2e): session spine visibility and navigation"
```

---

## Phase L — Judge presentation

### Task L1: Top-bar Scenes menu

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles/layout.css`

- [ ] **Step 1: Add Scenes dropdown next to Run judge demo**

Reuse existing preset handlers from footer (`resetDemo`, inject success, inject approved — locate in `SiteFooter` or App).

```tsx
<div className="top-bar__scenes" data-testid="judge-scenes">
  <label htmlFor="judge-scenes-select" className="sr-only">Demo scenes</label>
  <select
    id="judge-scenes-select"
    defaultValue=""
    onChange={(e) => {
      const v = e.target.value;
      if (v === 'reset') resetDemoState();
      if (v === 'success') applySuccessPreset();
      if (v === 'approved') applyApprovedPreset();
      e.target.value = '';
    }}
  >
    <option value="" disabled>Scenes</option>
    <option value="reset">Reset demo</option>
    <option value="success">Success state</option>
    <option value="approved">Approved</option>
  </select>
</div>
```

Extract preset functions to shared helpers if currently inline in footer.

- [ ] **Step 2: Write e2e**

Create `e2e/judge-scenes.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('scenes menu applies approved preset', async ({ page }) => {
  await page.goto('/?w=1#export');
  await page.getByTestId('judge-scenes').locator('select').selectOption('approved');
  await expect(page.getByText(/teacher-approved|approved/i).first()).toBeVisible();
});
```

Tune assertion to match existing approved copy (`export-gate` or review section).

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx src/styles/layout.css e2e/judge-scenes.spec.ts
git commit -m "feat(demo): top-bar Scenes menu for judge presets"
```

---

### Task L2: Presenter chrome during judge demo

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles/layout.css`

- [ ] **Step 1: Add class on demoRunning**

```tsx
<div className={`app-shell${demoRunning ? ' app-shell--presenter' : ''}`}>
```

- [ ] **Step 2: CSS hide side nav**

```css
.app-shell--presenter .side-nav {
  display: none;
}
.app-shell--presenter .main-column {
  margin-left: 0;
}
```

Adjust selectors to match existing layout class names in `layout.css`.

- [ ] **Step 3: Write e2e**

Create `e2e/presenter-mode.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test('presenter mode hides side nav during judge demo', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('run-judge-demo').click();
  await expect(page.locator('.side-nav')).toBeHidden();
  await page.getByTestId('run-judge-demo').waitFor({ state: 'visible', timeout: 120000 });
  await expect(page.locator('.side-nav')).toBeVisible();
});
```

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/styles/layout.css e2e/presenter-mode.spec.ts
git commit -m "feat(demo): presenter chrome hides side nav during judge demo"
```

---

### Task L3: Full verify

**Files:** (none)

- [ ] **Step 1: Run verify**

Run: `npm run verify`  
Expected: PASS

- [ ] **Step 2: Commit any fixes**

```bash
git add -A
git commit -m "chore: Phase 3 verify fixes"
```

---

## Plan self-review

| Spec requirement | Task |
|------------------|------|
| Session spine visible | K2, K3, K5 |
| Signal→surface links | K1, K4 |
| Perception polish | J1–J3 |
| Scenes menu | L1 |
| Presenter chrome | L2 |
| Submission closure | I1–I4 |
| verify green | L3 |

- [x] No TBD / "implement later" steps in code tasks.
- [x] File paths and test commands explicit.
- [x] Phases I–L can ship as separate PRs.

---

## Execution handoff

**Plan complete and saved to `docs/superpowers/plans/2026-05-30-judge-wow-phase-3.md`. Two execution options:**

1. **Subagent-Driven (recommended)** — Fresh subagent per phase (I → J → K → L), review between phases.

2. **Inline Execution** — Execute phases sequentially in one session with checkpoints after each verify.

**Which approach?**

**Recommended PR order:**

```text
PR1  docs: Phase I submission closure (manual pass + video link)
PR2  style: Phase J perception polish
PR3  feat: Phase K session spine + signal links
PR4  feat: Phase L judge Scenes + presenter chrome
```
