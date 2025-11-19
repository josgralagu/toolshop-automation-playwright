import { navigateToProductsPage, filterByEcoFriendly, validateEcoBadgesAcrossPagination } from '../utils/commands.js';
import { initializeBrowser, closeBrowser } from './setup.js';

// ====================================================================
// FILTER - SUSTAINABILITY TYPE TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for eco-friendly/sustainability filter functionality
// Uses Mocha as test runner, Chai for assertions, Playwright for automation
// ====================================================================
const BROWSERS = ['chromium', 'firefox', 'webkit'];

BROWSERS.forEach(browserName => {
  describe(`Filter - Sustainability Type [${browserName}]`, function () {

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
     * Test eco-friendly filter functionality
     * Validates that eco-friendly filter shows only eco-certified products
     */
    it('Filter products by sustainability type - eco-friendly', async function () {
      const { page } = browserContext;

      // Apply eco-friendly filter
      await filterByEcoFriendly(page);

      // Validate all filtered products have eco badges across all pagination pages
      const errors = await validateEcoBadgesAcrossPagination(page);
      expect(errors).to.deep.equal([]);
    });
  });
});