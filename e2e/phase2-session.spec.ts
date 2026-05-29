import { expect, test } from '@playwright/test';

test('system map reaches Review before approval and Export after', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('system-map')).toHaveAttribute('data-active-step', '0');

  await page.getByTestId('weave-lesson').first().click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 4000 });
  await expect(page.getByTestId('system-map')).toHaveAttribute('data-active-step', '3');

  await page.locator('#review').scrollIntoViewIfNeeded();
  await page.getByTestId('approve-classroom').click();
  await expect(page.getByTestId('system-map')).toHaveAttribute('data-active-step', '4');
});

const CANONICAL_TILES = ['one-half', 'two-fourths', 'three-sixths'];

test('reflection excerpt appears on teacher exit ticket segment', async ({ page }) => {
  await page.goto('/?w=1');
  await page.locator('#student').scrollIntoViewIfNeeded();
  for (const tileId of CANONICAL_TILES) {
    await page.getByTestId(`tile-${tileId}`).click();
  }
  await page.getByTestId('fraction-check').click();
  await expect(page.getByText('Equivalent? Yes!')).toBeVisible();
  await page.getByTestId('student-reflection').fill('Equal parts share the same whole.');
  await page.getByTestId('student-reflection-save').click();

  await page.locator('#teacher').scrollIntoViewIfNeeded();
  await page.getByRole('tab', { name: /Exit Ticket/i }).click();
  await expect(page.getByTestId('teacher-reflection-note')).toContainText('Equal parts');
});

test('export zip session readme notes approval after review', async ({ page }) => {
  await page.goto('/?w=1');
  await page.locator('#review').scrollIntoViewIfNeeded();
  await page.getByTestId('approve-classroom').click();

  await page.locator('#export').scrollIntoViewIfNeeded();
  const downloadPromise = page.waitForEvent('download');
  await page.getByTestId('export-download').click();
  const download = await downloadPromise;
  const path = await download.path();
  expect(path).toBeTruthy();
  const fs = await import('node:fs');
  const { unzipSync } = await import('fflate');
  const archive = unzipSync(new Uint8Array(fs.readFileSync(path!)));
  expect(new TextDecoder().decode(archive['session-readme.txt'])).toContain('approved');
});

test('student groups hint when class mode is small groups', async ({ page }) => {
  await page.goto('/?w=1#teacher');
  await page.getByRole('button', { name: /Small Groups/i }).click();
  await page.locator('#student').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('student-groups-hint')).toBeVisible();
});
