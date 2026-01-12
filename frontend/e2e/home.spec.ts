import { test, expect } from '@playwright/test';

test('homepage has title and a link to login', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Beginner Investor Hub/);

  // Expect a login button
  const loginButton = page.getByRole('link', { name: 'Login' });
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toHaveAttribute('href', '/login');
});
