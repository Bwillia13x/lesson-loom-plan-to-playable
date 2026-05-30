import { createContext } from 'react';
import type { SupportLane, WorkspaceMode } from '../data/lessonLoomData';

export type LessonLoomSessionValue = {
  hasWoven: boolean;
  studentAppActive: boolean;
  approved: boolean;
  workspaceMode: WorkspaceMode;
  activeSupport: SupportLane;
};

export const LessonLoomSessionContext =
  createContext<LessonLoomSessionValue | null>(null);
