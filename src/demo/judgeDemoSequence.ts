import {
  equivalentCanonicalIds,
  type SignalSurfaceLink,
  type SupportLane,
  type TimelineId,
  type WorkspaceMode,
} from '../data/lessonLoomData';

export type JudgeDemoDeps = {
  demoRunning: boolean;
  prefersReducedMotion: boolean;
  setDemoRunning: (running: boolean) => void;
  setDemoCaptionIndex: (index: number) => void;
  setHighlightSurface: (surface: SignalSurfaceLink | null) => void;
  setApproved: (approved: boolean) => void;
  setCheckSuccess: (success: boolean) => void;
  setCheckAttempted: (attempted: boolean) => void;
  setSelectedTileIds: (ids: string[]) => void;
  setActiveSupport: (lane: SupportLane) => void;
  setReflectionText: (text: string) => void;
  setReflectionSaved: (saved: boolean) => void;
  setReflectionTouched: (touched: boolean) => void;
  setWorkspaceMode: (mode: WorkspaceMode) => void;
  setShowSuccessPulse: (pulse: boolean) => void;
  setActiveSegment: (segment: TimelineId) => void;
  setClassMode: (mode: 'whole' | 'groups') => void;
  runWeaveSequence: () => void;
  scrollTo: (sectionId: string) => void;
  delay: (ms: number) => Promise<void>;
};

export async function runJudgeDemo(deps: JudgeDemoDeps): Promise<void> {
  if (deps.demoRunning) return;

  deps.setDemoRunning(true);
  deps.setDemoCaptionIndex(0);
  deps.setHighlightSurface(null);
  deps.setApproved(false);
  deps.setCheckSuccess(false);
  deps.setCheckAttempted(false);
  deps.setSelectedTileIds([]);
  deps.setActiveSupport('core');
  deps.setReflectionText('');
  deps.setReflectionSaved(false);
  deps.setReflectionTouched(false);

  deps.runWeaveSequence();
  deps.setDemoCaptionIndex(1);
  await deps.delay(deps.prefersReducedMotion ? 300 : 1100);

  deps.setDemoCaptionIndex(2);
  deps.scrollTo('signals');
  await deps.delay(deps.prefersReducedMotion ? 200 : 700);

  deps.setWorkspaceMode('student');
  deps.setDemoCaptionIndex(3);
  deps.scrollTo('student');
  await deps.delay(400);

  if (!deps.prefersReducedMotion) {
    document.querySelector<HTMLButtonElement>('[data-testid="tile-one-half"]')?.click();
    await deps.delay(350);
    deps.setSelectedTileIds([...equivalentCanonicalIds]);
  } else {
    deps.setSelectedTileIds([...equivalentCanonicalIds]);
  }

  deps.setCheckAttempted(true);
  deps.setCheckSuccess(true);
  deps.setShowSuccessPulse(true);
  deps.setDemoCaptionIndex(4);
  await deps.delay(deps.prefersReducedMotion ? 200 : 800);

  deps.setActiveSupport('extend');
  deps.setDemoCaptionIndex(5);
  deps.scrollTo('udl');
  await deps.delay(deps.prefersReducedMotion ? 400 : 1200);

  deps.setWorkspaceMode('teacher');
  deps.setActiveSegment('partner');
  deps.setDemoCaptionIndex(6);
  deps.scrollTo('teacher');
  await deps.delay(deps.prefersReducedMotion ? 200 : 600);

  if (!deps.prefersReducedMotion) {
    deps.setClassMode('groups');
    deps.setDemoCaptionIndex(7);
    await deps.delay(500);
    deps.setClassMode('whole');
  } else {
    deps.setDemoCaptionIndex(7);
    await deps.delay(200);
  }

  deps.scrollTo('review');
  deps.setApproved(true);
  deps.setDemoCaptionIndex(8);
  await deps.delay(300);

  deps.setDemoCaptionIndex(9);
  deps.scrollTo('export');
  await deps.delay(deps.prefersReducedMotion ? 200 : 400);
  deps.setDemoRunning(false);
}
