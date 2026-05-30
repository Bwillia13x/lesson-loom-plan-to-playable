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

  test('skip link moves focus into main content', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await skipLink.focus();
    await skipLink.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('garden hint toggle shows callout', async ({ page }) => {
    await page.locator('#hero').getByTestId('weave-lesson-hero').click();
    await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 4000 });

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

  test('UDL support lanes respond to keyboard activation', async ({ page }) => {
    await page.locator('#udl').scrollIntoViewIfNeeded();

    const supportTab = page.getByTestId('lane-support');
    const coreTab = page.getByTestId('lane-core');
    const extendTab = page.getByTestId('lane-extend');

    await supportTab.focus();
    await page.keyboard.press('Enter');
    await expect(supportTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByTestId('udl-task-variation-support')).toContainText(
      'Pre-divided garden beds',
    );

    await supportTab.focus();
    await page.keyboard.press('ArrowRight');
    await expect(coreTab).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('ArrowRight');
    await expect(extendTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByTestId('udl-task-variation-extend')).toContainText(
      'Create a new equivalent set',
    );
  });

  test('teacher timeline tabs respond to arrow-key roving', async ({ page }) => {
    await page.locator('#teacher').scrollIntoViewIfNeeded();

    const partnerTab = page.getByTestId('teacher-tab-partner');
    const shareTab = page.getByTestId('teacher-tab-share');

    await partnerTab.focus();
    await expect(partnerTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByTestId('teacher-segment-partner')).toBeVisible();

    await page.keyboard.press('ArrowRight');
    await expect(shareTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByTestId('teacher-segment-share')).toBeVisible();
  });
});
