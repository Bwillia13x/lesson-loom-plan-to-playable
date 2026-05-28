# Lesson Loom — Capability Review & Future Enhancement Plan

> **For agentic workers:** Use superpowers:executing-plans or subagent-driven-development when implementing. Respect `AGENTS.md` scope boundaries unless Drew explicitly expands scope.

**Goal:** Close high-value gaps in the Fraction Garden prototype without turning it into a SaaS platform.

**Review date:** 2026-05-28  
**Baseline:** `main` — single-page Vite + React + TypeScript SPA, deterministic data in `lessonLoomData.ts`, Playwright e2e suite.

---

## 1. Current feature suite (what exists today)

### 1.1 Core product flow

| Section | Component | Capability |
|---------|-----------|------------|
| Hero | `HeroLanding` | Headline, trust line, Weave / View student CTAs, plan ↔ app visual, `WeaveSignalLine` |
| Lesson intake | `LessonIntake` | Static metadata + sample plan display; **Extract Teaching Signal** triggers weave |
| Lesson weave | `LessonWeave` | 7-step GSAP/CSS timeline; `hasWoven` + `activeWeaveStep` |
| Teaching signal | `TeachingSignal` | 8 cards with **source phrase** badges; stagger reveal post-weave |
| Student app | `StudentFractionGarden` | Tile select (max 3), garden beds, hint toggle, check, success pulse, incorrect feedback |
| Teacher console | `TeacherConsole` | Timeline segments, class mode, prompts, misconceptions |
| Differentiation | `DifferentiationUDL` | Support / Core / Extend lanes + UDL checklist |
| Review & safety | `ReviewSafety` | Claim-safe cards, review notes textarea, approve CTA |
| Printable | `PrintableFallback` | Embedded in review flow |
| Export pack | `ExportPackSection` | 6 artifact cards, copy-to-clipboard, demo download notice |
| Responsive | `ResponsivePreview` | Static tablet/mobile mock frames |
| Stitch process | `MadeWithStitch` | Ordered workflow copy |
| Footer | `SiteFooter` | Credits / links |

### 1.2 Global chrome & orchestration

- **Side nav:** Icon rail with intersection-observer active section (`App.tsx`).
- **Top bar:** Workspace Student/Teacher toggle, **Run judge demo** autoplay, status pip, trust line.
- **Post-weave banner:** `WeaveCompleteBanner` shortcuts to student / teacher / export.
- **Skip link** + `aria-live` for weave completion message.

### 1.3 State model (implemented)

```ts
hasWoven, activeWeaveStep, workspaceMode, activeSupport,
selectedTileIds, copiedExportId, checkSuccess, checkAttempted,
showSuccessPulse, activeSegment, classMode, approved, activeNav, demoRunning
```

### 1.4 Motion & accessibility

- GSAP weave timeline (`createWeaveTimeline`), signal card stagger, success pulse.
- `usePrefersReducedMotion` + `MotionProvider`; reduced-motion e2e.
- Real `<button>` elements; tile `aria-pressed` / labels; fraction incorrect-hint e2e.

### 1.5 Verification & submission tooling

| Script | Purpose |
|--------|---------|
| `npm run build` | tsc + vite |
| `npm run lint` | eslint |
| `npm run test:e2e` | 7 specs (smoke, a11y, responsive, fraction-check, copy-deck, reduced-motion) |
| `npm run verify:submission` | verify + screenshot capture |
| `docs/submission/*` | Walkthrough, Contra copy |
| `docs/qa/ACCEPTANCE_STATUS.md` | Checklist mirror (many items still manual) |

### 1.6 Explicit non-features (by design)

Per `AGENTS.md` / product spec: no backend, auth, real AI, student accounts, LMS, automated grading, multi-lesson CMS, official curriculum claims.

---

## 2. Gap analysis

Gaps are ranked by **demo impact** × **fit within prototype boundaries**.

### 2.1 P0 — Submission & judge readiness (finish the demo, not the product)

| Gap | Evidence | Value if fixed |
|-----|----------|----------------|
| Manual QA incomplete | `docs/qa/ACCEPTANCE_STATUS.md` — visual, 1440/1280/1024/430, Safari, focus/contrast unchecked | Contest confidence; fewer judge surprises |
| Live deploy URL unset | Submission README placeholder | Required for Contra |
| 60–90s walkthrough video | Checklist open | Primary submission artifact |
| Copy deck drift risk | Prior plan noted hero vs `17_COPY_DECK.md` | Judge reads headline in 10s |
| Console errors / jank | Performance section manual | Professional polish |
| Google Fonts external dependency | QA note | Offline/slow-network demo risk |

**Session recommendation:** One **Submission Hardening** session (no new product features).

### 2.2 P1 — Prototype fidelity (spec says should/could; high demo ROI)

