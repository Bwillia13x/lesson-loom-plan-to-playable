import { useCallback, useRef, useState } from 'react';
import { delay } from '../utils/scroll';
import {
  applyDemoReset,
  applyDemoReviewApproved,
  applyDemoSuccessState,
  type DemoSceneDeps,
} from './demoScenePresets';
import { runJudgeDemo, type JudgeDemoDeps } from './judgeDemoSequence';

export type LessonLoomDemoApi = Omit<DemoSceneDeps, 'setDemoCaptionIndex'> &
  Pick<
    JudgeDemoDeps,
    | 'prefersReducedMotion'
    | 'runWeaveSequence'
    | 'setActiveSegment'
    | 'setClassMode'
    | 'setHighlightSurface'
  >;

export function useLessonLoomDemo(getApi: () => LessonLoomDemoApi) {
  const [demoRunning, setDemoRunning] = useState(false);
  const [demoCaptionIndex, setDemoCaptionIndex] = useState(0);
  const apiRef = useRef<LessonLoomDemoApi | null>(null);
  apiRef.current = getApi();

  const applyDemoResetHandler = useCallback(() => {
    const api = apiRef.current;
    if (!api) return;
    applyDemoReset({ ...api, setDemoCaptionIndex });
  }, []);

  const applyDemoSuccessStateHandler = useCallback(() => {
    const api = apiRef.current;
    if (!api) return;
    applyDemoSuccessState({ ...api, setDemoCaptionIndex });
  }, []);

  const applyDemoReviewApprovedHandler = useCallback(() => {
    const api = apiRef.current;
    if (!api) return;
    applyDemoReviewApproved(api);
  }, []);

  const runJudgeDemoHandler = useCallback(() => {
    const api = apiRef.current;
    if (!api) return;
    return runJudgeDemo({
      demoRunning,
      prefersReducedMotion: api.prefersReducedMotion,
      setDemoRunning,
      setDemoCaptionIndex,
      setHighlightSurface: api.setHighlightSurface,
      setApproved: api.setApproved,
      setCheckSuccess: api.setCheckSuccess,
      setCheckAttempted: api.setCheckAttempted,
      setSelectedTileIds: api.setSelectedTileIds,
      setActiveSupport: api.setActiveSupport,
      setReflectionText: api.setReflectionText,
      setReflectionSaved: api.setReflectionSaved,
      setReflectionTouched: api.setReflectionTouched,
      setWorkspaceMode: api.setWorkspaceMode,
      setShowSuccessPulse: api.setShowSuccessPulse,
      setActiveSegment: api.setActiveSegment,
      setClassMode: api.setClassMode,
      runWeaveSequence: api.runWeaveSequence,
      scrollTo: api.scrollTo,
      delay,
    });
  }, [demoRunning]);

  return {
    demoRunning,
    demoCaptionIndex,
    applyDemoReset: applyDemoResetHandler,
    applyDemoSuccessState: applyDemoSuccessStateHandler,
    applyDemoReviewApproved: applyDemoReviewApprovedHandler,
    runJudgeDemo: runJudgeDemoHandler,
  };
}
