import { test, expect } from '@playwright/test';

test('render the list', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.getByLabel('Benutzername: ').fill('admin');
  await page.getByLabel('Passwort: ').fill('test');
  await page.getByRole('button').click();

  await expect(page.getByRole('heading')).toHaveText('Bücherliste 📚');
  await expect(
    page.locator('tbody tr:nth-child(1) td:nth-child(1)')
  ).toHaveText("The Hitchhiker's Guide to the Galaxy");
});
