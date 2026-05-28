import { expect, test } from '@playwright/test';

test('reduced motion: weave completes immediately and banner shows', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const started = Date.now();
  await page.getByTestId('weave-lesson').first().click();

  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({
    timeout: 800,
  });

  const elapsed = Date.now() - started;
  expect(elapsed).toBeLessThan(600);

  await expect(page.locator('[role="progressbar"]')).toHaveAttribute(
    'aria-valuetext',
    'Weave complete',
  );
});

test('reduced motion: scroll uses auto behavior on workspace toggle', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await page.getByTestId('weave-lesson').first().click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({
    timeout: 800,
  });

  await page.getByTestId('workspace-teacher').click();
  await expect(page.locator('#teacher')).toBeInViewport();
});
