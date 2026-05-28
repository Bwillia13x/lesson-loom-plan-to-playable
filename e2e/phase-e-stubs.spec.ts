import { expect, test } from '@playwright/test';

test('phase E: lesson chips and demo parser stubs', async ({ page }) => {
  await page.goto('/');

  await page.locator('#intake').scrollIntoViewIfNeeded();

  await expect(page.getByTestId('lesson-chip-active')).toBeVisible();
  await expect(page.getByTestId('lesson-chip-active')).toContainText('Fraction Garden');
  await expect(page.getByTestId('lesson-chip-preview').first()).toBeVisible();
  await expect(page.getByTestId('lesson-chip-preview').first()).toHaveAttribute(
    'aria-disabled',
    'true',
  );

  await page.getByTestId('lesson-parser-scan').click();
  const highlights = page.getByTestId('lesson-parser-highlights');
  await expect(highlights).toBeVisible();
  await expect(highlights.locator('li')).not.toHaveCount(0);
});
