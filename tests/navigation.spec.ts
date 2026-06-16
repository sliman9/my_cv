import { test, expect } from '@playwright/test';

test.describe('Top navigation bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('logo shows initials "SH" and links to the hero section', async ({ page }) => {
    const logo = page.locator('.nav .logo');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveText('SH');
    await expect(logo).toHaveAttribute('href', '#hero');
  });

  test('all six section links are listed in the correct order', async ({ page }) => {
    const links = page.locator('.nav-links a');
    await expect(links).toHaveCount(6);
    await expect(links).toHaveText([
      'About', 'Services', 'Skills', 'Experience', 'Certifications', 'Contact',
    ]);
  });

  test('"About" link has the active class on initial load', async ({ page }) => {
    await expect(page.locator('.nav-links a[href="#hero"]')).toHaveClass(/active/);
  });
});

test.describe('Theme toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('initial state is auto — no data-theme attribute on <html>', async ({ page }) => {
    await expect(page.locator('html')).not.toHaveAttribute('data-theme');
  });

  test('first click switches to light mode', async ({ page }) => {
    await page.locator('#themeBtn').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('second click switches to dark mode', async ({ page }) => {
    const btn = page.locator('#themeBtn');
    await btn.click();
    await btn.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('third click returns to auto mode (data-theme attribute removed)', async ({ page }) => {
    const btn = page.locator('#themeBtn');
    await btn.click(); // → light
    await btn.click(); // → dark
    await btn.click(); // → auto
    await expect(page.locator('html')).not.toHaveAttribute('data-theme');
  });
});

test.describe('Scroll controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('scroll progress bar starts at zero width', async ({ page }) => {
    const width = await page.locator('#progress').evaluate(el => el.style.width);
    expect(parseFloat(width || '0')).toBe(0);
  });

  test('scroll progress bar grows as the page is scrolled down', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 800);
    });
    await page.waitForTimeout(100);
    const width = await page.locator('#progress').evaluate(el => el.style.width);
    expect(parseFloat(width)).toBeGreaterThan(0);
  });

  test('back-to-top button is hidden on page load', async ({ page }) => {
    await expect(page.locator('#toTop')).not.toHaveClass(/show/);
  });

  test('back-to-top button appears after scrolling more than 600 px', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 700);
    });
    await expect(page.locator('#toTop')).toHaveClass(/show/, { timeout: 2_000 });
  });

  test('clicking back-to-top scrolls the page back to the top', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 700);
    });
    await expect(page.locator('#toTop')).toHaveClass(/show/, { timeout: 2_000 });
    await page.locator('#toTop').click();
    await page.waitForFunction(() => window.scrollY < 50, { timeout: 3_000 });
    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(50);
  });

  test('clicking the logo shows the easter-egg toast message', async ({ page }) => {
    await page.locator('.nav .logo').click();
    await expect(page.locator('#toast')).toHaveClass(/show/, { timeout: 2_000 });
    await expect(page.locator('#toast')).toContainText('All tests passing');
  });
});

test.describe('Mobile bottom navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('bottom nav is visible on mobile with five items', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 1280) > 640, 'bottom nav is CSS-hidden on desktop');
    await expect(page.locator('.bottom-nav')).toBeVisible();
    await expect(page.locator('.bn-item')).toHaveCount(5);
  });

  test('bottom nav labels are: About, Services, Skills, Work, Contact', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 1280) > 640, 'bottom nav is CSS-hidden on desktop');
    await expect(page.locator('.bn-item span')).toHaveText([
      'About', 'Services', 'Skills', 'Work', 'Contact',
    ]);
  });

  test('"About" is the active bottom-nav item on initial load', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 1280) > 640, 'bottom nav is CSS-hidden on desktop');
    await expect(page.locator('.bn-item').first()).toHaveClass(/active/);
  });

  test('hamburger menu button is hidden on mobile (bottom nav replaces it)', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 1280) > 640, 'hamburger is visible on mid-sized desktop viewports');
    await expect(page.locator('#menuBtn')).toBeHidden();
  });
});
