import { expect, test } from '@playwright/test';

const widths = [1440, 1280, 1024, 430] as const;

for (const width of widths) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflow).toBe(false);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}
