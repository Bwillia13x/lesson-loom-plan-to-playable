import { useCallback } from 'react';
import { scrollToSection } from '../utils/scroll';
import { useMotion } from './motionContext';

export function useScrollToSection() {
  const { reduced } = useMotion();
  return useCallback(
    (id: string) => scrollToSection(id, { reducedMotion: reduced }),
    [reduced],
  );
}
