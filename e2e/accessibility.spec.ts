import { expect, test } from '@playwright/test';

test.describe('accessibility affordances', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('skip link targets main content', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('garden hint toggle shows callout', async ({ page }) => {
    await page.getByTestId('workspace-student').click();
    await page.locator('#student').scrollIntoViewIfNeeded();

    await expect(page.getByTestId('garden-hint-callout')).not.toBeVisible();

    await page.getByTestId('garden-hint-btn').click();
    await expect(page.getByTestId('garden-hint-callout')).toBeVisible();

    await page.getByTestId('garden-hint-btn').click();
    await expect(page.getByTestId('garden-hint-callout')).not.toBeVisible();
  });

  test('workspace toggles switch student and teacher sections', async ({ page }) => {
    await page.getByTestId('workspace-student').click();
    await expect(page.locator('#student')).toBeInViewport();
    await expect(page.getByTestId('workspace-student')).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    await page.getByTestId('workspace-teacher').click();
    await expect(page.locator('#teacher')).toBeInViewport();
    await expect(page.getByTestId('workspace-teacher')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});
