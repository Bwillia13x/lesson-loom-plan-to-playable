import { useCallback, useEffect, useRef } from 'react';
import { createWeaveTimeline } from './createWeaveTimeline';

const WOVEN_LIVE_MESSAGE =
  'Lesson woven. Teaching signal extracted and ready to explore.';

type UseWeaveSequenceOptions = {
  hasWoven: boolean;
  prefersReducedMotion: boolean;
  scrollTo: (id: string, options?: { updateHash?: boolean }) => void;
  setHasWoven: (woven: boolean) => void;
  setActiveWeaveStep: (step: number | ((prev: number) => number)) => void;
  setWeaveLiveMessage: (message: string) => void;
  onBeforeWeave?: () => void;
};

export function useWeaveSequence({
  hasWoven,
  prefersReducedMotion,
  scrollTo,
  setHasWoven,
  setActiveWeaveStep,
  setWeaveLiveMessage,
  onBeforeWeave,
}: UseWeaveSequenceOptions) {
  const weaveTimelineRef = useRef<ReturnType<typeof createWeaveTimeline>>(null);
  const prevHasWovenRef = useRef(false);

  const cancelWeave = useCallback(() => {
    if (weaveTimelineRef.current) {
      weaveTimelineRef.current.kill();
      weaveTimelineRef.current = null;
    }
  }, []);

  const runWeaveSequence = useCallback(() => {
    onBeforeWeave?.();
    cancelWeave();
    setHasWoven(true);
    setActiveWeaveStep(-1);
    scrollTo('weave');

    weaveTimelineRef.current = createWeaveTimeline(
      setActiveWeaveStep,
      prefersReducedMotion,
    );
  }, [
    cancelWeave,
    onBeforeWeave,
    prefersReducedMotion,
    scrollTo,
    setActiveWeaveStep,
    setHasWoven,
  ]);

  useEffect(
    () => () => {
      cancelWeave();
    },
    [cancelWeave],
  );

  useEffect(() => {
    if (hasWoven && !prevHasWovenRef.current) {
      setWeaveLiveMessage(WOVEN_LIVE_MESSAGE);
    }
    prevHasWovenRef.current = hasWoven;
  }, [hasWoven, setWeaveLiveMessage]);

  return { runWeaveSequence, cancelWeave };
}
