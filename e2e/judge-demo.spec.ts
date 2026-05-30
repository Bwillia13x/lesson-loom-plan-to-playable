import { test } from '@playwright/test';
import { waitForJudgeDemoMilestones } from './helpers';

test('judge demo visits signals and UDL with presenter captions', async ({ page }) => {
  await page.goto('/');

  await waitForJudgeDemoMilestones(page, { includeExport: true });
});
