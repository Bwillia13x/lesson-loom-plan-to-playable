import { expect, test } from '@playwright/test';

test('hero matches copy deck primary messages', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#hero')).toContainText('Plan to Playable');
  await expect(page.locator('#hero')).toContainText('teacher-reviewed drafts');
  await expect(page.locator('#hero-title')).toContainText(
    'Turn lesson plans into interactive classroom apps',
  );
  await expect(page.locator('#hero')).toContainText(
    'Paste a trusted lesson plan. Lesson Loom creates a student activity',
  );
  await expect(page.locator('#hero').getByRole('button', { name: 'Run judge demo' })).toBeVisible();
  await expect(page.locator('#hero').getByTestId('run-judge-demo-hero')).toBeVisible();
  await expect(page.locator('#hero').getByTestId('weave-lesson-hero')).toBeVisible();
  await expect(page.locator('#hero')).toContainText(
    'Teacher-reviewed draft. No student accounts or personal data required.',
  );
});

test('lesson intake matches copy deck', async ({ page }) => {
  await page.goto('/');
  const intake = page.locator('#intake');
  await intake.scrollIntoViewIfNeeded();
  await expect(intake).toContainText('Start with the plan you already trust');
  await expect(intake).toContainText(
    'Lesson Loom does not invent the curriculum for you',
  );
  await expect(intake).toContainText('Source of truth: teacher-provided lesson plan');
});

test('review and safety matches copy deck', async ({ page }) => {
  await page.goto('/');
  const review = page.locator('#review');
  await review.scrollIntoViewIfNeeded();
  await expect(review).toContainText('Review before classroom use');
  await expect(review).toContainText(
    'Lesson Loom creates a classroom-ready draft',
  );
  await expect(review).toContainText('Teacher Review Required');
  await expect(review).toContainText('No student accounts, names, or personal data required');
  await expect(review).toContainText('Printable Fallback');
  await expect(review).toContainText('No Automated Grading');
});
