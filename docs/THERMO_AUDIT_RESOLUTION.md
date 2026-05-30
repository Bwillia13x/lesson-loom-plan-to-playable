# Thermo audit — resolution checklist

**Remediation date:** 2026-05-29  
**Re-audit:** Run `/thermos` on the commit that includes this file and confirm no open **Must fix** rows.

---

## Branch audit findings

| ID | Finding | Status | Evidence |
|----|---------|--------|----------|
| B1 | No critical judge-path blockers | **Resolved** | `npm run verify` (smoke 3/3, e2e 9/9 after teacher tab test) |
| B2 | Tab arrow-key roving missing | **Resolved** | `src/utils/tabRoving.ts`; UDL + Teacher `onKeyDown` |
| B3 | E2e used `.focus()` only | **Resolved** | UDL test uses `ArrowRight`; teacher test added |
| B4 | No teacher tab e2e | **Resolved** | `e2e/accessibility.spec.ts` teacher timeline test |
| B5 | README / verify mismatch | **Resolved** | `README.md` documents full verify + Playwright install |
| B6 | CI ≠ local verify | **Resolved** | `.github/workflows/ci.yml` runs `npm run verify` |
| B7 | `handleExportCopy` no `hasWoven` guard | **Resolved** | `useLessonLoomFlow.ts` |
| B8 | Clipboard “Copied” on failure | **Resolved** | try/catch; Copied only on success |
| B9 | Orange weave banner border | **Resolved** | `var(--ll-line)` in `components-sections.css` |
| B10 | Export download enabled pre-weave | **Resolved** | `disabled={!hasWoven}` + handler guard |
| B11 | “Live” on dimmed signal cards | **Resolved** | Hidden when `isDimmed` |
| B12 | 8th signal card stuck dim | **Resolved** | `FINAL_SIGNAL_STEP = teachingSignals.length - 1` |
| B13 | Shared timer ref | **Resolved** | `weaveTimers` vs `uiTimers` |
| B14 | Duplicate `weave-lesson` test id | **Resolved** | `weave-lesson-hero` / `weave-lesson-panel` |
| B15 | Weave Lesson casing | **Resolved** | Deck casing `Weave lesson` |
| B26 | XSS in export previews | **Accepted** | Static text in `<pre>`; no change needed |
| B27 | APPLICATION_COMPLETE optimistic on tabs | **Resolved** | Doc updated with roving detail |

---

## Code quality findings

| ID | Finding | Status | Notes |
|----|---------|--------|-------|
| Q1 | `styles.css` monolith >1k | **Resolved** | Split: `tokens`, `base`, `layout`, `components-shared` (554), `components-sections` (633) |
| Q2 | `App.tsx` god-object | **Resolved** | `useLessonLoomFlow.ts`; `App.tsx` ~165 lines |
| Q3 | `hasWoven` prop drilling | **Deferred** | Acceptable for prototype; hook centralizes logic |
| Q4 | Duplicate weave test id | **Resolved** | See B14 |
| Q5 | 8th card dim logic | **Resolved** | See B12 |
| Q6 | Four weave entry points | **Accepted** | Intentional demo affordances |
| Q7 | Hero bypasses `Section` | **Resolved** | `HeroLanding` uses `Section` + `titleAs="h1"` |
| Q8 | `IndustrialButton` name | **Resolved** | `Button.tsx` |
| Q9 | `laneConfig.tone` unused | **Resolved** | Wired to `StatusPip` on UDL tabs |
| Q10 | `equivalentHalfIds` dead | **Resolved** | Removed from data module |
| Q11 | E2e copy-locked | **Mitigated** | Primary paths use testids; some copy assertions remain |
| Q12 | Judge demo long timeouts | **Accepted** | Tests pass; timeouts guard async demo |

---

## Intentional limitations (not defects)

- Demo zip download shows notice only; no real archive.
- `ResponsivePreview` is static device chrome, not live iframe preview.
- `07_CONTENT_MODEL_AND_SAMPLE_DATA.md` may still mention legacy `equivalentHalfIds` in examples (planning doc only).

---

## Pre-handoff commands

```bash
npm install
npx playwright install chromium
npm run verify
```

Expected: build, lint, typecheck, smoke, and e2e all pass.

---

## Re-audit pass criteria

Thermo re-run should show:

- No critical functional or security issues on judge path.
- No duplicate `weave-lesson` test ids; no banned trust strings in `src/`.
- Tab pattern includes keyboard roving or honest `role="group"` downgrade.
- No single CSS file over 1,000 lines in `src/styles/`.
