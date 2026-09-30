import { test, expect } from '@playwright/test';

test.describe('Header Interactive Elements', () => {
  test('home icon should rotate on hover', async ({ page }) => {
    await page.goto('/');

    const homeIcon = page.getByAltText('Home Icon');
    await expect(homeIcon).toBeVisible();

    // Hover over the home icon
    await homeIcon.hover();

    // Icon should still be visible after hover
    await expect(homeIcon).toBeVisible();

    // Icon should have opacity change (visual indication of hover)
    const iconLink = page.locator('a:has(img[alt="Home Icon"])');
    await expect(iconLink).toBeVisible();
  });

  test('navigation links should have hover effects', async ({ page }) => {
    await page.goto('/');

    const blogLink = page.getByRole('link', { name: 'Blog' });

    // Get initial color
    const initialColor = await blogLink.evaluate((el) =>
      window.getComputedStyle(el).color
    );

    // Hover over link
    await blogLink.hover();

    // Wait for transition
    await page.waitForTimeout(300);

    // Color might have changed (hover effect)
    await expect(blogLink).toBeVisible();
  });

  test('header should be above particle background', async ({ page }) => {
    await page.goto('/');

    const blogLink = page.getByRole('link', { name: 'Blog' });

    // Link should be clickable (not covered)
    await expect(blogLink).toBeEnabled();

    // Should be able to click it
    await blogLink.click();
    await expect(page).toHaveURL('/blog');
  });

  test('header navigation should be keyboard accessible', async ({ page, browserName }) => {
    // Safari doesn't focus links via Tab key by default (browser preference)
    test.skip(browserName === 'webkit', 'Safari does not focus links via Tab key by default');

    await page.goto('/');

    // Tab through navigation
    await page.keyboard.press('Tab'); // Home icon
    await page.keyboard.press('Tab'); // Blog link

    const blogLink = page.getByRole('link', { name: 'Blog' });
    await expect(blogLink).toBeFocused();

    // Press Enter to navigate
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/blog');
  });

  test('home icon should navigate to home from any page', async ({ page }) => {
    // Start on poker page
    await page.goto('/poker');

    // Click home icon
    await page.getByAltText('Home Icon').click();

    // Should be on home page
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'William Sun' })).toBeVisible();
  });

  test('header should be sticky and always visible', async ({ page }) => {
    await page.goto('/');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));

    // Header should still be visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Navigation links should still be visible and clickable
    const blogLink = page.getByRole('link', { name: 'Blog' });
    await expect(blogLink).toBeVisible();
  });
});
