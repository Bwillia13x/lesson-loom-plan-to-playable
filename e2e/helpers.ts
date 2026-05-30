import { expect, type Page } from '@playwright/test';

/** Click hero weave CTA and wait for post-weave banner. */
export async function weaveFromHero(page: Page): Promise<void> {
  await page.locator('#hero').getByTestId('weave-lesson-hero').click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 15000 });
}
