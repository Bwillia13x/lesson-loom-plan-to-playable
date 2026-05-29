# Judge Wow — Phase 2 Design Spec

**Status:** Ready for user review → implementation plan  
**Date:** 2026-05-29  
**Origin:** Brainstorming session (post unified-system-wow completion)  
**Prior work:** `docs/superpowers/specs/2026-05-29-unified-system-wow-design.md` (shipped), `docs/qa/ACCEPTANCE_STATUS.md`

---

## Executive summary

Lesson Loom’s **capability suite is implemented** and **first-order session coupling** is shipped (support lane → student copy, teacher segment → console body, devices mirror, phrase highlights, extended judge demo, system map). Judges who explore manually or via autoplay now see a coherent classroom session.

Phase 2 maximizes **wow probability** by attacking what remains:

1. **Submission confidence** — close manual QA gaps, verify live demo, ship the 60–90s artifact.
2. **Perception polish** — make the unified system *feel* premium at first glance (hero, garden, typography, focus).
3. **Second-order coupling** — tie **approval**, **class mode**, and **reflection** into the same session story export/review already hints at.
4. **Judge presentation layer** — make autoplay and presets legible without new product scope.

Novelty continues to come from **integration + care**, not new backends or fake AI.

---

## Current state (brainstorming context)

### Shipped unified system (2026-05-29)

| Capability | Evidence |
|------------|----------|
| Support/Core/Extend → student mission | `e2e/unified-session.spec.ts` |
| Timeline segment → teacher body | `teacherSegmentBodies` in `lessonLoomData.ts` |
| Devices preview live snapshot | `devicesSnapshot` in `App.tsx` |
| Source phrase highlight | `e2e/source-phrase.spec.ts` |
| Extended judge demo | `e2e/judge-demo.spec.ts` |
| System map | `MadeWithStitch` `data-testid="system-map"` |
| Shareable URL + presets | `e2e/demo-url.spec.ts`, footer presets |

### Open gaps (from `ACCEPTANCE_STATUS.md`)

- **Product perception:** “clear in 30s”, “not generic SaaS”, “useful to teacher” — manual only.
- **Visual:** ivory/typography/cards/garden centerpiece/hero screenshot — manual only.
- **Responsive:** 1440 / 1280 / 1024 / 430 — manual only.
- **A11y:** heading order, focus visibility, tab pass, contrast — manual only.
- **Submission:** live URL smoke, walkthrough video, final rules check — manual only.

### Strategic constraint (unchanged)

Per `AGENTS.md`, `09_PRIVACY_CLAIM_SAFETY.md`, `14_BUILD_EXECUTION_BRIEF.md`:

- No real AI, student accounts, LMS, grading automation, or compliance overclaims.
- One lesson (Fraction Garden) remains the hero.

---

## Success criteria (Phase 2)

1. **Judge path ≤ 90s** — Run judge demo + presenter captions + system map progression reads as one story; optional step rail shows progress.
2. **Manual QA matrix ≥ 90% checked** with dated evidence in `ACCEPTANCE_STATUS.md` (remaining items documented as blocked if no Safari).
3. **Live demo verified** — GitHub Pages URL loads; judge demo completes without console errors (existing e2e + manual note).
4. **Second-order coupling visible** — Approving review updates export + system map; class mode changes teacher copy; saved reflection appears in teacher exit-ticket context and zip.
5. **`npm run verify` green** — No regression to claim-safe copy (`e2e/copy-deck.spec.ts`).

---

## Approaches considered

### A — Submission hardening only (P0)

Complete manual QA, record walkthrough, verify Pages URL, optional viewport Playwright matrix.

**Pros:** Highest contest ROI; zero scope risk.  
**Cons:** Does not increase *felt* unity when judges click around.

### B — Perception polish only (visual/CSS/a11y)

Hero/garden/card pass, focus rings, typography, automated screenshot matrix for submission assets.

**Pros:** Fixes “generic SaaS” and screenshot hero risks from red-team review.  
**Cons:** Leaves approval/reflection/classMode as isolated toggles.

### C — Second-order session coupling (recommended core)

Propagate `approved`, `classMode`, and `reflectionSaved` into export UI, system map step, teacher segment body selection, and weave banner — data-driven from `lessonLoomData.ts`.

**Pros:** Strongest “unified system” story for manual explorers; low backend risk.  
**Cons:** Requires careful copy to avoid implying automated workflow approval.

### D — Judge presentation layer

Demo step rail (8 beats), caption polish, optional class-mode beat in `runJudgeDemo`, workshop preset in top bar.

**Pros:** Autoplay judges get clarity; complements C.  
**Cons:** Must stay under 90s; respect reduced motion.

### Recommendation

**Hybrid A + B + C + D in four implementation phases** (separate PRs acceptable):

| Phase | Focus | Primary outcome |
|-------|--------|-----------------|
| **E** | Submission closure | Contest-ready package |
| **F** | Perception polish | Screenshot-worthy hero + garden |
| **G** | Second-order coupling | Approval / class / reflection unity |
| **H** | Judge presentation | Demo legibility |

Defer: second playable lesson, real iframe devices, LLM parsing, confetti, LMS features.

---

## Architecture

### Session model (extended derived state)

Existing App state remains source of truth. Add **derived presentation flags** (no new backend):

