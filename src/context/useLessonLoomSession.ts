import { useContext } from 'react';
import { LessonLoomSessionContext } from './sessionContext';

export function useLessonLoomSession() {
  const ctx = useContext(LessonLoomSessionContext);
  if (!ctx) {
    throw new Error('useLessonLoomSession must be used within LessonLoomSessionProvider');
  }
  return ctx;
}
