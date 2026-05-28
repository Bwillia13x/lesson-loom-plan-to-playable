type WeaveSignalLineProps = {
  active: boolean;
  reducedMotion?: boolean;
};

export function WeaveSignalLine({ active, reducedMotion = false }: WeaveSignalLineProps) {
  return (
    <svg
      className="hero-weave-svg"
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className={`weave-path__line ${active ? 'weave-path__line--active' : ''}`}
        d="M 20 60 C 80 20, 120 100, 200 60 S 320 20, 380 60"
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
      {active && !reducedMotion && (
        <circle r="6" fill="var(--ll-orange)" opacity="0.9">
          <animateMotion
            dur="2.5s"
            repeatCount="indefinite"
            path="M 20 60 C 80 20, 120 100, 200 60 S 320 20, 380 60"
          />
        </circle>
      )}
    </svg>
  );
}
