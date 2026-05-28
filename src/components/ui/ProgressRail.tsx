import { weaveSteps } from '../../data/lessonLoomData';

type ProgressRailProps = {
  activeIndex: number;
  steps?: readonly string[];
  ariaLabel?: string;
  'data-testid'?: string;
};

export function ProgressRail({
  activeIndex,
  steps = weaveSteps,
  ariaLabel = 'Lesson weave progress',
  'data-testid': testId,
}: ProgressRailProps) {
  return (
    <div
      className="progress-rail"
      role="list"
      aria-label={ariaLabel}
      data-testid={testId}
    >
      {steps.map((step, i) => (
        <span key={step} role="listitem" style={{ display: 'contents' }}>
          {i > 0 && (
            <span className="progress-rail__arrow" aria-hidden="true">
              →
            </span>
          )}
          <span
            className={[
              'progress-rail__step',
              i < activeIndex ? 'progress-rail__step--done' : '',
              i === activeIndex ? 'progress-rail__step--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            data-testid={testId ? `progress-rail-step-${i}` : undefined}
          >
            {step}
          </span>
        </span>
      ))}
    </div>
  );
}
