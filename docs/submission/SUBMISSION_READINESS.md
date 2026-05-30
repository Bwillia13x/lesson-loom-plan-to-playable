# Lesson Loom — Submission readiness gate

**Integration branch:** `main` @ `4a9ba91` (post–plan 004 merge + plan 005 hygiene)  
**Agent plan:** [`docs/plans/2026-05-30-006-feat-agent-submission-readiness-plan.md`](../plans/2026-05-30-006-feat-agent-submission-readiness-plan.md)  
**Human plan (still active):** [`docs/plans/2026-05-30-005-feat-remaining-work-subagent-plan.md`](../plans/2026-05-30-005-feat-remaining-work-subagent-plan.md) — flip to `completed` only after human U8 (MANUAL_PASS + walkthrough video).

---

## Agent complete

These items are done in-repo or automatable without founder attestation:

| Item | Evidence |
|------|----------|
| Release gate green | `npm run verify` — build, lint, typecheck, smoke **3/3**, e2e **58/58** (excludes `capture-screenshots`) |
| Architecture on `main` | [`src/demo/`](../../src/demo/), [`src/context/`](../../src/context/), [`src/motion/useWeaveSequence.ts`](../../src/motion/useWeaveSequence.ts), [`src/App.tsx`](../../src/App.tsx) ~545 lines |
| Application sign-off doc | [`docs/APPLICATION_COMPLETE.md`](../APPLICATION_COMPLETE.md) |
| Thermo remediation log | [`docs/THERMO_AUDIT_RESOLUTION.md`](../THERMO_AUDIT_RESOLUTION.md) |
| Submission assets index | [`docs/submission/README.md`](./README.md) |
| Screenshot capture script | `npm run capture:screenshots` → `01-hero.png`, `02-teaching-signals.png`, `03-fraction-garden.png`, `04-teacher-console.png`, `05-review-export.png`, `06-mobile-student.png` under `submission-screenshots/` (local; gitignored; **last run 2026-05-30 @ `4a9ba91`**) |
| CI parity | `.github/workflows/ci.yml` runs same `verify` as local |
| Pages workflow | [`.github/workflows/deploy-pages.yml`](../../.github/workflows/deploy-pages.yml) — build + deploy jobs; **no workflow change required** unless a concrete bug is found |

Agents must **not** check boxes in [`docs/qa/MANUAL_PASS_2026-05-30.md`](../qa/MANUAL_PASS_2026-05-30.md), root README submission checklist rows, or `08_QA_ACCEPTANCE_CHECKLIST.md` as passed without a human tester.

---

## Human required

Complete these before Contra / Stitch submit:

| Step | Action | Doc |
|------|--------|-----|
| 1 | Enable GitHub Pages (Settings → **GitHub Actions** source) | [Pages playbook](./README.md#one-time-enable-github-pages-required-for-deploy-workflow) below |
| 2 | Re-run **Deploy GitHub Pages** workflow; confirm live URL (not 404) | [Live demo](./README.md#live-demo) |
| 3 | Live smoke: open URL → **Run judge demo**; optional `?w=1#student` | [Live URL checklist](#live-url-checklist) |
| 4 | Complete manual QA (real browser; check boxes yourself) | [`docs/qa/MANUAL_PASS_2026-05-30.md`](../qa/MANUAL_PASS_2026-05-30.md) |
| 5 | Record 60–90s walkthrough; paste video URL in MANUAL_PASS | [`docs/submission/WALKTHROUGH.md`](./WALKTHROUGH.md) |
| 6 | Safari / Mobile Safari spot-check if available | MANUAL_PASS browser section |
| 7 | Re-read official Stitch / Contra rules | Submission README manual steps |
| 8 | Flip plan 005 to `completed` in frontmatter | After U8 only — **not** by agents alone |

Until Pages is enabled, the deploy job may **build successfully** while the site returns **404** at the public URL (observed on baseline `4a9ba91`).

---

## Commands

```bash
# Release gate (required before handoff)
npm install
npx playwright install chromium
npm run verify

# Local submission screenshots (PNGs gitignored)
npx playwright install chromium   # first-time E2E setup
npm run build
npm run capture:screenshots
```

Judge-facing run instructions: [root `README.md`](../../README.md).

---

## Live URL checklist

After Pages is enabled and **Deploy GitHub Pages** succeeds:

- [ ] **Human:** Open https://bwillia13x.github.io/lesson-loom-plan-to-playable/ — page loads (not GitHub 404).
- [ ] **Human:** Click **Run judge demo** — auto-weave through export milestones.
- [ ] **Human:** Open shareable student deep link: `?w=1#student` on the same host.
- [ ] **Human:** Optional manual path: **Weave lesson** (hero) → student tiles → **Check** → **Approve for Classroom Use** → export **Copy**.

Do **not** paste a fake deploy URL or mark the above as done in git without running the checks.

---

## Branches

| Branch | Role |
|--------|------|
| **`main`** | Integration branch for agents and CI — use @ current SHA (`4a9ba91+` after plan 006 doc commits). |
| `refactor/deferred-architecture` | Merged into `main` (plan 004); safe to delete **locally/remotely** after you confirm merge on GitHub. |
| `fix/thermo-post-ship-polish` | Merged; safe to delete after confirm. |

Agents must **not** delete remote branches unless the user explicitly requests pruning.

---

## Related links

| Resource | Path |
|----------|------|
| Manual QA (human-only checkboxes) | [`docs/qa/MANUAL_PASS_2026-05-30.md`](../qa/MANUAL_PASS_2026-05-30.md) |
| Submission assets & capture | [`docs/submission/README.md`](./README.md) |
| Walkthrough script | [`docs/submission/WALKTHROUGH.md`](./WALKTHROUGH.md) |
| Contra copy | [`docs/submission/CONTRA_COPY.md`](./CONTRA_COPY.md) |
| Application complete | [`docs/APPLICATION_COMPLETE.md`](../APPLICATION_COMPLETE.md) |
| Agent build instructions | [`AGENTS.md`](../../AGENTS.md) |
