// ====================================================================
// SEARCH COMPONENT
// ====================================================================
// Reusable search functionality component
// Implements DRY principle by centralizing search-related logic
// ====================================================================
import { waitForProductsVisible } from "../../configs/utils/helpers.js"

export class SearchComponent {
	constructor(page) {
		this.page = page

		// ==================== SEARCH ELEMENTS ====================
		this.searchField = page.locator('[data-test="search-query"]')
		this.searchButton = page.getByRole("button", { name: "Search" })
		this.searchResultsContainer = page.locator(
			'div.container[data-test="search_completed"]'
		)
	}

	// ==================== SEARCH METHODS ====================

	/**
	 * Fill search field with product name
	 * @param {string} product - Product name to search for
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async fillSearch(product, timeout = 10000) {
		await this.searchField.waitFor({ state: "visible", timeout })
		await this.searchField.fill(product)
	}

	/**
	 * Complete search operation for a product
	 * @param {string} product - Product name to search for
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async searchProduct(product, timeout = 10000) {
		await this.fillSearch(product, timeout)
		await this.searchButton.click()
	}

	/**
	 * Wait for search results to become visible
	 * @param {number} timeout - Timeout in milliseconds (default: 15000)
	 */
	async waitForSearchResults(timeout = 15000) {
		await waitForProductsVisible(
			this.page,
			this.searchResultsContainer.locator('h5[data-test="product-name"]'),
			this.searchResultsContainer,
			timeout
		)
	}

	/**
	 * Get first product name from search results
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 * @returns {string} First product name
	 */
	async getFirstProductName(timeout = 10000) {
		await this.waitForSearchResults(timeout)
		const firstProduct = this.searchResultsContainer
			.locator("a.card")
			.first()
		return await firstProduct
			.locator('h5[data-test="product-name"]')
			.textContent()
	}

	/**
	 * Check if search results are visible
	 * @param {number} timeout - Timeout in milliseconds (default: 3000)
	 * @returns {boolean} True if search results are visible
	 */
	async hasSearchResults(timeout = 3000) {
		try {
			await this.searchResultsContainer.waitFor({
				state: "visible",
				timeout
			})
			return true
		} catch {
			return false
		}
	}

	/**
	 * Clear search field
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async clearSearch(timeout = 10000) {
		await this.searchField.waitFor({ state: "visible", timeout })
		await this.searchField.clear()
	}

	/**
	 * Get search field value
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 * @returns {string} Current search value
	 */
	async getSearchValue(timeout = 10000) {
		await this.searchField.waitFor({ state: "visible", timeout })
		return await this.searchField.inputValue()
	}
}
