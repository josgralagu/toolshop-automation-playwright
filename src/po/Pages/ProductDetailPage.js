/**
 * Product Detail Page Object
 * Handles interactions and data retrieval from the product detail page
 */
export class ProductDetailPage {
	constructor(page) {
		this.page = page

		// ==================== PRODUCT INFORMATION ELEMENTS ====================
		// getByTestId() requiere testIdAttribute: 'data-test' en playwright.config.js
		this.productPrice = page.getByTestId("unit-price")
		this.productDescription = page.getByTestId("product-description")

		// ==================== QUANTITY MANAGEMENT ELEMENTS ====================
		this.quantityInput = page.getByTestId("quantity")
		this.increaseButton = page.getByTestId("increase-quantity")

		// ==================== ACTION BUTTONS ====================
		this.addToCartButton = page.getByTestId("add-to-cart")
		this.addToFavoritesButton = page.getByTestId("add-to-favorites")
		this.cartLink = page.getByTestId("nav-cart")

		// ==================== MESSAGE ELEMENTS ====================
		// waitFor en mensajes es legítimo: no hay acción de Playwright
		// posterior que dispare auto-wait en estos casos.
		this.successMsg = page.locator("div.toast-success")
		this.favSuccessMessage = page.getByRole("alert", {
			name: "Product added to your favorites list."
		})
		this.favErrorMessage = page
			.getByRole("alert")
			.filter({ hasText: "Unauthorized" })
	}

	// ==================== WAIT METHODS ====================

	/**
	 * Wait for product data to load completely.
	 * Legítimo: no hay acción posterior inmediata que dispare auto-wait.
	 * Confirma que Angular terminó de cargar los datos del producto.
	 */
	async waitForProductData() {
		await this.productPrice.waitFor({ state: "visible", timeout: 10000 })
		await this.productDescription.waitFor({ state: "visible", timeout: 10000 })
	}

	/**
	 * Wait for add-to-cart success toast to appear and disappear.
	 */
	async waitForSuccessMessage() {
		await this.successMsg.waitFor({ state: "visible", timeout: 15000 })
		await this.successMsg.waitFor({ state: "detached", timeout: 15000 })
	}

	/**
	 * Wait for add-to-favorites success alert to appear and disappear.
	 */
	async waitForFavSuccessMsg() {
		await this.favSuccessMessage.waitFor({ state: "visible", timeout: 10000 })
		await this.favSuccessMessage.waitFor({ state: "detached", timeout: 10000 })
	}

	// ==================== QUANTITY METHODS ====================

	/**
	 * Increase product quantity.
	 * increaseButton.click() auto-waits for visibility.
	 * @param {number} times
	 */
	async increaseQuantity(times = 1) {
		for (let i = 0; i < times; i++) await this.increaseButton.click()
	}

	/**
	 * Get current quantity value from input.
	 * inputValue() does not auto-wait for visibility, so waitFor is needed.
	 * @returns {Promise<number>}
	 */
	async getCurrentQuantity() {
		await this.quantityInput.waitFor({ state: "visible", timeout: 10000 })
		return parseInt(await this.quantityInput.inputValue(), 10)
	}

	// ==================== CART METHODS ====================

	/**
	 * Complete add to cart flow with quantity adjustment.
	 * @param {number} clicks - Extra clicks on increase button (total qty = clicks + 1)
	 */
	async addToCartByPlusClicks(clicks = 1) {
		await this.increaseQuantity(clicks)
		await this.addToCartButton.click()
		await this.waitForSuccessMessage()
	}

	/**
	 * Get product price as numeric value.
	 * @returns {Promise<number>}
	 */
	async getProductPrice() {
		const text = await this.productPrice.textContent()
		return parseFloat(text)
	}

	// ==================== FAVORITES METHODS ====================

	/**
	 * Click add to favorites button.
	 * addToFavoritesButton puede tardar en aparecer en la página de detalle
	 * (Angular lazy loading), por eso se mantiene el timeout más alto.
	 */
	async clickAddToFavorites() {
		await this.addToFavoritesButton.click()
	}

	/**
	 * Complete add to favorites flow.
	 */
	async addProductToFavorites() {
		await this.clickAddToFavorites()
		await this.waitForFavSuccessMsg()
	}

	// ==================== BRAND METHODS ====================

	/**
	 * Get brand badge text content.
	 * @returns {Promise<string>}
	 */
	async getBrandBadgeText() {
		const brandLocator = this.page.locator('[aria-label="brand"]')
		await brandLocator.waitFor({ state: "visible", timeout: 10000 })
		return await brandLocator.textContent()
	}
}