```text
approved: boolean
classMode: 'whole' | 'groups'
reflectionSaved: boolean
reflectionText: string

Derived (new)
  exportGateLabel      ← approved ? 'Ready for handoff' : 'Awaiting teacher review'
  systemMapStep        ← existing; bump to 4 only when approved (already partial)
  teacherSegmentBody   ← merge classMode variant into segmentBodies lookup
  devicesSnapshot      ← add approved + classMode labels (read-only)
  weaveBannerSummary   ← f(activeSupport, approved, checkSuccess) one-line status
```

### Data additions (`lessonLoomData.ts`)

```typescript
teacherSegmentBodies: Record<TimelineId, SegmentBody>  // exists
teacherSegmentBodiesByClassMode?: Record<ClassMode, Partial<Record<TimelineId, SegmentBodyOverride>>>
// OR simpler: classMode only overrides 'partner' and 'ticket' segments

exportPackMeta: {
  pendingReviewCopy: string
  approvedCopy: string
}
```

Prefer **small overrides** keyed by `classMode` for 2 segments rather than duplicating full bodies.

### Approval propagation

| Surface | Behavior when `approved === false` | When `approved === true` |
|---------|-----------------------------------|---------------------------|
| `ExportPackSection` | Subtle banner: “Complete review before classroom handoff” | Existing approved pip + full download emphasis |
| `MadeWithStitch` system map | Step 4 (Review) active, Export dimmed | Steps 4–5 active |
| `devicesSnapshot` | Label: “Review pending” | Label: “Teacher approved” |
| Zip download | Unchanged (allowed) but `README.txt` in zip notes approval state |

No lock-out of copy buttons — teachers can still preview exports; language stays **draft / teacher-reviewed**.

### Class mode propagation

- `TeacherConsole`: when `classMode === 'groups'`, partner segment shows group roles + rotation prompt; whole class keeps current copy.
- Optional: student hint line mentions “Talk with your partner” only in groups mode (copy only).
- Judge demo: optional 2s beat toggling `classMode` on teacher segment (caption explains pacing flexibility).

### Reflection propagation

- When `reflectionSaved` and `activeSegment === 'ticket'`, teacher console shows excerpt: “Student reflection saved (demo): …” truncated to 120 chars.
- Zip already includes reflection; add **teacher-console.txt** snippet in zip when saved.
- Student mission progress rail: mark reflection step complete when saved (wire existing `ProgressRail` if not already on reflection CTA).

### Judge presentation layer

```text
Top bar during demoRunning:
  [Demo 3/8] caption text (existing presenterCaptions)
  Optional progress dots (aria-hidden decorative + sr-only step name)

Footer presets (existing): keep Reset / Success / Approved
Add top-bar compact "Scenes" menu duplicating presets for judges who don't scroll to footer
```

### Perception polish (Phase F)

Target files: `src/styles/tokens.css`, `sections.css`, `HeroLanding.tsx`, `StudentFractionGarden.tsx`, `primitives.css`.

- Hero: stronger plan↔app visual hierarchy; ensure trust line contrast ≥ 4.5:1 on ivory.
- Garden: increase tile tactile shadow/border; garden beds react to selection with clearer fill.
- Cards: consistent `--ll-radius` and shadow token on all `Panel` uses.
- Focus: `:focus-visible` ring token used on all interactive controls in student/teacher paths.

### Submission closure (Phase E)

- Run `npm run capture:screenshots` and attach paths in `docs/submission/README.md`.
- Add `e2e/viewports.spec.ts` for 1440/1280/1024/430 — assert no horizontal overflow + hero visible.
- Update `ACCEPTANCE_STATUS.md` with evidence links and date.
- `docs/submission/RECORDING.md` checklist for 60–90s video.

---

## Scope boundaries

### In scope

Phases E–H as described; e2e for new coupling; ACCEPTANCE_STATUS updates; walkthrough script tweak for approval + class mode beats.

### Out of scope

- Second playable lesson
- Real responsive iframe
- AI re-extraction on plan edit
- Student accounts / LMS / analytics
- Heavy celebration (confetti)

---

## Testing strategy

| Test | Covers |
|------|--------|
| `e2e/unified-session.spec.ts` (extend) | classMode copy change |
| `e2e/judge-demo.spec.ts` (extend) | progress rail visible |
| `e2e/export-zip.spec.ts` (extend) | zip includes approval note |
| `e2e/viewports.spec.ts` (new) | widths overflow |
| `e2e/copy-deck.spec.ts` | no new risky claims |
| Manual | walkthrough video, Safari if available |

---

## Risks

| Risk | Mitigation |
|------|------------|
| Over-scoping Phase G | Cap at 3 propagation targets: approved, classMode (2 segments), reflection excerpt |
| Demo too long | Class mode beat optional; skip under reduced motion |
| Implies auto-approval | Copy: “Teacher marked draft approved” not “system approved” |
| Visual pass breaks layout | Viewport e2e before/after |

---

## Assumptions (brainstorming defaults)

- Contest deadline prioritizes **Phase E** before **F/G/H**.
- Drew wants maximum judge impact without violating AGENTS.md boundaries.
- GitHub Pages URL from README remains canonical live demo.
- No Visual Companion session was required for this strategic doc.

---

## Spec self-review

- [x] No TBD placeholders.
- [x] Consistent with AGENTS.md and privacy doc.
- [x] Scoped into four phases; each can be one PR.
- [x] Ambiguity resolved: export remains usable before approval; only copy/emphasis changes.

---

## Next step

User reviews this spec → approve → implement via `docs/superpowers/plans/2026-05-29-judge-wow-phase-2.md`.
