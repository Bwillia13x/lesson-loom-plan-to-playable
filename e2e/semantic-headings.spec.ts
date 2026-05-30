import { test, expect } from '@playwright/test';
import { weaveFromHero } from './helpers';

test.describe('semantic heading order', () => {
  test('single h1 on load', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#hero-title')).toBeVisible();
  });

  test('major sections expose one section heading each after weave', async ({
    page,
  }) => {
    await page.goto('/');
    await weaveFromHero(page);

    const sections = page.locator('section.ll-section, section#hero');
    const count = await sections.count();
    expect(count).toBeGreaterThan(5);

    for (let i = 0; i < count; i += 1) {
      const section = sections.nth(i);
      const id = await section.getAttribute('id');
      const headings = section.locator('h1, h2');
      await expect(
        headings,
        `section #${id ?? i} should have exactly one h1 or h2`,
      ).toHaveCount(1);
    }
  });
});
