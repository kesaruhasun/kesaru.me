import { test, expect } from '@playwright/test';

test('home page loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Kesaru/);
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  
  // Check that navigation is present
  const navigation = page.getByRole('navigation');
  await expect(navigation).toBeVisible();
});
