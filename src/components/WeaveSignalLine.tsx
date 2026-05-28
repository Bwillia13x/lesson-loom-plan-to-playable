import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { runGsapScoped } from '../motion/runGsapScoped';

gsap.registerPlugin(MotionPathPlugin);

const WEAVE_PATH_D = 'M 20 60 C 80 20, 120 100, 200 60 S 320 20, 380 60';

type WeaveSignalLineProps = {
  active: boolean;
  reducedMotion?: boolean;
};

export function WeaveSignalLine({ active, reducedMotion = false }: WeaveSignalLineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (reducedMotion) return;
    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useLayoutEffect(() => {
    const path = pathRef.current;
    const circle = circleRef.current;
    if (!svgRef.current || !path || !circle) return;

    const motionEnabled = active && inView;

    return runGsapScoped(
      svgRef,
      reducedMotion,
      (gsapApi) => {
        if (!motionEnabled) {
          gsapApi.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });
          gsapApi.set(circle, { autoAlpha: 0 });
          return;
        }

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
          repeat: 2,
          ease: 'none',
        });
      },
      (gsapApi) => {
        gsapApi.set(path, {
          strokeDasharray: 1,
          strokeDashoffset: motionEnabled ? 0 : 1,
        });
        gsapApi.set(circle, { autoAlpha: motionEnabled ? 1 : 0 });
      },
    );
  }, [active, reducedMotion, inView]);

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
