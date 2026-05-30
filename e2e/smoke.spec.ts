import { expect, test } from '@playwright/test';
import { weaveFromHero } from './helpers';

test('golden path: weave → fractions → approve → export copy', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#hero').getByTestId('weave-lesson-hero')).toHaveText('Weave lesson');

  await page.getByTestId('workspace-student').click();
  await expect(page.locator('#student')).toBeInViewport();
  await expect(page.getByTestId('tile-one-half')).toBeDisabled();
  await expect(page.getByTestId('student-lock-notice')).toBeVisible();

  await page.locator('#export').scrollIntoViewIfNeeded();
  const copyBtn = page.getByTestId('export-copy-stitch-prompt');
  await expect(copyBtn).toBeDisabled();
  await expect(page.getByTestId('export-lock-notice')).toBeVisible();

  await weaveFromHero(page, { bannerTimeoutMs: 4000 });

  await page.getByTestId('workspace-student').click();
  await expect(page.getByTestId('tile-one-half')).toBeEnabled();

  await page.getByTestId('garden-hint-btn').click();
  await expect(page.getByTestId('garden-hint-callout')).toBeVisible();

  for (const tileId of ['one-half', 'two-fourths', 'three-sixths']) {
    await page.getByTestId(`tile-${tileId}`).click();
  }

  await page.getByTestId('fraction-check').click();
  await expect(page.getByTestId('fraction-equivalent-status')).toHaveText('Equivalent? Yes!');
  await expect(page.getByTestId('fraction-check-success')).toBeVisible();

  await page.getByTestId('approve-classroom').click();
  await expect(page.getByTestId('review-recorded')).toBeVisible();

  await page.locator('#export').scrollIntoViewIfNeeded();
  await expect(copyBtn).toBeEnabled();
  await copyBtn.click();
  await expect(copyBtn).toHaveText('Copied');
});

test('UDL lanes switch content', async ({ page }) => {
  await page.goto('/');
  await page.locator('#udl').scrollIntoViewIfNeeded();

  await page.getByTestId('lane-support').click();
  await expect(page.getByTestId('udl-task-variation-support')).toContainText(
    'Pre-divided garden beds',
  );

  await page.getByTestId('lane-extend').click();
  await expect(page.getByTestId('udl-task-variation-extend')).toContainText(
    'Create a new equivalent set',
  );
});

test('run judge demo completes key states', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('run-judge-demo').click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 5000 });
  await expect(page.getByTestId('fraction-equivalent-status')).toHaveText('Equivalent? Yes!', {
    timeout: 8000,
  });
  await expect(page.getByTestId('review-recorded')).toBeVisible({ timeout: 8000 });

  await page.getByTestId('export-download').click();
  await expect(page.getByTestId('export-download-notice')).toBeVisible();
});
