import { test, expect } from "@playwright/test";
import { setupProductPages } from "../../../utils/testSetup";
import { addProductToCart } from "../../../utils/commands";
import { cartConfigurations, searchProducts } from "../../../utils/testData";

test.describe("Checkout – Subtotal Calculation", () => {
  let detailPage, cartPage;

  /**
   * Setup product pages before each test
   */
  test.beforeEach(async ({ page }) => {
    ({ detailPage, cartPage } = setupProductPages(page));
  });

  /**
   * Test subtotal calculation with various product configurations
   * Validates cart calculations for different product quantities
   */
  cartConfigurations.forEach(({ productCount, quantityPerProduct }) => {
    test(`${productCount} products × ${quantityPerProduct} units`, async ({ page }) => {
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
      expect(names.sort()).toEqual(products.map(p => p.name).sort());
      expect(quantities).toEqual(products.map(p => p.qty));
      expect(prices).toEqual(products.map(p => p.price));

      // Validate line totals calculation
      lineTotals.forEach((line, i) => {
        expect(line).toBeCloseTo(products[i].price * products[i].qty, 2);
      });

      // Validate total subtotal calculation
      expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
    });
  });
});