import { expect, test } from '@playwright/test';

test('editable lesson plan draft persists after scroll away and back', async ({
  page,
}) => {
  await page.goto('/');

  const unique = `editable-intake-${Date.now()}`;
  const textarea = page.getByTestId('lesson-plan-draft');

  await page.locator('#intake').scrollIntoViewIfNeeded();
  await textarea.fill(unique);

  await page.locator('#hero').scrollIntoViewIfNeeded();
  await expect(page.locator('#hero')).toBeInViewport();

  await page.locator('#intake').scrollIntoViewIfNeeded();
  await expect(textarea).toHaveValue(unique);
});
