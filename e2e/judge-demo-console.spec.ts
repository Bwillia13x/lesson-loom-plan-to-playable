import { expect, test } from '@playwright/test';
import { waitForJudgeDemoMilestones } from './helpers';

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

  await waitForJudgeDemoMilestones(page);

  const failures = [...consoleErrors, ...pageErrors];
  expect(
    failures,
    failures.length ? `Unexpected console/page errors:\n${failures.join('\n')}` : undefined,
  ).toEqual([]);
});
