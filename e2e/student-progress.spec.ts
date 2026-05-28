import { expect, test } from '@playwright/test';

const CANONICAL_TILES = ['one-half', 'two-fourths', 'three-sixths'];

test('student progress rail advances through mission steps', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('workspace-student').click();
  await page.locator('#student').scrollIntoViewIfNeeded();

  const rail = page.getByTestId('student-progress-rail');
  await expect(rail).toBeVisible();

  const step0 = page.getByTestId('progress-rail-step-0');
  const step1 = page.getByTestId('progress-rail-step-1');
  const step2 = page.getByTestId('progress-rail-step-2');

  await expect(step0).toHaveClass(/progress-rail__step--active/);
  await expect(step1).not.toHaveClass(/progress-rail__step--active/);

  for (const tileId of CANONICAL_TILES) {
    await page.getByTestId(`tile-${tileId}`).click();
  }

  await expect(step1).toHaveClass(/progress-rail__step--active/);
  await expect(step0).toHaveClass(/progress-rail__step--done/);

  await page.getByTestId('fraction-check').click();
  await expect(page.getByText('Equivalent? Yes!')).toBeVisible();

  const reflection = page.getByTestId('student-reflection');
  await expect(reflection).toBeVisible();
  await reflection.fill('They shade the same part of the whole garden bed.');

  await expect(step2).toHaveClass(/progress-rail__step--active/);

  await page.getByTestId('student-reflection-save').click();
  await expect(page.getByTestId('student-reflection-saved')).toBeVisible();

  await expect(step2).toHaveClass(/progress-rail__step--done/);
  await expect(step2).not.toHaveClass(/progress-rail__step--active/);
});
