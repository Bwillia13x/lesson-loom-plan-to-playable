# Manual QA pass — 2026-05-30

**Human-only:** An agent or CI must **not** check boxes in this file. A founder or tester runs the steps below in a real browser, then fills checkboxes, tester name, and video URL.

**Tester:** _name_  
**Live URL:** https://bwillia13x.github.io/lesson-loom-plan-to-playable/  
**Browser:** Chrome _version_ / Safari _version or N/A_

## Instructions (founder)

1. On `main` after plan 005, run `npm run verify` locally (or trust CI on the merge commit).
2. Open the **Live URL** above (GitHub Pages after deploy workflow succeeds).
3. Walk the golden path: **Weave lesson** → student tiles → **Check** → teacher approval → export **Copy**; optionally **Run judge demo**.
4. Resize to 1440px and 430px; note any overflow or typography issues.
5. Tab through weave, tiles, UDL lanes, teacher tabs, and export buttons (keyboard section below).
6. Record a 60–90s walkthrough per [`docs/submission/WALKTHROUGH.md`](../submission/WALKTHROUGH.md); paste the URL in **Video** below.
7. Check boxes only for criteria you personally verified; leave Safari rows unchecked with N/A + reason if unavailable.

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
