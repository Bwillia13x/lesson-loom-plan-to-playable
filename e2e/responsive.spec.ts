import { expect, test } from '@playwright/test';

test.describe('mobile viewport (390px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
  });

  test('hero visible, nav works, student scrolls, no horizontal overflow', async ({
    page,
  }) => {
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#hero-title')).toContainText(
      'Turn lesson plans into interactive classroom apps',
    );

    await page
      .getByRole('navigation', { name: 'Section navigation' })
      .getByRole('button', { name: 'Student App' })
      .click();
    await page.locator('#student').scrollIntoViewIfNeeded();
    await expect(page.locator('#student-title')).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth > root.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });
});
