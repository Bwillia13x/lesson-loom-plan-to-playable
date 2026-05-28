import { expect, test } from '@playwright/test';

test('export pack download triggers zip with expected filename', async ({ page }) => {
  await page.goto('/');

  await page.locator('#export').scrollIntoViewIfNeeded();

  const downloadPromise = page.waitForEvent('download');
  await page.getByTestId('export-download').click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe('lesson-loom-fraction-garden.zip');

  const path = await download.path();
  expect(path).toBeTruthy();
  const fs = await import('node:fs');
  const stat = fs.statSync(path!);
  expect(stat.size).toBeGreaterThan(100);
});
