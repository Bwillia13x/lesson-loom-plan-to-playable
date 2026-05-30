import {
  judgeDemoPresenterCaptions,
  JUDGE_DEMO_STEP_COUNT,
} from '../data/presenterCaptions';
import { Button } from '../components/ui/Button';

type JudgeDemoTopbarProps = {
  demoRunning: boolean;
  demoCaptionIndex: number;
  onSceneReset: () => void;
  onSceneSuccess: () => void;
  onSceneApproved: () => void;
  onRunJudgeDemo: () => void;
};

export function JudgeDemoTopbar({
  demoRunning,
  demoCaptionIndex,
  onSceneReset,
  onSceneSuccess,
  onSceneApproved,
  onRunJudgeDemo,
}: JudgeDemoTopbarProps) {
  return (
    <>
      <div className="app-topbar__scenes" data-testid="judge-scenes">
        <label htmlFor="judge-scenes-select" className="sr-only">
          Demo scenes
        </label>
        <select
          id="judge-scenes-select"
          className="app-topbar__scenes-select"
          defaultValue=""
          disabled={demoRunning}
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'reset') onSceneReset();
            if (value === 'success') onSceneSuccess();
            if (value === 'approved') onSceneApproved();
            e.target.value = '';
          }}
        >
          <option value="" disabled>
            Scenes
          </option>
          <option value="reset">Reset demo</option>
          <option value="success">Success state</option>
          <option value="approved">Approved</option>
        </select>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => void onRunJudgeDemo()}
        disabled={demoRunning}
        data-testid="run-judge-demo"
        aria-label={demoRunning ? 'Judge demo running' : 'Run judge demo'}
      >
        {demoRunning ? (
          'Running demo…'
        ) : (
          <>
            <span className="judge-demo-btn__long" aria-hidden="true">
              Run judge demo
            </span>
            <span className="judge-demo-btn__short" aria-hidden="true">
              Run demo
            </span>
          </>
        )}
      </Button>
      {demoRunning && (
        <div
          className="judge-demo-rail"
          data-testid="judge-demo-rail"
          aria-live="polite"
        >
          <span className="sr-only">
            Demo step {demoCaptionIndex + 1} of {JUDGE_DEMO_STEP_COUNT}
          </span>
          <span aria-hidden="true">
            {demoCaptionIndex + 1}/{JUDGE_DEMO_STEP_COUNT}
          </span>
          <span className="judge-demo-rail__caption">
            {judgeDemoPresenterCaptions[demoCaptionIndex] ??
              judgeDemoPresenterCaptions[0]}
          </span>
        </div>
      )}
    </>
  );
}

export function PresenterCaption({
  visible,
  captionIndex,
}: {
  visible: boolean;
  captionIndex: number;
}) {
  if (!visible) return null;
  return (
    <div
      className="presenter-caption"
      data-testid="presenter-caption"
      role="status"
      aria-live="polite"
    >
      {judgeDemoPresenterCaptions[captionIndex] ?? judgeDemoPresenterCaptions[0]}
    </div>
  );
}
