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

/** Judge demo finished: rail hidden and CTA re-enabled (`runJudgeDemo` tail). */
export async function waitForJudgeDemoComplete(page: Page): Promise<void> {
  await expect(page.getByTestId('judge-demo-rail')).toBeHidden({
    timeout: 15_000, // stepped demo (~6.5s) + GSAP weave tail
  });
  await expect(page.getByTestId('run-judge-demo')).toBeEnabled();
}

type JudgeDemoMilestoneOptions = {
  /** Click `run-judge-demo` before waiting (default true). */
  startDemo?: boolean;
  /** Assert export section approval markers (default false). */
  includeExport?: boolean;
};

/**
 * Milestone `expect` chain aligned with `runJudgeDemo` in App.tsx — no blind sleeps.
 */
export async function waitForJudgeDemoMilestones(
  page: Page,
  options: JudgeDemoMilestoneOptions = {},
): Promise<void> {
  const { startDemo = true, includeExport = false } = options;

  if (startDemo) {
    await page.getByTestId('run-judge-demo').click();
  }

  await expect(page.getByTestId('judge-demo-rail')).toBeVisible();

  const caption = page.getByTestId('presenter-caption');
  const banner = page.getByTestId('weave-complete-banner');
  await expect(caption).toBeVisible();
  // Demo can outpace the assertion under parallel workers; accept weave caption or post-weave banner.
  await expect(async () => {
    if (await banner.isVisible()) return;
    await expect(caption).toContainText(/teaching signal|Weaving/i);
  }).toPass({ timeout: 15_000 });

  await expect(banner).toBeVisible({
    timeout: 15_000, // GSAP weave steps complete ~820ms; banner gates on last step
  });

  await expect(caption).toContainText(/Differentiation|Extend/i, {
    timeout: 12_000,
  });

  await expect(page.getByTestId('fraction-equivalent-status')).toHaveText(
    'Equivalent? Yes!',
    { timeout: 12_000 },
  );

  await expect(page.getByTestId('review-recorded')).toBeVisible({
    timeout: 12_000,
  });

  await waitForJudgeDemoComplete(page);

  if (includeExport) {
    await page.locator('#export').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('export-approved-pip')).toBeVisible();
    await expect(page.getByTestId('export-gate-approved')).toBeVisible();
  }
}
