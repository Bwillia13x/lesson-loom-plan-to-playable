import { expect, test } from '@playwright/test';
import { weaveFromHero } from './helpers';

test.describe('tablet viewport (768px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
  });

  test('no horizontal overflow after weave', async ({ page }) => {
    await weaveFromHero(page, { bannerTimeoutMs: 5000 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });
});
