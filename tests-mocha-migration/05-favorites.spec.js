import { createAndLoginUser } from '../utils/userHelpers.js';
import { goToProductDetail } from '../utils/commands.js';
import { MyAccountPage } from '../src/po/Pages/MyAccountPage.js';
import { FavoritesPage } from '../src/po/Pages/FavoritesPage.js';
import { ProductDetailPage } from '../src/po/Pages/ProductDetailPage.js';
import { searchProducts, generateValidUser } from '../utils/testData.js';
import { initializeBrowser, closeBrowser, pwExpect } from './setup.js';

// ====================================================================
// FAVORITE PRODUCTS TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for favorites management functionality
// Uses Mocha as test runner, Chai for assertions, Playwright for automation
// ====================================================================
const BROWSERS = [/*'chromium', 'firefox',*/ 'webkit'];

BROWSERS.forEach(browserName => {
  describe(`Favorite Products [${browserName}]`, function () {

    let browserContext;

    // Setup before each test - initialize browser
    beforeEach(async function () {
      browserContext = await initializeBrowser(browserName);
    });

    // Cleanup after each test - close browser
    afterEach(async function () {
      await closeBrowser(browserContext);
    });

    /**
     * Test removing a product from favorites list
     * Validates complete favorites management workflow
     */
    it('Remove a product from favorites', async function () {
      const { page } = browserContext;
      const user = generateValidUser();

      // Create user and login
      await createAndLoginUser(page, user);

      // Add product to favorites
      await goToProductDetail(page, searchProducts[0]);
      const detailPage = new ProductDetailPage(page);
      await detailPage.addProductToFavorites();

      // Navigate to favorites and remove product
      const myAccount = new MyAccountPage(page);
      const favPage = new FavoritesPage(page);
      await myAccount.openUserMenu();
      await myAccount.goToMyFavorites();
      await favPage.waitForFavoritesLoad();
      await favPage.deleteFirstFavorite();

      // Verify favorites list is empty
      const isEmpty = await favPage.isEmpty();
      assert.isTrue(isEmpty);
    });

    /**
     * Test adding to favorites without authentication
     * Validates authentication requirement for favorites functionality
     */
    it('Add to favorites without auth', async function () {
      const { page } = browserContext;

      // Attempt to add to favorites without login
      await goToProductDetail(page, searchProducts[0]);
      const detailPage = new ProductDetailPage(page);
      await detailPage.clickAddToFavorites();

      // Verify error message and page remains on product detail
      await pwExpect(detailPage.favErrorMessage).toBeVisible({ timeout: 10000 })
      const currentUrl = page.url();
      expect(currentUrl).to.include('/product/');
    });
  });
});