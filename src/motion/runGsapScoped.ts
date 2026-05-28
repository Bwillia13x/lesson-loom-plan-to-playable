import type { RefObject } from 'react';
import gsap from 'gsap';
import { runWithMotion } from './gsapReducedMotion';

type GsapScope =
  | RefObject<HTMLElement | SVGSVGElement | null>
  | HTMLElement
  | SVGSVGElement;

function resolveScopeElement(
  scope: GsapScope,
): HTMLElement | SVGSVGElement | null {
  if ('current' in scope) {
    return scope.current;
  }
  return scope;
}

export function runGsapScoped(
  scope: GsapScope,
  reducedMotion: boolean,
  setup: (gsapApi: typeof gsap) => void,
  instant?: (gsapApi: typeof gsap) => void,
): () => void {
  const scopeElement = resolveScopeElement(scope);
  if (!scopeElement) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    runWithMotion(
      reducedMotion,
      () => setup(gsap),
      () => instant?.(gsap),
    );
  }, scopeElement);

  return () => ctx.revert();
}
