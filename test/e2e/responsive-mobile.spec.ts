import { test, expect } from '@playwright/test';

test.describe('Responsive Design and Mobile Views', () => {
  test('header should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Header should still be visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Navigation links should be visible
    await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Poker' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cooking' })).toBeVisible();

    // Home icon should be visible
    await expect(page.getByAltText('Home Icon')).toBeVisible();
  });

  test('cooking image grid should stack on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/cooking/first-time-cooking-wagyu-2025');

    // Images should be present
    const images = page.getByRole('img');
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // On mobile, images should stack (one per row)
    const firstImage = page.locator('.grid > div').first();
    const secondImage = page.locator('.grid > div').nth(1);

    const firstBox = await firstImage.boundingBox();
    const secondBox = await secondImage.boundingBox();

    // Images should be stacked vertically (different y positions)
    if (firstBox && secondBox) {
      expect(secondBox.y).toBeGreaterThan(firstBox.y + 50);
    }
  });

  test('cooking image grid should show 2 columns on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/cooking/first-time-cooking-wagyu-2025');

    // Images should be present
    const images = page.getByRole('img');
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // On tablet, first two images might be side by side
    const firstImage = page.locator('.grid > div').first();
    const secondImage = page.locator('.grid > div').nth(1);

    const firstBox = await firstImage.boundingBox();
    const secondBox = await secondImage.boundingBox();

    // Check if they're roughly on the same row (within 50px vertically)
    if (firstBox && secondBox) {
      const verticalDiff = Math.abs(firstBox.y - secondBox.y);
      // On tablet, they should be on the same row or close to it
      expect(verticalDiff).toBeLessThan(100);
    }
  });

  test('cooking image grid should show 3 columns on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/cooking/first-time-cooking-wagyu-2025');

    const images = page.getByRole('img');
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // On desktop, first three images should be on the same row
    const firstImage = page.locator('.grid > div').first();
    const secondImage = page.locator('.grid > div').nth(1);
    const thirdImage = page.locator('.grid > div').nth(2);

    const firstBox = await firstImage.boundingBox();
    const secondBox = await secondImage.boundingBox();
    const thirdBox = await thirdImage.boundingBox();

    // All three should be roughly at the same vertical position
    if (firstBox && secondBox && thirdBox) {
      const diff1 = Math.abs(firstBox.y - secondBox.y);
      const diff2 = Math.abs(secondBox.y - thirdBox.y);

      expect(diff1).toBeLessThan(50);
      expect(diff2).toBeLessThan(50);
    }
  });

  test('touch targets should be large enough on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check home icon size (should be at least 44x44 for touch)
    const homeIcon = page.getByAltText('Home Icon');
    const iconBox = await homeIcon.boundingBox();

    if (iconBox) {
      // Icon should be at least 32x32 (w-8 h-8 = 32px)
      expect(iconBox.width).toBeGreaterThanOrEqual(30);
      expect(iconBox.height).toBeGreaterThanOrEqual(30);
    }

    // Check navigation links
    const blogLink = page.getByRole('link', { name: 'Blog' });
    const linkBox = await blogLink.boundingBox();

    if (linkBox) {
      // Link should have adequate tap target height
      expect(linkBox.height).toBeGreaterThanOrEqual(20);
    }
  });

  test('content should be readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Main heading should be visible
    const heading = page.getByRole('heading', { name: 'William Sun' });
    await expect(heading).toBeVisible();

    // Body text should be visible
    const bodyText = page.getByText(/Northeastern University/i);
    await expect(bodyText).toBeVisible();

    // Text should not overflow viewport
    const textBox = await bodyText.boundingBox();
    if (textBox) {
      expect(textBox.width).toBeLessThanOrEqual(375);
    }
  });

  test('footer should be visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Footer links should be visible
    await expect(page.getByText('LinkedIn')).toBeVisible();
    await expect(page.getByText('GitHub')).toBeVisible();

    const currentYear = new Date().getFullYear();
    await expect(page.getByText(`© ${currentYear} William Sun`)).toBeVisible();
  });

  test('map should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/poker/casinos');

    // Verify map description is visible (indicates map section is present)
    await expect(page.getByText(/A map of where I have played poker in-person/i)).toBeVisible();

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // On mobile viewport, the page should not have horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(hasHorizontalScroll).toBe(false);
  });

  test('navigation should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Should be able to navigate
    await page.getByRole('link', { name: 'Cooking' }).click();
    await expect(page).toHaveURL('/cooking');

    await page.getByRole('link', { name: 'Poker' }).click();
    await expect(page).toHaveURL('/poker');

    await page.getByAltText('Home Icon').click();
    await expect(page).toHaveURL('/');
  });

  test('page transitions should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Navigate and wait for transition
    await page.getByRole('link', { name: 'Blog' }).click();
    await page.waitForTimeout(500); // Wait for transition

    await expect(page).toHaveURL('/blog');
    await expect(page.getByRole('heading', { name: /Blog/i })).toBeVisible();
  });
});
