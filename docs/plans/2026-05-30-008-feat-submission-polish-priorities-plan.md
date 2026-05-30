---
title: "feat: Address product-lens priority areas for Stitch submission"
type: feat
status: completed
created: 2026-05-30
date: 2026-05-30
plan_id: 008
origin: ce-product-lens-reviewer review (2026-05-30, agent 518f1a0b-32c0-4864-b337-2411d85e1129)
depth: standard
depends_on: main @ 4a9ba91; coordinates with plan 007 (feat/frontend-design-polish-007)
execution: subagent-driven-development (ce-work waves)
---

# feat: Address product-lens priority areas for Stitch submission

## Summary

The Lesson Loom prototype on `main` is verify-green and structurally complete, but a recent `ce-product-lens-reviewer` pass identified four narrow cleanup areas that decide whether the recorded judge walkthrough lands as a confident Stitch submission instead of a credible-but-soft one. This plan groups those into one coordinated wave: scrub the obsolete GitHub Pages URLs in submission docs, neutralize the `PrairieSignal Labs` vendor brand on the public walkthrough surface and inside the export zip, clear two craft-drift residuals (`All systems operational` status pip, dual trust lines) that plan 007 does not own, and promote the **Run judge demo** affordance from topbar tertiary chrome to a lead action — all without product scope creep, copy-deck churn that breaks `e2e/copy-deck.spec.ts`, or weave testid changes.

---

## Problem Frame

The reviewer's central read: the prototype as it sits on `main` is one calibration step short of a submission that the recorded walkthrough can carry. Four discrete cleanup areas drive that delta and are otherwise unrelated to each other:

1. **Submission blocker — URL drift.** `README.md`, `docs/submission/README.md`, `docs/qa/ACCEPTANCE_STATUS.md`, and two historical files under `docs/superpowers/plans/` still reference `bwillia13x.github.io/lesson-loom-plan-to-playable/` even though Pages deploy was retired (plan 006) and Vercel is now the canonical host (`vercel.json` at repo root). Live-URL verification is a human gate; agent work clears the doc surface.
2. **Premise overreach — vendor brand leak.** `src/components/sections/LabsCaseStudy.tsx` ("PrairieSignal Labs" eyebrow, "From contest prototype to workshop wedge" title, `mailto:hello@prairiesignal.example` CTA via `data-testid="labs-contact-cta"`) and the `workshop-checklist` export item in `src/data/lessonLoomData.ts` (body references "PrairieSignal Edge–style lab session" and "PrairieSignal Labs") inject a vendor identity into a Stitch contest demo whose stated thesis is `trusted lesson plan → interactive classroom interface → teacher-reviewed export pack` (per `AGENTS.md` §4.1 and §5). Recording will capture this on the way to Made with Stitch.
3. **Craft drift — chrome contradicting `03_DESIGN.md`.** Two residuals on `main` are out of scope for plan 007: `src/App.tsx:417` ships `<StatusPip label="All systems operational" tone="green" />` (status-page idiom, not classroom studio), and the first viewport renders two competing trust lines — `app-topbar__trust` ("Teacher first. Always. You own the lesson.") and `hero-trust-line` ("Teacher-reviewed draft. No student accounts or personal data required."). Plan 007 already owns StatusPip `orange`/`cyan` tone remap and `--ll-orange*` token cleanup; this plan does **not** duplicate that work.
4. **Asset under-marketed — "Run judge demo".** The single fastest demo path (`src/demo/JudgeDemoTopbar.tsx`, `data-testid="run-judge-demo"`) is rendered as topbar tertiary chrome next to a workspace toggle and status pip. Reviewer's read: the judges' shortest-path action looks like infrastructure.

Each priority lands cleanly inside `npm run verify` (build, lint, typecheck, smoke 3/3, e2e 58/58) and `03_DESIGN.md` calm thesis. None require new product surfaces.

---

## Requirements

Grouped by priority area; R-IDs are continuous and cited from Implementation Units.

### URL drift (P1)

