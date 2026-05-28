import { IndustrialButton } from './ui/IndustrialButton';
import { StatusPip } from './ui/StatusPip';

type WeaveCompleteBannerProps = {
  onStudent: () => void;
  onTeacher: () => void;
  onExport: () => void;
};

export function WeaveCompleteBanner({
  onStudent,
  onTeacher,
  onExport,
}: WeaveCompleteBannerProps) {
  return (
    <div
      className="weave-complete-banner"
      role="status"
      aria-live="polite"
      data-testid="weave-complete-banner"
    >
      <div className="weave-complete-banner__copy">
        <span className="weave-complete-banner__status-icon" aria-hidden="true">
          ✓
        </span>
        <StatusPip label="Lesson woven" tone="green" pulse />
        <p>
          Teaching signal extracted. Explore the student app, teacher console, or export
          pack.
        </p>
      </div>
      <div className="weave-complete-banner__actions">
        <IndustrialButton variant="primary" size="sm" onClick={onStudent}>
          Open student app
        </IndustrialButton>
        <IndustrialButton variant="secondary" size="sm" onClick={onTeacher}>
          Open teacher console
        </IndustrialButton>
        <IndustrialButton variant="ghost" size="sm" onClick={onExport}>
          View export pack
        </IndustrialButton>
      </div>
    </div>
  );
}
