import { test, expect } from '@playwright/test';

test.describe('Stat counters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('four stat cards are rendered', async ({ page }) => {
    await expect(page.locator('.stat')).toHaveCount(4);
  });

  test('stat labels match the four career metrics', async ({ page }) => {
    const labels = page.locator('.stat .label');
    await expect(labels).toHaveText([
      'Years Experience', 'Companies', 'Certifications', 'Users Impacted',
    ]);
  });

  test('counters animate to their target values once scrolled into view', async ({ page }) => {
    await page.locator('#stats').scrollIntoViewIfNeeded();

    const nums = page.locator('.stat .num');
    await expect(nums.nth(0)).toHaveText('4+',  { timeout: 8_000 });
    await expect(nums.nth(1)).toHaveText('5',   { timeout: 8_000 });
    await expect(nums.nth(2)).toHaveText('15+', { timeout: 8_000 });
    await expect(nums.nth(3)).toHaveText('1M+', { timeout: 8_000 });
  });

  test('clicking any "Years Experience" or "Companies" stat scrolls to the experience section', async ({ page }) => {
    await page.locator('.stat[data-goto="#experience"]').first().click();
    await expect(page.locator('#experience')).toBeInViewport({ timeout: 3_000 });
  });

  test('clicking the "Certifications" stat scrolls to the certifications section', async ({ page }) => {
    await page.locator('.stat[data-goto="#certifications"]').click();
    await expect(page.locator('#certifications')).toBeInViewport({ timeout: 3_000 });
  });

  test('stat cards are keyboard-accessible via Enter key', async ({ page }) => {
    const stat = page.locator('.stat[data-goto="#experience"]').first();
    await stat.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#experience')).toBeInViewport({ timeout: 3_000 });
  });
});
