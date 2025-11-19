import { navigateToProductsPage, filterBySubcategory, validateSubcategoryResults } from '../utils/commands.js';
import { subcategories, subcategoryKeywords } from '../utils/testData.js';
import { initializeBrowser, closeBrowser } from './setup.js';

// ====================================================================
// FILTER PRODUCTS BY SUBCATEGORY TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for subcategory filter functionality
// Uses Mocha as test runner, Chai for assertions, Playwright for automation
// ====================================================================
const BROWSERS = ['chromium', 'firefox', 'webkit'];

BROWSERS.forEach(browserName => {
  describe(`Filter Products by Subcategory [${browserName}]`, function () {

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
     * Test subcategory filtering functionality
     * Validates that each subcategory filter shows appropriate products
     */
    subcategories.forEach((subcategory) => {
      it(`Filter by subcategory: ${subcategory}`, async function () {
        const { page } = browserContext;

        // Apply subcategory filter
        await filterBySubcategory(page, subcategory);

        // Validate filtered results
        const keywords = subcategoryKeywords[subcategory];
        const errors = await validateSubcategoryResults(page, subcategory, keywords);

        // Verify no validation errors
        errors.should.be.deep.equal([]);
      });
    });
  });
});