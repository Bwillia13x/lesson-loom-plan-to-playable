import { test } from '@playwright/test';
import { weaveFromIntake, weaveFromPanel } from './helpers';

test('weave-lesson-panel completes weave', async ({ page }) => {
  await page.goto('/');
  await weaveFromPanel(page, { bannerTimeoutMs: 4000 });
});

test('intake extract teaching signal completes weave', async ({ page }) => {
  await page.goto('/');
  await weaveFromIntake(page, { bannerTimeoutMs: 4000 });
});
