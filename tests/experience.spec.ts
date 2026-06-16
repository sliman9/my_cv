import { test, expect } from '@playwright/test';

const ROLES = [
  {
    org:   'Politie Utrecht',
    title: 'Test Automation Engineer',
    date:  'Dec 2025 — Present',
    tags:  ['TypeScript', 'Playwright', 'Test Strategy', 'Manual Testing', 'Automated Testing', 'Agile', 'Jira'],
  },
  {
    org:   'UWV — Formulieren Team',
    title: 'Test Automation Engineer',
    date:  'Dec 2024 — Dec 2025',
    tags:  ['Python', 'Robot Framework', 'Selenium', 'GitHub Actions', 'CI/CD', 'Visual Regression', 'Android', 'E2E'],
  },
  {
    org:   'UWV — K3CR / Klantbeeld',
    title: 'Test Automation Engineer',
    date:  'Feb 2024 — Dec 2024',
    tags:  ['Playwright', 'Robot Framework', 'Selenium', 'Python', 'SOAP', 'SQL', 'Android', 'Regression'],
  },
  {
    org:   'Gemeente Amsterdam',
    title: 'Test Engineer',
    date:  'Mar 2023 — Jan 2024',
    tags:  ['AFAS', 'Cucumber', 'Jira', 'TopDesk', 'FAB/GAT', 'Agile', 'Android'],
  },
  {
    org:   'Sogeti Nederland BV',
    title: 'Quality Test Engineer',
    date:  'Feb 2022 — Mar 2023',
    tags:  ['Tosca', 'Robot Framework', 'Selenium', 'Postman', 'Python', 'SQL', 'TMAP', 'Scrum'],
  },
];

test.describe('Experience section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('five timeline entries are rendered', async ({ page }) => {
    await expect(page.locator('.tl-item')).toHaveCount(5);
  });

  test('entries are ordered from most recent to oldest', async ({ page }) => {
    await expect(page.locator('.tl-card .org')).toHaveText(ROLES.map(r => r.org));
  });

  test('role titles are correct for each position', async ({ page }) => {
    await expect(page.locator('.tl-card h3')).toHaveText(ROLES.map(r => r.title));
  });

  test('employment date ranges are displayed correctly', async ({ page }) => {
    await expect(page.locator('.tl-card .date')).toHaveText(ROLES.map(r => r.date));
  });

  test('"Current" badge appears only on the most recent role (Politie Utrecht)', async ({ page }) => {
    await expect(page.locator('.badge-now')).toHaveCount(1);
    await expect(page.locator('.badge-now')).toHaveText('Current');
    await expect(page.locator('.tl-item').first().locator('.badge-now')).toBeVisible();
  });

  // ── Per-role tech tags ─────────────────────────────────────────────────────

  for (const [index, role] of ROLES.entries()) {
    test(`${role.org} — tech tags are correct`, async ({ page }) => {
      const tags = page.locator('.tl-item').nth(index).locator('.tag');
      await expect(tags).toHaveText(role.tags);
    });
  }
});
