import { test, expect } from '@playwright/test';

const CERTS = [
  'CTAL-TAE — Advanced Test Automation Engineering',
  'ISTQB CTFL 4.0 — Certified Tester Foundation',
  'GSDC Certified Selenium Testing Professional',
  'GSDC Certified Cloud Tester Foundation',
  'PCEP — Certified Entry-Level Python Programmer',
  'ITIL Foundation V4',
  'Professional Scrum Master I (PSM I)',
  'Tosca Automation Specialist Level 1 & 2',
  'Robot Framework Test Automation Level 1 & 2',
  'TMAP: Quality for Cross-Functional Teams',
  'Postman: Getting Started API Testing',
  'CCNA — Cisco Certified Network Associate',
];

test.describe('Certifications section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('twelve certification cards are rendered', async ({ page }) => {
    await expect(page.locator('.cert')).toHaveCount(12);
  });

  for (const cert of CERTS) {
    test(`"${cert}" is visible`, async ({ page }) => {
      await expect(page.locator('.cert', { hasText: cert })).toBeVisible();
    });
  }
});

test.describe('Education section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('two education cards are rendered', async ({ page }) => {
    await expect(page.locator('.edu')).toHaveCount(2);
  });

  test('first entry: HBO Business IT & Management at Hogeschool Utrecht, 2019–2022', async ({ page }) => {
    const edu = page.locator('.edu').nth(0);
    await expect(edu.locator('h3')).toHaveText('HBO Business IT & Management');
    await expect(edu.locator('.school')).toHaveText('Hogeschool Utrecht');
    await expect(edu.locator('.years')).toHaveText('2019 – 2022 · Diploma');
  });

  test('second entry: MBO4 ICT Systeembeheerder at ROC Midden Nederland, 2016–2019', async ({ page }) => {
    const edu = page.locator('.edu').nth(1);
    await expect(edu.locator('h3')).toHaveText('MBO4 ICT Systeembeheerder');
    await expect(edu.locator('.school')).toHaveText('ROC Midden Nederland');
    await expect(edu.locator('.years')).toHaveText('2016 – 2019 · Diploma');
  });
});
