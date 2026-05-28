# GSAP Motion Polish (Phase 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish GSAP motion integration for Lesson Loom by centralizing reduced-motion defaults, removing dead CSS, activating the student section when the weave completes, and adding Playwright coverage for `prefers-reduced-motion` — without new product scope.

**Architecture:** Build on the existing `src/motion/` layer (`createWeaveTimeline`, `weaveTiming`, `gsapReducedMotion`) introduced on branch `cursor/gsap-motion-refinement-4b41` (PR #3). Keep React state in `App.tsx` as the source of truth for weave step; GSAP handles entrance/timeline choreography only. CSS remains for hover/focus micro-interactions; infinite decorative loops stay gated by global reduced-motion CSS.

**Tech Stack:** React 19, TypeScript, Vite 6, GSAP 3.15+ (`gsap`, `MotionPathPlugin`), Playwright, existing `usePrefersReducedMotion` hook.

**Prerequisites:** Merge or checkout `cursor/gsap-motion-refinement-4b41` (or `main` after PR #3 merges). Run `npm install` before starting.

**Source docs to respect:**
- `16_INTERACTION_AND_MOTION_SPEC.md` — weave timing, 900ms+ signal reveal, reduced motion, student app activation at weave end
- `AGENTS.md` — no backend, deterministic state, accessibility
- gsap-core principles — `gsap.context` cleanup, `autoAlpha`, `gsap.matchMedia`, prefer transforms over layout

---

## Baseline (already shipped in PR #3)

| Item | Location |
|------|----------|
| GSAP dependency | `package.json` |
| Weave timeline | `src/motion/createWeaveTimeline.ts`, `App.tsx` |
| Hero weave line | `src/components/WeaveSignalLine.tsx` |
| Signal card stagger @ 900ms | `src/components/sections/TeachingSignal.tsx` |
| Success pulse GSAP | `src/components/sections/StudentFractionGarden.tsx` |
| Scroll respects reduced motion | `src/utils/scroll.ts` |
| Banner after weave complete | `App.tsx` (`activeWeaveStep >= weaveSteps.length - 1`) |

## Gaps this plan closes

1. `reducedMotionMedia` in `gsapReducedMotion.ts` is a no-op stub — no shared GSAP defaults.
2. Dead CSS: `.garden-success--pulse` / `@keyframes success-pulse` unused after GSAP pulse.
3. Spec: “Student app gains active state” at end of weave — `#student` section has no post-weave activation styling.
4. No e2e asserting reduced-motion weave completes immediately and banner appears without 820ms wait.
5. No short `src/motion/README.md` for the next agent touching motion code.

---

## File map (this plan)

| File | Responsibility |
|------|----------------|
| `src/motion/gsapReducedMotion.ts` | Real `gsap.matchMedia` defaults for reduce vs no-preference |
| `src/motion/index.ts` | Re-export motion public API (optional barrel) |
| `src/main.tsx` | Import motion init once at app boot |
| `src/styles.css` | Remove dead success-pulse keyframes; add `#student` woven state |
| `src/App.tsx` | Pass `studentAppActive` to `StudentFractionGarden` |
| `src/components/sections/StudentFractionGarden.tsx` | Apply woven-active class on section/panel |
| `e2e/reduced-motion.spec.ts` | Playwright `emulateMedia({ reducedMotion: 'reduce' })` weave test |
| `package.json` | Optional: include new spec in `test:smoke` or document in `verify` |
| `src/motion/README.md` | Agent-facing motion conventions |

---

### Task 1: Wire shared GSAP reduced-motion defaults

**Files:**
- Modify: `src/motion/gsapReducedMotion.ts`
- Modify: `src/main.tsx`
- Create: `src/motion/index.ts`

- [ ] **Step 1: Replace stub `reducedMotionMedia` with real defaults**

Replace the contents of `src/motion/gsapReducedMotion.ts` with:

```typescript
import gsap from 'gsap';

/** Shared matchMedia context — import once at app boot via `initGsapMotion()`. */
export const reducedMotionMedia = gsap.matchMedia();

const DEFAULT_EASE = 'power2.out';
const DEFAULT_DURATION = 0.5;

/**
 * Registers GSAP global defaults per prefers-reduced-motion.
 * Call exactly once from `main.tsx` before `createRoot().render()`.
 */
export function initGsapMotion(): void {
  reducedMotionMedia.add(
    { reduceMotion: '(prefers-reduced-motion: reduce)' },
    () => {
      gsap.defaults({ duration: 0, ease: 'none' });
      return () => {
        gsap.defaults({ duration: DEFAULT_DURATION, ease: DEFAULT_EASE });
      };
    },
  );

  reducedMotionMedia.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.defaults({ duration: DEFAULT_DURATION, ease: DEFAULT_EASE });
    return () => {
      gsap.defaults({ duration: DEFAULT_DURATION, ease: DEFAULT_EASE });
    };
  });
}

export function runWithMotion(
  reducedMotion: boolean,
  animate: () => void,
  instant?: () => void,
): void {
  if (reducedMotion) {
    instant?.();
    return;
  }
  animate();
}
```

- [ ] **Step 2: Create barrel export**

Create `src/motion/index.ts`:

```typescript
export { createWeaveTimeline } from './createWeaveTimeline';
export {
  initGsapMotion,
  reducedMotionMedia,
  runWithMotion,
} from './gsapReducedMotion';
export {
  WEAVE_SIGNAL_REVEAL_DELAY_S,
  WEAVE_STEP_DELAYS_MS,
} from './weaveTiming';
```

- [ ] **Step 3: Initialize at app boot**

In `src/main.tsx`, add before `createRoot`:

```typescript
import { initGsapMotion } from './motion/gsapReducedMotion';

initGsapMotion();
```

- [ ] **Step 4: Verify build**

Run: `npm run build`  
Expected: exit code 0, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/motion/gsapReducedMotion.ts src/motion/index.ts src/main.tsx
git commit -m "feat(motion): initialize GSAP matchMedia defaults at boot"
```

---

### Task 2: Remove dead success-pulse CSS

**Files:**
- Modify: `src/styles.css`
- Test: `npm run build` (grep ensures no references)

- [ ] **Step 1: Confirm no references to `garden-success--pulse`**

Run:

```bash
rg 'garden-success--pulse' /workspace/src
```

Expected: only `src/styles.css` (no TSX usage).

- [ ] **Step 2: Delete dead rules**

In `src/styles.css`, remove these blocks entirely (lines ~949–965):

```css
.garden-success--pulse {
  animation: success-pulse 0.6s ease;
}

@keyframes success-pulse {
  ...
}
```

Do **not** remove `.garden-success` base styles.

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint`  
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/styles.css
git commit -m "chore(motion): remove unused garden-success CSS keyframes"
```

---

### Task 3: Student app “active” state when weave completes

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/sections/StudentFractionGarden.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Add CSS for woven student section**

Append to `src/styles.css` (near other garden styles):

```css
/* Student app activates when weave reaches final step (spec ~820ms) */
#student.ll-section--woven-active .panel {
  box-shadow:
    0 0 0 2px var(--ll-orange),
    var(--ll-shadow-soft);
  transition: box-shadow 0.35s ease;
}

@media (prefers-reduced-motion: reduce) {
  #student.ll-section--woven-active .panel {
    transition: none;
  }
}
```

`Panel` root class is `panel` (see `src/components/ui/Panel.tsx`).

- [ ] **Step 2: Extend `StudentFractionGarden` props**

In `src/components/sections/StudentFractionGarden.tsx`, add prop and apply to `Section`:

```typescript
type StudentFractionGardenProps = {
  // ...existing props
  studentAppActive?: boolean;
};

