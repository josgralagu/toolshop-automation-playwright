import { navigateToProductsPage, filterByBrand, validateBrandProducts, deselectBrand } from '../utils/commands.js';
import { brands } from '../utils/testData.js';
import { initializeBrowser, closeBrowser } from './setup.js';

// ====================================================================
// FILTER PRODUCTS BY BRAND TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for brand filter functionality with stock validation
// Uses Mocha as test runner, Chai for assertions, Playwright for automation
// ====================================================================
const BROWSERS = ['chromium', 'firefox', 'webkit'];

BROWSERS.forEach(browserName => {
  describe(`Area: Filter - Filter products by brand showing only items in stock [${browserName}]`, function () {
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
     * Test brand filtering functionality with stock validation
     * Validates that brand filters show only in-stock products
     */
    brands.forEach((brandName) => {
      it(`Filter by brand "${brandName}" showing only items in stock`, async function () {
        const { page } = browserContext;

        await filterByBrand(page, brandName);

        // Validate filtered results contain only in-stock products
        const errors = await validateBrandProducts(page, brandName);
        assert.deepEqual(errors, []);

        // Cleanup - deselect brand filter
        await deselectBrand(page, brandName);
      });
    });
  });
});