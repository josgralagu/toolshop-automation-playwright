import { pages } from '../../po/index.js';
import { addProductToCart } from '../../configs/utils/commands.js';
import { cartConfigurations, searchProducts } from '../../configs/utils/testData.js';
import { initializeBrowser, closeBrowser } from '../../configs/mochaConfigs/setup.js';

// ====================================================================
// CHECKOUT - SUBTOTAL CALCULATION TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for cart subtotal calculations with various configurations
// Uses Mocha as test runner, Chai for assertions, Playwright for assertions and automation
// ====================================================================
const BROWSERS = ['chromium', 'firefox', 'webkit'];

BROWSERS.forEach(browserName => {
  describe(`Checkout – Subtotal Calculation [${browserName}]`, function () {

    let browserContext;
    let detailPage, cartPage;

    // Setup before each test - initialize browser and setup product pages
    beforeEach(async function () {
      browserContext = await initializeBrowser(browserName);
      const { page } = browserContext;
      detailPage = pages('productdetail', page);
      cartPage = pages('cart', page);
    });

    // Cleanup after each test - close browser
    afterEach(async function () {
      await closeBrowser(browserContext);
    });

    /**
     * Test subtotal calculation with various product configurations
     * Validates cart calculations for different product quantities
     */
    cartConfigurations.forEach(({ productCount, quantityPerProduct }) => {
      it(`${productCount} products × ${quantityPerProduct} units`, async function () {
        const { page } = browserContext;
        const products = [];

        // Add products to cart and collect product data
        for (let i = 0; i < productCount; i++) {
          const name = searchProducts[i % searchProducts.length];
          await addProductToCart(page, name, quantityPerProduct);
          const price = await detailPage.getProductPrice();
          products.push({ name, qty: quantityPerProduct, price });
        }

        // Navigate to cart and wait for load
        await detailPage.goToCartViaHeaderLink();
        await cartPage.waitForCartLoad();

        // Retrieve cart data
        const names = await cartPage.getProductNames();
        const quantities = await cartPage.getQuantities();
        const prices = await cartPage.getPrices();
        const lineTotals = await cartPage.getLineTotals();
        const subtotal = await cartPage.getCartTotal();

        // Calculate expected subtotal
        const expectedSubtotal = products.reduce((sum, p) => sum + p.price * p.qty, 0);

        // Validate cart data matches expected values
        expect(names.sort()).to.deep.equal(products.map(p => p.name).sort());
        expect(quantities).to.deep.equal(products.map(p => p.qty));
        expect(prices).to.deep.equal(products.map(p => p.price));

        // Validate line totals calculation
        lineTotals.forEach((line, i) => {
          assert.closeTo(line, products[i].price * products[i].qty, 0.01);
        });

        // Validate total subtotal calculation
        subtotal.should.be.closeTo(expectedSubtotal, 0.01);
      });
    });
  });
});