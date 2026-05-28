import gsap from 'gsap';
import { weaveSteps } from '../data/lessonLoomData';
import { WEAVE_STEP_DELAYS_MS } from './weaveTiming';

export function createWeaveTimeline(
  onStep: (index: number) => void,
  reducedMotion: boolean,
): gsap.core.Timeline {
  if (reducedMotion) {
    onStep(weaveSteps.length - 1);
    const tl = gsap.timeline();
    tl.kill();
    return tl;
  }

  const tl = gsap.timeline();
  WEAVE_STEP_DELAYS_MS.forEach((delayMs, index) => {
    tl.call(() => onStep(index), undefined, delayMs / 1000);
  });
  return tl;
}
