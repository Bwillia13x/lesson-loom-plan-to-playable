import { expect, test } from '@playwright/test';

test('judge demo visits signals and UDL with presenter captions', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('run-judge-demo').click();

  const caption = page.getByTestId('presenter-caption');
  await expect(caption).toBeVisible();
  await expect(caption).toContainText(/teaching signal|Weaving/i);

  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 8000 });

  await expect.poll(async () => caption.textContent()).toMatch(/Extend|Differentiation/i);

  await expect(page.getByText('Equivalent? Yes!')).toBeVisible({ timeout: 12000 });
  await expect(page.getByText('Teacher approval recorded')).toBeVisible({ timeout: 12000 });

  await page.locator('#export').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('export-approved-pip')).toBeVisible();
});