export function StudentFractionGarden({
  // ...
  studentAppActive = false,
}: StudentFractionGardenProps) {
  return (
    <Section
      id="student"
      workspace="student"
      className={studentAppActive ? 'll-section--woven-active' : ''}
      // ...rest unchanged
    >
```

- [ ] **Step 3: Pass flag from `App.tsx`**

After imports ensure `weaveSteps` is imported. Add derived flag near other state:

```typescript
const studentAppActive =
  hasWoven && activeWeaveStep >= weaveSteps.length - 1;
```

Pass to component:

```tsx
<StudentFractionGarden
  // ...existing props
  studentAppActive={studentAppActive}
/>
```

- [ ] **Step 4: Manual check**

Run: `npm run dev`  
1. Click **Weave lesson**  
2. Wait until weave completes (~820ms) or use reduced motion for instant complete  
3. Scroll to `#student` — panel should show orange ring shadow  

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/components/sections/StudentFractionGarden.tsx src/styles.css
git commit -m "feat(motion): highlight student section when weave completes"
```

---

### Task 4: Playwright reduced-motion weave test

**Files:**
- Create: `e2e/reduced-motion.spec.ts`
- Modify: `package.json` (optional — extend `test:smoke`)

- [ ] **Step 1: Write the spec file**

Create `e2e/reduced-motion.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';

test('reduced motion: weave completes immediately and banner shows', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const started = Date.now();
  await page.getByTestId('weave-lesson').first().click();

  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({
    timeout: 800,
  });

  const elapsed = Date.now() - started;
  expect(elapsed).toBeLessThan(600);

  await expect(
    page.getByRole('progressbar', { name: /weave complete/i }),
  ).toBeVisible();
});

test('reduced motion: scroll uses auto behavior on workspace toggle', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await page.getByTestId('weave-lesson').first().click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({
    timeout: 800,
  });

  await page.getByTestId('workspace-teacher').click();
  await expect(page.locator('#teacher')).toBeInViewport();
});
```

If progressbar aria name differs, inspect `LessonWeave.tsx` `aria-valuetext` when complete and adjust matcher to:

```typescript
await expect(page.locator('[role="progressbar"]')).toHaveAttribute(
  'aria-valuetext',
  'Weave complete',
);
```

- [ ] **Step 2: Run the new spec**

Run: `npx playwright test e2e/reduced-motion.spec.ts`  
Expected: 2 passed.

- [ ] **Step 3: Run full smoke + new spec**

Run: `npm run test:smoke && npx playwright test e2e/reduced-motion.spec.ts`  
Expected: all passed.

- [ ] **Step 4: Optional — add to smoke script**

In `package.json`, update:

```json
"test:smoke": "playwright test e2e/smoke.spec.ts e2e/reduced-motion.spec.ts"
```

- [ ] **Step 5: Commit**

```bash
git add e2e/reduced-motion.spec.ts package.json
git commit -m "test(e2e): cover prefers-reduced-motion weave and navigation"
```

---

### Task 5: Motion module README for future agents

**Files:**
- Create: `src/motion/README.md`

- [ ] **Step 1: Write README**

Create `src/motion/README.md`:

```markdown
# Lesson Loom — Motion (GSAP)

