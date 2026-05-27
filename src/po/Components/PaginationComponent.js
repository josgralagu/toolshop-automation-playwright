// ====================================================================
// PAGINATION COMPONENT
// ====================================================================

export class PaginationComponent {
	constructor(page) {
		this.page = page

		// getByRole con name es preferido para links de navegación con aria-label
		this.paginationNextButton = page.getByRole("link", { name: "Next" })
		this.paginationPreviousButton = page.getByRole("link", { name: "Previous" })
		this.paginationContainer = page.locator(".pagination")
	}

	// ==================== NAVIGATION ====================

	/**
	 * Check if next page is available and enabled.
	 * @param {number} timeout
	 * @returns {Promise<boolean>}
	 */
	async hasNextPage(timeout = 10000) {
		if ((await this.paginationNextButton.count()) === 0) return false
		await this.paginationNextButton.waitFor({ state: "visible", timeout })
		const isDisabled = await this.paginationNextButton.evaluate((el) =>
			el.closest("li")?.classList.contains("disabled")
		)
		return !isDisabled
	}

	/**
	 * Navigate to next page.
	 * @param {number} timeout
	 * @throws {Error} if next page is disabled
	 */
	async clickNextPage(timeout = 10000) {
		if (!(await this.hasNextPage(timeout))) {
			throw new Error("Next page button is disabled - cannot navigate")
		}
		await this.paginationNextButton.click()
	}

	/**
	 * Get total number of page items (excluding Prev/Next buttons).
	 * @param {number} timeout
	 * @returns {Promise<number>}
	 */
	async getPageCount(timeout = 10000) {
		await this.paginationContainer.waitFor({ state: "visible", timeout })
		const total = await this.page.locator(".pagination .page-item").count()
		return total - 2
	}

	/**
	 * Get current active page number.
	 * @param {number} timeout
	 * @returns {Promise<number>}
	 */
	async getCurrentPageNumber(timeout = 10000) {
		await this.paginationContainer.waitFor({ state: "visible", timeout })
		const activePage = this.page.locator(".pagination .page-item.active .page-link")
		if ((await activePage.count()) === 0) return 1
		return parseInt(await activePage.textContent(), 10)
	}

	/**
	 * Check if pagination container is visible.
	 * @param {number} timeout
	 * @returns {Promise<boolean>}
	 */
	async isPaginationVisible(timeout = 3000) {
		try {
			await this.paginationContainer.waitFor({ state: "visible", timeout })
			return true
		} catch {
			return false
		}
	}

	// ==================== UTILITY ====================

	/**
	 * Navigate through all pages executing a callback on each.
	 * @param {Function} pageCallback - Receives current page number, returns data
	 * @param {number} maxPages - Safety limit to avoid infinite loops
	 * @returns {Promise<Array>}
	 */
	async navigateThroughAllPages(pageCallback, maxPages = 10) {
		const results = []
		let currentPage = 1

		while (currentPage <= maxPages) {
			results.push(await pageCallback(currentPage))

			const hasNext = await this.hasNextPage()
			if (!hasNext) break

			await this.clickNextPage()
			currentPage++
		}

		if (currentPage >= maxPages) {
			console.warn(`Reached maximum page limit (${maxPages}) — possible infinite loop`)
		}

		return results
	}
}
