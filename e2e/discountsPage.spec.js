import { test, expect } from '@playwright/test';

test.describe('discounts page', () => {

  test.describe('add discount', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();

      await page.goto('/');
    });

    test.afterAll(async () => {
      await page.close();
    });

    test('should open modal', async () => {
      const btn = page.locator('[data-test-id="add-discount-btn"]');

      await btn.click();

      await expect(page.locator('[data-pc-name="dialog"]')).toBeVisible();
    });

    test('should be correct title', async () => {
      await expect(page.locator('[data-pc-section="title"]')).toHaveText('Create discount');
    });

    test('should be empty fields', async () => {
      await expect(page.locator('[data-test-attr-el="discount-name"]')).toHaveValue('');
    });

    test('should close modal', async () => {
      const closeBtn = page.locator('[data-pc-name="pcclosebutton"]');

      await closeBtn.click();

      await expect(page.locator('[data-pc-name="dialog"]')).toBeHidden();
    });
  });

  test.describe('edit discount', () => {
    let page;
    let expectedDiscountName = '';

    test.beforeAll(async ({ browser }) => {
      page = await browser.newPage();

      await page.goto('/');
    });

    test.afterAll(async () => {
      await page.close();
    });

    test('should open modal', async () => {
      const row = page.locator('[data-test-id="discount-table"] [data-pc-section="bodyrow"][data-p-index="0"]');

      expectedDiscountName = await row.locator('[data-pc-name="bodycell"]').first().textContent();

      console.log(expectedDiscountName);

      await row.click();

      await expect(page.locator('[data-pc-name="dialog"]')).toBeVisible();
    });

    test('should be correct title', async () => {
      await expect(page.locator('[data-pc-section="title"]')).toHaveText('Edit discount');
    });

    test('should be empty fields', async () => {
      await expect(page.locator('[data-test-attr-el="discount-name"]')).toHaveValue(expectedDiscountName);
    });

    test('should close modal', async () => {
      const closeBtn = page.locator('[data-pc-name="pcclosebutton"]');

      await closeBtn.click();

      await expect(page.locator('[data-pc-name="dialog"]')).toBeHidden();
    });
  });
})
