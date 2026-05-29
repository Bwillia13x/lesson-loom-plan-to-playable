import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useMotion } from '../motion/motionContext';
import { runGsapScoped } from '../motion/runGsapScoped';

gsap.registerPlugin(MotionPathPlugin);

const WEAVE_PATH_D = 'M 20 60 C 80 20, 120 100, 200 60 S 320 20, 380 60';

type WeaveSignalLineProps = {
  active: boolean;
};

function applySettledState(
  gsapApi: typeof gsap,
  path: SVGPathElement,
  circle: SVGCircleElement,
) {
  gsapApi.set(path, { strokeDasharray: 1, strokeDashoffset: 0 });
  gsapApi.set(circle, { autoAlpha: 0 });
}

function applyInactiveState(
  gsapApi: typeof gsap,
  path: SVGPathElement,
  circle: SVGCircleElement,
) {
  gsapApi.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });
  gsapApi.set(circle, { autoAlpha: 0 });
}

export function WeaveSignalLine({ active }: WeaveSignalLineProps) {
  const { reduced: reducedMotion } = useMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const introPlayedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      introPlayedRef.current = false;
    }
  }, [active]);

  useLayoutEffect(() => {
    const path = pathRef.current;
    const circle = circleRef.current;
    if (!svgRef.current || !path || !circle) return;

    if (!active) {
      return runGsapScoped(
        svgRef,
        reducedMotion,
        (gsapApi) => applyInactiveState(gsapApi, path, circle),
        (gsapApi) => applyInactiveState(gsapApi, path, circle),
      );
    }

    if (reducedMotion) {
      introPlayedRef.current = true;
      return runGsapScoped(
        svgRef,
        reducedMotion,
        (gsapApi) => applySettledState(gsapApi, path, circle),
        (gsapApi) => applySettledState(gsapApi, path, circle),
      );
    }

    if (introPlayedRef.current) {
      return runGsapScoped(
        svgRef,
        reducedMotion,
        (gsapApi) => applySettledState(gsapApi, path, circle),
        (gsapApi) => applySettledState(gsapApi, path, circle),
      );
    }

    return runGsapScoped(
      svgRef,
      reducedMotion,
      (gsapApi) => {
        gsapApi.fromTo(
          path,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1, ease: 'power2.out' },
        );

        gsapApi.set(circle, { autoAlpha: 1 });
        gsapApi.to(circle, {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
          },
          duration: 2.5,
          repeat: 1,
          ease: 'none',
          onComplete: () => {
            gsapApi.set(circle, { autoAlpha: 0 });
            introPlayedRef.current = true;
          },
        });
      },
      (gsapApi) => applySettledState(gsapApi, path, circle),
    );
  }, [active, reducedMotion]);

  return (
    <svg
      ref={svgRef}
      className="hero-weave-svg"
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        className={`weave-path__line ${active ? 'weave-path__line--active' : ''}`}
        d={WEAVE_PATH_D}
        pathLength={1}
      />
      <circle
        ref={circleRef}
        r="6"
        fill="var(--ll-orange)"
        opacity={0.9}
        visibility="hidden"
      />
    </svg>
  );
}
