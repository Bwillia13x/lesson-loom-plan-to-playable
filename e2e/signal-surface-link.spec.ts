import { expect, test } from '@playwright/test';

test('signal See in lesson scrolls to student section', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('weave-lesson').first().click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 15000 });

  await page.getByTestId('signal-link-metaphor').click();
  await expect(page.locator('#student')).toBeInViewport();
  await expect(page.locator('#student')).toHaveClass(/ll-surface-highlight/);
});
