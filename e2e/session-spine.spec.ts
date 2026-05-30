import { expect, test } from '@playwright/test';
import { weaveFromHero } from './helpers';

test('session spine appears after weave and navigates to export', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('session-spine')).not.toBeVisible();

  await weaveFromHero(page);
  await expect(page.getByTestId('session-spine')).toBeVisible();
  await expect(page.getByTestId('session-spine')).toContainText(/Core lane/i);

  await page.getByTestId('session-spine').getByRole('button', { name: 'Export' }).click();
  await expect(page.locator('#export')).toBeInViewport();
});

test('session spine lesson pip opens teacher section in teacher mode', async ({ page }) => {
  await page.goto('/?w=1');
  await page.getByTestId('workspace-teacher').click();
  await expect(page.getByTestId('session-spine')).toBeVisible();
  await page.getByTestId('session-spine').getByRole('button', { name: 'Lesson' }).click();
  const teacher = page.locator('#teacher');
  await teacher.scrollIntoViewIfNeeded();
  await expect(teacher).toBeInViewport({ timeout: 10_000 });
});