- R1. No reachable doc or in-app surface references `bwillia13x.github.io` after the work lands. Single canonical Vercel placeholder (`https://lesson-loom.vercel.app`, marked as "actual alias may vary; update after `vercel link`") replaces every hit in `README.md`, `docs/submission/README.md`, `docs/submission/SUBMISSION_READINESS.md`, `docs/qa/ACCEPTANCE_STATUS.md`, and any other agent-owned doc.
- R2. Historical plan archives under `docs/superpowers/plans/` keep their original URLs in context but carry an inline note that the URL is obsolete; do not rewrite history.
- R3. `docs/submission/RECORDING.md` and `docs/submission/SUBMISSION_READINESS.md` retain the **Live URL checklist** as a human-gated step; agents do not auto-check those rows.

### Vendor-brand neutralization (P2)

- R4. The recorded walkthrough surface (everything visible at default zoom while scrolling hero → Made with Stitch) contains no "PrairieSignal", "PrairieSignal Labs", or `prairiesignal.example` mailto. The `labs-contact-cta` test-id either ceases to render or is hidden behind a presenter-only flag.
- R5. The footer Quick-links nav (`SiteFooter.tsx`) no longer surfaces `Labs` if KTD2 resolution removes the section; if KTD2 chooses presenter-flag or rewrite, the footer link semantics stay valid.
- R6. The export zip body for the artifact currently named `workshop-checklist.md` reads vendor-agnostically. Replacement copy uses safe language per `AGENTS.md` §5: "facilitator", "teaching team", "workshop facilitator" — never "PrairieSignal", "PrairieSignal Edge", or any vendor-identifying string. The filename `workshop-checklist.md` may stay (e2e does not assert it).
- R7. `e2e/export-zip.spec.ts` stays green: archive still contains `session-readme.txt`, `reflection-notes.txt`, `teacher-console-notes.txt`; the zip still downloads pre-weave (no gating regression).

### Craft-drift residuals not owned by plan 007 (P3)

- R8. `src/App.tsx` topbar no longer renders the "All systems operational" status pip. Replacement (if any) is a calm, classroom-aligned label or no pip at all.
- R9. First viewport renders **one** trust line. Either `app-topbar__trust` collapses into hero, or `hero-trust-line` becomes the sole carrier; the surviving line keeps copy-deck strings asserted by `e2e/copy-deck.spec.ts` ("Teacher-reviewed draft", "No student accounts or personal data required").
- R10. StatusPip `tone="orange"` / `tone="cyan"` cleanup and `--ll-orange*` token retirement are explicitly **deferred to plan 007's merge**. This plan adds no new orange/cyan usages and consumes plan 007's tone vocabulary in any new markup.

### Lead-action promotion (P4)

- R11. **Run judge demo** reads as the lead action on first viewport — promoted from topbar tertiary chrome to a placement that survives a 30-second judge scan. Mechanism resolved in KTD3.
- R12. Promotion does not violate `03_DESIGN.md` §calm hierarchy, does not add new CTAs to the hero beyond what's needed to land R11, does not change `weave-lesson-hero` testid or copy, and keeps `data-testid="run-judge-demo"` selector stable for `e2e/judge-demo*.spec.ts`.

### Cross-cutting

- R13. `npm run verify` (build, lint, typecheck, smoke 3/3, e2e 58/58) stays green at the end of every implementation unit and at plan completion.
- R14. No new product surfaces, dashboards, accounts, multi-lesson scope, real AI, auth, or backend (`AGENTS.md` §4.1, §5).
- R15. Weave testids `weave-lesson-hero`, `weave-lesson-panel`, `weave-lesson-intake` remain intact and selector-stable.
- R16. Live-URL verification, MANUAL_PASS rows, and walkthrough video remain human-gated; agents do not mark these as passed.

---

## Key Technical Decisions

