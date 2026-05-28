import gsap from 'gsap';

/** Shared matchMedia context — import once at app boot via `initGsapMotion()`. */
export const reducedMotionMedia = gsap.matchMedia();

const DEFAULT_EASE = 'power2.out';
const DEFAULT_DURATION = 0.5;

let motionInitialized = false;

/**
 * Registers GSAP global defaults per prefers-reduced-motion.
 * Call exactly once from `main.tsx` before `createRoot().render()`.
 */
export function initGsapMotion(): void {
  if (motionInitialized) return;
  motionInitialized = true;

  reducedMotionMedia.add(
    { reduceMotion: '(prefers-reduced-motion: reduce)' },
    () => {
      gsap.defaults({ duration: 0, ease: 'none' });
      return () => {
        gsap.defaults({ duration: DEFAULT_DURATION, ease: DEFAULT_EASE });
      };
    },
  );

  reducedMotionMedia.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.defaults({ duration: DEFAULT_DURATION, ease: DEFAULT_EASE });
    return () => {
      gsap.defaults({ duration: DEFAULT_DURATION, ease: DEFAULT_EASE });
    };
  });
}

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
