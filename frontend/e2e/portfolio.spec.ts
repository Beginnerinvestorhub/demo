import { test, expect } from '@playwright/test';

test.describe('Portfolio Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock login or use a session storage state
    await page.goto('/login');
    await page.fill('input[name="email"]', 'demo@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display portfolio summary', async ({ page }) => {
    await expect(page.locator('text=Total Value')).toBeVisible();
    await expect(page.locator('text=Performance')).toBeVisible();
  });

  test('should allow adding a new investment', async ({ page }) => {
    await page.click('text=Add Investment');
    
    await page.fill('input[name="symbol"]', 'AAPL');
    await page.fill('input[name="quantity"]', '10');
    await page.fill('input[name="price"]', '150.00');
    
    await page.click('button:has-text("Save")');

    // Verify the new investment appears in the list
    await expect(page.locator('text=AAPL')).toBeVisible();
    await expect(page.locator('text=10 shares')).toBeVisible();
  });
});
