import { expect, test } from '@playwright/test';

test('hero matches copy deck primary messages', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#hero-title')).toContainText(
    'Turn lesson plans into interactive classroom apps',
  );
  await expect(page.locator('#hero').getByRole('button', { name: 'View student app' })).toBeVisible();
  await expect(page.locator('#hero').getByTestId('weave-lesson')).toBeVisible();
  await expect(page.locator('#hero')).toContainText(
    'Teacher-reviewed draft. No student accounts or personal data required.',
  );
});