- **KTD1 — Vercel URL placeholder strategy.** Use a single canonical placeholder string (`https://lesson-loom.vercel.app`) consistently across all agent-owned docs, with an inline parenthetical noting the team alias may differ after `vercel link`. Rationale: a placeholder is more honest than a fabricated URL (per `AGENTS.md` §5 and the `docs/submission/README.md` "Do not paste a fake deploy URL" rule), and switching to one string makes the post-import human update mechanical.
- **KTD2 — `LabsCaseStudy` neutralization mode: recommend full removal.** Three options were considered: (a) **remove the section** (delete `LabsCaseStudy.tsx`, remove the `labs` entry from `navSections`/`SiteFooter` jump links, drop the `<LabsCaseStudy />` mount in `App.tsx`), (b) **presenter-flag-gate** (render only when a hidden query param or presenter mode is on), (c) **rewrite vendor-agnostically** (replace "PrairieSignal Labs" with generic facilitator language and remove the mailto). Recommendation: (a) removal. Rationale: the section adds no signal to the Stitch demo thesis, the mailto goes to a placeholder domain that itself reads as overclaim, and no e2e specs couple to `labs-contact-cta` or the `labs` nav id. (b) adds presenter-mode complexity for an off-thesis surface; (c) keeps a vendor-shaped section after pretending it isn't one. **Flagged as user call-out — final choice is the user's.**
- **KTD3 — "Run judge demo" placement: recommend in-hero secondary CTA that mirrors topbar control.** Three options were considered: (a) **hero secondary CTA** added next to "View student app", reusing `data-testid="run-judge-demo"` if hero affordance and topbar button share state, (b) **persistent floating dock** anchored bottom-right, (c) **scroll-revealed prompt** after 3s of inactivity. Recommendation: (a). Rationale: keeps the calm hero hierarchy (`03_DESIGN.md` §6: primary "Weave lesson" still wins by size and order; secondary "Run judge demo" replaces "View student app" or sits beside it), avoids dock chrome that contradicts paper-studio aesthetic, and avoids motion-triggered prompts that conflict with `prefers-reduced-motion`. **Flagged as user call-out — placement is the user's.**
- **KTD4 — Plan-007 dependency: carry residuals here, defer overlapping work.** This plan executes against `main` (or a fresh branch from `main`), not `feat/frontend-design-polish-007`. It owns: status-pip removal in `App.tsx`, dual-trust-line collapse in `HeroLanding.tsx`. It explicitly does **not** touch: StatusPip `orange`/`cyan` tone remap, `--ll-orange*` token retirement, hero scanline removal, eyebrow contrast — those are plan 007's. When plan 007 merges, this plan does **not** need to re-merge; the changes here and there touch disjoint hunks of `HeroLanding.tsx` and `App.tsx`, but the implementer of U4 must rebase / pull `main` immediately before landing to keep the merge surface clean. **Flagged as user call-out — wait-for-merge vs carry-residuals.**
- **KTD5 — Export item rename: keep filename, rewrite body only.** Renaming the export item id from `workshop-checklist` would force a deeper trace through `lessonLoomData.ts`, the export pack rendering pipeline, and any copy-deck assertion. e2e/export-zip.spec.ts only asserts `lesson-loom-fraction-garden.zip` filename and three internal artifacts (`session-readme.txt`, `reflection-notes.txt`, `teacher-console-notes.txt`). Rewriting the **body** of the `workshop-checklist` entry vendor-agnostically (and leaving the title and filename intact) is the minimum-blast-radius fix.
- **KTD6 — Subagent execution per unit.** Each U-ID is sized for a single `ce-work` subagent (no nested dispatch). Orchestrator runs `npm run verify` after each unit, not after each subagent action.

---

## Acceptance Examples

- AE1. **URL drift.** Recorded judge walkthrough plays start to end. At no point does any rendered text on screen, in submission docs the judge might click through to, or in the export zip contain the string `bwillia13x.github.io`. Cross-check by `grep -RIn "bwillia13x.github.io" README.md docs/ src/` returning zero hits in agent-owned paths (historical plans under `docs/superpowers/plans/` may keep their archival hits and instead carry an "obsolete URL — replaced by Vercel" inline note).
- AE2. **Vendor brand on walkthrough surface.** Judge scrolls hero → Lesson Intake → Weave → Teaching Signal → Student → Teacher → UDL → Review → Export → Devices → Made with Stitch. No "PrairieSignal" text appears on screen. No `mailto:hello@prairiesignal.example` link is reachable from the rendered DOM. Footer Quick-links nav does not surface a "Labs" entry (if KTD2 chooses removal).
- AE3. **Vendor brand in export zip.** Judge clicks **Download zip** on the export pack. The resulting `lesson-loom-fraction-garden.zip` contains a `workshop-checklist.md` (or renamed equivalent) whose body uses vendor-agnostic facilitator language. `grep -in "prairiesignal" lesson-loom-fraction-garden.zip:*` returns zero hits.
- AE4. **Craft drift cleared on `main`.** Judge loads the live URL. The topbar does not show "All systems operational". The first viewport shows exactly one trust line; that line still contains the copy-deck assertion strings ("Teacher-reviewed draft", "No student accounts or personal data required").
- AE5. **Lead-action promotion.** Within five seconds of first viewport rendering, a fresh judge can locate **Run judge demo** without scrolling and without scanning the topbar's tertiary chrome strip. Activating it triggers the same `runJudgeDemo` flow as today (auto-weave, signals, fraction success, review approval, export). `data-testid="run-judge-demo"` remains a single stable selector; `e2e/judge-demo*.spec.ts` stays green.
- AE6. **Verify gate.** `npm run verify` exits 0 with smoke 3/3 and e2e 58/58 on the branch carrying this plan's work, both before and after plan 007 merges.

