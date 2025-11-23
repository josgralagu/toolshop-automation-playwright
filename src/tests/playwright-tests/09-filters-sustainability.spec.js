import { test, expect } from "@playwright/test";
import { navigateToProductsPage, filterByEcoFriendly, validateEcoBadgesAcrossPagination } from "../../configs/utils/commands";

test.describe("Filter - Sustainability Type", () => {

  /**
   * Setup before each test - navigate to products page
   */
  test.beforeEach(async ({ page }) => {
    await navigateToProductsPage(page);
  });

  /**
   * Test eco-friendly filter functionality
   * Validates that eco-friendly filter shows only eco-certified products
   */
  test("Filter products by sustainability type - eco-friendly", async ({ page }) => {
    // Apply eco-friendly filter
    await filterByEcoFriendly(page);
    
    // Validate all filtered products have eco badges across all pagination pages
    const errors = await validateEcoBadgesAcrossPagination(page);
    expect(errors).toEqual([]);
  });
});