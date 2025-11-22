import { test, expect } from "@playwright/test";
import { pages } from "../../po/index.js";
import { navigateToProductsPage, filterByCategory, filterByBrand, validateMultipleFiltersBasic } from "../../configs/utils/commands";
import { multipleFilters, categoryKeywords } from "../../configs/utils/testData";

test.describe("Filters - Multiple Filters", () => {

  /**
   * Setup before each test - navigate to products page
   */
  test.beforeEach(async ({ page }) => {
    await navigateToProductsPage(page);
  });

  /**
   * Test multiple filter combinations
   * Validates that combined category and brand filters work correctly
   */
  test("Apply multiple filters and verify sample product", async ({ page }) => {
    const productsPage = pages('products', page);
    const detailPage = pages('productdetail', page);

    // Test each filter combination
    for (const { category, brand } of multipleFilters) {
      console.log(`\n=== Testing: ${category} + ${brand} ===`);

      // Apply category and brand filters
      await filterByCategory(page, category);
      await filterByBrand(page, brand);

      // Validate filtered results
      const categoryKey = category.charAt(0).toLowerCase() + category.slice(1).replace(/\s+/g, '');
      const keywords = categoryKeywords[categoryKey];
      const errors = await validateMultipleFiltersBasic(page, category, brand, keywords);
      expect(errors, `Filters validation failed`).toEqual([]);

      // Verify product details match filters
      await productsPage.productCards.first().click();
      await page.waitForURL(/\/product\//, { timeout: 15000 });
      await detailPage.waitForProductData();
      
      // Validate brand badge matches expected brand
      const actualBrand = await detailPage.getBrandBadgeText();
      expect(actualBrand.trim(), `Brand badge should show "${brand}"`).toBe(brand);
      
      // Cleanup - return to products page (resets filters)
      await navigateToProductsPage(page);
    }
  });
});