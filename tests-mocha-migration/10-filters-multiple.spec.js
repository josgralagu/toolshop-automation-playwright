import {
  navigateToProductsPage,
  filterByCategory,
  filterByBrand,
  validateMultipleFiltersBasic
} from '../utils/commands.js';
import { ProductsPage } from '../src/po/Pages/ProductsPage.js';
import { ProductDetailPage } from '../src/po/Pages/ProductDetailPage.js';
import { multipleFilters, categoryKeywords } from '../utils/testData.js';
import { initializeBrowser, closeBrowser } from './setup.js';

// ====================================================================
// FILTERS - MULTIPLE FILTERS TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for combined filter functionality
// Uses Mocha as test runner, Chai for assertions, Playwright for automation
// ====================================================================
const BROWSERS = ['chromium', 'firefox', 'webkit'];

BROWSERS.forEach(browserName => {
  describe(`Filters - Multiple Filters [${browserName}]`, function () {
    // Increase timeout for async operations
    this.timeout(60000);

    let browserContext;

    // Setup before each test - initialize browser and navigate to products page
    beforeEach(async function () {
      browserContext = await initializeBrowser(browserName);
      const { page } = browserContext;
      await navigateToProductsPage(page);
    });

    // Cleanup after each test - close browser
    afterEach(async function () {
      await closeBrowser(browserContext);
    });

    /**
     * Test multiple filter combinations
     * Validates that combined category and brand filters work correctly
     */
    it('Apply multiple filters and verify sample product', async function () {
      const { page } = browserContext;
      const productsPage = new ProductsPage(page);
      const detailPage = new ProductDetailPage(page);

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
        expect(errors, `Filters validation failed`).to.deep.equal([]);

        // Verify product details match filters
        await productsPage.productCards.first().click();
        await page.waitForURL(/\/product\//, { timeout: 15000 });
        await detailPage.waitForProductData();

        // Validate brand badge matches expected brand
        const actualBrand = await detailPage.getBrandBadgeText();
        assert.deepEqual(actualBrand.trim(), brand, `Brand badge should show "${brand}" instead of "${actualBrand.trim()}"`);

        // Cleanup - return to products page (resets filters)
        await navigateToProductsPage(page);
      }
    });
  });
});