import { test, expect } from "@playwright/test";
import { pages } from "../../po/index.js";
import { searchAndSelectProduct } from "../../configs/utils/commands";
import { searchProducts } from "../../configs/utils/testData";

test.describe("Product Details Page", () => {

  /**
   * Setup before each test - navigate to products page
   */
  test.beforeEach(async ({ page }) => {
    const productsPage = pages('products', page);
    await productsPage.navigateToProductsPage();
    await productsPage.waitForInitialProductsLoad();

    // Verify products are available
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  /**
   * Test product details viewing for multiple products
   * Validates that product price and description are displayed
   */
  for (const productName of searchProducts) {
    test(`View details of - ${productName}`, async ({ page }) => {
      const detailPage = pages('productdetail', page);

      // Search and navigate to product detail page
      await searchAndSelectProduct(page, productName);

      // Verify product data is displayed
      await detailPage.waitForProductData();
      await expect(detailPage.productPrice).toBeVisible();
      await expect(detailPage.productDescription).toBeVisible();
    });
  }
});