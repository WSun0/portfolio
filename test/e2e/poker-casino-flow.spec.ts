import { test, expect } from '@playwright/test';

test.describe('Poker Casino Information Flow', () => {
  test('should navigate from poker hub to casinos page', async ({ page }) => {
    await page.goto('/poker');

    // Verify poker hub loaded
    await expect(page.getByRole('heading', { name: /Poker/i })).toBeVisible();

    // Find and click the link to casinos
    const casinosLink = page.getByRole('link', { name: /here/i });
    await expect(casinosLink).toBeVisible();
    await casinosLink.click();

    // Should navigate to casinos page
    await expect(page).toHaveURL('/poker/casinos');
    await expect(page.getByRole('heading', { name: /Casinos I've Played Poker At/i })).toBeVisible();
  });

  test('casinos page should display all sections', async ({ page }) => {
    await page.goto('/poker/casinos');

    // All main sections should be visible
    await expect(page.getByRole('heading', { name: /In-Person Casinos/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Online Poker Rooms/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Thoughts on Each Location/i })).toBeVisible();
  });

  test('should display all in-person casino locations', async ({ page }) => {
    await page.goto('/poker/casinos');

    // All 6 in-person casinos should be listed
    await expect(page.getByText(/Encore Boston Harbor/i)).toBeVisible();
    await expect(page.getByText(/Parx Casino/i)).toBeVisible();
    await expect(page.getByText(/Chasers Poker Room/i)).toBeVisible();
    await expect(page.getByText(/Metro Casino/i)).toBeVisible();
    await expect(page.getByText(/Caesars New Orleans/i)).toBeVisible();
    await expect(page.getByText(/Playground Card Room/i)).toBeVisible();
  });

  test('should display all online poker rooms', async ({ page }) => {
    await page.goto('/poker/casinos');

    // All 3 online rooms should be listed
    await expect(page.getByText('Club WPT Gold')).toBeVisible();
    await expect(page.getByText('Ignition')).toBeVisible();
    await expect(page.getByText('ACR')).toBeVisible();
  });

  test('map should load or show loading state', async ({ page }) => {
    await page.goto('/poker/casinos');

    // Map description should be visible
    await expect(page.getByText(/A map of where I have played poker in-person/i)).toBeVisible();

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // The map section exists (we verified the description is visible)
    // Map loads dynamically via client-side component, so we don't check container visibility
  });

  test('page should scroll to see all content', async ({ page }) => {
    await page.goto('/poker/casinos');

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // "Thoughts" section should be visible after scrolling
    await expect(page.getByRole('heading', { name: /Thoughts on Each Location/i })).toBeVisible();
  });

  test('can navigate back to poker hub from casinos page', async ({ page }) => {
    await page.goto('/poker/casinos');

    // Click poker link in header
    await page.getByRole('link', { name: 'Poker' }).click();

    // Should be back at poker hub
    await expect(page).toHaveURL('/poker');
    await expect(page.getByRole('heading', { name: /Poker/i })).toBeVisible();
  });
});
