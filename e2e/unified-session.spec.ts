import { expect, test } from '@playwright/test';

test('UDL extend lane updates student mission copy', async ({ page }) => {
  await page.goto('/');
  await page.locator('#hero').getByTestId('weave-lesson-hero').click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 4000 });

  await page.locator('#udl').scrollIntoViewIfNeeded();
  await page.getByTestId('lane-extend').click();
  await expect(page.getByTestId('student-lane-mission')).toContainText('Extend lane');
  await expect(page.getByTestId('student-lane-mission')).toContainText(
    'Create a new equivalent set',
  );
  await expect(page.getByTestId('student-lane-scaffolds')).toContainText('Open tile bank');
});

test('teacher segment changes console prompts', async ({ page }) => {
  await page.goto('/');
  await page.locator('#teacher').scrollIntoViewIfNeeded();

  await page.getByRole('tab', { name: /Exit Ticket/i }).click();
  await expect(page.getByTestId('teacher-segment-prompts')).toContainText('equal because');
  await expect(page.getByTestId('teacher-segment-watch')).toContainText('re-teach');

  await page.getByRole('tab', { name: /Warm-up/i }).click();
  await expect(page.getByTestId('teacher-segment-prompts')).toContainText('1/2, 2/4, and 4/8');
});

test('devices preview mirrors woven session and extend lane', async ({ page }) => {
  await page.goto('/');
  await page.locator('#hero').getByTestId('weave-lesson-hero').click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 4000 });

  await page.locator('#udl').scrollIntoViewIfNeeded();
  await page.getByTestId('lane-extend').click();

  await page.locator('#devices').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('devices-woven-pip')).toContainText('woven');
  await expect(page.getByTestId('device-student-lane')).toContainText('Extend lane');
  await expect(page.getByTestId('device-active-segment')).toBeVisible();
});

test('groups class mode shows partner rotation copy', async ({ page }) => {
  await page.goto('/?w=1#teacher');
  await page.getByRole('button', { name: /Small Groups/i }).click();
  await page.getByRole('tab', { name: /Partner/i }).click();
  await expect(page.getByText(/Partner A models/i)).toBeVisible();
});

test('devices preview mirrors approval state', async ({ page }) => {
  await page.goto('/?w=1');
  await page.locator('#hero').getByTestId('weave-lesson-hero').click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 4000 });

  await page.locator('#devices').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('devices-review-state')).toContainText('Pending review');

  await page.locator('#review').scrollIntoViewIfNeeded();
  await page.getByTestId('approve-classroom').click();

  await page.locator('#devices').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('devices-review-state')).toContainText('Teacher approved');
});
