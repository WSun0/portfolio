import { test, expect } from '@playwright/test';

test.describe('Cooking Content Exploration', () => {
  test('should display all cooking adventures on hub page', async ({ page }) => {
    await page.goto('/cooking');

    // Verify heading
    await expect(page.getByRole('heading', { name: /Cooking/i })).toBeVisible();

    // All 3 cooking adventures should be listed
    await expect(page.getByRole('link', { name: /First Time Cooking Wagyu 2025/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Christmas Dinner 2024/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /SF Pier Farmer's Market Breakfast 2023/i })).toBeVisible();
  });

  test('should navigate to wagyu cooking post', async ({ page }) => {
    await page.goto('/cooking');

    // Click wagyu link
    await page.getByRole('link', { name: /First Time Cooking Wagyu 2025/i }).click();

    // Should navigate to wagyu page
    await expect(page).toHaveURL('/cooking/first-time-cooking-wagyu-2025');
    await expect(page.getByRole('heading', { name: /First Time Cooking Wagyu 2025/i })).toBeVisible();
  });

  test('should navigate to christmas dinner post', async ({ page }) => {
    await page.goto('/cooking');

    // Click christmas link
    await page.getByRole('link', { name: /Christmas Dinner 2024/i }).click();

    // Should navigate to christmas page
    await expect(page).toHaveURL('/cooking/christmas-dinner');
    await expect(page.getByRole('heading', { name: /Christmas Dinner 2024/i })).toBeVisible();
  });

  test('should navigate to SF breakfast post', async ({ page }) => {
    await page.goto('/cooking');

    // Click SF link
    await page.getByRole('link', { name: /SF Pier Farmer's Market Breakfast 2023/i }).click();

    // Should navigate to SF page
    await expect(page).toHaveURL('/cooking/sf-pier-farmers-market-breakfast-2023');
    await expect(page.getByRole('heading', { name: /SF Pier Farmer's Market Breakfast 2023/i })).toBeVisible();
  });

  test('wagyu page should display description and images', async ({ page }) => {
    await page.goto('/cooking/first-time-cooking-wagyu-2025');

    // Description should be visible (use .first() to avoid strict mode violation)
    await expect(page.getByText(/I kept seeing Japanese A5 Wagyu/i)).toBeVisible();
    await expect(page.getByText(/Maruichi market in Brookline/i)).toBeVisible();

    // Menu section should be visible
    await expect(page.getByRole('heading', { name: /Menu and\/or Ingredients/i })).toBeVisible();

    // Check that cooking images are present (filter by alt text containing "First Time Cooking Wagyu")
    const wagyuImages = page.getByRole('img', { name: /First Time Cooking Wagyu/i });
    const wagyuCount = await wagyuImages.count();
    expect(wagyuCount).toBeGreaterThanOrEqual(3); // At least 3 wagyu images
  });

  test('christmas page should display description and images', async ({ page }) => {
    await page.goto('/cooking/christmas-dinner');

    // Description should be visible (check for specific text to avoid strict mode)
    await expect(page.getByText(/Christmas dinner 2024 with family and friends/i)).toBeVisible();

    // Menu section should be visible
    await expect(page.getByRole('heading', { name: /Menu and\/or Ingredients/i })).toBeVisible();

    // Images should be present
    const images = page.getByRole('img');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThanOrEqual(2);
  });

  test('SF breakfast page should display description and images', async ({ page }) => {
    await page.goto('/cooking/sf-pier-farmers-market-breakfast-2023');

    // Description should be visible
    await expect(page.getByText(/San Francisco/i)).toBeVisible();

    // Menu section should be visible
    await expect(page.getByRole('heading', { name: /Menu and\/or Ingredients/i })).toBeVisible();

    // Images should be present
    const images = page.getByRole('img');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThanOrEqual(3);
  });

  test('cooking post images should load', async ({ page }) => {
    await page.goto('/cooking/first-time-cooking-wagyu-2025');

    // Wait for page to load completely
    await page.waitForLoadState('networkidle');

    // Get cooking images by their specific alt text
    const cookingImages = page.getByRole('img', { name: /First Time Cooking Wagyu/i });
    const cookingImageCount = await cookingImages.count();
    expect(cookingImageCount).toBeGreaterThanOrEqual(3);

    // Verify all cooking images are visible (which means they loaded successfully)
    for (let i = 0; i < cookingImageCount; i++) {
      const img = cookingImages.nth(i);
      await expect(img).toBeVisible();
    }
  });

  test('can navigate back to cooking hub from post', async ({ page }) => {
    await page.goto('/cooking/first-time-cooking-wagyu-2025');

    // Click cooking link in header (use exact match to avoid matching page content)
    await page.getByRole('link', { name: 'Cooking', exact: true }).click();

    // Should be back at cooking hub
    await expect(page).toHaveURL('/cooking');
    await expect(page.getByRole('heading', { name: /Cooking/i })).toBeVisible();
  });

  test('cooking posts should have responsive image grid', async ({ page }) => {
    await page.goto('/cooking/first-time-cooking-wagyu-2025');

    // Get viewport width
    const viewportWidth = page.viewportSize()?.width || 1280;

    // Images should be in a grid
    const imageContainers = page.locator('.grid > div');
    const count = await imageContainers.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // On desktop, grid should show images side by side
    if (viewportWidth >= 768) {
      const firstImage = imageContainers.first();
      const secondImage = imageContainers.nth(1);

      const firstBox = await firstImage.boundingBox();
      const secondBox = await secondImage.boundingBox();

      // Images should be on the same row (similar y position) on desktop
      if (firstBox && secondBox && viewportWidth >= 1024) {
        expect(Math.abs(firstBox.y - secondBox.y)).toBeLessThan(50);
      }
    }
  });
});
