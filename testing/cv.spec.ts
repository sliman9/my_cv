import { test, expect, Page } from '@playwright/test';

// ─────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────
const cy = (selector: string) => `[data-cy="${selector}"]`;

async function waitForSite(page: Page) {
  // Wait until the hero name is rendered (data loaded from cv.json)
  await page.waitForSelector(cy('hero-name'), { timeout: 10_000 });
}

// ─────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────
test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
  });

  test('nav bar is visible', async ({ page }) => {
    await expect(page.locator(cy('nav'))).toBeVisible();
  });

  test('nav brand shows first name', async ({ page }) => {
    const brand = page.locator(cy('nav-brand'));
    await expect(brand).toBeVisible();
    await expect(brand).toContainText('Sulaiman');
  });

  test('all nav links are present', async ({ page }) => {
    const links = ['services', 'skills', 'experience', 'certifications', 'education'];
    for (const id of links) {
      await expect(page.locator(cy(`nav-link-${id}`))).toBeVisible();
    }
  });

  test('nav CTA links to contact', async ({ page }) => {
    const cta = page.locator(cy('nav-cta'));
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '#contact');
  });

  test('clicking a nav link scrolls to the section', async ({ page }) => {
    await page.locator(cy('nav-link-experience')).click();
    await expect(page.locator(cy('experience'))).toBeInViewport({ ratio: 0.1 });
  });

  test('nav scrolled class applied after scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 200));
    await expect(page.locator(cy('nav'))).toHaveClass(/scrolled/);
  });
});

// ─────────────────────────────────────────────────────
// LANGUAGE SWITCHER
// ─────────────────────────────────────────────────────
test.describe('Language switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
  });

  test('all language buttons are rendered', async ({ page }) => {
    for (const code of ['en', 'nl', 'es', 'fr', 'de']) {
      await expect(page.locator(cy(`lang-btn-${code}`))).toBeVisible();
    }
  });

  test('EN is active by default', async ({ page }) => {
    await expect(page.locator(cy('lang-btn-en'))).toHaveClass(/active/);
  });

  test('switching to NL updates hero badge', async ({ page }) => {
    await page.locator(cy('lang-btn-nl')).click();
    await expect(page.locator(cy('hero-badge'))).toContainText('Beschikbaar');
  });

  test('switching to NL marks NL button active', async ({ page }) => {
    await page.locator(cy('lang-btn-nl')).click();
    await expect(page.locator(cy('lang-btn-nl'))).toHaveClass(/active/);
    await expect(page.locator(cy('lang-btn-en'))).not.toHaveClass(/active/);
  });

  test('switching back to EN restores English badge', async ({ page }) => {
    await page.locator(cy('lang-btn-nl')).click();
    await page.locator(cy('lang-btn-en')).click();
    await expect(page.locator(cy('hero-badge'))).toContainText('Available');
  });

  test('lang preference is persisted in localStorage', async ({ page }) => {
    await page.locator(cy('lang-btn-nl')).click();
    const stored = await page.evaluate(() => localStorage.getItem('cvLang_v1'));
    expect(stored).toBe('nl');
  });
});

// ─────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────
test.describe('Hero section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
  });

  test('hero section is visible', async ({ page }) => {
    await expect(page.locator(cy('hero'))).toBeVisible();
  });

  test('hero name contains "Sulaiman"', async ({ page }) => {
    await expect(page.locator(cy('hero-name'))).toContainText('Sulaiman');
  });

  test('availability badge is shown', async ({ page }) => {
    await expect(page.locator(cy('hero-badge'))).toBeVisible();
    await expect(page.locator(cy('hero-badge'))).toContainText('hire');
  });

  test('hero bio is present', async ({ page }) => {
    await expect(page.locator(cy('hero-bio'))).toBeVisible();
  });

  test('primary CTA links to experience section', async ({ page }) => {
    await expect(page.locator(cy('hero-cta-primary'))).toHaveAttribute('href', '#experience');
  });

  test('secondary CTA is a mailto link', async ({ page }) => {
    const href = await page.locator(cy('hero-cta-secondary')).getAttribute('href');
    expect(href).toMatch(/^mailto:/);
  });

  test('location meta is visible', async ({ page }) => {
    await expect(page.locator(cy('hero-location'))).toContainText('Netherlands');
  });

  test('cert count badge shows a number', async ({ page }) => {
    const text = await page.locator(cy('hero-cert-count')).textContent();
    expect(Number(text)).toBeGreaterThan(0);
  });

  test('typewriter role text appears', async ({ page }) => {
    await expect(page.locator(cy('hero-role'))).not.toBeEmpty({ timeout: 5000 });
  });
});

