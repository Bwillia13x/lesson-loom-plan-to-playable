import type { ReactNode } from 'react';
import {
  LessonLoomSessionContext,
  type LessonLoomSessionValue,
} from './sessionContext';

export type { LessonLoomSessionValue } from './sessionContext';

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
