import { expect } from "@playwright/test"

/**
 * Favorites Page Object
 */
export class FavoritesPage {
	constructor(page) {
		this.page = page

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
	 * Wait until all favorites are removed.
	 * Uses toHaveCount(0) to avoid the bug where .first() detaches
	 * but remaining items are still in the DOM.
	 */
	async waitUntilNoFavorites() {
		await expect(this.productName).toHaveCount(0, { timeout: 10000 })
	}

	// ==================== FAVORITE MANAGEMENT METHODS ====================

	/**
	 * Delete the first favorite product.
	 * deleteBtn.click() auto-waits for visibility — waitFor removed.
	 */
	async deleteFirstFavorite() {
		await this.deleteBtn.click()
		await this.waitUntilNoFavorites()
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
