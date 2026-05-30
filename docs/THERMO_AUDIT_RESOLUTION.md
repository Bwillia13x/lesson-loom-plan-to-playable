# Thermo audit — resolution checklist

**Remediation date:** 2026-05-29  
**Doc sync:** 2026-05-29 (`e2eddfc` baseline — judge-path restore + verify 53/53)  
**Re-audit:** 2026-05-29 @ `476d80d` — `/thermos` parallel pass; **0 Must-fix**; verify green (smoke 3/3, e2e 53/53).

### Merge baseline (2026-05-30)

Plan 004 merged to `main` @ `160e4cc` (`refactor/deferred-architecture` fast-forward). Plan 005 adds weave hook extract, context lint split, doc parity, and optional `e2e/semantic-headings.spec.ts`.

### Post-polish (2026-05-30)

| Item | Status |
|------|--------|
| Q11 e2e `weaveFromHero()` adoption | **Resolved** — hero-weave specs use shared helper with configurable banner timeout |
| Orphan `src/styles.css` shim | **Removed** — entry is `src/styles/index.css` via `main.tsx` |
| Q10 `equivalentHalfIds` alias | **Removed** — `equivalentCanonicalIds` only |
| Teacher class-mode `aria-pressed` | **Resolved** — parity with workspace toggle + e2e |
| Export lock notice | **Clarified** — copy gated by weave; demo zip remains available pre-weave |
| Export status pip | **Tightened** — “All files generated” when `studentAppActive` |
| Alternate weave e2e | **Resolved** — `e2e/weave-entry-points.spec.ts` (panel + intake) |

---

## Branch audit findings

| ID | Finding | Status | Evidence |
|----|---------|--------|----------|
| B1 | No critical judge-path blockers | **Resolved** | `npm run verify` — smoke 3/3, e2e 53/53 (excludes capture) |
| B2 | Tab arrow-key roving missing | **Resolved** | [`src/utils/tabRoving.ts`](../src/utils/tabRoving.ts); UDL + Teacher `onKeyDown` |
| B3 | E2e used `.focus()` only | **Resolved** | UDL `ArrowRight`; teacher timeline test in `e2e/accessibility.spec.ts` |
| B4 | No teacher tab e2e | **Resolved** | `e2e/accessibility.spec.ts` teacher timeline test |
| B5 | README / verify mismatch | **Resolved** | `README.md` documents full verify + Playwright install |
| B6 | CI ≠ local verify | **Resolved** | `.github/workflows/ci.yml` runs `npm run verify` |
| B7 | `handleExportCopy` no `hasWoven` guard | **Resolved** | [`src/App.tsx`](../src/App.tsx) `handleExportCopy` early return + UI `disabled={!hasWoven}` |
| B8 | Clipboard “Copied” on failure | **Resolved** | `App.tsx` try/catch; Copied only on clipboard success |
| B9 | Orange weave banner border | **Resolved** | `var(--ll-line)` in `components-sections.css` |
| B10 | Export copy enabled pre-weave | **Resolved** | `ExportPackSection` `disabled={!hasWoven}` + handler guard |
| B11 | “Live” on dimmed signal cards | **Resolved** | Hidden when `isDimmed` in `TeachingSignal.tsx` |
| B12 | 8th signal card stuck dim | **Resolved** | Final weave step = `teachingSignals.length - 1` in `App.tsx` |
| B13 | Shared timer ref | **Resolved** | `weaveTimelineRef` + `uiTimeoutIds` in `App.tsx` |
| B14 | Duplicate `weave-lesson` test id | **Resolved** | `weave-lesson-hero` / `weave-lesson-panel` |
| B15 | Weave Lesson casing | **Resolved** | Deck casing `Weave lesson` |
| B26 | XSS in export previews | **Accepted** | Static text in `<pre>`; no change needed |
| B27 | APPLICATION_COMPLETE optimistic on tabs | **Resolved** | Doc + e2e cover tab roving |

---

## Code quality findings

| ID | Finding | Status | Notes |
|----|---------|--------|-------|
| Q1 | `styles.css` monolith >1k | **Resolved** | Active chain: `index.css` → `tokens`, `base`, `layout`, `motion`, `components-shared` (554), `components-sections` (634). Orphan `sections.css` **removed**. |
| Q2 | `App.tsx` god-object | **Partially resolved** | Judge demo in [`src/demo/`](../src/demo/); weave orchestration in [`useWeaveSequence.ts`](../src/motion/useWeaveSequence.ts) (plan 005 @ `main` post-`160e4cc`); [`src/App.tsx`](../src/App.tsx) ~500 lines. Nav/URL/intersection spy remain in App. |
| Q3 | `hasWoven` prop drilling | **Resolved** | [`LessonLoomSessionContext`](../src/context/LessonLoomSessionContext.tsx) for export/student/signal shells; state remains in `App.tsx`. |
| Q4 | Duplicate weave test id | **Resolved** | See B14 |
| Q5 | 8th card dim logic | **Resolved** | See B12 |
| Q6 | Four weave entry points | **Accepted** | Intentional demo affordances |
| Q7 | Hero bypasses `Section` | **Resolved** | `HeroLanding` uses `Section` + `titleAs="h1"` |
| Q8 | `IndustrialButton` name | **Resolved** | Sections + [`JudgeDemoTopbar`](../src/demo/JudgeDemoTopbar.tsx) use `Button`; [`IndustrialButton.tsx`](../src/components/ui/IndustrialButton.tsx) re-export kept for compat |
| Q9 | `laneConfig.tone` unused | **Resolved** | Wired to `StatusPip` on UDL tabs |
| Q10 | `equivalentHalfIds` dead | **Resolved** | Alias removed; use `equivalentCanonicalIds` |
| Q11 | E2e copy-locked | **Resolved** | Hero-weave flows use [`e2e/helpers.ts`](../e2e/helpers.ts) `weaveFromHero()` |
| Q12 | Judge demo long timeouts | **Resolved** | [`e2e/helpers.ts`](../e2e/helpers.ts) `waitForJudgeDemoMilestones` chains testid expects; max 15s with GSAP comments only. |

---

## Architecture note (post-rebase)

After merging upstream judge-path features (`e2eddfc`), application state lives in **`App.tsx`** (not a separate flow hook). A prior `useLessonLoomFlow.ts` experiment was **removed** to avoid dead code drift.

---

## Intentional limitations (not defects)

- Export zip is a **demo** archive via `fflate` (`lesson-loom-fraction-garden.zip`); not a production pipeline.
- `ResponsivePreview` is static device chrome, not live iframe preview.
- Legacy `primitives.css` archived under `docs/archive/styles/` (2026-05-30); not in the import chain. Active styles use split partials in `src/styles/`.
- Demo zip remains download-enabled pre-weave by design (`e2e/export-zip.spec.ts`); copy cards stay `hasWoven`-gated.
- Planning pack examples use `equivalentCanonicalIds` (aligned with `lessonLoomData.ts`).

---

## Pre-handoff commands

```bash
npm install
npx playwright install chromium
npm run verify
```

Expected: build, lint, typecheck, smoke (3), and e2e (56, excludes capture) all pass.

---

## Re-audit pass criteria

Thermo re-run should show:

- No critical functional or security issues on judge path.
- No duplicate `weave-lesson` test ids on one element; no banned trust strings in `src/`.
- Tab pattern includes keyboard roving on UDL + teacher timelines.
- No **imported** CSS file over 1,000 lines under `src/styles/`.
- `npm run verify` green on the audited commit.
