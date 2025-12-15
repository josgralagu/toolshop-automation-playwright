import {
	addProductsAndCollectData,
	getCartData,
	calculateExpectedSubtotal,
	getProductNames,
	getProductQuantities,
	getProductPrices,
	calculateLineTotalsError
} from "../../configs/utils/commands.js"
import {
	cartConfigurations,
	searchProducts
} from "../../configs/utils/testData.js"
import {
	initializeBrowser,
	closeBrowser
} from "../../configs/mochaConfigs/setup.js"

// ====================================================================
// CHECKOUT - SUBTOTAL CALCULATION TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for cart subtotal calculations with various configurations
// Uses Mocha as test runner, Chai for assertions, Playwright for assertions and automation
// ====================================================================
const BROWSERS = ["chromium", "firefox", "webkit"]

BROWSERS.forEach((browserName) => {
	describe(`Checkout – Subtotal Calculation [${browserName}]`, function () {
		let browserContext

		// Setup before each test - initialize browser
		beforeEach(async function () {
			browserContext = await initializeBrowser(browserName)
		})

		// Cleanup after each test - close browser
		afterEach(async function () {
			await closeBrowser(browserContext)
		})

		/**
		 * Test subtotal calculation with various product configurations
		 * Validates cart calculations for different product quantities
		 */
		cartConfigurations.forEach(({ productCount, quantityPerProduct }) => {
			it(`${productCount} products × ${quantityPerProduct} units`, async function () {
				const { page } = browserContext

				const productsToBuy = searchProducts.slice(0, productCount)
				const products = await addProductsAndCollectData(
					page,
					productsToBuy,
					quantityPerProduct
				)

				const cartData = await getCartData(page)

				// Calculate expected subtotal
				const expectedSubtotal = calculateExpectedSubtotal(products)

				// Validate cart data matches expected values
				expect(cartData.names.sort()).to.deep.equal(
					getProductNames(products).sort()
				)
				expect(cartData.quantities).to.deep.equal(
					getProductQuantities(products)
				)
				expect(cartData.prices).to.deep.equal(
					getProductPrices(products)
				)

				// Validate line totals calculation
				const totalLineError = calculateLineTotalsError(
					cartData.lineTotals,
					products
				)
				expect(totalLineError).to.be.closeTo(0, 0.01)

				// Validate total subtotal calculation
				expect(cartData.cartTotal).to.be.closeTo(expectedSubtotal, 0.01)
			})
		})
	})
})