// ─────────────────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────────────────
test.describe('Marquee', () => {
  test('marquee section is present', async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
    await expect(page.locator(cy('marquee'))).toBeVisible();
  });

  test('marquee contains tech stack items', async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
    await expect(page.locator(cy('marquee'))).toContainText('Python');
  });
});

// ─────────────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────────────
test.describe('Stats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
  });

  test('stats section is visible', async ({ page }) => {
    await expect(page.locator(cy('stats'))).toBeVisible();
  });

  test('all 4 stat items are present', async ({ page }) => {
    for (let i = 0; i < 4; i++) {
      await expect(page.locator(cy(`stat-${i}`))).toBeVisible();
    }
  });

  test('first stat shows years experience', async ({ page }) => {
    await expect(page.locator(cy('stat-0'))).toContainText('Years');
  });
});

// ─────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────
test.describe('Services / What I Do', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
    await page.locator(cy('services')).scrollIntoViewIfNeeded();
  });

  test('services section is visible', async ({ page }) => {
    await expect(page.locator(cy('services'))).toBeVisible();
  });

  test('3 service cards are rendered', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await expect(page.locator(cy(`service-card-${i}`))).toBeVisible();
    }
  });

  test('each service card has a title and description', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await expect(page.locator(cy(`service-title-${i}`))).not.toBeEmpty();
      await expect(page.locator(cy(`service-desc-${i}`))).not.toBeEmpty();
    }
  });

  test('first service mentions Framework Architecture', async ({ page }) => {
    await expect(page.locator(cy('service-title-0'))).toContainText('Framework');
  });
});

// ─────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────
test.describe('Skills', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
    await page.locator(cy('skills')).scrollIntoViewIfNeeded();
  });

  test('skills section is visible', async ({ page }) => {
    await expect(page.locator(cy('skills'))).toBeVisible();
  });

  test('skills tabs are present', async ({ page }) => {
    await expect(page.locator(cy('skills-tab-automation'))).toBeVisible();
    await expect(page.locator(cy('skills-tab-languages'))).toBeVisible();
    await expect(page.locator(cy('skills-tab-tools'))).toBeVisible();
  });

  test('clicking Languages tab shows language skills panel', async ({ page }) => {
    await page.locator(cy('skills-tab-languages')).click();
    await expect(page.locator(cy('skills-panel-languages'))).toBeVisible();
  });

  test('automation panel is active by default', async ({ page }) => {
    await expect(page.locator(cy('skills-panel-automation'))).toBeVisible();
  });

  test('pills are rendered', async ({ page }) => {
    await expect(page.locator(cy('skills-pills'))).toBeVisible();
    await expect(page.locator('[data-cy^="pill-"]').first()).toBeVisible();
  });

  test('Python pill is highlighted', async ({ page }) => {
    await expect(page.locator(cy('pill-python'))).toHaveClass(/hl/);
  });

  test('radar chart is present', async ({ page }) => {
    await expect(page.locator(cy('radar-chart'))).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────
test.describe('Experience', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
    await page.locator(cy('experience')).scrollIntoViewIfNeeded();
  });

  test('experience section is visible', async ({ page }) => {
    await expect(page.locator(cy('experience'))).toBeVisible();
  });

  test('timeline is rendered', async ({ page }) => {
    await expect(page.locator(cy('exp-timeline'))).toBeVisible();
  });

  test('at least 3 experience items are shown', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await expect(page.locator(cy(`exp-card-${i}`))).toBeVisible();
    }
  });

  test('first experience card shows current role at Politie Utrecht', async ({ page }) => {
    await expect(page.locator(cy('exp-company-0'))).toContainText('Politie');
    await expect(page.locator(cy('exp-period-0'))).toContainText('Present');
  });

  test('each experience card has title, company, period, and description', async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await expect(page.locator(cy(`exp-title-${i}`))).not.toBeEmpty();
      await expect(page.locator(cy(`exp-company-${i}`))).not.toBeEmpty();
      await expect(page.locator(cy(`exp-period-${i}`))).not.toBeEmpty();
      await expect(page.locator(cy(`exp-desc-${i}`))).not.toBeEmpty();
    }
  });

  test('experience cards have skill tags', async ({ page }) => {
    await expect(page.locator(cy('exp-tags-0'))).not.toBeEmpty();
  });
});

