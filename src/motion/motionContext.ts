import { createContext, useContext } from 'react';

export type MotionContextValue = {
  reduced: boolean;
};

export const MotionContext = createContext<MotionContextValue | null>(null);

export function useMotion(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error('useMotion must be used within MotionProvider');
  }
  return ctx;
}
