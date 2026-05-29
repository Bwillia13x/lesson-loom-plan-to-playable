import { expect, test } from '@playwright/test';

test('scenes menu applies approved preset', async ({ page }) => {
  await page.goto('/?w=1');
  await page.getByTestId('judge-scenes').locator('select').selectOption('approved');
  await expect(page.getByTestId('export-approved-pip')).toBeVisible();
});

test('scenes menu resets demo', async ({ page }) => {
  await page.goto('/?w=1#export');
  await page.getByTestId('judge-scenes').locator('select').selectOption('reset');
  await expect(page.getByTestId('weave-complete-banner')).not.toBeVisible();
});
