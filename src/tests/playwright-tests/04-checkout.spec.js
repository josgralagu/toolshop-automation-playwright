import { test, expect } from "@playwright/test"
import {
	addProductsAndCollectData,
	getCartData,
	calculateExpectedSubtotal,
	getProductNames,
	getProductQuantities,
	getProductPrices,
	calculateLineTotalsError
} from "../../configs/utils/commands"
import {
	cartConfigurations,
	searchProducts
} from "../../configs/utils/testData"

test.describe("Checkout – Subtotal Calculation", () => {
	/**
	 * Test subtotal calculation with various product configurations
	 * Validates cart calculations for different product quantities
	 */
	cartConfigurations.forEach(({ productCount, quantityPerProduct }) => {
		test(`${productCount} products × ${quantityPerProduct} units`, async ({
			page
		}) => {
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
			expect(cartData.names.sort()).toEqual(
				getProductNames(products).sort()
			)
			expect(cartData.quantities).toEqual(getProductQuantities(products))
			expect(cartData.prices).toEqual(getProductPrices(products))

			// Validate line totals calculation

			const totalLineError = calculateLineTotalsError(
				cartData.lineTotals,
				products
			)
			expect(totalLineError).toBeCloseTo(0, 2)

			// Validate total subtotal calculation
			expect(cartData.cartTotal).toBeCloseTo(expectedSubtotal, 2)
		})
	})
})
