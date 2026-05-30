import { expect, type Page } from '@playwright/test';

export type WeaveOptions = {
  /** Wait for post-weave banner (ms). Default 15000. */
  bannerTimeoutMs?: number;
};

async function weaveAndExpectBanner(
  page: Page,
  triggerWeave: () => Promise<void>,
  options: WeaveOptions = {},
): Promise<void> {
  const bannerTimeoutMs = options.bannerTimeoutMs ?? 15000;
  await triggerWeave();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({
    timeout: bannerTimeoutMs,
  });
}

/** Click hero weave CTA and wait for post-weave banner. */
export async function weaveFromHero(
  page: Page,
  options: WeaveOptions = {},
): Promise<void> {
  await weaveAndExpectBanner(
    page,
    () => page.locator('#hero').getByTestId('weave-lesson-hero').click(),
    options,
  );
}

/** Click lesson weave panel CTA and wait for post-weave banner. */
export async function weaveFromPanel(
  page: Page,
  options: WeaveOptions = {},
): Promise<void> {
  await weaveAndExpectBanner(
    page,
    async () => {
      await page.locator('#weave').scrollIntoViewIfNeeded();
      await page.getByTestId('weave-lesson-panel').click();
    },
    options,
  );
}

/** Click intake extract CTA and wait for post-weave banner. */
export async function weaveFromIntake(
  page: Page,
  options: WeaveOptions = {},
): Promise<void> {
  await weaveAndExpectBanner(
    page,
    async () => {
      await page.locator('#intake').scrollIntoViewIfNeeded();
      await page.getByTestId('weave-lesson-intake').click();
    },
    options,
  );
}
