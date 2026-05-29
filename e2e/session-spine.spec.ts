import { expect, test } from '@playwright/test';

test('session spine appears after weave and navigates to export', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('session-spine')).not.toBeVisible();

  await page.getByTestId('weave-lesson').first().click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 15000 });
  await expect(page.getByTestId('session-spine')).toBeVisible();

  await page.getByTestId('session-spine').getByRole('button', { name: 'Export' }).click();
  await expect(page.locator('#export')).toBeInViewport();
});