| Gap | Evidence | Value if fixed |
|-----|----------|----------------|
| **Progress pips for fraction mission** | `16_INTERACTION_AND_MOTION_SPEC.md` — “progress pips mark complete”; `ProgressRail.tsx` exists but **unused** | Clearer student task completion UX |
| **Lesson intake not editable** | `LessonIntake` renders static `lessonPlanText` | “Teacher-owned plan” story weaker than spec |
| **Export pack is preview-only** | Copy uses short `preview`; Download is notice-only | Export Pack feels like handoff, not theater |
| **Reflection is static copy** | Mission panel shows stem only | Missed “assessment checkpoint” story |
| **Weave locked until CTA** | Signals dim until weave — good — but no “re-weave” or plan edit flow | Minor; optional reset weave |
| **Responsive preview is decorative** | `ResponsivePreview` — not live iframe | Spec “devices” section could show real narrow viewport toggle |
| **Second lesson teaser** | Spec “could have” — disabled subject chips | Shows roadmap without scope creep |

### 2.3 P2 — Interaction & motion polish (already partially planned)

| Gap | Evidence | Notes |
|-----|----------|-------|
| GSAP reduced-motion centralization | `2026-05-28-gsap-motion-polish-phase-2.md` | Execute existing plan |
| Success celebration depth | Spec “could have” confetti | Keep subtle; respect reduced motion |
| Signal card ↔ plan scroll link | Spec source tags exist; no scroll-to-phrase | Grounding story upgrade |
| Teacher console segment content swap | Timeline changes label; body could vary more per segment | “Practical console” perception |

### 2.4 P3 — Agent-native & shareability (high value for demos and Cursor/Stitch story)

| Gap | Value | Boundary-safe approach |
|-----|-------|------------------------|
| **Shareable demo URL** | Judges bookmark `?state=woven&mode=student` | Query params → hydrate initial state; no server |
| **Deep link per section** | Nav already scrolls; hash routing missing | `#student`, `#export` on load |
| **Presenter / judge mode** | Run judge demo exists; no step captions | Overlay step labels during autoplay |
| **Deterministic “scenario presets”** | Workshop replay | Buttons: “Before weave”, “After success”, “Review approved” |

### 2.5 P4 — Post-contest / PrairieSignal (from `04_STRATEGIC_ROADMAP.md`)

Do **not** bundle into contest sprint unless Drew directs.

- Real lesson ingestion (paste → parse locally or stub parser).
- Export to real `.zip` / PDF / Google Docs.
- Case study page + inquiry CTA.
- Pilot: teacher review gates, curriculum alignment workflow.
- Workshop artifact pack (prompt deck, review checklist).

### 2.6 Out of scope (do not integrate without explicit product decision)

Real Stitch API, LLM signal extraction, user accounts, student profiles, LMS, live analytics with PII, automated grading, multi-tenant lesson library, district compliance claims.

---

## 3. Recommended future sessions (phased)

Each phase is one focused agent session (~1 PR). Dependencies flow top to bottom within a phase only.

### Phase A — Submission hardening (P0)

**Outcome:** Contest-ready package with no new UI scope.

| Task | Files / commands | Done when |
|------|------------------|-----------|
| Complete manual QA matrix | `08_QA_ACCEPTANCE_CHECKLIST.md`, update `ACCEPTANCE_STATUS.md` | All widths + Safari if available documented |
| Deploy static site | Vercel/Netlify; fill `docs/submission/README.md` URL | Live URL loads, meta correct |
| Record walkthrough | `docs/submission/WALKTHROUGH.md` | 60–90s video linked in submission README |
| Copy deck audit | `17_COPY_DECK.md` vs Hero, Review, Export | `e2e/copy-deck.spec.ts` covers critical strings |
| Font strategy | Self-host or `font-display: swap` + fallback stack | No layout shift; optional offline |
| Console-clean pass | Manual + optional Playwright `page.on('console')` | No errors on judge demo path |

**Verify:** `npm run verify:submission`

---

### Phase B — Prototype fidelity pack (P1)

**Outcome:** Spec “should/could” items that strengthen the transformation story.

#### B1 — Student mission progress (`ProgressRail`)

- Wire `ProgressRail` in `StudentFractionGarden` with 3 steps: Select tiles → Check → Reflect.
- Drive `activeIndex` from `selectedTileIds.length`, `checkSuccess`, optional reflection touched state.
- **Tests:** extend `e2e/smoke.spec.ts` or new `e2e/student-progress.spec.ts`.

#### B2 — Editable lesson intake (local only)

- Convert plan display to `<textarea>` or `contentEditable` with React state in `App.tsx` (or intake-local state passed up).
- Teaching signals remain static OR show banner: “Re-extract updates cards in a full product.”
- **Do not** fake AI re-extraction.
- **Tests:** type in plan → text persists while scrolling.

#### B3 — Real export handoff (client-side)

