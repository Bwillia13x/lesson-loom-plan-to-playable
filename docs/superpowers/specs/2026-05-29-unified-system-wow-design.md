# Unified System Wow — Design Spec

**Status:** Approved for planning (agent-synthesized)  
**Date:** 2026-05-29  
**Origin:** Brainstorming session for Google Stitch / Contra judge impact  
**Related plans:** `docs/superpowers/plans/2026-05-28-capability-review-and-future-enhancements.md`

---

## Problem frame

Lesson Loom already implements the full section flow (Hero → Stitch) with strong individual interactions: weave, fraction garden, export zip, shareable URLs, and judge autoplay. Judges and teachers still experience **three parallel demos**—weave/student, teacher console, and UDL lanes—connected mainly by scroll and workspace dimming, not by a single **classroom session** that evolves together.

The strategic effect we want is:

```text
trusted lesson plan → extracted signals → one live lesson (student + teacher + differentiation)
→ teacher review → Stitch-native export pack
```

Novelty for judges should come from **integrated capability** (everything reacts to the same lesson state) and **polish** (motion, grounding, devices, submission confidence)—not from new product categories, backend, or fake AI.

---

## Success criteria

1. A judge running **Run judge demo** sees the **full transformation arc**, including teaching signals and differentiation—not only student success and export.
2. Changing **Support / Core / Extend** visibly changes the student mission (copy and/or scaffolds) while staying deterministic and claim-safe.
3. **Teacher console** segment selection changes pacing copy (not only the active badge).
4. **Devices** section reflects live workspace state (woven, mode, lane, segment)—not static placeholders.
5. **Source phrase** clicks highlight the matching phrase in the editable plan (scroll + visual mark).
6. **Submission track** closes remaining P0 gaps in `docs/qa/ACCEPTANCE_STATUS.md` (manual matrix, live URL verification, walkthrough artifact).
7. No new prohibited claims; `npm run verify` stays green.

---

## Approaches considered

### A — Classroom session orchestration (recommended core)

Introduce a small derived **classroom session** model in `App.tsx` that propagates `activeSupport` and `activeSegment` into student, teacher, and devices sections. Data stays in `lessonLoomData.ts`; components receive props instead of owning isolated toggles.

**Pros:** Highest “unified system” payoff; aligns with product journey.  
**Cons:** Requires careful copy/data splits; must not imply live student data.

### B — Narrative spine only (judge demo + visual thread)

Extend `runJudgeDemo` to visit `#signals` and `#udl`; add a lightweight “system map” in Hero or Made with Stitch showing plan → app → export.

**Pros:** Fast; low regression risk.  
**Cons:** Does not fix disconnected toggles when judges explore manually.

### C — Submission hardening only

Complete manual QA, deploy verification, video—no new coupling.

**Pros:** Critical for contest deadline.  
**Cons:** Misses novelty of integrated suite.

### Recommendation

**Hybrid A + B + parallel C:** Ship session orchestration for 2–3 high-impact couplings, extend judge narrative and grounding UX, and run a submission-hardening pass in the same sprint (separate PR if needed). Defer real second lesson, LLM parsing, and LMS-style features.

---

## Architecture

### Classroom session (derived, no new backend)

```text
App state (existing)
  hasWoven, activeWeaveStep, workspaceMode, activeSupport, activeSegment,
  classMode, selectedTileIds, approved, lessonPlanDraft, …

Derived flags (new)
  studentLaneContent  ← differentiation[activeSupport]
  teacherSegmentContent ← teacherTimeline segment + segmentBodies map
  devicesSnapshot     ← { woven, mode, support, segment, tileLabels }

Consumers
  StudentFractionGarden  ← activeSupport props (mission hint, tile filter rules)
  TeacherConsole         ← segment body from data map
  DifferentiationUDL     ← optional “previewing for student” pip when mode=student
  ResponsivePreview      ← devicesSnapshot props
  ExportPackSection      ← optional approved badge / reflection excerpt in zip metadata
```

### Grounding layer

- Wrap `lessonPlanDraft` phrases with `<mark data-phrase-id>` when rendering intake (or overlay highlights on focus).
- `TeachingSignal` source buttons set `highlightPhraseId` in App; intake scrolls and applies `.lesson-plan__phrase--active`.

### Judge demo narrative (extended beats)

| Step | Section | Action |
|------|---------|--------|
| 1 | Weave | Existing GSAP sequence |
| 2 | Signals | Scroll `#signals`; caption: plan → cards |
| 3 | Student | Real tile select OR keep inject with caption explaining equivalence |
| 4 | UDL | Switch to Extend lane; caption: differentiation |
| 5 | Teacher | Segment advance; caption: pacing |
| 6 | Review | Approve |
| 7 | Export | Copy or download notice |

Prefer **one real tile click** in demo (middle of path) if timing allows; keep inject fallback under reduced motion.

### Responsive preview

Replace static timeline/tiles with props from `devicesSnapshot`. Optional: `scale(0.85)` CSS mini-layout reusing subcomponents is out of scope—mirror state with honest labels and selected chips only.

### System map (lightweight)

Add a compact **“How it connects”** diagram in `MadeWithStitch` or below Hero: 5 nodes (Plan → Weave → Classroom → Review → Export) with `aria-hidden` decorative SVG; active node follows `activeNav` or weave state. No new routes.

---

## Scope boundaries

### In scope

- Session coupling for support lane + teacher segment + live devices preview
- Source phrase highlighting
- Extended judge demo + presenter captions
- Export zip includes reflection text when saved (metadata file)
- E2e for new couplings; ACCEPTANCE_STATUS updates
- Manual QA checklist execution notes

### Deferred to follow-up work

- Second playable lesson chip (keep preview disabled)
- Real iframe viewport toggle
- Confetti / heavy celebration
- Case study as separate route
- Self-hosted fonts (optional if timeboxed)

### Outside product identity

- Real AI re-extraction, student accounts, LMS, automated grading, district claims

---

## Testing strategy

- Extend `e2e/smoke.spec.ts` or add `e2e/unified-session.spec.ts`: UDL Extend → student mission text changes; teacher segment → body changes.
- `e2e/judge-demo.spec.ts` (new): captions appear in order; visits `#signals` and `#udl`.
- `e2e/source-phrase.spec.ts`: highlight class on phrase after signal click.
- Manual: 1440 / 1280 / 1024 / 430 widths per `08_QA_ACCEPTANCE_CHECKLIST.md`.

---

## Risks

| Risk | Mitigation |
|------|------------|
| Over-scoping | Cap at 2 propagation axes (support + segment); devices is read-only mirror |
| Judge demo too long | Tighten delays; respect reduced motion |
| Fake AI perception | Banner on parser stub; no “re-extract” on plan edit |
| Copy drift | Assert lane strings in `e2e/copy-deck.spec.ts` |

---

## Open questions (resolved for plan)

| Question | Decision |
|----------|----------|
| Should plan edit re-extract signals? | No — static cards + honest “full product” banner |
| Real tile click in judge demo? | Yes on no-preference motion; inject only when reduced motion |
| Where does system map live? | `MadeWithStitch` section (process story) |

---

## Spec self-review

- No TBD placeholders.
- Consistent with `AGENTS.md`, `14_BUILD_EXECUTION_BRIEF.md`, `09_PRIVACY_CLAIM_SAFETY.md`.
- Scoped to one implementation plan; submission hardening can land as separate PR.
- Ambiguity resolved: student lane changes are copy/scaffold only, not new tile physics.
