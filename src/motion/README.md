# Lesson Loom — Motion (GSAP)

## Boot

`initGsapMotion()` runs once in `src/main.tsx` and sets `gsap.defaults()` via `gsap.matchMedia()`.

## Weave sequence

- Timing constants: `weaveTiming.ts` (`WEAVE_STEP_DELAYS_MS`, `WEAVE_SIGNAL_REVEAL_DELAY_S`)
- Timeline factory: `createWeaveTimeline(onStep, reducedMotion)` — killed from `App.tsx` on re-weave/unmount
- React state: `activeWeaveStep` starts at `-1` on weave CTA; steps fire at 100–820ms

## Components using GSAP

| Component | Behavior |
|-----------|----------|
| `WeaveSignalLine` | Path draw + motion-path orb (finite repeats) |
| `TeachingSignal` | Card stagger at 900ms after `hasWoven` |
| `StudentFractionGarden` | Success message `fromTo` pulse |

## Reduced motion

- User setting: `usePrefersReducedMotion()` in React
- Imperative gate: `runWithMotion(reduced, animate, instant)`
- Scroll: `scrollToSection(id, { reducedMotion })`

Do not add infinite decorative loops without reduced-motion off switch.
