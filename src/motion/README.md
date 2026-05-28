# Lesson Loom — Motion (GSAP)

## Reduced-motion policy

Single spine via **`MotionProvider`** + **`useMotion()`**:

1. **`MotionProvider`** wraps the app in `main.tsx`; calls `usePrefersReducedMotion()` once.
2. **`useMotion()`** → `{ reduced }` — use in any child instead of prop drilling.
3. **`useScrollToSection()`** → `(id) => void` — scroll helper bound to `reduced`.
4. **`runWithMotion(reduced, animate, instant?)`** — imperative GSAP gate.
5. **`runGsapScoped(scope, reduced, setup, instant?)`** — `gsap.context` + cleanup revert.

## Weave sequence

- Timing constants: `weaveTiming.ts` (`WEAVE_STEP_DELAYS_MS`, `WEAVE_SIGNAL_REVEAL_DELAY_S`)
- Timeline factory: `createWeaveTimeline(onStep, reduced)` — killed from `App.tsx` on re-weave/unmount
- React state: `activeWeaveStep` starts at `-1` on weave CTA; steps fire at 100–820ms (`LessonWeave` UI only)

## Components using GSAP

| Component | Behavior |
|-----------|----------|
| `WeaveSignalLine` | Path draw + motion-path orb (finite repeats) |
| `TeachingSignal` | Card stagger at 900ms after `hasWoven` |
| `StudentFractionGarden` | Success message `fromTo` pulse |

## Post-weave UI (CSS)

`src/styles/motion.css` — `#student.ll-section--woven-active` orange ring when weave completes.

Do not add infinite decorative loops without reduced-motion off switch.
