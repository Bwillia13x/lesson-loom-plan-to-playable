import { createContext, useContext, type ReactNode } from 'react';
import type { SupportLane, WorkspaceMode } from '../data/lessonLoomData';

export type LessonLoomSessionValue = {
  hasWoven: boolean;
  studentAppActive: boolean;
  approved: boolean;
  workspaceMode: WorkspaceMode;
  activeSupport: SupportLane;
};

const LessonLoomSessionContext = createContext<LessonLoomSessionValue | null>(null);

export type LessonLoomSessionProviderProps = LessonLoomSessionValue & {
  children: ReactNode;
};

export function LessonLoomSessionProvider({
  children,
  hasWoven,
  studentAppActive,
  approved,
  workspaceMode,
  activeSupport,
}: LessonLoomSessionProviderProps) {
  const value: LessonLoomSessionValue = {
    hasWoven,
    studentAppActive,
    approved,
    workspaceMode,
    activeSupport,
  };

  return (
    <LessonLoomSessionContext.Provider value={value}>
      {children}
    </LessonLoomSessionContext.Provider>
  );
}

export function useLessonLoomSession(): LessonLoomSessionValue {
  const ctx = useContext(LessonLoomSessionContext);
  if (!ctx) {
    throw new Error('useLessonLoomSession must be used within LessonLoomSessionProvider');
  }
  return ctx;
}
