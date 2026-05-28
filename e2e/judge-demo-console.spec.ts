import { expect, test } from '@playwright/test';

/** Known non-fatal console noise in dev / Playwright (extend if new benign cases appear). */
const BENIGN_CONSOLE_PATTERNS = [
  /Download the React DevTools/i,
  /Failed to load resource.*favicon/i,
];

function isBenignConsoleMessage(text: string): boolean {
  return BENIGN_CONSOLE_PATTERNS.some((pattern) => pattern.test(text));
}

test('run judge demo has no unexpected console errors', async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (!isBenignConsoleMessage(text)) {
      consoleErrors.push(text);
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
  });

  await page.goto('/');

  await page.getByTestId('run-judge-demo').click();
  await expect(page.getByTestId('weave-complete-banner')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('Equivalent? Yes!')).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('Teacher approval recorded')).toBeVisible({ timeout: 10000 });
  await expect(page.getByTestId('run-judge-demo')).toHaveText('Run judge demo', {
    timeout: 10000,
  });

  const failures = [...consoleErrors, ...pageErrors];
  expect(
    failures,
    failures.length ? `Unexpected console/page errors:\n${failures.join('\n')}` : undefined,
  ).toEqual([]);
});
