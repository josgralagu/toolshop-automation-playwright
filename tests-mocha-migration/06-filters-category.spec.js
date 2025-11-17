import { navigateToProductsPage, filterByCategory, validateCategoryKeywords } from '../utils/commands.js';
import { categoryKeywords } from '../utils/testData.js';
import { initializeBrowser, closeBrowser } from './setup.js';

// ====================================================================
// FILTER PRODUCTS BY CATEGORY TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for category filter functionality
// Uses Mocha as test runner, Chai for assertions, Playwright for assertions & automation
// ====================================================================
const BROWSERS = ['chromium', 'firefox', 'webkit'];

BROWSERS.forEach(browserName => {
  describe(`Filter products by category [${browserName}]`, function () {
    // Increase timeout for async operations
    this.timeout(60000);

    let browserContext;

    const categories = [
      { name: 'Hand Tools', keywords: categoryKeywords.handTools },
      { name: 'Power Tools', keywords: categoryKeywords.powerTools },
      { name: 'Other', keywords: categoryKeywords.other },
    ];

    // Setup before each test - initialize browser
    beforeEach(async function () {
      browserContext = await initializeBrowser(browserName);
    });

    // Cleanup after each test - close browser
    afterEach(async function () {
      await closeBrowser(browserContext);
    });

    /**
     * Test category filtering functionality
     * Validates that each category filter shows appropriate products
     */
    categories.forEach(({ name, keywords }) => {
      it(`Filter by ${name}`, async function () {
        const { page } = browserContext;

        // Navigate to products page
        await navigateToProductsPage(page);

        // Apply category filter
        await filterByCategory(page, name);

        // Validate filtered results contain expected keywords
        const errors = await validateCategoryKeywords(page, keywords);
        expect(errors).to.deep.equal([]);
      });
    });
  });
});