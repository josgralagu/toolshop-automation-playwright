import { ProductsPage } from '../src/po/Pages/ProductsPage.js';
import { ProductDetailPage } from '../src/po/Pages/ProductDetailPage.js';
import { searchAndSelectProduct } from '../utils/commands.js';
import { searchProducts } from '../utils/testData.js';
import { initializeBrowser, closeBrowser, pwExpect } from './setup.js';

// ====================================================================
// PRODUCT DETAILS PAGE TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for viewing product details and verifying product information
// Uses Mocha as test runner, Chai for assertions, Playwright for automation
// ====================================================================
const BROWSERS = ['chromium', 'firefox', 'webkit'];

BROWSERS.forEach(browserName => {
  describe(`Product Details Page [${browserName}]`, function () {
    // Increase timeout for async operations
    this.timeout(60000);

    let browserContext;

    // Setup before each test - initialize browser and navigate to products page
    beforeEach(async function () {
      browserContext = await initializeBrowser(browserName);
      const { page } = browserContext;

      const productsPage = new ProductsPage(page);
      await productsPage.navigateToProductsPage();
      await productsPage.waitForInitialProductsLoad();

      // Verify products are available
      const productCount = await productsPage.getProductCount();
      console.log(productCount)
      assert.isAbove(productCount, 0);
    });

    // Cleanup after each test - close browser
    afterEach(async function () {
      await closeBrowser(browserContext);
    });

    /**
     * Test product details viewing for multiple products
     * Validates that product price and description are displayed
     * Note: Dynamic test creation with loop
     */
    for (const productName of searchProducts) {
      it(`View details of - ${productName}`, async function () {
        const { page } = browserContext;
        const detailPage = new ProductDetailPage(page);

        // Search and navigate to product detail page
        await searchAndSelectProduct(page, productName);

        // Verify product data is displayed
        await detailPage.waitForProductData();

        // Verify elements exist after visibility check
        await pwExpect(detailPage.productPrice).toBeVisible({ timeout: 10000 });
        await pwExpect(detailPage.productDescription).toBeVisible({ timeout: 10000 });
      });
    }
  });
});