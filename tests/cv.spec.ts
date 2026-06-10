import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('loads with the correct page title', async ({ page }) => {
  await expect(page).toHaveTitle(/Sulaiman Hashimi — Test Automation Engineer/);
});

test('hero shows full name and types out the role', async ({ page }) => {
  const h1 = page.locator('h1');
  await expect(h1).toContainText('Sulaiman');
  await expect(h1).toContainText('Hashimi');
  // role is typed character-by-character into #typed
  await expect(page.locator('#typed')).toHaveText('Test Automation Engineer', { timeout: 8_000 });
});

test('navigation lists all six sections', async ({ page }) => {
  const links = page.locator('.nav-links a');
  await expect(links).toHaveCount(6);
  await expect(links).toHaveText([
    'About', 'Services', 'Skills', 'Experience', 'Certifications', 'Contact',
  ]);
});

test('theme toggle cycles auto → light → dark', async ({ page }) => {
  const html = page.locator('html');
  const btn = page.locator('#themeBtn');
  await btn.click();
  await expect(html).toHaveAttribute('data-theme', 'light');
  await btn.click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
});

test('stat counters animate to their target values', async ({ page }) => {
  const nums = page.locator('.stat .num');
  await expect(nums).toHaveCount(4);
  // counters only start animating once the section scrolls into view
  await page.locator('#stats').scrollIntoViewIfNeeded();
  await expect(nums.nth(0)).toHaveText('4+', { timeout: 8_000 });
  await expect(nums.nth(1)).toHaveText('5', { timeout: 8_000 });
  await expect(nums.nth(2)).toHaveText('15+', { timeout: 8_000 });
  await expect(nums.nth(3)).toHaveText('1M+', { timeout: 8_000 });
});

test('clicking a service card opens its detail sheet', async ({ page }) => {
  const overlay = page.locator('#sheetOverlay');
  await expect(overlay).not.toHaveClass(/open/);

  await page.locator('.service[data-service="ci"]').click();
  await expect(overlay).toHaveClass(/open/);
  await expect(page.locator('#sheetTitle')).toHaveText('CI/CD Integration');

  // closes on the X button
  await page.locator('#sheetClose').click();
  await expect(overlay).not.toHaveClass(/open/);
});

test('skill filter tabs narrow the visible skills', async ({ page }) => {
  await expect(page.locator('.skill')).toHaveCount(18);

  await page.locator('.tab[data-cat="languages"]').click();
  // Python, SQL, TypeScript are the three "languages" skills
  await expect(page.locator('.skill:not(.hidden)')).toHaveCount(3);
  await expect(page.locator('.skill', { hasText: 'Robot Framework' })).toHaveClass(/hidden/);

  // back to all
  await page.locator('.tab[data-cat="all"]').click();
  await expect(page.locator('.skill:not(.hidden)')).toHaveCount(18);
});

test('experience timeline lists every role in order', async ({ page }) => {
  const items = page.locator('.tl-item');
  await expect(items).toHaveCount(5);
  await expect(page.locator('.tl-card .org').first()).toHaveText('Politie Utrecht');
  await expect(page.locator('.tl-card .org').last()).toHaveText('Sogeti Nederland BV');
  await expect(page.locator('.badge-now')).toHaveText('Current');
});

test('all twelve certifications render', async ({ page }) => {
  await expect(page.locator('.cert')).toHaveCount(12);
  await expect(page.locator('.cert', { hasText: 'CTAL-TAE' })).toBeVisible();
});

test('education shows both diplomas', async ({ page }) => {
  await expect(page.locator('.edu')).toHaveCount(2);
  await expect(page.locator('.edu .school').first()).toHaveText('Hogeschool Utrecht');
});

test('contact links point to the right destinations', async ({ page }) => {
  await expect(page.locator('a[href="mailto:Sulaiman@greater.nl"]').first()).toBeVisible();
  await expect(page.locator('a[href="tel:+31642406247"]').first()).toBeVisible();
  await expect(page.locator('a[href*="linkedin.com/in/sulaiman-hashimi"]').first()).toBeVisible();
  await expect(page.locator('a[href="https://github.com/sliman9"]').first()).toBeVisible();
});

test('back-to-top button appears after scrolling down', async ({ page }) => {
  const btn = page.locator('#toTop');
  await expect(btn).not.toHaveClass(/show/);
  await page.evaluate(() => window.scrollTo(0, 1400));
  await expect(btn).toHaveClass(/show/);
});

test('hero skill chip jumps to the skills section', async ({ page }) => {
  await page.locator('#heroChips .chip', { hasText: 'Playwright' }).click();
  // automation tab becomes active after the chip click
  await expect(page.locator('.tab[data-cat="automation"]')).toHaveClass(/active/);
});
