import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should allow a user to register', async ({ page }) => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    const password = 'Password123!';

    await page.goto('/register');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirmPassword"]', password);
    await page.click('button[type="submit"]');

    // Expect redirection to dashboard or onboarding
    await expect(page).toHaveURL(/\/dashboard|onboarding/);
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('should allow a user to login', async ({ page }) => {
    // Assumes a pre-seeded user or one created in a global setup
    // For this test, we'll use a mock approach or assume the user exists
    // In a real CI env, we'd seed this user first.
    
    await page.goto('/login');
    await page.fill('input[name="email"]', 'demo@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
  });

  test('should allow a user to logout', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[name="email"]', 'demo@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');

    // Logout
    await page.click('button[aria-label="User menu"]');
    await page.click('text=Logout');

    await expect(page).toHaveURL('/login');
  });
});