- Add `src/utils/buildExportZip.ts` using dynamic import of `fflate` or JSZip (devDependency).
- Bundle markdown files from `exportPack` full content (expand `lessonLoomData` with `body` field).
- Download button produces `lesson-loom-fraction-garden.zip`; keep honest label if PDF is still placeholder.
- **Tests:** click download → download event or blob size > 0 (Playwright).

#### B4 — Interactive reflection stub

- After `checkSuccess`, show textarea with stem prefilled; “Save reflection” stores in component state only.
- **A11y:** label + `aria-describedby`.

**Verify:** `npm run verify`

**PR title suggestion:** `feat(prototype): student progress, editable intake, export zip`

---

### Phase C — Motion & grounding polish (P2)

**Outcome:** Execute `2026-05-28-gsap-motion-polish-phase-2.md` plus light grounding UX.

| Task | Source |
|------|--------|
| GSAP `matchMedia` defaults | Phase 2 plan |
| Remove dead CSS keyframes | Phase 2 plan |
| `#student` woven-active styling | Phase 2 plan |
| Optional: click source badge → scroll to highlighted phrase in intake plan | New — use `data-phrase` spans in plan text |
| Optional: subtle success celebration (CSS only, reduced-motion off) | `16_INTERACTION_AND_MOTION_SPEC.md` |

**Verify:** `npm run test:e2e` including `reduced-motion.spec.ts`

---

### Phase D — Shareable demo & presenter tools (P3)

**Outcome:** Judges and workshop hosts can replay exact states.

| Task | Implementation sketch |
|------|----------------------|
| URL state codec | `?w=1&mode=teacher&tiles=one-half,two-fourths,three-sixths&approved=1` |
| `useDemoStateFromSearchParams` hook in `App.tsx` | Parse on mount; optional `history.replaceState` on weave |
| Hash navigation | `scrollTo` on load if `location.hash` |
| Presenter captions | `demoRunning` shows fixed bottom caption from step array |
| Preset buttons (dev-only or footer) | “Reset demo”, “Success state” |

**Guardrails:** No PII in URLs; keep params short; document in `docs/submission/WALKTHROUGH.md`.

**Verify:** e2e loads `/?w=1#student` and sees woven student section.

---

### Phase E — Post-contest discovery (P4)

Only after contest + user interviews (per roadmap).

1. Case study static page (separate route or subdomain).
2. Lesson parser stub (regex-based signal preview from pasted plan).
3. Second lesson sample (Science or ELA) — **preview chip only** until validated.
4. Workshop PDF: prompt pack + review checklist generated from export pack content.

---

## 4. Architecture principles for all future work

1. **Single source of truth:** `lessonLoomData.ts` for copy and demo content.
2. **App.tsx owns cross-section state** unless a section is purely presentational.
3. **No fake AI:** label simulations as “demo” or “preview.”
4. **Claim-safe copy:** run against `09_PRIVACY_CLAIM_SAFETY.md` on any new strings.
5. **Test what judges touch:** weave, tiles, toggle, export copy, judge demo, reduced motion.
6. **Prefer CSS + GSAP context cleanup** over new animation dependencies.

---

## 5. Priority matrix (quick reference)

| Priority | Theme | Effort | Impact |
|----------|-------|--------|--------|
| P0 | Submission QA + deploy + video | Low–medium | Critical for contest |
| P1 | Progress rail, editable plan, real zip, reflection | Medium | High prototype credibility |
| P2 | Motion phase 2 + source scroll | Low–medium | Polish + trust |
| P3 | URL state + presenter mode | Medium | Shareability |
| P4 | Roadmap / pilot | High | Product discovery |

---

## 6. Suggested PR sequence

```text
PR1  chore(qa): submission hardening + acceptance status
PR2  feat(student): progress rail + reflection stub
PR3  feat(intake): editable lesson plan (local state)
PR4  feat(export): client-side zip download
PR5  chore(motion): gsap phase 2 (existing plan)
PR6  feat(demo): URL state + hash deep links + presenter captions
```

---

## 7. Acceptance criteria for “capability upgrade complete”

- [ ] All P0 items in `ACCEPTANCE_STATUS.md` checked or explicitly N/A with reason.
- [ ] P1 items implemented OR documented as deferred with Drew approval.
- [ ] `npm run verify` green on CI.
- [ ] Judge demo path works: weave → student success → teacher → approve → export copy.
- [ ] No new prohibited claims introduced.
- [ ] `AGENTS.md` scope boundaries unchanged unless Drew expands.

---

## 8. References

- `AGENTS.md` — mission, boundaries, state model
- `01_PRODUCT_SPECSHEET.md` — must/should/could
- `14_BUILD_EXECUTION_BRIEF.md` — build priorities
- `04_STRATEGIC_ROADMAP.md` — post-contest phases
- `08_QA_ACCEPTANCE_CHECKLIST.md` — full QA list
- `docs/superpowers/plans/2026-05-28-lesson-loom-submission-and-polish.md` — submission gaps
- `docs/superpowers/plans/2026-05-28-gsap-motion-polish-phase-2.md` — motion gaps