---

## Scope Boundaries

### In scope

- `README.md`, `docs/submission/README.md`, `docs/submission/SUBMISSION_READINESS.md`, `docs/submission/RECORDING.md` (URL/copy edits only)
- `docs/qa/ACCEPTANCE_STATUS.md` (Live URL row text only — not checking the box)
- `docs/APPLICATION_COMPLETE.md` (short plan-008 note as side-effect of U6)
- `src/components/sections/LabsCaseStudy.tsx` (KTD2 resolution)
- `src/App.tsx` (status-pip removal, `<LabsCaseStudy />` mount per KTD2, hero CTA wiring per KTD3 if needed)
- `src/components/sections/HeroLanding.tsx` (dual-trust-line collapse, lead-action CTA per KTD3)
- `src/components/SiteFooter.tsx` (drop `labs` jump-link per KTD2)
- `src/data/lessonLoomData.ts` (`workshop-checklist` body rewrite per KTD5; `navSections` `labs` entry removal per KTD2)
- `src/demo/JudgeDemoTopbar.tsx` (only if KTD3 wiring requires shared handler exposure; no behavior change)

### Deferred to follow-up work

- StatusPip `orange`/`cyan` → `sage`/`lavender`/`gold` tone remap → **plan 007 U4 owns this**
- `--ll-orange*` token retirement in `src/styles/motion.css` / `ResponsivePreview.tsx` → **plan 007 U1 owns this**
- Hero scanline removal and eyebrow contrast adjustment → **plan 007 U2 owns this**
- Hero AI-native copy churn → out of scope per `AGENTS.md` Learned Workspace Facts
- Full `App.tsx` decomposition beyond weave hook → out of scope per `AGENTS.md` Learned Workspace Facts
- Vercel `vercel link` execution and live-URL smoke → **human-gated per `docs/submission/SUBMISSION_READINESS.md` rows 1–3**
- Flipping plan 005 to `status: completed` → human-gated; this plan does **not** do it
- `/thermos` re-audit → user-triggered post-deploy

### Outside this product's identity (`AGENTS.md` §5)

- Backend, auth, database, LMS integration
- Real AI calls, automated grading, official curriculum claims
- Multi-lesson SaaS surface, account systems, district approval claims
- Vendor brand promotion of any kind in walkthrough surface or export pack (the entire point of P2)

---

## Implementation Units

### U1. URL drift sweep across agent-owned docs

**Goal:** Every agent-owned doc references the Vercel placeholder; no live link to the retired Pages URL ships in the recorded walkthrough's reachable doc surface.

**Requirements:** R1, R2, R3, R13

**Dependencies:** None

