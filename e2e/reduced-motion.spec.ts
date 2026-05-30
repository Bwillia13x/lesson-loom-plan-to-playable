import { expect, test } from '@playwright/test';
import { weaveFromHero } from './helpers';

test('reduced motion: weave completes immediately and banner shows', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const started = Date.now();
  await weaveFromHero(page, { bannerTimeoutMs: 800 });

  const elapsed = Date.now() - started;
  expect(elapsed).toBeLessThan(1000);

  await expect(page.locator('[role="progressbar"]')).toHaveAttribute(
    'aria-valuetext',
    'Weave complete',
  );

  await expect(page.locator('#student')).toHaveClass(/ll-section--woven-active/);
});

test('reduced motion: workspace toggle reaches teacher section', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await weaveFromHero(page, { bannerTimeoutMs: 800 });

  await page.getByTestId('workspace-teacher').click();
  await expect(page.locator('#teacher')).toBeInViewport();
});
