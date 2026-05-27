// ====================================================================
// FILTER COMPONENT
// ====================================================================

export class FilterComponent {
	constructor(page) {
		this.page = page

		// getByTestId() requiere testIdAttribute: 'data-test' en playwright.config.js
		this.ecoFilter = page.getByTestId("eco-friendly-filter")

		// getByLabel asocia el checkbox con su label accesible,
		// reemplazando el selector CSS frágil original.
		this.brandCheckbox = (brandName) => page.getByLabel(brandName)

		// filter_started / filter_completed solo aparecen con filtros BRAND y SUBCATEGORÍA.
		// Eco-friendly y categoría (nav) usan waitForProductsApiResponse.
		this.filterCompleted = page.locator('[data-test="filter_completed"]')
		this.noResultsMessage = page.getByTestId("no-results")
	}

	// ==================== BRAND FILTER ====================

	/**
	 * Select brand filter.
	 * Brand filters emit filter_completed — waitForFilterCycle is used.
	 * check() auto-waits for visibility — no explicit waitFor needed.
	 * @param {string} brandName
	 */
	async selectBrandByName(brandName) {
		await this.brandCheckbox(brandName).check()
		await this.waitForFilterCycle()
	}

	/**
	 * Deselect brand filter.
	 * @param {string} brandName
	 */
	async deselectBrandByName(brandName) {
		await this.brandCheckbox(brandName).uncheck()
		await this.waitForFilterCycle()
	}

	/**
	 * Check if a brand filter checkbox is selected.
	 * isChecked() auto-waits for visibility.
	 * @param {string} brandName
	 * @returns {Promise<boolean>}
	 */
	async isBrandSelected(brandName) {
		return await this.brandCheckbox(brandName).isChecked()
	}

	// ==================== ECO FILTER ====================

	/**
	 * Activate eco-friendly filter.
	 * Eco filter does NOT emit filter_completed — API response is intercepted instead.
	 * check() auto-waits for visibility — no explicit waitFor needed.
	 * @param {number} timeout
	 */
	async clickEcoFriendlyFilter(timeout = 15000) {
		const responsePromise = this.waitForProductsApiResponse(timeout)
		await this.ecoFilter.check()
		await responsePromise
		await this.waitForFilterResults(timeout)
	}

	/**
	 * Deactivate eco-friendly filter.
	 * @param {number} timeout
	 */
	async unclickEcoFriendlyFilter(timeout = 15000) {
		const responsePromise = this.waitForProductsApiResponse(timeout)
		await this.ecoFilter.uncheck()
		await responsePromise
		await this.waitForFilterResults(timeout)
	}

	/**
	 * Check if eco filter is selected.
	 * isChecked() auto-waits for visibility.
	 * @returns {Promise<boolean>}
	 */
	async isEcoFilterSelected() {
		return await this.ecoFilter.isChecked()
	}

	// ==================== SUBCATEGORY FILTER ====================

	/**
	 * Select subcategory filter by exact label match.
	 * Subcategory filters emit filter_completed — waitForFilterCycle is used.
	 * click() auto-waits for visibility — no explicit waitFor needed.
	 * @param {string} subcategoryName
	 */
	async clickSubcategoryCheckbox(subcategoryName) {
		await this.page.getByLabel(subcategoryName, { exact: true }).click()
		await this.waitForFilterCycle()
	}

	// ==================== WAIT METHODS ====================

	/**
	 * Wait for filter cycle to complete via the filter_completed DOM signal.
	 * Used by BRAND and SUBCATEGORY filters.
	 * @param {number} timeout
	 */
	async waitForFilterCycle(timeout = 15000) {
		await this.filterCompleted.waitFor({ state: "attached", timeout })
	}

	/**
	 * Register a waitForResponse promise for the products API.
	 * Must be called BEFORE the action that triggers the request.
	 * Used by ECO and CATEGORY filters that don't emit filter_completed.
	 * @param {number} timeout
	 * @returns {Promise<import('@playwright/test').Response>}
	 */
	waitForProductsApiResponse(timeout = 15000) {
		return this.page.waitForResponse(
			(response) =>
				response.url().includes("/products") && response.status() === 200,
			{ timeout }
		)
	}

	/**
	 * Wait for filter results to appear in the DOM.
	 * Checks for at least one product-name OR a no-results message.
	 * @param {number} timeout
	 */
	async waitForFilterResults(timeout = 15000) {
		await this.page.waitForFunction(
			() => {
				const hasProducts = document.querySelector('[data-test="product-name"]') !== null
				const hasNoResults = document.querySelector('[data-test="no-results"]') !== null
				return hasProducts || hasNoResults
			},
			{ timeout }
		)
	}

	// ==================== STATUS ====================

	/**
	 * Check if no-results message is visible.
	 * @param {number} timeout
	 * @returns {Promise<boolean>}
	 */
	async hasNoResults(timeout = 5000) {
		try {
			await this.noResultsMessage.waitFor({ state: "visible", timeout })
			return true
		} catch {
			return false
		}
	}

	// ==================== CLEARING ====================

	/**
	 * Deselect all active brand filters.
	 * @param {string[]} brands
	 */
	async clearAllBrandFilters(brands) {
		for (const brand of brands) {
			if (await this.isBrandSelected(brand)) {
				await this.deselectBrandByName(brand)
			}
		}
	}

	/**
	 * Deactivate eco filter if currently active.
	 */
	async clearEcoFilter() {
		if (await this.isEcoFilterSelected()) {
			await this.unclickEcoFriendlyFilter()
		}
	}
}
