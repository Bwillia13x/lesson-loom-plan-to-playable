import { weaveSteps } from '../../data/lessonLoomData';

type ProgressRailProps = {
  activeIndex: number;
};

export function ProgressRail({ activeIndex }: ProgressRailProps) {
  return (
    <div className="progress-rail" role="list" aria-label="Lesson weave progress">
      {weaveSteps.map((step, i) => (
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
          >
            {step}
          </span>
        </span>
      ))}
    </div>
  );
}
