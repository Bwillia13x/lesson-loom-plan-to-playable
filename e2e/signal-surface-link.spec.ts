import { expect, test } from '@playwright/test';
import { weaveFromHero } from './helpers';

async function weaveToSignals(page: import('@playwright/test').Page) {
  await page.goto('/');
  await weaveFromHero(page);
}

test('signal See in lesson scrolls to student section', async ({ page }) => {
  await weaveToSignals(page);
  await page.getByTestId('signal-link-metaphor').click();
  await expect(page.locator('#student')).toBeInViewport();
  await expect(page.locator('#student')).toHaveClass(/ll-surface-highlight/);
});

test('signal See in lesson scrolls to teacher console', async ({ page }) => {
  await weaveToSignals(page);
  await page.getByTestId('signal-link-assessment').click();
  await expect(page.locator('#teacher')).toBeInViewport();
  await expect(page.locator('#teacher')).toHaveClass(/ll-surface-highlight/);
});

test('signal See in lesson scrolls to UDL without forcing student mode', async ({
  page,
}) => {
  await weaveToSignals(page);
  await page.getByTestId('workspace-student').click();
  await page.getByTestId('signal-link-differentiation').click();
  await expect(page.locator('#udl')).toBeInViewport();
  await expect(page.locator('#udl')).toHaveClass(/ll-surface-highlight/);
});

test('signal See in lesson on student card switches to the card lane', async ({
  page,
}) => {
  await weaveToSignals(page);
  await page.getByTestId('lane-extend').click();
  await expect(page.getByTestId('student-lane-mission')).toContainText('Extend lane');

  await page.getByTestId('signal-link-goal').click();
  await expect(page.getByTestId('student-lane-mission')).toContainText('Core lane');
});

test('prior knowledge signal opens core lane in student app', async ({ page }) => {
  await weaveToSignals(page);
  await page.getByTestId('lane-extend').click();
  await page.getByTestId('signal-link-prior').click();
  await expect(page.getByTestId('student-lane-mission')).toContainText('Core lane');
});
