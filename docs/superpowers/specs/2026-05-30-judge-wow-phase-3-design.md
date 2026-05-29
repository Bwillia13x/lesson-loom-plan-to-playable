# Judge Wow — Phase 3 Design Spec

**Status:** Approved — ce-plan at `docs/plans/2026-05-30-002-feat-judge-wow-phase-3-plan.md`  
**Date:** 2026-05-30  
**Origin:** Brainstorming session (post Phase 1 unified session + Phase 2 coupling/submission automation)  
**Prior work:** `2026-05-29-unified-system-wow-design.md`, `2026-05-29-judge-wow-phase-2-design.md` (largely shipped on `main`)

---

## Executive summary

Lesson Loom now has a **functionally unified classroom session**: support lanes change student copy, teacher segments change console bodies, devices mirror state, approval/reflection/class mode propagate, judge demo visits the full arc, and automated e2e covers most functional acceptance.

Phase 3 maximizes **judge and teacher “wow”** by closing what automation cannot finish alone, and by making the **unified system visible at a glance**—not only when judges click every panel.

Strategic effect (unchanged):

```text
trusted lesson plan → teaching signal → one live lesson (student + teacher + differentiation)
→ teacher review → Stitch-native export pack
```

Novelty continues to come from **integration + care**, not new backends, fake AI, or a second lesson.

---

## Current state (brainstorming context)

### Shipped (through 2026-05-29 on `main`)

| Layer | Evidence |
|-------|----------|
| First-order session coupling | `e2e/unified-session.spec.ts` |
| Second-order coupling | `e2e/phase2-session.spec.ts`, export zip readme, system map review/export steps |
| Judge narrative | `e2e/judge-demo.spec.ts`, `presenterCaptions.ts`, demo rail |
| Shareable URL + presets | `e2e/demo-url.spec.ts`, footer presets |
| Viewport automation | `e2e/viewports.spec.ts` |
| Live Pages URL | `docs/submission/README.md`, `ACCEPTANCE_STATUS.md` |

### Remaining gaps (from `docs/qa/ACCEPTANCE_STATUS.md`)

| Category | Open items | Why it matters for judges |
|----------|------------|---------------------------|
| Product perception | “clear in 30s”, “not generic SaaS”, “useful to teacher” | First-impression contest scoring |
| Visual polish | ivory/typography/cards/garden hero/ restrained motion | Screenshot hero + emotional legibility |
| Responsive manual | tile wrap, export stack, hero balance | Mobile judges, Contra preview |
| A11y manual | heading order, full tab pass, contrast | Professional credibility |
| Submission | 60–90s video, Safari spot-check, final rules | Required submission artifacts |
| Deferred Phase 2 UX | Top-bar **Scenes** menu (footer presets only) | Judges who never scroll to footer |

### Strategic constraint (unchanged)

Per `AGENTS.md`, `09_PRIVACY_CLAIM_SAFETY.md`, `14_BUILD_EXECUTION_BRIEF.md`:

- No real AI, student accounts, LMS, grading automation, or compliance overclaims.
- One hero lesson: **Fraction Garden**.

---

## Success criteria (Phase 3)

1. **Unified system is visible without exploration** — A persistent **session spine** shows plan → weave → live lesson (lane, segment, approval) while scrolling; system map remains the export-story anchor.
2. **Grounding feels bidirectional** — Teaching signal cards link to plan phrases (existing) **and** to the student/teacher surface they inform (new, deterministic).
3. **Screenshot / video ready** — Hero and Fraction Garden pass a defined visual checklist; `capture:screenshots` outputs are submission-grade.
4. **Submission package closed** — `ACCEPTANCE_STATUS.md` documents manual evidence with dates; walkthrough video linked; Safari/rules called out as done or N/A.
5. **Judge replay friction → zero** — Top-bar **Scenes** duplicates footer presets; optional **Presenter chrome** hides side nav during demo/video.
6. **`npm run verify` green** — No regression to claim-safe copy.

---

## Approaches considered

### A — Submission closure only (P0)

Complete manual QA matrix, record walkthrough, Safari note, final rules check. No new UI.

**Pros:** Highest contest ROI; zero regression risk.  
**Cons:** Manual explorers still miss “one system” unless they run autoplay.

### B — Perception polish only (visual/CSS)

Hero/garden/card pass, contrast tokens, focus audit, screenshot script refresh.

**Pros:** Fixes red-team Risk 2 (childish/generic) and hero screenshot risk.  
**Cons:** Integration story still implicit.

### C — Session spine + signal→surface linking (recommended core)

Add a compact **classroom session spine** (sticky below top bar) driven from existing `App` state. Extend `teachingSignals` metadata with `linksTo: ('student' \| 'teacher' \| 'udl')[]` for scroll + brief highlight pulses (CSS, reduced-motion safe).

**Pros:** Strongest “unified suite” perception; reuses state, no backend.  
**Cons:** Must stay minimal—no dashboard clutter (red-team Risk 5).

### D — Judge presentation completion

Top-bar Scenes menu, optional presenter chrome (hide side nav + dim non-essential chrome), walkthrough script timestamps aligned to demo beats.

**Pros:** Workshop hosts and video recording.  
**Cons:** Scope creep if chrome modes multiply.

### Recommendation

**Hybrid A + B + C + D in four implementation phases** (separate PRs acceptable):

