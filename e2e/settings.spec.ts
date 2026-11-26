import { expect, test } from '@playwright/test';

const background = (page: import('@playwright/test').Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test('Dark and Light override the phone, and the choice is remembered', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('./');
  const light = await background(page);
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('button', { name: 'Dark' }).click();
  const dark = await background(page);
  expect(dark).not.toBe(light);

  await page.reload();
  expect(await background(page)).toBe(dark);
  await expect(page.getByRole('button', { name: 'Dark' })).toHaveAttribute('aria-pressed', 'true');

  await page.emulateMedia({ colorScheme: 'dark' });
  await page.getByRole('button', { name: 'Light' }).click();
  expect(await background(page)).toBe(light);
  await page.getByRole('button', { name: 'Automatic' }).click();
  expect(await background(page)).toBe(dark);
});

test('About explains how to add the app to your phone, and shows the notices', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('heading', { name: 'Add it to your phone' })).toBeVisible();
  await page.getByText('Show the license notices').click();
  await expect(page.locator('[data-notices]')).toContainText('Workbox');
  await page.getByRole('link', { name: 'Back to contents' }).click();
  await expect(page.locator('.cards a')).toHaveCount(18);
});