// ─────────────────────────────────────────────────────
// CERTIFICATIONS
// ─────────────────────────────────────────────────────
test.describe('Certifications', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
    await page.locator(cy('certifications')).scrollIntoViewIfNeeded();
  });

  test('certifications section is visible', async ({ page }) => {
    await expect(page.locator(cy('certifications'))).toBeVisible();
  });

  test('cert grid is rendered', async ({ page }) => {
    await expect(page.locator(cy('cert-grid'))).toBeVisible();
  });

  test('at least 5 cert cards are shown', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await expect(page.locator(cy(`cert-card-${i}`))).toBeVisible();
    }
  });

  test('ISTQB cert is present', async ({ page }) => {
    await expect(page.locator(cy('certifications'))).toContainText('ISTQB');
  });

  test('each cert card has a name, issuer, and year', async ({ page }) => {
    const card = page.locator(cy('cert-card-0'));
    await expect(card.locator('[data-cy^="cert-name-"]')).not.toBeEmpty();
    await expect(card.locator('[data-cy^="cert-issuer-"]')).not.toBeEmpty();
    await expect(card.locator('[data-cy^="cert-year-"]')).not.toBeEmpty();
  });
});

// ─────────────────────────────────────────────────────
// EDUCATION
// ─────────────────────────────────────────────────────
test.describe('Education', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
    await page.locator(cy('education')).scrollIntoViewIfNeeded();
  });

  test('education section is visible', async ({ page }) => {
    await expect(page.locator(cy('education'))).toBeVisible();
  });

  test('edu grid is present', async ({ page }) => {
    await expect(page.locator(cy('edu-grid'))).toBeVisible();
  });

  test('2 education cards are shown', async ({ page }) => {
    await expect(page.locator(cy('edu-card-0'))).toBeVisible();
    await expect(page.locator(cy('edu-card-1'))).toBeVisible();
  });

  test('first edu card mentions Hogeschool Utrecht', async ({ page }) => {
    await expect(page.locator(cy('edu-school-0'))).toContainText('Hogeschool Utrecht');
  });
});

// ─────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────
test.describe('Contact', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
    await page.locator(cy('contact')).scrollIntoViewIfNeeded();
  });

  test('contact section is visible', async ({ page }) => {
    await expect(page.locator(cy('contact'))).toBeVisible();
  });

  test('email CTA has correct mailto href', async ({ page }) => {
    const href = await page.locator(cy('cta-email')).getAttribute('href');
    expect(href).toContain('mailto:');
    expect(href).toContain('greater.nl');
  });

  test('call CTA has correct tel href', async ({ page }) => {
    const href = await page.locator(cy('cta-call')).getAttribute('href');
    expect(href).toContain('tel:');
  });

  test('all 4 contact info cards are visible', async ({ page }) => {
    for (const id of ['email', 'phone', 'location', 'company']) {
      await expect(page.locator(cy(`contact-${id}-card`))).toBeVisible();
    }
  });

  test('email contact card shows correct address', async ({ page }) => {
    await expect(page.locator(cy('contact-email-card'))).toContainText('greater.nl');
  });

  test('location card shows Netherlands', async ({ page }) => {
    await expect(page.locator(cy('contact-location-card'))).toContainText('Netherlands');
  });
});

// ─────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────
test.describe('Footer', () => {
  test('footer is rendered with correct name', async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
    await expect(page.locator(cy('footer'))).toBeVisible();
    await expect(page.locator(cy('footer-name'))).toContainText('Sulaiman Hashimi');
  });
});

// ─────────────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────────────
test.describe('Mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
  });

  test('hamburger toggle is visible on mobile', async ({ page }) => {
    await expect(page.locator(cy('mob-toggle'))).toBeVisible();
  });

  test('mobile menu opens on toggle click', async ({ page }) => {
    await page.locator(cy('mob-toggle')).click();
    await expect(page.locator(cy('mob-menu'))).toHaveClass(/open/);
  });

  test('mobile menu closes when a link is clicked', async ({ page }) => {
    await page.locator(cy('mob-toggle')).click();
    await page.locator(cy('mob-link-experience')).click();
    await expect(page.locator(cy('mob-menu'))).not.toHaveClass(/open/);
  });

  test('language buttons are in mobile menu', async ({ page }) => {
    await page.locator(cy('mob-toggle')).click();
    await expect(page.locator(cy('mob-lang-btn-nl'))).toBeVisible();
  });
});

// ─────────────────────────────────────────────────────
// ACCESSIBILITY
// ─────────────────────────────────────────────────────
test.describe('Accessibility basics', () => {
  test('page has a lang attribute', async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
  });

  test('images have alt attributes', async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
    const imgs = page.locator('img:not([alt])');
    await expect(imgs).toHaveCount(0);
  });

  test('nav has landmark role', async ({ page }) => {
    await page.goto('/');
    await waitForSite(page);
    await expect(page.locator('nav')).toBeVisible();
  });
});
