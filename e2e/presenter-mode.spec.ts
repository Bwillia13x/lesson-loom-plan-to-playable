import { expect, test } from '@playwright/test';
import { waitForJudgeDemoComplete } from './helpers';

test('presenter mode hides side nav during judge demo', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.app-nav')).toBeVisible();

  await page.getByTestId('run-judge-demo').click();
  await expect(page.locator('.app-shell')).toHaveClass(/app-shell--presenter/);
  await expect(page.locator('.app-nav')).toBeHidden();
  await expect(page.getByTestId('judge-demo-rail')).toBeVisible();

  await waitForJudgeDemoComplete(page);

  await expect(page.locator('.app-nav')).toBeVisible();
});
