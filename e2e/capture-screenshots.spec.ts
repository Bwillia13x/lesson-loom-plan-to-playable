import { expect, test } from '@playwright/test';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'submission-screenshots');

test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
  const fs = await import('node:fs/promises');
  await fs.mkdir(outDir, { recursive: true });
});

test('capture submission screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  await page.screenshot({
    path: path.join(outDir, '01-hero.png'),
    fullPage: false,
  });

  await page.getByTestId('weave-lesson').first().click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 5000 });

  await page.locator('#signals').scrollIntoViewIfNeeded();
  await pause(page, 300);
  await page.screenshot({
    path: path.join(outDir, '02-teaching-signals.png'),
    fullPage: false,
  });

  await page.getByTestId('workspace-student').click();
  for (const id of ['one-half', 'two-fourths', 'three-sixths']) {
    await page.getByTestId(`tile-${id}`).click();
  }
  await page.getByTestId('fraction-check').click();
  await expect(page.getByText('Equivalent? Yes!')).toBeVisible();
  await page.screenshot({
    path: path.join(outDir, '03-fraction-garden.png'),
    fullPage: false,
  });

  await page.getByTestId('workspace-teacher').click();
  await page.locator('#teacher').scrollIntoViewIfNeeded();
  await pause(page, 300);
  await page.screenshot({
    path: path.join(outDir, '04-teacher-console.png'),
    fullPage: false,
  });

  await page.locator('#review').scrollIntoViewIfNeeded();
  await page.getByTestId('approve-classroom').click();
  await page.locator('#export').scrollIntoViewIfNeeded();
  await pause(page, 300);
  await page.screenshot({
    path: path.join(outDir, '05-review-export.png'),
    fullPage: false,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByTestId('run-judge-demo').click();
  await pause(page, await prefersReducedMotionWait(page));
  await page.locator('#student').scrollIntoViewIfNeeded();
  await page.screenshot({
    path: path.join(outDir, '06-mobile-student.png'),
    fullPage: false,
  });
});

async function prefersReducedMotionWait(page: import('@playwright/test').Page) {
  const reduced = await page.evaluate(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return reduced ? 1200 : 3500;
}

function pause(page: import('@playwright/test').Page, ms: number) {
  return page.evaluate((delay) => new Promise((r) => setTimeout(r, delay)), ms);
}
