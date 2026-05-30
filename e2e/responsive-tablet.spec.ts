import { expect, test } from '@playwright/test';

test.describe('tablet viewport (768px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
  });

  test('no horizontal overflow after weave', async ({ page }) => {
    await page.locator('#hero').getByTestId('weave-lesson-hero').click();
    await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 5000 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });
});
