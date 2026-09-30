import { test, expect } from '@playwright/test';

test.describe('Complete Navigation Flow', () => {
  test('should navigate through all main pages from header', async ({ page }) => {
    await page.goto('/');

    // Verify home page loaded
    await expect(page.getByRole('heading', { name: 'William Sun' })).toBeVisible();

    // Navigate to Blog
    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL('/blog');
    await expect(page.getByRole('heading', { name: /Blog/i })).toBeVisible();

    // Navigate to Poker
    await page.getByRole('link', { name: 'Poker' }).click();
    await expect(page).toHaveURL('/poker');
    await expect(page.getByRole('heading', { name: /Poker/i })).toBeVisible();

    // Navigate to Cooking
    await page.getByRole('link', { name: 'Cooking' }).click();
    await expect(page).toHaveURL('/cooking');
    await expect(page.getByRole('heading', { name: /Cooking/i })).toBeVisible();

    // Navigate back home via icon
    await page.getByAltText('Home Icon').click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'William Sun' })).toBeVisible();
  });

  test('header should be clickable and visible on all pages', async ({ page }) => {
    const pages = ['/', '/blog', '/poker', '/cooking'];

    for (const url of pages) {
      await page.goto(url);

      // Header links should be visible and clickable (use exact match for header links)
      const blogLink = page.getByRole('link', { name: 'Blog', exact: true });
      const pokerLink = page.getByRole('link', { name: 'Poker', exact: true });
      const cookingLink = page.getByRole('link', { name: 'Cooking', exact: true });

      await expect(blogLink).toBeVisible();
      await expect(pokerLink).toBeVisible();
      await expect(cookingLink).toBeVisible();

      // Links should be clickable (not covered by z-index issues)
      await expect(blogLink).toBeEnabled();
      await expect(pokerLink).toBeEnabled();
      await expect(cookingLink).toBeEnabled();
    }
  });

  test('footer should be consistent across all pages', async ({ page }) => {
    const pages = ['/', '/blog', '/poker', '/cooking'];

    for (const url of pages) {
      await page.goto(url);

      // Footer should be visible
      await expect(page.getByText('LinkedIn')).toBeVisible();
      await expect(page.getByText('GitHub')).toBeVisible();

      // Copyright should show current year
      const currentYear = new Date().getFullYear();
      await expect(page.getByText(`© ${currentYear} William Sun`)).toBeVisible();
    }
  });

  test('browser back and forward navigation should work', async ({ page }) => {
    await page.goto('/');

    // Navigate to poker
    await page.getByRole('link', { name: 'Poker' }).click();
    await expect(page).toHaveURL('/poker');

    // Navigate to cooking
    await page.getByRole('link', { name: 'Cooking' }).click();
    await expect(page).toHaveURL('/cooking');

    // Go back
    await page.goBack();
    await expect(page).toHaveURL('/poker');

    // Go back again
    await page.goBack();
    await expect(page).toHaveURL('/');

    // Go forward
    await page.goForward();
    await expect(page).toHaveURL('/poker');
  });

  test('page transitions should not block interactions', async ({ page }) => {
    await page.goto('/');

    // Rapidly navigate between pages
    await page.getByRole('link', { name: 'Blog' }).click();
    await page.getByRole('link', { name: 'Poker' }).click();
    await page.getByRole('link', { name: 'Cooking' }).click();

    // Should end up on cooking page
    await expect(page).toHaveURL('/cooking');
    await expect(page.getByRole('heading', { name: /Cooking/i })).toBeVisible();
  });
});
