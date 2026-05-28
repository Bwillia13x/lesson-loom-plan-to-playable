import { expect, test } from '@playwright/test';

test('demo URL: woven state and hash scroll to student section', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?w=1#student');

  const studentSection = page.locator('#student');
  await expect(studentSection).toHaveClass(/ll-section--woven-active/, {
    timeout: 3000,
  });
  await expect(studentSection).toBeInViewport({ timeout: 3000 });

  await expect(page.getByTestId('workspace-student')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('demo URL: tiles and approval hydrate fraction check', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(
    '/?w=1&tiles=one-half,two-fourths,three-sixths&approved=1#review',
  );

  await expect(page.locator('#student')).toHaveClass(/ll-section--woven-active/);
  await expect(page.getByText('Equivalent? Yes!')).toBeVisible({ timeout: 2000 });
  await expect(page.getByText('Teacher approval recorded')).toBeVisible({
    timeout: 3000,
  });
});
