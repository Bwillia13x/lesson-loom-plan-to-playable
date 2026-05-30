import {
  equivalentCanonicalIds,
  weaveSteps,
  type SupportLane,
  type WorkspaceMode,
} from '../data/lessonLoomData';

export type DemoSceneLifecycle = {
  clearWeaveTimeline: () => void;
  clearUiTimeouts: () => void;
};

export type DemoSceneSetters = {
  setHasWoven: (woven: boolean) => void;
  setActiveWeaveStep: (step: number) => void;
  setWorkspaceMode: (mode: WorkspaceMode) => void;
  setActiveSupport: (lane: SupportLane) => void;
  setSelectedTileIds: (ids: string[]) => void;
  setCopiedExportId: (id: string | null) => void;
  setDownloadNotice: (notice: string | null) => void;
  setCheckSuccess: (success: boolean) => void;
  setCheckAttempted: (attempted: boolean) => void;
  setShowSuccessPulse: (pulse: boolean) => void;
  setReflectionText: (text: string) => void;
  setReflectionSaved: (saved: boolean) => void;
  setReflectionTouched: (touched: boolean) => void;
  setApproved: (approved: boolean) => void;
  setDemoCaptionIndex: (index: number) => void;
  setWeaveLiveMessage: (message: string) => void;
};

export type DemoSceneDeps = DemoSceneLifecycle &
  DemoSceneSetters & {
    scrollTo: (sectionId: string) => void;
  };

export function applyDemoReset(deps: DemoSceneDeps): void {
  deps.clearWeaveTimeline();
  deps.clearUiTimeouts();
  deps.setHasWoven(false);
  deps.setActiveWeaveStep(0);
  deps.setWorkspaceMode('student');
  deps.setActiveSupport('core');
  deps.setSelectedTileIds([]);
  deps.setCopiedExportId(null);
  deps.setDownloadNotice(null);
  deps.setCheckSuccess(false);
  deps.setCheckAttempted(false);
  deps.setShowSuccessPulse(false);
  deps.setReflectionText('');
  deps.setReflectionSaved(false);
  deps.setReflectionTouched(false);
  deps.setApproved(false);
  deps.setDemoCaptionIndex(0);
  deps.setWeaveLiveMessage('');
}

export function applyDemoSuccessState(deps: DemoSceneDeps): void {
  deps.clearWeaveTimeline();
  deps.clearUiTimeouts();
  deps.setHasWoven(true);
  deps.setActiveWeaveStep(weaveSteps.length - 1);
  deps.setWorkspaceMode('student');
  deps.setSelectedTileIds([...equivalentCanonicalIds]);
  deps.setCheckAttempted(true);
  deps.setCheckSuccess(true);
  deps.setShowSuccessPulse(true);
  deps.setWeaveLiveMessage(
    'Lesson woven. Teaching signal extracted and ready to explore.',
  );
  deps.scrollTo('student');
}

export function applyDemoReviewApproved(
  deps: Pick<
    DemoSceneDeps,
    'setHasWoven' | 'setActiveWeaveStep' | 'setApproved' | 'scrollTo'
  >,
): void {
  deps.setHasWoven(true);
  deps.setActiveWeaveStep(weaveSteps.length - 1);
  deps.setApproved(true);
  deps.scrollTo('review');
}
