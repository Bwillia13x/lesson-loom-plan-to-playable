# QA acceptance status

**Phase 3 manual evidence:** See `docs/qa/MANUAL_PASS_2026-05-30.md` after human pass.

Tracked against `08_QA_ACCEPTANCE_CHECKLIST.md`. Last updated: 2026-05-29 (Phase 2: viewport e2e, session coupling, judge demo rail).

## Product acceptance

- [ ] The concept is clear within 30 seconds. — _manual judge pass_
- [x] The hero explains “lesson plan → interactive classroom app.” — _hero headline + e2e/copy-deck.spec.ts_
- [x] Hero trust line uses claim-safe copy deck language. — _e2e/copy-deck.spec.ts (hero, intake, review)_
- [x] The demo focuses on one lesson: Fraction Garden. — _lessonLoomData.ts_
- [ ] The prototype does not feel like a generic SaaS landing page. — _manual_
- [ ] The output feels useful to a teacher. — _manual_
- [x] The student app feels interactive and visually rich. — _e2e/smoke.spec.ts_
- [x] The teacher console feels practical. — _segment-specific prompts in e2e/unified-session.spec.ts; manual polish pass still recommended_
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

- [x] 1440px desktop. — _e2e/viewports.spec.ts_
- [x] 1280px laptop. — _e2e/viewports.spec.ts_
- [x] 1024px tablet landscape. — _e2e/viewports.spec.ts_
- [x] 768px tablet portrait. — _e2e/responsive-tablet.spec.ts_
- [x] 430px mobile. — _e2e/viewports.spec.ts_
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
- [x] Visible keyboard focus. — _--ll-focus-ring on buttons/tiles/links (Phase 2 F1)_
- [ ] Controls can be tabbed to. — _manual_
- [x] Interactive fraction tiles have accessible labels. — _StudentFractionGarden aria-label_
- [x] Color is not the only indicator of selection/success. — _labels + checkmarks_
- [ ] Contrast is acceptable. — _manual_
- [x] Reduced-motion preference is respected. — _usePrefersReducedMotion + CSS + GSAP initGsapMotion + e2e/reduced-motion.spec.ts_
- [x] GSAP weave timeline + reduced-motion e2e. — _e2e/reduced-motion.spec.ts_
- [x] Student section active styling post-weave. — _ll-section--woven-active_
- [x] Text alternatives or labels exist for visual-only concepts. — _aria on tiles_

## Claim-safety checks

- [x] Does not claim official curriculum generation. — _copy audit_
- [x] Does not claim teacher replacement. — _copy audit_
- [x] Does not claim district approval. — _copy audit_
- [x] Does not claim full privacy compliance. — _copy audit_
- [x] Does not imply student profiling. — _copy audit_
- [x] Does not automate grading. — _copy audit_
- [x] Review & Safety section is visible. — _ReviewSafety section_
- [x] “Teacher review required” language is present. — _ReviewSafety + e2e/copy-deck.spec.ts_
- [x] “No student data required” language is present. — _ReviewSafety / hero + e2e/copy-deck.spec.ts_
- [x] “Printable fallback” language is present. — _PrintableFallback + e2e/copy-deck.spec.ts_
- [x] Copy deck strings (hero, intake, review headings). — _e2e/copy-deck.spec.ts_
- [x] Student mission progress rail. — _e2e/student-progress.spec.ts_
- [x] Editable lesson plan draft (session). — _e2e/editable-intake.spec.ts_
- [x] Export pack zip download. — _e2e/export-zip.spec.ts_
- [x] Export zip includes saved reflection notes. — _e2e/export-zip.spec.ts_
- [x] Export approved pip when review complete. — _e2e/smoke.spec.ts, e2e/judge-demo.spec.ts_
- [x] Student lane scaffolds copy. — _e2e/unified-session.spec.ts_
- [x] Shareable demo URL + hash. — _e2e/demo-url.spec.ts_
- [x] Demo URL support lane hydrates student copy. — _e2e/demo-url.spec.ts_
- [x] Source phrase scroll to intake. — _e2e/source-phrase.spec.ts_
- [x] Source phrase highlight in plan. — _e2e/source-phrase.spec.ts_
- [x] UDL lane drives student mission copy. — _e2e/unified-session.spec.ts_
- [x] Teacher segment drives console prompts. — _e2e/unified-session.spec.ts_
- [x] Devices preview mirrors session. — _e2e/unified-session.spec.ts_
- [x] Extended judge demo (signals + UDL beats). — _e2e/judge-demo.spec.ts_
- [x] System map in Made with Stitch. — _data-testid=system-map_
- [x] Export gate copy (pending vs approved). — _e2e/export-gate.spec.ts_
- [x] Class mode drives teacher partner prompts. — _e2e/unified-session.spec.ts_
- [x] Devices mirror approval state. — _e2e/unified-session.spec.ts_
- [x] Export zip teacher-console-notes when reflection saved. — _e2e/export-zip.spec.ts_
- [x] Judge demo progress rail. — _e2e/judge-demo.spec.ts_
- [x] System map Review before approval, Export after. — _e2e/phase2-session.spec.ts_
- [x] Reflection excerpt on teacher exit ticket. — _e2e/phase2-session.spec.ts_
- [x] Zip session-readme approval state. — _e2e/phase2-session.spec.ts, e2e/export-zip.spec.ts_
- [x] Student groups-mode hint copy. — _e2e/phase2-session.spec.ts_

## Performance checks

- [x] App builds successfully. — _npm run verify (build + lint + e2e suite)_
- [x] No console errors in normal flow. — _e2e/judge-demo-console.spec.ts (judge demo path)_
- [x] No huge unnecessary assets. — _vite build ~361kb js (~122kb gzip); fflate for client zip_
- [x] No blocking external scripts unless necessary. — _Google Fonts with display=swap; system fallbacks in tokens.css_
- [x] theme-color matches warm ivory UI. — _index.html #faf8f4 (--ll-bg)_
- [ ] CSS animations do not cause obvious jank. — _manual_

## Browser checks

- [x] Chrome. — _Playwright chromium CI_
- [ ] Safari if available. — _manual (see docs/submission/README.md § Manual steps)_
- [ ] Mobile Safari if available. — _manual (see docs/submission/README.md § Manual steps)_

## Submission checks

- [x] Live URL works. — _GitHub Pages https://bwillia13x.github.io/lesson-loom-plan-to-playable/ ; judge demo e2e on Chromium_
- [x] Page title is set. — _index.html_
- [x] Meta description is set. — _index.html_
- [x] Screenshots captured. — _npm run capture:screenshots (local, gitignored)_
- [ ] 60–90 second walkthrough recorded. — _manual: see docs/submission/WALKTHROUGH.md_
- [x] Contra submission copy ready. — _docs/submission/CONTRA_COPY.md_
- [x] Source/credits clear. — _README + MadeWithStitch_
- [ ] Final challenge rules checked manually before posting. — _manual (docs/submission/README.md § Manual steps)_
