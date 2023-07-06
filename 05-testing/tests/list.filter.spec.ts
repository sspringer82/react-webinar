import { expect, test as base } from '@playwright/test';
import { ListPage } from './list.po';

const test = base.extend<{ listPage: ListPage }>({
  listPage: async ({ page }, use) => {
    const listPage = new ListPage(page);
    await use(listPage);
    // do preparations here
  },
});

test.describe('List', () => {
  test('should filter the list', async ({ listPage }) => {
    await listPage.login();

    await expect(listPage.titles).toHaveCount(8);

    await listPage.applyFilter('ings');

    await expect(listPage.titles).toHaveCount(1);
  });
});
