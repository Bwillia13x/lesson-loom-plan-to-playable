import { expect, test } from '@playwright/test';

test('golden path: weave → fractions → approve → export copy', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('weave-lesson').first().click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 4000 });

  await page.getByTestId('workspace-student').click();
  await expect(page.locator('#student')).toBeInViewport();

  await page.getByTestId('garden-hint-btn').click();
  await expect(page.getByTestId('garden-hint-callout')).toBeVisible();

  for (const tileId of ['one-half', 'two-fourths', 'three-sixths']) {
    await page.getByTestId(`tile-${tileId}`).click();
  }

  await page.getByTestId('fraction-check').click();
  await expect(page.getByText('Equivalent? Yes!')).toBeVisible();
  await expect(page.getByText('1/2, 2/4, and 3/6')).toBeVisible();

  await page.getByTestId('approve-classroom').click();
  await expect(page.getByText('Teacher approval recorded')).toBeVisible();

  await page.locator('#export').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('export-approved-pip')).toBeVisible();
  const copyBtn = page.getByTestId('export-copy-stitch-prompt');
  await copyBtn.click();
  await expect(copyBtn).toHaveText('Copied');
});

test('UDL lanes switch content', async ({ page }) => {
  await page.goto('/');
  await page.locator('#udl').scrollIntoViewIfNeeded();

  await page.getByTestId('lane-support').click();
  await expect(page.locator('#udl')).toContainText('Pre-divided garden beds');

  await page.getByTestId('lane-extend').click();
  await expect(page.locator('#udl')).toContainText('Create a new equivalent set');

  await page.locator('#student').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('student-lane-mission')).toContainText('Extend lane');
});

test('run judge demo completes key states', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('run-judge-demo').click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Equivalent? Yes!')).toBeVisible({ timeout: 8000 });
  await expect(page.getByText('Teacher approval recorded')).toBeVisible({ timeout: 8000 });

  const downloadPromise = page.waitForEvent('download');
  await page.getByTestId('export-download').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('lesson-loom-fraction-garden.zip');
});
