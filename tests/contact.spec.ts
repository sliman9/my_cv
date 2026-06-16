import { test, expect } from '@playwright/test';

test.describe('Contact section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('five contact tiles are rendered', async ({ page }) => {
    await expect(page.locator('.c-tile')).toHaveCount(5);
  });

  test('email tile links to Sulaiman@greater.nl and shows the address', async ({ page }) => {
    const tile = page.locator('a[href="mailto:Sulaiman@greater.nl"]').first();
    await expect(tile).toBeVisible();
    await expect(tile.locator('.cl')).toHaveText('Email');
    await expect(tile.locator('.cv')).toHaveText('Sulaiman@greater.nl');
  });

  test('phone tile links to +31642406247 and shows the formatted number', async ({ page }) => {
    const tile = page.locator('a[href="tel:+31642406247"]').first();
    await expect(tile).toBeVisible();
    await expect(tile.locator('.cl')).toHaveText('Phone');
    await expect(tile.locator('.cv')).toHaveText('+31 6 42 40 62 47');
  });

  test('location tile shows Oss, Netherlands', async ({ page }) => {
    const tile = page.locator('.c-tile', { hasText: 'Oss, Netherlands' });
    await expect(tile).toBeVisible();
    await expect(tile.locator('.cl')).toHaveText('Location');
    await expect(tile.locator('.cv')).toHaveText('Oss, Netherlands');
  });

  test('LinkedIn tile links to the correct profile', async ({ page }) => {
    const tile = page.locator('a[href*="linkedin.com/in/sulaiman-hashimi"]').first();
    await expect(tile).toBeVisible();
    await expect(tile.locator('.cl')).toHaveText('LinkedIn');
    await expect(tile.locator('.cv')).toHaveText('sulaiman-hashimi');
  });

  test('GitHub tile links to the correct profile', async ({ page }) => {
    const tile = page.locator('a[href="https://github.com/sliman9"]').first();
    await expect(tile).toBeVisible();
    await expect(tile.locator('.cl')).toHaveText('GitHub');
    await expect(tile.locator('.cv')).toHaveText('sliman9');
  });
});

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('footer shows the full name "Sulaiman Hashimi"', async ({ page }) => {
    const name = page.locator('.foot .fname');
    await expect(name).toContainText('Sulaiman');
    await expect(name).toContainText('Hashimi');
  });

  test('footer copyright includes the current year', async ({ page }) => {
    const year = new Date().getFullYear().toString();
    await expect(page.locator('.fcopy')).toContainText(year);
  });

  test('footer has a LinkedIn link', async ({ page }) => {
    await expect(page.locator('.foot .flinks a[href*="linkedin.com"]')).toBeVisible();
  });

  test('footer has a GitHub link', async ({ page }) => {
    await expect(page.locator('.foot .flinks a[href*="github.com"]')).toBeVisible();
  });

  test('footer links open in a new tab with the correct rel attribute', async ({ page }) => {
    const links = page.locator('.foot .flinks a');
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener');
    }
  });
});
