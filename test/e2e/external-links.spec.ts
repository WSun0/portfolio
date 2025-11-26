import { test, expect } from '@playwright/test';

test.describe('External Links Behavior', () => {
  test('Valorant tracker link should open in new tab', async ({ page, context }) => {
    await page.goto('/');

    // Get the Valorant link
    const valorantLink = page.getByRole('link', { name: 'first-person shooters' });
    await expect(valorantLink).toBeVisible();

    // Verify target="_blank"
    await expect(valorantLink).toHaveAttribute('target', '_blank');
    await expect(valorantLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Verify href
    const href = await valorantLink.getAttribute('href');
    expect(href).toContain('tracker.gg/valorant');
  });

  test('Pokemon Smogon link should open in new tab', async ({ page }) => {
    await page.goto('/');

    const pokemonLink = page.getByRole('link', { name: /battling Pokémon competitively/i });
    await expect(pokemonLink).toBeVisible();

    // Verify attributes
    await expect(pokemonLink).toHaveAttribute('target', '_blank');
    await expect(pokemonLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(pokemonLink).toHaveAttribute('href', 'https://www.smogon.com/forums/members/will.485997/');
  });

  test('LinkedIn link should open in new tab', async ({ page }) => {
    await page.goto('/');

    const linkedinLink = page.getByRole('link', { name: 'LinkedIn' });
    await expect(linkedinLink).toBeVisible();

    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/william1sun/');
  });

  test('GitHub link should open in new tab', async ({ page }) => {
    await page.goto('/');

    const githubLink = page.getByRole('link', { name: 'GitHub' });
    await expect(githubLink).toBeVisible();

    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/wsun0');
  });

  test('all external links have security attributes', async ({ page }) => {
    await page.goto('/');

    // Get all links with http/https href
    const externalLinks = page.locator('a[href^="http"]');
    const count = await externalLinks.count();

    // Should have 4 external links (2 on home page, 2 in footer)
    expect(count).toBe(4);

    // All should have target="_blank" and rel="noopener noreferrer"
    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('footer links should be visible and clickable on all pages', async ({ page }) => {
    const pages = ['/', '/blog', '/poker', '/cooking'];

    for (const url of pages) {
      await page.goto(url);

      const linkedinLink = page.getByRole('link', { name: 'LinkedIn' });
      const githubLink = page.getByRole('link', { name: 'GitHub' });

      await expect(linkedinLink).toBeVisible();
      await expect(githubLink).toBeVisible();

      // Links should be at the bottom of the page (in footer)
      const linkedinBox = await linkedinLink.boundingBox();
      const pageHeight = await page.evaluate(() => document.body.scrollHeight);

      // LinkedIn link should be in lower portion of page
      if (linkedinBox) {
        expect(linkedinBox.y).toBeGreaterThan(pageHeight * 0.5);
      }
    }
  });
});
