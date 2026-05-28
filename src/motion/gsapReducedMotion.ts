import gsap from 'gsap';

/** Shared matchMedia context for prefers-reduced-motion (GSAP ScrollTrigger-style API). */
export const reducedMotionMedia = gsap.matchMedia();

reducedMotionMedia.add(
  {
    reduceMotion: '(prefers-reduced-motion: reduce)',
  },
  () => {
    // Reduced-motion context: components gate animations via usePrefersReducedMotion.
  },
);

export function runWithMotion(
  reducedMotion: boolean,
  animate: () => void,
  instant?: () => void,
): void {
  if (reducedMotion) {
    instant?.();
    return;
  }
  animate();
}
