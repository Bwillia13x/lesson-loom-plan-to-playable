import { Button } from './ui/Button';
import { StatusPip } from './ui/StatusPip';

import type { SupportLane } from '../data/lessonLoomData';

type WeaveCompleteBannerProps = {
  activeSupport: SupportLane;
  approved: boolean;
  checkSuccess: boolean;
  onStudent: () => void;
  onTeacher: () => void;
  onExport: () => void;
};

export function WeaveCompleteBanner({
  activeSupport,
  approved,
  checkSuccess,
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
        <p className="weave-banner__session text-mono" data-testid="weave-banner-session">
          Lane: {activeSupport} · {approved ? 'Approved' : 'Review pending'}
          {checkSuccess ? ' · Equivalence complete' : ''}
        </p>
      </div>
      <div className="weave-complete-banner__actions">
        <Button variant="primary" size="sm" onClick={onStudent}>
          Open student app
        </Button>
        <Button variant="secondary" size="sm" onClick={onTeacher}>
          Open teacher console
        </Button>
        <Button variant="ghost" size="sm" onClick={onExport}>
          View export pack
        </Button>
      </div>
    </div>
  );
}
