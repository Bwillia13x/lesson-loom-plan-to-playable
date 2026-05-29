import { expect, test } from '@playwright/test';

async function weaveToSignals(page: import('@playwright/test').Page) {
  await page.goto('/');
  await page.getByTestId('weave-lesson').first().click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 15000 });
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
