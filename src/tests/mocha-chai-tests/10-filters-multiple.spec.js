import {
  navigateToProductsPage,
  applyMultipleFilters,
  verifyProductDetails,
  validateAndNavigateToProductDetails
} from '../../configs/utils/commands.js';
import { multipleFilters, categoryKeywords } from '../../configs/utils/testData.js';
import { initializeBrowser, closeBrowser } from '../../configs/mochaConfigs/setup.js';

// ====================================================================
// FILTERS - MULTIPLE FILTERS TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for combined filter functionality
// Uses Mocha as test runner, Chai for assertions, Playwright for automation
// ====================================================================
const BROWSERS = ['chromium', 'firefox', 'webkit'];

BROWSERS.forEach(browserName => {
  describe(`Filters - Multiple Filters [${browserName}]`, function () {

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
    multipleFilters.forEach(({ category, brand }) => {
      it(`Apply ${category} + ${brand} filters`, async function () {
        const { page } = browserContext;

        // Setup
        await navigateToProductsPage(page);

        // Apply filters
        await applyMultipleFilters(page, category, brand);

        // Validate results and navigate to product details
        const errors = await validateAndNavigateToProductDetails(page, category, brand, categoryKeywords);
        expect(errors, `Filters validation failed for ${category} + ${brand}: ${errors.join(", ")}`).to.deep.equal([]);

        // Verify product details
        const actualBrand = await verifyProductDetails(page);
        expect(actualBrand, `Brand badge should show "${brand}"`).to.equal(brand);
      });
    });
  });
});