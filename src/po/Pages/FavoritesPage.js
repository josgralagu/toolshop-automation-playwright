import { BasePage } from "./BasePage.js"

/**
 * Favorites Page Object
 */
export class FavoritesPage extends BasePage {
	constructor(page) {
		super(page)

		// getByTestId() requiere testIdAttribute: 'data-test' en playwright.config.js
		this.productName = page.getByTestId("product-name")
		this.deleteBtn = page.getByTestId("delete").first()
		this.emptyMsg = page.getByText("There are no favorites yet")
	}

	// ==================== WAIT METHODS ====================

	/**
	 * Wait for favorites list to load.
	 * Legítimo: no hay acción de Playwright posterior que dispare auto-wait.
	 */
	async waitForFavoritesLoad() {
		await this.productName.first().waitFor({ state: "visible", timeout: 15000 })
	}

	/**
	 * Get the current count of favorited products.
	 * count() has no auto-wait, so waitFor one element first.
	 * @returns {Promise<number>}
	 */
	async getFavoritesCount() {
		try {
			await this.productName.first().waitFor({ state: "visible", timeout: 10000 })
		} catch {
			return 0
		}
		return await this.productName.count()
	}

	// ==================== FAVORITE MANAGEMENT METHODS ====================

	/**
	 * Delete the first favorite product.
	 * deleteBtn.click() auto-waits for visibility.
	 * Assertions (toHaveCount) belong in the test, not here.
	 */
	async deleteFirstFavorite() {
		await this.deleteBtn.click()
	}

	// ==================== STATUS CHECK METHODS ====================

	/**
	 * Check if favorites list is empty.
	 * @returns {Promise<boolean>}
	 */
	async isEmpty() {
		return await this.emptyMsg.isVisible()
	}
}
