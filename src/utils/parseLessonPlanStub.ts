/**
 * Demo-only lesson plan scan — regex highlights, not AI extraction.
 */
export function parseLessonPlanStub(text: string): { highlights: string[] } {
  const highlights: string[] = [];

  const gradeMatch = text.match(/\bgrade\s*\d+\b/i);
  if (gradeMatch) {
    highlights.push(`Grade mention: ${gradeMatch[0]}`);
  }

  if (/equivalent\s+fractions/i.test(text)) {
    highlights.push('Focus: equivalent fractions');
  }

  const exitMatch = text.match(/exit\s+ticket[^.\n]*/i);
  if (exitMatch) {
    highlights.push(`Exit ticket: ${exitMatch[0].trim()}`);
  }

  if (highlights.length === 0) {
    highlights.push('No demo highlights matched — try the sample plan wording.');
  }

  return { highlights };
}
