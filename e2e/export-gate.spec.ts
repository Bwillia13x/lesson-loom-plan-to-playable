import { expect, test } from '@playwright/test';

test('export gate shows pending until approved', async ({ page }) => {
  await page.goto('/?w=1#export');
  await expect(page.getByTestId('export-gate-pending')).toBeVisible();
  await page.locator('#review').scrollIntoViewIfNeeded();
  await page.getByTestId('approve-classroom').click();
  await page.locator('#export').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('export-gate-approved')).toBeVisible();
});