**Files:**
- `README.md` (search for `bwillia13x.github.io`; replace with Vercel placeholder or drop if it's a stale plan reference)
- `docs/submission/README.md` (verify Live demo section already uses Vercel; confirm `Bwillia13x/lesson-loom-plan-to-playable` repo references stay — only Pages URLs swap)
- `docs/submission/SUBMISSION_READINESS.md` (Vercel section is authoritative; cross-reference is correct)
- `docs/submission/RECORDING.md` (Live URL bullet uses placeholder)
- `docs/qa/ACCEPTANCE_STATUS.md` (row "Live URL works" — text only; box stays unchecked)
- `docs/superpowers/plans/2026-05-30-judge-wow-phase-3.md` (historical — add inline "obsolete URL — replaced by Vercel deploy" note next to the Pages URL; do not rewrite)
- `docs/superpowers/plans/2026-05-29-judge-wow-phase-2.md` (historical — same treatment)

**Approach:** Run an explicit grep for `bwillia13x.github.io` and walk every hit. For agent-owned docs, replace with `https://lesson-loom.vercel.app` and the parenthetical "_(actual alias may vary; update after first Vercel deploy)_" pattern already used in `docs/submission/README.md`. For `docs/superpowers/plans/` historical files, append a parenthetical "_obsolete URL — superseded by Vercel deploy per plan 006_" inline; do not rewrite history.

**Patterns to follow:** The Vercel URL parenthetical pattern in `docs/submission/README.md:64`. The "Do not paste a fake deploy URL" rule in `docs/submission/README.md:24`.

**Test scenarios:**
- `grep -RIn "bwillia13x.github.io" README.md docs/ src/` returns hits only inside `docs/superpowers/plans/` historical files, and each surviving hit is immediately preceded or followed by the inline obsolescence note.
- No new tests required; e2e selectors do not touch these strings.

**Verification:** `npm run lint` (catches accidental markdown breakage); `npm run verify` (full gate). No code paths change, so smoke/e2e are insurance, not the primary check.

---

### U2. Neutralize `LabsCaseStudy` on the walkthrough surface

**Goal:** The recorded walkthrough surface contains no "PrairieSignal" vendor brand or `mailto:hello@prairiesignal.example` CTA.

**Requirements:** R4, R5, R13, R14, R15

**Dependencies:** None (orthogonal to U1, U3–U6)

**Files:**
- `src/components/sections/LabsCaseStudy.tsx` (per KTD2 resolution: delete file outright if removal; otherwise edit)
- `src/App.tsx` (remove `import { LabsCaseStudy }` and `<LabsCaseStudy />` mount on line 531 if removal; otherwise leave mount in place)
- `src/components/SiteFooter.tsx` (line 18: remove `'labs'` from `jumpLinks` filter if KTD2 chooses removal)
- `src/data/lessonLoomData.ts` (line 762: remove `{ id: 'labs', label: 'Labs' }` from `navSections` if KTD2 chooses removal)

**Approach:** Honor KTD2 resolution from the user. **If removal (KTD2 recommendation):** delete `LabsCaseStudy.tsx`, drop the import and mount in `App.tsx`, drop the `labs` entry from `navSections`, drop `'labs'` from `SiteFooter` jump-links filter. **If presenter-flag:** wrap `<LabsCaseStudy />` in `{presenterMode && <LabsCaseStudy />}` and gate the nav/footer entries the same way. **If rewrite:** replace "PrairieSignal Labs" eyebrow with generic facilitator language, change `INQUIRY_MAILTO` to a non-mailto secondary action (e.g., scroll-to-export), strip the `data-testid="labs-contact-cta"` since semantics change.

**Patterns to follow:** Component removal pattern from prior plan-005 work. Safe-language vocabulary from `AGENTS.md` §5.

**Test scenarios:**
- `npm run test:e2e -- e2e/copy-deck.spec.ts e2e/smoke.spec.ts` — green; no spec references `PrairieSignal`, `LabsCaseStudy`, or `labs-contact-cta`.
- Footer Quick-links nav does not render a "Labs" button (assert via `page.getByRole('button', { name: 'Labs' })` returning zero results) **if** KTD2 resolves to removal.
- Manual spot-check: scroll hero → footer; no "PrairieSignal" text rendered in DOM (`grep -i prairiesignal` against `page.content()` returns zero) **if** KTD2 resolves to removal or rewrite.

**Verification:** `npm run verify` exits 0; e2e count stays at 58/58 (no test added or removed).

---

### U3. Rewrite `workshop-checklist.md` vendor-agnostically in export pack

**Goal:** The export zip no longer contains "PrairieSignal" in any artifact body; download flow and zip structure unchanged.

**Requirements:** R6, R7, R13, R14

**Dependencies:** None (orthogonal to U1, U2, U4–U6)

**Files:**
- `src/data/lessonLoomData.ts` (lines ~667–707: `workshop-checklist` entry body string)

**Approach:** Per KTD5, keep `id: 'workshop-checklist'`, `title: 'Workshop Checklist'`, `filename: 'workshop-checklist.md'`. Rewrite the `body` template string: replace "PrairieSignal Edge–style lab session" with "facilitated workshop session" (or similar `AGENTS.md`-safe phrasing); replace the line "Optional: contact PrairieSignal Labs with inquiry about pilot or custom lesson interface work." with a vendor-agnostic equivalent like "Optional: capture follow-up questions for your teaching team or workshop facilitator." Keep all bracketed checklist semantics intact (review gates, "teacher-reviewed draft", "no student data required" language already aligned with `AGENTS.md` §5).

**Patterns to follow:** Safe-language vocabulary from `AGENTS.md` §5. Tone matches the rest of the export pack bodies in `lessonLoomData.ts` (see `system-map.md`, `stitch-prompt.md`).

**Test scenarios:**
- `npm run test:e2e -- e2e/export-zip.spec.ts` — green. Both tests pass: zip downloads with expected filename pre-weave; post-weave zip contains `session-readme.txt`, `reflection-notes.txt`, `teacher-console-notes.txt`.
- Manual: unzip downloaded archive, `grep -i prairiesignal *` returns zero hits.

**Verification:** `npm run verify` exits 0; specifically `e2e/export-zip.spec.ts` stays at its current 2 passing tests.

---

### U4. Clear `main`-only craft-drift residuals (status pip + dual trust lines)

**Goal:** The topbar drops the status-page idiom; the first viewport surfaces a single, copy-deck-aligned trust line.

**Requirements:** R8, R9, R10, R13, R15

**Dependencies:** None for landing on `main`; implementer must rebase against `main` immediately before opening a PR (KTD4). Plan 007 does not block this unit and is not blocked by it (disjoint hunks).

**Files:**
- `src/App.tsx` (line 416–418: remove `<div className="app-topbar__status"><StatusPip label="All systems operational" tone="green" /></div>`; also remove the `app-topbar__status` wrapping div if no other children)
- `src/components/sections/HeroLanding.tsx` (lines 54–56: `hero-trust-line` — keep as the canonical first-viewport trust carrier)
- `src/App.tsx` (lines 419–423: `app-topbar__trust` — collapse or remove; decide based on visual hierarchy at 1440px and 430px)
- `src/styles/layout.css` (only if `app-topbar__status` / `app-topbar__trust` CSS becomes dead; remove the now-unused rules)

**Approach:** Delete the "All systems operational" pip wholesale; the topbar already carries the workspace toggle, judge-demo CTA, and trust text — adding back another label is not needed. For dual trust lines: recommended path is to **drop `app-topbar__trust`** ("Teacher first. Always. You own the lesson.") and keep `hero-trust-line` ("Teacher-reviewed draft. No student accounts or personal data required.") because the latter is what `e2e/copy-deck.spec.ts` asserts and what aligns with `AGENTS.md` §5 safe language. If the user prefers preserving "Teacher first. Always.", swap directions and ensure the surviving line still includes copy-deck-asserted phrases. **Do not** introduce any StatusPip `orange`/`cyan` tones or `--ll-orange*` references (R10; defer to plan 007).

**Patterns to follow:** Existing `hero-trust-line` styling in `src/styles/components-sections.css`. `e2e/copy-deck.spec.ts` assertion strings.

**Test scenarios:**
- `npm run test:e2e -- e2e/copy-deck.spec.ts` — green; "Teacher-reviewed draft" and "No student accounts or personal data required" still found.
- `npm run test:e2e -- e2e/viewports.spec.ts e2e/responsive.spec.ts` — green; no horizontal scroll at 430px or 1440px after topbar layout change.
- Manual / DOM: `page.getByText('All systems operational')` returns zero locators.
- Manual / DOM: first viewport `page.locator('text=/Teacher.*reviewed draft|Teacher first/i')` returns exactly one match.

**Verification:** `npm run verify` exits 0; e2e suite stays at 58/58.

---

### U5. Promote "Run judge demo" to lead action

**Goal:** Within a 5-second judge scan, **Run judge demo** is locatable as a first-class action without scanning the topbar tertiary chrome.

**Requirements:** R11, R12, R13, R14, R15

**Dependencies:** U4 (so hero-area CTA layout is not racing topbar trust-line changes)

**Files:**
- `src/components/sections/HeroLanding.tsx` (`hero-actions__group` area: extend `HeroLandingProps` with `onRunJudgeDemo: () => void` and `demoRunning: boolean`; add a secondary CTA per KTD3)
- `src/App.tsx` (`<HeroLanding ... />` invocation around line 461: pass `runJudgeDemo` and `demoRunning` through; do not duplicate the topbar button — share state)
- `src/demo/JudgeDemoTopbar.tsx` (no behavior change; the topbar button keeps `data-testid="run-judge-demo"` as the canonical selector; the hero CTA uses a sibling `data-testid="run-judge-demo-hero"` to avoid duplicating an id that selectors expect to be unique)

**Approach:** Per KTD3 recommendation (in-hero secondary CTA mirroring topbar). Replace "View student app" with "Run judge demo" as the secondary hero CTA, OR add it as a third action in the `hero-actions__group` after "View student app" — pick whichever holds `03_DESIGN.md` §6 calm hierarchy at 1440px (primary CTA wins by size and weight; secondary remains text-style or ghost-style). The hero CTA invokes the same `runJudgeDemo` handler the topbar uses. Keep `data-testid="run-judge-demo"` on the topbar button (single canonical for `e2e/judge-demo*.spec.ts`); the hero affordance gets a separate testid so e2e doesn't fork.

**Patterns to follow:** Existing `Button variant="secondary" size="lg"` pattern in `HeroLanding.tsx:50`. `JudgeDemoTopbar` handler wiring (`onRunJudgeDemo` prop pattern).

**Test scenarios:**
- `npm run test:e2e -- e2e/judge-demo.spec.ts e2e/judge-scenes.spec.ts e2e/presenter-mode.spec.ts` — green; topbar `data-testid="run-judge-demo"` still triggers full judge demo flow.
- `npm run test:e2e -- e2e/copy-deck.spec.ts` — green; hero CTA labels do not break copy-deck assertions ("Weave lesson" hero primary stays put).
- `npm run test:e2e -- e2e/viewports.spec.ts` — green; hero actions row does not overflow at 430px.
- Manual: load `/`, observe first viewport without scrolling — **Run judge demo** is visible in the hero action area (not just topbar).

**Verification:** `npm run verify` exits 0; smoke 3/3 and e2e 58/58.

---

### U6. Submission handoff prep and doc reconciliation

**Goal:** `docs/submission/SUBMISSION_READINESS.md` reflects the actual post-plan-008 state; submission docs articulate the human smoke checklist crisply enough that a human can walk it without re-reading this plan.

**Requirements:** R1, R3, R16

**Dependencies:** U1, U2, U3, U4, U5 (so doc text reflects landed state)

**Files:**
- `docs/submission/SUBMISSION_READINESS.md` (Live URL checklist remains human-gated; add a row noting "Walkthrough surface confirmed no `PrairieSignal` brand" as a human spot-check)
- `docs/submission/README.md` (note that the screenshot capture should be re-run after this plan's UI changes; cross-reference plan 008)
- `docs/APPLICATION_COMPLETE.md` (short "plan-008 product-lens cleanup" note as a side-effect, not a separate unit)
- `AGENTS.md` Learned Workspace Facts (one bullet update noting plan 008 cleared P1–P4)

**Approach:** Treat this unit as documentation reconciliation only — no code changes. Update the "Last captured" line in `docs/submission/README.md` to indicate screenshots need re-capture post-plan-008. Add a single human-spot-check row to `docs/submission/SUBMISSION_READINESS.md` for the walkthrough-surface vendor-brand check (R4 verification). Add a single-line entry to `docs/APPLICATION_COMPLETE.md` referencing this plan. Do **not** flip plan 005 or check MANUAL_PASS boxes (R16). Update `AGENTS.md` Learned Workspace Facts with a brief "Plan 008 landed: URL drift cleared, LabsCaseStudy neutralized, status-pip removed, judge-demo CTA promoted; plan 007 owns StatusPip tones and `--ll-orange*`."

**Patterns to follow:** Existing tabular row pattern in `docs/submission/SUBMISSION_READINESS.md`. AGENTS.md Learned Workspace Facts bullet pattern (date + factual claim).

**Test scenarios:**
- `npm run verify` exits 0 (no behavior change; doc-only).
- Manual: read `docs/submission/SUBMISSION_READINESS.md` end-to-end; verify a human can follow the live-URL gate without context outside the doc.

**Verification:** `npm run verify` exits 0; e2e suite stays at 58/58.

---

## Risks & Dependencies

| Risk | Mitigation |
|------|-----------|
| Plan-007 merge introduces a `HeroLanding.tsx` / `App.tsx` hunk conflict with U4/U5 | Implementer of U4/U5 rebases against latest `main` immediately before pushing. The disjoint-hunk plan (KTD4) holds unless plan 007 also changes `app-topbar__trust` markup. |
| Live-URL human gate slips after agent work lands | Doc surface is corrected (R1–R3); `docs/submission/SUBMISSION_READINESS.md` rows 1–3 remain explicitly human-gated. Agents do not auto-check (R16). |
| `LabsCaseStudy` removal breaks an e2e selector we missed | Pre-flight: grep `e2e/` for `labs`, `LabsCase`, `PrairieSignal`, `labs-contact-cta` returns zero matches (confirmed during planning). If a new spec adds a coupling between planning and execution, surface it in U2 implementer subagent. |
| Vendor-agnostic body rewrite of `workshop-checklist.md` breaks an unseen copy-deck assertion | `e2e/copy-deck.spec.ts` does not assert export-zip body strings. Confirm by re-running `e2e/copy-deck.spec.ts` and `e2e/export-zip.spec.ts` in U3 verification. |
| KTD2 ambiguity (remove vs presenter-flag vs rewrite) blocks U2 dispatch | User decision required before `ce-work` picks up U2. Flagged as top-3 call-out below. |
| KTD3 ambiguity ("Run judge demo" placement) blocks U5 dispatch | User decision required before `ce-work` picks up U5. Flagged as top-3 call-out below. |
| `data-testid="run-judge-demo"` collision if hero CTA reuses the id | KTD3 / U5 explicitly assigns hero CTA a separate `data-testid="run-judge-demo-hero"`; topbar testid stays canonical for `e2e/judge-demo*.spec.ts`. |
| Screenshot drift after U4/U5 visual changes | U6 documents re-capture; human re-runs `npm run capture:screenshots` before recording the walkthrough. Capture is local-only / gitignored per AGENTS.md Learned Facts. |

---

## Operational / Documentation Notes

Doc-update side-effects are co-located in implementation units rather than broken out:

- **U1 owns:** sweep across `README.md`, `docs/submission/*`, `docs/qa/ACCEPTANCE_STATUS.md`, historical `docs/superpowers/plans/` notes.
- **U6 owns:** `docs/submission/SUBMISSION_READINESS.md` human-spot-check row, `docs/submission/README.md` capture-refresh note, `docs/APPLICATION_COMPLETE.md` plan-008 line, `AGENTS.md` Learned Workspace Facts bullet.

This plan does **not** modify `docs/qa/MANUAL_PASS_2026-05-30.md` (human-only). This plan does **not** flip `docs/plans/2026-05-30-005-feat-remaining-work-subagent-plan.md` to `completed` (human U8 gate).

---

## Assumptions

The following bets are inferred from the headless reading and should be sanity-checked by the implementer or user:

- **A1.** Plan 007 (`feat/frontend-design-polish-007`) will merge into `main` before or after this plan, but its hunks in `HeroLanding.tsx` (scanline / eyebrow contrast) and `App.tsx` (StatusPip tones) are disjoint from this plan's hunks (status-pip removal at line 417, trust-line collapse). Verified by reading plan 007's U2/U4 file lists; not stress-tested against an actual merge.
- **A2.** No live e2e spec asserts on `labs-contact-cta`, `LabsCaseStudy`, `PrairieSignal`, `workshop-checklist.md` content, or the `labs` nav id. Verified via `Grep` against `e2e/`; if new specs land in flight, U2/U3 implementer revisits.
- **A3.** `https://lesson-loom.vercel.app` is an acceptable placeholder URL pre-`vercel link`; the post-import human update will overwrite it consistently across U1's edited files. Verified against `docs/submission/README.md:49–51` and `docs/submission/SUBMISSION_READINESS.md:69` precedent.
- **A4.** The user's KTD2 and KTD3 resolutions are decided before `ce-work` dispatches U2 and U5 respectively. If `ce-work` runs without the resolution, U2 and U5 dispatch the implementer with KTD recommendations and the implementer flags back rather than guessing.
- **A5.** Removing `<LabsCaseStudy />` does not regress visual baselines that any human reviewer cares about, beyond what is captured in the U6 capture-refresh note.
- **A6.** The `app-topbar__trust` and `hero-trust-line` removal direction in U4 (drop topbar, keep hero) holds. If the user prefers the inverse, the implementer ensures the surviving line still contains `e2e/copy-deck.spec.ts` assertion strings.
- **A7.** `npm run verify` enforces e2e 58/58 (no specs added, no specs removed). If U2 removal of `LabsCaseStudy` accidentally removes a count-bearing test, the implementer flags before landing.
