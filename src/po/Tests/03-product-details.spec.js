import { test, expect } from "@playwright/test";
import { ProductsPage } from "../Pages/ProductsPage";
import { ProductDetailPage } from "../Pages/ProductDetailPage";
import { searchAndSelectProduct } from "../../../utils/commands";
import { searchProducts } from "../../../utils/testData";

test.describe("Product Details Page", () => {

  /**
   * Setup before each test - navigate to products page
   */
  test.beforeEach(async ({ page }) => {
    const productsPage = new ProductsPage(page);
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
      const detailPage = new ProductDetailPage(page);

      // Search and navigate to product detail page
      await searchAndSelectProduct(page, productName);

      // Verify product data is displayed
      await detailPage.waitForProductData();
      await expect(detailPage.productPrice).toBeVisible();
      await expect(detailPage.productDescription).toBeVisible();
    });
  }
});