import { expect, test } from '@playwright/test';

test('fraction check shows gentle hint when selection is wrong', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('workspace-student').click();
  await page.locator('#student').scrollIntoViewIfNeeded();

  await page.getByTestId('tile-one-half').click();
  await page.getByTestId('tile-one-third').click();
  await page.getByTestId('tile-two-thirds').click();

  await page.getByTestId('fraction-check').click();
  await expect(page.getByTestId('fraction-check-feedback')).toBeVisible();
  await expect(page.getByTestId('fraction-check-feedback')).toContainText(
    'Compare how much of the whole',
  );
  await expect(page.getByText('Equivalent? Yes!')).not.toBeVisible();
});

test('fraction check shows hint when Check is pressed with no tiles', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('workspace-student').click();
  await page.locator('#student').scrollIntoViewIfNeeded();
  await page.getByTestId('fraction-check').click();
  await expect(page.getByTestId('fraction-check-feedback')).toBeVisible();
});
