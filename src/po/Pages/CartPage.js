/**
 * Cart Page Object
 * Handles interactions and data retrieval from the shopping cart page
 * Provides methods to access product information, quantities, prices, and totals
 */
export class CartPage {
	constructor(page) {
		this.page = page

		// ==================== CART TABLE ELEMENTS ====================
		this.cartItems = page.locator(
			"table.table-hover tbody tr.ng-star-inserted"
		)

		// ==================== PRODUCT INFORMATION ELEMENTS ====================
		this.productTitle = page.locator('[data-test="product-title"]')
		this.productQuantity = page.locator('[data-test="product-quantity"]')
		this.productPrice = page.locator('[data-test="product-price"]')
		this.linePrice = page.locator('[data-test="line-price"]')
		this.cartTotal = page.locator('[data-test="cart-total"]')
	}

	// ==================== WAIT METHODS ====================

	/**
	 * Wait for cart to load completely including Angular rendering
	 */
	async waitForCartLoad() {
		// Wait for table container to be visible
		const tableLocator = this.page.locator("table.table-hover")
		await tableLocator.waitFor({ state: "visible", timeout: 15000 })

		// Wait for first cart item row to be visible
		await this.cartItems
			.first()
			.waitFor({ state: "visible", timeout: 15000 })

		// Wait for cart total to be calculated and visible
		await this.cartTotal.waitFor({ state: "visible", timeout: 15000 })
	}

	// ==================== DATA RETRIEVAL METHODS ====================

	/**
	 * Get names of all products in cart
	 * @returns {string[]} Array of product names
	 */
	async getProductNames() {
		const rawTexts = await this.productTitle.allTextContents()
		return rawTexts.map((text) => text.trim())
	}

	/**
	 * Get quantities of all products in cart
	 * @returns {number[]} Array of product quantities
	 */
	async getQuantities() {
		const inputs = await this.productQuantity.all()
		return await Promise.all(
			inputs.map(async (i) => parseInt(await i.inputValue(), 10))
		)
	}

	/**
	 * Get prices of all products in cart
	 * @returns {number[]} Array of product prices
	 */
	async getPrices() {
		const cells = await this.productPrice.all()
		return await Promise.all(
			cells.map(async (c) =>
				parseFloat((await c.textContent()).replace("$", ""))
			)
		)
	}

	/**
	 * Get line totals for all products in cart
	 * @returns {number[]} Array of line totals (price * quantity)
	 */
	async getLineTotals() {
		const linePriceCells = await this.linePrice.all()
		return Promise.all(
			linePriceCells.map(async (cell) => {
				const text = await cell.textContent()
				return parseFloat(text.replace(/[^0-9.]/g, ""))
			})
		)
	}

	/**
	 * Get total cart amount
	 * @returns {number} Cart total amount
	 */
	async getCartTotal() {
		const text = await this.cartTotal.textContent()
		return parseFloat(text.replace("$", ""))
	}
}
