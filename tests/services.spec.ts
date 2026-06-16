import { test, expect } from '@playwright/test';

test.describe('Services section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('three service cards are displayed', async ({ page }) => {
    await expect(page.locator('.service')).toHaveCount(3);
  });

  test('service card titles are correct', async ({ page }) => {
    await expect(page.locator('.service h3')).toHaveText([
      'Framework Architecture',
      'CI/CD Integration',
      'Quality Strategy',
    ]);
  });

  // ── Framework Architecture ────────────────────────────────────────────────

  test.describe('Framework Architecture detail sheet', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('.service[data-service="fw"]').click();
      await expect(page.locator('#sheetOverlay')).toHaveClass(/open/);
    });

    test('sheet title is "Framework Architecture"', async ({ page }) => {
      await expect(page.locator('#sheetTitle')).toHaveText('Framework Architecture');
    });

    test('toolbox lists the correct technologies', async ({ page }) => {
      await expect(page.locator('#sheetTags .tag')).toHaveText([
        'Robot Framework', 'Playwright', 'Selenium', 'Page Object Model', 'Python', 'TypeScript',
      ]);
    });

    test('body scroll is locked while the sheet is open', async ({ page }) => {
      const overflow = await page.evaluate(() => document.body.style.overflow);
      expect(overflow).toBe('hidden');
    });
  });

  // ── CI/CD Integration ─────────────────────────────────────────────────────

  test.describe('CI/CD Integration detail sheet', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('.service[data-service="ci"]').click();
      await expect(page.locator('#sheetOverlay')).toHaveClass(/open/);
    });

    test('sheet title is "CI/CD Integration"', async ({ page }) => {
      await expect(page.locator('#sheetTitle')).toHaveText('CI/CD Integration');
    });

    test('toolbox lists the correct technologies', async ({ page }) => {
      await expect(page.locator('#sheetTags .tag')).toHaveText([
        'GitHub Actions', 'CI/CD Pipelines', 'Visual Regression', 'E2E Testing', 'Regression',
      ]);
    });
  });

  // ── Quality Strategy ──────────────────────────────────────────────────────

  test.describe('Quality Strategy detail sheet', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('.service[data-service="qs"]').click();
      await expect(page.locator('#sheetOverlay')).toHaveClass(/open/);
    });

    test('sheet title is "Quality Strategy"', async ({ page }) => {
      await expect(page.locator('#sheetTitle')).toHaveText('Quality Strategy');
    });

    test('toolbox lists the correct technologies', async ({ page }) => {
      await expect(page.locator('#sheetTags .tag')).toHaveText([
        'Test Strategy', 'TMAP', 'ISTQB', 'Agile/Scrum', 'Manual Testing',
      ]);
    });
  });

  // ── Sheet dismissal ───────────────────────────────────────────────────────

  test.describe('Sheet dismissal', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('.service[data-service="ci"]').click();
      await expect(page.locator('#sheetOverlay')).toHaveClass(/open/);
    });

    test('close button (×) dismisses the sheet', async ({ page }) => {
      await page.locator('#sheetClose').click();
      await expect(page.locator('#sheetOverlay')).not.toHaveClass(/open/);
    });

    test('clicking the dark backdrop dismisses the sheet', async ({ page }) => {
      // Click a corner of the overlay that is outside the sheet card
      await page.locator('#sheetOverlay').click({ position: { x: 10, y: 10 } });
      await expect(page.locator('#sheetOverlay')).not.toHaveClass(/open/);
    });

    test('pressing Escape dismisses the sheet', async ({ page }) => {
      await page.keyboard.press('Escape');
      await expect(page.locator('#sheetOverlay')).not.toHaveClass(/open/);
    });

    test('"See it in my experience" CTA closes the sheet', async ({ page }) => {
      await page.locator('#sheetCta').click();
      await expect(page.locator('#sheetOverlay')).not.toHaveClass(/open/);
    });

    test('body scroll is restored after the sheet is closed', async ({ page }) => {
      await page.locator('#sheetClose').click();
      const overflow = await page.evaluate(() => document.body.style.overflow);
      expect(overflow).toBe('');
    });
  });

  // ── Keyboard accessibility ────────────────────────────────────────────────

  test.describe('Keyboard access', () => {
    test('service card opens on Enter key', async ({ page }) => {
      await page.locator('.service[data-service="fw"]').focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('#sheetOverlay')).toHaveClass(/open/, { timeout: 2_000 });
    });

    test('service card opens on Space key', async ({ page }) => {
      await page.locator('.service[data-service="ci"]').focus();
      await page.keyboard.press(' ');
      await expect(page.locator('#sheetOverlay')).toHaveClass(/open/, { timeout: 2_000 });
    });
  });
});