## Boot

`initGsapMotion()` runs once in `src/main.tsx` and sets `gsap.defaults()` via `gsap.matchMedia()`.

## Weave sequence

- Timing constants: `weaveTiming.ts` (`WEAVE_STEP_DELAYS_MS`, `WEAVE_SIGNAL_REVEAL_DELAY_S`)
- Timeline factory: `createWeaveTimeline(onStep, reducedMotion)` — killed from `App.tsx` on re-weave/unmount
- React state: `activeWeaveStep` starts at `-1` on weave CTA; steps fire at 100–820ms

## Components using GSAP

| Component | Behavior |
|-----------|----------|
| `WeaveSignalLine` | Path draw + motion-path orb (finite repeats) |
| `TeachingSignal` | Card stagger at 900ms after `hasWoven` |
| `StudentFractionGarden` | Success message `fromTo` pulse |

## Reduced motion

- User setting: `usePrefersReducedMotion()` in React
- Imperative gate: `runWithMotion(reduced, animate, instant)`
- Scroll: `scrollToSection(id, { reducedMotion })`

Do not add infinite decorative loops without reduced-motion off switch.
```

- [ ] **Step 2: Commit**

```bash
git add src/motion/README.md
git commit -m "docs(motion): add agent README for GSAP conventions"
```

---

### Task 6: Final verification and PR update

**Files:**
- Modify: `docs/qa/ACCEPTANCE_STATUS.md` (if exists) — optional motion row

- [ ] **Step 1: Full verify**

Run:

```bash
npm run build
npm run lint
npm run test:smoke
npx playwright test e2e/reduced-motion.spec.ts
```

Expected: all PASS.

- [ ] **Step 2: Update acceptance doc (if present)**

If `docs/qa/ACCEPTANCE_STATUS.md` exists, add under motion:

```markdown
- [x] GSAP weave timeline + reduced-motion e2e (`e2e/reduced-motion.spec.ts`)
- [x] Student section active styling post-weave
```

- [ ] **Step 3: Commit**

```bash
git add docs/qa/ACCEPTANCE_STATUS.md 2>/dev/null || true
git commit -m "chore: verify GSAP motion polish phase 2" --allow-empty
```

Only use `--allow-empty` if no doc changes; otherwise commit doc only.

- [ ] **Step 4: Push branch**

```bash
git push -u origin cursor/gsap-motion-refinement-4b41
```

(Update PR #3 description or open new PR if branch differs.)

---

## Self-review (plan author checklist)

| Spec / requirement | Task |
|--------------------|------|
| Reduced motion preserves state | Task 1 defaults; Task 4 e2e |
| Student app active at weave end | Task 3 |
| No decorative noise / dead CSS | Task 2 |
| Agent discoverability | Task 5 |
| Weave timing unchanged | No task modifies `WEAVE_STEP_DELAYS_MS` |
| No new product scope | No new sections/APIs |

**Placeholder scan:** No TBD steps. All code blocks are complete.

**Type consistency:** `studentAppActive` used consistently in Task 3; `initGsapMotion` defined in Task 1 and imported in `main.tsx`.

---

## Subagent-driven execution notes

**Branch:** `cursor/gsap-motion-refinement-4b41` (append `-4b41` suffix on new branches per cloud instructions).

**Per task workflow:**
1. Dispatch implementer with **full task text** from this file (do not ask subagent to open this plan).
2. Spec reviewer: compare against `16_INTERACTION_AND_MOTION_SPEC.md` + Task goal.
3. Code quality reviewer: check `gsap.context` cleanup, no new infinite loops, Playwright stability.
4. Mark todo complete before next task.

**Model hints:**
- Tasks 1–2: fast model (mechanical)
- Task 3: standard (CSS selector verification)
- Task 4: standard (Playwright flakiness)
- Tasks 5–6: fast model

**Do not parallelize implementers** — single branch, sequential commits.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-28-gsap-motion-polish-phase-2.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — Fresh subagent per task above, spec review then code quality review after each task.

2. **Inline Execution** — Run tasks in this session with executing-plans checkpoints.

Which approach do you want?
