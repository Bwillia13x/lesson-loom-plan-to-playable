import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { MotionContext } from './motionContext';

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  return (
    <MotionContext.Provider value={{ reduced }}>{children}</MotionContext.Provider>
  );
}
