# QA acceptance status

Tracked against `08_QA_ACCEPTANCE_CHECKLIST.md`. Last updated: 2026-05-28 (10 e2e tests passing).

## Product acceptance

- [ ] The concept is clear within 30 seconds. — _manual judge pass_
- [x] The hero explains “lesson plan → interactive classroom app.” — _hero copy + e2e/copy-deck.spec.ts_
- [x] The demo focuses on one lesson: Fraction Garden. — _lessonLoomData.ts_
- [ ] The prototype does not feel like a generic SaaS landing page. — _manual_
- [ ] The output feels useful to a teacher. — _manual_
- [x] The student app feels interactive and visually rich. — _e2e/smoke.spec.ts_
- [ ] The teacher console feels practical. — _manual_
- [x] The export pack ties the project back to Stitch and build handoff. — _MadeWithStitch + export smoke_

## Functional checks

- [x] **Weave lesson** button changes app state. — _e2e/smoke.spec.ts_
- [x] Teaching signal cards reveal or activate after weave. — _e2e/capture-screenshots flow_
- [x] Lesson Weave path/stages activate in order or appear active. — _runWeaveSequence_
- [x] Student/Teacher toggle works. — _e2e/accessibility.spec.ts_
- [x] Fraction tile selection works. — _e2e/smoke.spec.ts_
- [x] Equivalent fraction success state works. — _e2e/smoke.spec.ts_
- [x] Hint button works or reveals hint text. — _e2e/accessibility.spec.ts_
- [x] Support/Core/Extend toggle works. — _e2e/smoke.spec.ts_
- [x] Export Pack copy buttons show feedback. — _e2e/smoke.spec.ts_
- [x] Anchor links / section CTAs scroll correctly if implemented. — _nav + scrollToSection_

## Visual checks

- [ ] Warm ivory background is applied consistently. — _manual_
- [ ] Typography hierarchy is clear. — _manual_
- [ ] Cards have refined spacing, borders, and shadows. — _manual_
- [ ] Fraction Garden is the visual centerpiece. — _manual_
- [ ] Motion is restrained and premium. — _manual_
- [ ] No cluttered dashboard feel. — _manual_
- [ ] No childish primary-color overload. — _manual_
- [ ] No generic robot/AI-brain imagery. — _manual_
- [ ] Hero is screenshot-worthy. — _manual / capture:screenshots_

## Responsive checks

- [ ] 1440px desktop. — _manual_
- [ ] 1280px laptop. — _manual_
- [ ] 1024px tablet landscape. — _manual_
- [x] 768px tablet portrait. — _e2e/responsive-tablet.spec.ts_
- [ ] 430px mobile. — _manual_
- [x] 390px mobile. — _e2e/responsive.spec.ts_

For each width:

- [x] No horizontal scroll (390px). — _e2e/responsive.spec.ts_
- [x] No horizontal scroll (768px after weave). — _e2e/responsive-tablet.spec.ts_
- [ ] Text remains readable. — _manual_
- [ ] Fraction tiles wrap correctly. — _manual_
- [x] Mode toggle remains usable. — _e2e/accessibility.spec.ts_
- [ ] Export cards stack gracefully. — _manual_
- [ ] Hero visual does not crush copy. — _manual_

## Accessibility checks

- [ ] Semantic heading order. — _manual tab pass_
- [x] Real buttons for interactions. — _code review_
- [ ] Visible keyboard focus. — _manual_
- [ ] Controls can be tabbed to. — _manual_
- [x] Interactive fraction tiles have accessible labels. — _StudentFractionGarden aria-label_
- [x] Color is not the only indicator of selection/success. — _labels + checkmarks_
- [ ] Contrast is acceptable. — _manual_
- [x] Reduced-motion preference is respected. — _usePrefersReducedMotion + CSS_
- [x] Text alternatives or labels exist for visual-only concepts. — _aria on tiles_

## Claim-safety checks

- [x] Does not claim official curriculum generation. — _copy audit_
- [x] Does not claim teacher replacement. — _copy audit_
- [x] Does not claim district approval. — _copy audit_
- [x] Does not claim full privacy compliance. — _copy audit_
- [x] Does not imply student profiling. — _copy audit_
- [x] Does not automate grading. — _copy audit_
- [x] Review & Safety section is visible. — _ReviewSafety section_
- [x] “Teacher review required” language is present. — _ReviewSafety_
- [x] “No student data required” language is present. — _ReviewSafety / hero_
- [x] “Printable fallback” language is present. — _PrintableFallback_

## Performance checks

- [x] App builds successfully. — _npm run verify (build + lint + 10 e2e)_
- [ ] No console errors in normal flow. — _manual_
- [x] No huge unnecessary assets. — _vite build ~240kb js_
- [ ] No blocking external scripts unless necessary. — _Google Fonts only_
- [ ] CSS animations do not cause obvious jank. — _manual_

## Browser checks

- [x] Chrome. — _Playwright chromium CI_
- [ ] Safari if available. — _manual_
- [ ] Mobile Safari if available. — _manual_

## Submission checks

- [ ] Live URL works. — _after Vercel deploy_
- [x] Page title is set. — _index.html_
- [x] Meta description is set. — _index.html_
- [x] Screenshots captured. — _npm run capture:screenshots (local, gitignored)_
- [ ] 60–90 second walkthrough recorded. — _manual_
- [x] Contra submission copy ready. — _docs/submission/CONTRA_COPY.md_
- [x] Source/credits clear. — _README + MadeWithStitch_
- [ ] Final challenge rules checked manually before posting. — _manual_
