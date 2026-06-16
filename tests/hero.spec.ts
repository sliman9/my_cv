import { test, expect } from '@playwright/test';

test.describe('Hero section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page has the correct document title', async ({ page }) => {
    await expect(page).toHaveTitle('Sulaiman Hashimi — Test Automation Engineer');
  });

  test('h1 displays the full name "Sulaiman Hashimi"', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toContainText('Sulaiman');
    await expect(heading).toContainText('Hashimi');
  });

  test('role types out to "Test Automation Engineer" within 8 seconds', async ({ page }) => {
    await expect(page.locator('#typed')).toHaveText('Test Automation Engineer', { timeout: 8_000 });
  });

  test('intro paragraph is visible and mentions 4+ years of experience', async ({ page }) => {
    const intro = page.locator('.hero .intro');
    await expect(intro).toBeVisible();
    await expect(intro).toContainText('4+');
  });

  test('"View Experience" CTA button links to the experience section', async ({ page }) => {
    const btn = page.locator('.cta-row .btn-primary');
    await expect(btn).toBeVisible();
    await expect(btn).toContainText('View Experience');
    await expect(btn).toHaveAttribute('href', '#experience');
  });

  test('"Get In Touch" CTA button links to the contact section', async ({ page }) => {
    const btn = page.locator('.cta-row .btn-glass');
    await expect(btn).toBeVisible();
    await expect(btn).toContainText('Get In Touch');
    await expect(btn).toHaveAttribute('href', '#contact');
  });

  test('five skill chips are displayed with the correct labels', async ({ page }) => {
    const chips = page.locator('#heroChips .chip');
    await expect(chips).toHaveCount(5);
    await expect(chips).toHaveText([
      'Python', 'TypeScript', 'Robot Framework', 'Selenium', 'Playwright',
    ]);
  });

  test('tagline opens with "Breaking things so you don\'t have to"', async ({ page }) => {
    await expect(page.locator('#taglineText')).toHaveText("Breaking things so you don't have to");
  });

  test('tagline rotates to a different phrase after ~4 seconds', async ({ page }) => {
    const tagline = page.locator('#taglineText');
    const initialText = await tagline.textContent();

    await page.waitForTimeout(5_000);

    await expect(tagline).not.toHaveText(initialText!);
  });

  test('scroll-down hint is visible on desktop', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 1280) <= 640, 'scroll hint is hidden on mobile via CSS');
    await expect(page.locator('#scrollHint')).toBeVisible();
  });

  test('clicking the scroll hint brings the stats section into view', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 1280) <= 640, 'scroll hint is hidden on mobile via CSS');
    await page.locator('#scrollHint').click();
    await expect(page.locator('#stats')).toBeInViewport({ timeout: 3_000 });
  });
});
