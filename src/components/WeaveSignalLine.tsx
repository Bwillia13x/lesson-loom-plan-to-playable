import { useEffect, useRef, useState } from 'react';

type WeaveSignalLineProps = {
  active: boolean;
  reducedMotion?: boolean;
};

const WEAVE_PATH =
  'M 20 60 C 80 20, 120 100, 200 60 S 320 20, 380 60';

export function WeaveSignalLine({ active, reducedMotion = false }: WeaveSignalLineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
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

  const motionEnabled = active && !reducedMotion && inView;

  return (
    <svg
      ref={svgRef}
      className="hero-weave-svg"
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-weave-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="var(--ll-lavender-deep)" />
          <stop offset="50%" stopColor="var(--ll-sage)" />
          <stop offset="100%" stopColor="var(--ll-gold)" />
        </linearGradient>
      </defs>
      <path
        className={`weave-path__line ${active ? 'weave-path__line--active' : ''}`}
        d={WEAVE_PATH}
        pathLength={1}
        style={
          active
            ? {
                strokeDasharray: 1,
                strokeDashoffset: 0,
                transition: reducedMotion ? undefined : 'stroke-dashoffset 1s ease',
              }
            : undefined
        }
      />
      {motionEnabled && (
        <circle r="5" fill="var(--ll-gold)" opacity="0.85">
          <animateMotion dur="2.5s" repeatCount="indefinite" path={WEAVE_PATH} />
        </circle>
      )}
    </svg>
  );
}
