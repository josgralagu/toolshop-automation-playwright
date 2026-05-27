/**
 * Cart Page Object
 * Handles interactions and data retrieval from the shopping cart page
 * Provides methods to access product information, quantities, prices, and totals
 */
export class CartPage {
	constructor(page) {
		this.page = page

		// ==================== PRODUCT INFORMATION ELEMENTS ====================
		// getByTestId() requiere testIdAttribute: 'data-test' en playwright.config.js
		//
		// Se eliminó cartItems (tr.ng-star-inserted) porque Angular renderiza la tabla
		// en dos fases: primero el <table>/<tbody> vacío, luego llena las filas con datos.
		// Esperar por tr.ng-star-inserted causa timeout porque el tbody ya existe en el DOM
		// pero sin filas durante el primer render. Se espera directamente por los elementos
		// de datos (product-title, cart-total) que solo aparecen cuando Angular terminó
		// de renderizar con los datos del servidor.
		this.productTitle = page.getByTestId("product-title")
		this.productQuantity = page.getByTestId("product-quantity")
		this.productPrice = page.getByTestId("product-price")
		this.linePrice = page.getByTestId("line-price")
		this.cartTotal = page.getByTestId("cart-total")
	}

	// ==================== WAIT METHODS ====================

	/**
	 * Wait for cart to load completely including Angular rendering.
	 *
	 * Corrección: se reemplazó la espera en tr.ng-star-inserted por product-title
	 * y cart-total, que son los elementos de datos reales. La tabla tiene dos fases
	 * de render en Angular: shell estructural (visible rápido) → datos (async).
	 * Esperar el shell (table.table-hover o tr.ng-star-inserted) no garantiza
	 * que los datos ya estén presentes.
	 */
	async waitForCartLoad() {
		// product-title garantiza que al menos una fila con datos está renderizada
		await this.productTitle.first().waitFor({ state: "visible", timeout: 20000 })
		// cart-total garantiza que el total fue calculado y renderizado
		await this.cartTotal.waitFor({ state: "visible", timeout: 20000 })
	}

	// ==================== DATA RETRIEVAL METHODS ====================

	/**
	 * Get names of all products in cart
	 * @returns {Promise<string[]>} Array of product names
	 */
	async getProductNames() {
		const rawTexts = await this.productTitle.allTextContents()
		return rawTexts.map((text) => text.trim())
	}

	/**
	 * Get quantities of all products in cart
	 * @returns {Promise<number[]>} Array of product quantities
	 */
	async getQuantities() {
		const inputs = await this.productQuantity.all()
		return await Promise.all(
			inputs.map(async (i) => parseInt(await i.inputValue(), 10))
		)
	}

	/**
	 * Get prices of all products in cart
	 * @returns {Promise<number[]>} Array of product prices
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
	 * @returns {Promise<number[]>} Array of line totals (price * quantity)
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
	 * @returns {Promise<number>} Cart total amount
	 */
	async getCartTotal() {
		const text = await this.cartTotal.textContent()
		return parseFloat(text.replace("$", ""))
	}
}
