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

const CANONICAL_TILES = ['one-half', 'two-fourths', 'three-sixths'];

test('export zip includes saved reflection notes', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('weave-lesson').first().click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 4000 });

  await page.getByTestId('workspace-student').click();
  await page.locator('#student').scrollIntoViewIfNeeded();
  for (const tileId of CANONICAL_TILES) {
    await page.getByTestId(`tile-${tileId}`).click();
  }
  await page.getByTestId('fraction-check').click();
  await expect(page.getByText('Equivalent? Yes!')).toBeVisible();

  await page.getByTestId('student-reflection').fill('Zip reflection: equivalent fractions in the garden.');
  await page.getByTestId('student-reflection-save').click();
  await expect(page.getByTestId('student-reflection-saved')).toBeVisible();

  await page.locator('#export').scrollIntoViewIfNeeded();
  const downloadPromise = page.waitForEvent('download');
  await page.getByTestId('export-download').click();
  const download = await downloadPromise;

  const path = await download.path();
  expect(path).toBeTruthy();
  const fs = await import('node:fs');
  const { unzipSync } = await import('fflate');
  const archive = unzipSync(new Uint8Array(fs.readFileSync(path!)));
  expect(Object.keys(archive)).toContain('reflection-notes.txt');
  expect(new TextDecoder().decode(archive['reflection-notes.txt'])).toContain(
    'Zip reflection',
  );
  expect(Object.keys(archive)).toContain('teacher-console-notes.txt');
  expect(new TextDecoder().decode(archive['teacher-console-notes.txt'])).toContain(
    'Exit ticket reflection',
  );
});
