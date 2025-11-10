import { test, expect } from '@playwright/test';

test('user can join and type in Typing Race', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.fill('input[placeholder="Enter your nickname"]', 'TestUser');
  await page.click('button:has-text("Start")');

  await expect(page.locator('text=Typing Race')).toBeVisible();

  const input = page.locator('input[placeholder="Start typing..."]');
  await input.fill('Hello world');
  expect(await input.inputValue()).toBe('Hello world');

  const wpm = page.locator('text=/\\d+ WPM/');
  await expect(wpm).toBeVisible();
});