| Phase | Focus | Primary outcome |
|-------|--------|-----------------|
| **I** | Submission closure | Contest-ready evidence + video link |
| **J** | Perception polish | Screenshot-worthy hero + garden |
| **K** | Session spine + signal links | Unified system visible while scrolling |
| **L** | Judge presentation | Scenes menu + presenter chrome |

**Defer:** second playable lesson, real device iframes, LLM re-extract on plan edit, confetti, LMS features.

---

## Architecture

### Session spine (Phase K)

```text
App state (unchanged source of truth)
  hasWoven, studentAppActive, activeSupport, activeSegment,
  workspaceMode, approved, checkSuccess, classMode

New component: ClassroomSessionSpine.tsx
  Renders 5 pips: Plan · Signals · Lesson · Review · Export
  Active pip derived from systemMapStep + activeNav intersection
  Subline: "Core lane · Partner segment · Teacher-approved" (derived labels)

Placement: below .top-bar, position sticky, z-index below modals
Visibility: hidden until hasWoven OR demoRunning (avoid hero clutter)
```

**Design rules:**

- One line + optional subline; no charts or fake analytics.
- Clicking a pip scrolls to `#intake`, `#signals`, `#student`/`#teacher` (mode-aware), `#review`, `#export`.
- Respects `prefers-reduced-motion` (no sliding marquee).

### Signal → surface linking (Phase K)

Extend `lessonLoomData.ts`:

```typescript
type SignalLinkTarget = 'student' | 'teacher' | 'udl';

teachingSignals: Array<{
  // existing fields…
  surfaceLinks?: SignalLinkTarget[];
}>;
```

On signal card **“See in lesson”** control (secondary button):

1. `scrollTo` target section.
2. Set `highlightSurface: SignalLinkTarget | null` for 2s (CSS class on `#student`, `#teacher`, or `#udl`).
3. Do not auto-change `workspaceMode` unless target is student/teacher (switch mode when needed).

**Claim safety:** Button label is navigational (“See in lesson”), not “AI applied.”

### Perception polish (Phase J)

Target files: `tokens.css`, `sections.css`, `HeroLanding.tsx`, `StudentFractionGarden.tsx`, `primitives.css`.

| Area | Change |
|------|--------|
| Hero | Stronger plan↔preview hierarchy; eyebrow contrast ≥ 4.5:1; tighten `hero-visual` grid |
| Garden | Tile shadow/border tokens; `garden-bed--active` fill when tile selected in bed |
| Cards | Unify `Panel` shadow/radius via tokens |
| Motion | No new infinite loops; garden success stays GSAP/CSS gated |

### Judge presentation (Phase L)

```text
Top bar:
  [Scenes ▾] → Reset | Success state | Approved (same as footer presets)

Presenter chrome (toggle or auto during demoRunning):
  body.ll-presenter-mode → hide .side-nav, reduce top-bar noise
  Optional: data-testid="presenter-mode"
```

### Submission closure (Phase I)

| Task | Artifact |
|------|----------|
| Manual QA pass | `ACCEPTANCE_STATUS.md` checkboxes + `docs/qa/MANUAL_PASS_2026-05-30.md` |
| Walkthrough video | Link in `docs/submission/README.md` + `RECORDING.md` |
| Safari | Note in manual pass (pass / N/A) |
| Rules | Checkbox in submission README |
| Screenshot regen | `npm run capture:screenshots` paths documented |

---

## Scope boundaries

### In scope

Phases I–L; e2e for spine visibility, signal link scroll, scenes menu, presenter mode; ACCEPTANCE_STATUS updates.

### Out of scope

- Second playable lesson
- Real responsive iframe / device lab
- AI re-extraction when plan text edits
- Student accounts, LMS, analytics
- Heavy celebration effects

---

## Testing strategy

| Test | Covers |
|------|--------|
| `e2e/session-spine.spec.ts` (new) | Spine visible after weave; pip click scrolls |
| `e2e/signal-surface-link.spec.ts` (new) | Signal “See in lesson” reaches student section |
| `e2e/judge-scenes.spec.ts` (new) | Scenes menu sets approved preset |
| `e2e/presenter-mode.spec.ts` (new) | Side nav hidden when presenter on |
| `e2e/copy-deck.spec.ts` | No new risky claims |
| Manual | Video, Safari, visual checklist in manual pass doc |

---

## Risks

| Risk | Mitigation |
|------|------------|
| Spine feels like SaaS dashboard | Single line, 5 pips max, hide on hero |
| Signal links confuse mode | Switch workspace only when target requires it |
| Presenter mode hides too much | Only hide side nav; keep top bar + captions |
| Video scope blocks ship | Phase I can complete before K/L |

---

## Assumptions (brainstorming defaults)

- Contest priority: **Phase I** first, then **J + K** in parallel if capacity allows, **L** last.
- Drew wants maximum judge impact within AGENTS.md boundaries.
- GitHub Pages URL remains canonical live demo.
- Visual Companion was not required for this strategic document.

---

## Spec self-review

- [x] No TBD placeholders.
- [x] Consistent with AGENTS.md and privacy doc.
- [x] Scoped into four phases; each can be one PR.
- [x] Ambiguity resolved: spine hidden until weave; export still usable before approval.

---

## Next step

Implement via:
- **Decision plan:** `docs/plans/2026-05-30-002-feat-judge-wow-phase-3-plan.md` (requirements, KTDs, U1–U10)
- **Execution checklist:** `docs/superpowers/plans/2026-05-30-judge-wow-phase-3.md` (step-level tasks)
