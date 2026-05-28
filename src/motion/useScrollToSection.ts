import { useCallback } from 'react';
import { scrollToSection } from '../utils/scroll';
import { useMotion } from './motionContext';

export function useScrollToSection() {
  const { reduced } = useMotion();
  return useCallback(
    (id: string, options?: { updateHash?: boolean }) =>
      scrollToSection(id, { reducedMotion: reduced, updateHash: options?.updateHash }),
    [reduced],
  );
}
