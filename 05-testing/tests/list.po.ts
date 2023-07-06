import { Locator, Page } from '@playwright/test';

export class ListPage {
  public titles: Locator;

  constructor(private readonly page: Page) {
    this.titles = page.getByTestId('title');
  }

  async login() {
    await this.page.goto('http://localhost:5173/');

    await this.page.getByLabel('Benutzername: ').fill('admin');
    await this.page.getByLabel('Passwort: ').fill('test');
    await this.page.getByRole('button').click();
  }

  async applyFilter(pattern: string) {
    await this.page.getByTestId('filter').fill(pattern);
  }
}
