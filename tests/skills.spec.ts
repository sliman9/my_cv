import { test, expect } from '@playwright/test';

test.describe('Skills section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('18 skill cards are rendered in total', async ({ page }) => {
    await expect(page.locator('.skill')).toHaveCount(18);
  });

  test('four filter tabs are shown: All, Automation, Languages, Tools', async ({ page }) => {
    const tabs = page.locator('.tab');
    await expect(tabs).toHaveCount(4);
    await expect(tabs).toHaveText(['All', 'Automation', 'Languages', 'Tools']);
  });

  test('"All" tab is active by default', async ({ page }) => {
    await expect(page.locator('.tab[data-cat="all"]')).toHaveClass(/active/);
  });

  test('skill legend shows Pro, Intermediate, Beginner, Learning', async ({ page }) => {
    await expect(page.locator('.legend span')).toHaveText([
      'Pro', 'Intermediate', 'Beginner', 'Learning',
    ]);
  });

  // ── Filter tabs ───────────────────────────────────────────────────────────

  test.describe('Filter tabs', () => {
    test('"All" shows all 18 skills', async ({ page }) => {
      await page.locator('.tab[data-cat="all"]').click();
      await expect(page.locator('.skill:not(.hidden)')).toHaveCount(18);
    });

    test('"Automation" shows exactly 9 skills', async ({ page }) => {
      await page.locator('.tab[data-cat="automation"]').click();
      await expect(page.locator('.skill:not(.hidden)')).toHaveCount(9);
    });

    test('"Languages" shows exactly 3 skills — Python, SQL, TypeScript', async ({ page }) => {
      await page.locator('.tab[data-cat="languages"]').click();
      await expect(page.locator('.skill:not(.hidden)')).toHaveCount(3);
      await expect(page.locator('.skill:not(.hidden) h4')).toHaveText(['Python', 'SQL', 'TypeScript']);
    });

    test('"Tools" shows exactly 6 skills', async ({ page }) => {
      await page.locator('.tab[data-cat="tools"]').click();
      await expect(page.locator('.skill:not(.hidden)')).toHaveCount(6);
    });

    test('switching back to "All" restores all 18 visible skills', async ({ page }) => {
      await page.locator('.tab[data-cat="automation"]').click();
      await page.locator('.tab[data-cat="all"]').click();
      await expect(page.locator('.skill:not(.hidden)')).toHaveCount(18);
    });

    test('skills outside the active category receive the "hidden" class', async ({ page }) => {
      await page.locator('.tab[data-cat="languages"]').click();
      await expect(page.locator('.skill[data-cat="automation"]').first()).toHaveClass(/hidden/);
      await expect(page.locator('.skill[data-cat="tools"]').first()).toHaveClass(/hidden/);
    });

    test('the clicked tab becomes active and the previous one is deactivated', async ({ page }) => {
      await page.locator('.tab[data-cat="automation"]').click();
      await expect(page.locator('.tab[data-cat="automation"]')).toHaveClass(/active/);
      await expect(page.locator('.tab[data-cat="all"]')).not.toHaveClass(/active/);
    });
  });

  // ── Hero chip → skills integration ───────────────────────────────────────

  test.describe('Hero chip → tab integration', () => {
    const CHIP_CATEGORY: Array<{ chip: string; expectedTab: string }> = [
      { chip: 'Python',           expectedTab: 'languages'  },
      { chip: 'TypeScript',       expectedTab: 'languages'  },
      { chip: 'Robot Framework',  expectedTab: 'automation' },
      { chip: 'Selenium',         expectedTab: 'automation' },
      { chip: 'Playwright',       expectedTab: 'automation' },
    ];

    for (const { chip, expectedTab } of CHIP_CATEGORY) {
      test(`clicking "${chip}" chip activates the "${expectedTab}" tab`, async ({ page }) => {
        // force: true bypasses Playwright's stability check — the chips animate continuously
        // via the ".bob" keyframe animation; real users can click through it just fine.
        await page.locator('#heroChips .chip', { hasText: chip }).click({ force: true });
        await expect(page.locator(`.tab[data-cat="${expectedTab}"]`)).toHaveClass(/active/, { timeout: 3_000 });
      });
    }

    test('clicking any chip scrolls the skills section into view', async ({ page }) => {
      await page.locator('#heroChips .chip', { hasText: 'Playwright' }).click({ force: true });
      await expect(page.locator('#skills')).toBeInViewport({ timeout: 3_000 });
    });
  });
});
