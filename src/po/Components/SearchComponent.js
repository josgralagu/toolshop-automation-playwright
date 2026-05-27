// ====================================================================
// SEARCH COMPONENT
// ====================================================================
import { waitForProductsVisible } from "../../configs/utils/helpers.js"

export class SearchComponent {
	constructor(page) {
		this.page = page

		// getByTestId() requiere testIdAttribute: 'data-test' en playwright.config.js
		this.searchField = page.getByTestId("search-query")
		// getByRole es preferido para botones con texto accesible visible
		this.searchButton = page.getByRole("button", { name: "Search" })
		this.searchResultsContainer = page.locator(
			'div.container[data-test="search_completed"]'
		)
	}

	/**
	 * Fill search field and submit.
	 * fill() y click() auto-wait — no explicit waitFor needed.
	 * @param {string} product
	 */
	async searchProduct(product) {
		await this.searchField.fill(product)
		await this.searchButton.click()
	}

	/**
	 * Wait for search results to become visible.
	 * Legítimo: no hay acción de Playwright que dispare auto-wait aquí.
	 * @param {number} timeout
	 */
	async waitForSearchResults(timeout = 15000) {
		await waitForProductsVisible(
			this.page,
			this.searchResultsContainer.getByTestId("product-name"),
			this.searchResultsContainer,
			timeout
		)
	}

	/**
	 * Get the first product name from search results.
	 * @param {number} timeout
	 * @returns {Promise<string>}
	 */
	async getFirstProductName(timeout = 10000) {
		await this.waitForSearchResults(timeout)
		return await this.searchResultsContainer
			.locator("a.card")
			.first()
			.getByTestId("product-name")
			.textContent()
	}
}
