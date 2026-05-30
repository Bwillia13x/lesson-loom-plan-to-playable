import { expect, test } from '@playwright/test';
import { weaveFromHero } from './helpers';

test('source badge scrolls lesson intake into view', async ({ page }) => {
  await page.goto('/');

  await weaveFromHero(page, { bannerTimeoutMs: 3000 });

  const sourceBadge = page.getByTestId('source-phrase-goal');
  await page.locator('#signals').scrollIntoViewIfNeeded();
  await expect(sourceBadge).toBeEnabled();
  await sourceBadge.click();

  await expect(page.locator('#intake')).toBeInViewport();
  await expect(page.getByTestId('lesson-plan-draft')).toBeFocused();
  await expect(page.getByTestId('source-phrase-announcement')).toContainText(
    'different fractions can represent the same amount',
  );
  await expect(page.getByTestId('lesson-plan-phrase-highlight')).toBeVisible();
  await expect(
    page.getByTestId('lesson-plan-phrase-highlight').locator(
      '.lesson-plan__phrase--active',
    ),
  ).toContainText('different fractions can represent the same amount');
});
