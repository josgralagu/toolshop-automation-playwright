import { test, expect } from "@playwright/test";
import { navigateToProductsPage, applyMultipleFilters, verifyProductDetails, validateAndNavigateToProductDetails } from "../../configs/utils/commands";
import { multipleFilters, categoryKeywords } from "../../configs/utils/testData";

test.describe("Filters - Multiple Filters", () => {
  multipleFilters.forEach(({ category, brand }) => {
    test(`Apply ${category} + ${brand} filters`, async ({ page }) => {
      // Setup
      await navigateToProductsPage(page);

      // Apply filters
      await applyMultipleFilters(page, category, brand);

      // Validate results and navigate to product details
      const errors = await validateAndNavigateToProductDetails(page, category, brand, categoryKeywords);
      expect(errors, `Filters validation failed for ${category} + ${brand}: ${errors.join(", ")}`).toEqual([]);

      // Verify product details
      const actualBrand = await verifyProductDetails(page);
      expect(actualBrand, `Brand badge should show "${brand}"`).toBe(brand);
    });
  });
});