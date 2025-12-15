// ====================================================================
// FILTER COMPONENT
// ====================================================================
// Reusable filter functionality component
// Implements DRY principle by centralizing filter-related logic
// ====================================================================

export class FilterComponent {
	constructor(page) {
		this.page = page

		// ==================== FILTER ELEMENTS ====================
		this.ecoFilter = page.locator('input[data-test="eco-friendly-filter"]')
		this.brandCheckbox = (brandName) =>
			page.locator(
				`.checkbox label:has-text("${brandName}") input[type="checkbox"]`
			)

		// ==================== FILTER STATUS ELEMENTS ====================
		this.filterStarted = page.locator('[data-test="filter_started"]')
		this.filterCompleted = page.locator('[data-test="filter_completed"]')
		this.noResultsMessage = page.locator('[data-test="no-results"]')
	}

	// ==================== BRAND FILTER METHODS ====================

	/**
	 * Select brand filter by name
	 * @param {string} brandName - Brand name to filter by
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async selectBrandByName(brandName, timeout = 10000) {
		await this.brandCheckbox(brandName).waitFor({
			state: "visible",
			timeout
		})
		await this.brandCheckbox(brandName).check()
		await this.waitForFilterCycle()
	}

	/**
	 * Deselect brand filter by name
	 * @param {string} brandName - Brand name to deselect
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async deselectBrandByName(brandName, timeout = 10000) {
		await this.brandCheckbox(brandName).waitFor({
			state: "visible",
			timeout
		})
		await this.brandCheckbox(brandName).uncheck()
		await this.waitForFilterCycle()
	}

	/**
	 * Check if brand filter is selected
	 * @param {string} brandName - Brand name to check
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 * @returns {boolean} True if brand filter is checked
	 */
	async isBrandSelected(brandName, timeout = 10000) {
		await this.brandCheckbox(brandName).waitFor({
			state: "visible",
			timeout
		})
		return await this.brandCheckbox(brandName).isChecked()
	}

	// ==================== ECO FILTER METHODS ====================

	/**
	 * Activate eco-friendly filter
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async clickEcoFriendlyFilter(timeout = 10000) {
		await this.ecoFilter.waitFor({ state: "visible", timeout })
		await this.ecoFilter.check()
		await this.waitForFilterCycle()
	}

	/**
	 * Deactivate eco-friendly filter
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async unclickEcoFriendlyFilter(timeout = 10000) {
		await this.ecoFilter.waitFor({ state: "visible", timeout })
		await this.ecoFilter.uncheck()
		await this.waitForFilterCycle()
	}

	/**
	 * Check if eco filter is selected
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 * @returns {boolean} True if eco filter is checked
	 */
	async isEcoFilterSelected(timeout = 10000) {
		await this.ecoFilter.waitFor({ state: "visible", timeout })
		return await this.ecoFilter.isChecked()
	}

	// ==================== SUBCATEGORY FILTER METHODS ====================

	/**
	 * Select subcategory filter by exact name match
	 * @param {string} subcategoryName - Subcategory name to filter by
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async clickSubcategoryCheckbox(subcategoryName, timeout = 10000) {
		const checkboxLabel = this.page.locator(
			`.checkbox label:text-is("${subcategoryName}")`
		)
		await checkboxLabel.waitFor({ state: "visible", timeout })
		await checkboxLabel.click()
	}

	/**
	 * Check if subcategory filter is selected
	 * @param {string} subcategoryName - Subcategory name to check
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 * @returns {boolean} True if subcategory filter is selected
	 */
	async isSubcategorySelected(subcategoryName, timeout = 10000) {
		const checkbox = this.page.locator(
			`.checkbox label:text-is("${subcategoryName}") input[type="checkbox"]`
		)
		await checkbox.waitFor({ state: "visible", timeout })
		return await checkbox.isChecked()
	}

	// ==================== FILTER WAIT METHODS ====================

	/**
	 * Wait for filter operation to complete
	 * @param {number} startedTimeout - Timeout for filter started (default: 5000)
	 * @param {number} completedTimeout - Timeout for filter completed (default: 15000)
	 */
	async waitForFilterCycle(startedTimeout = 5000, completedTimeout = 15000) {
		await this.filterStarted.waitFor({
			state: "attached",
			timeout: startedTimeout
		})
		await this.filterCompleted.waitFor({
			state: "attached",
			timeout: completedTimeout
		})
	}

	/**
	 * Wait for filter results to load
	 * @param {number} timeout - Timeout in milliseconds (default: 15000)
	 */
	async waitForFilterResults(timeout = 15000) {
		await this.page.waitForFunction(
			() => {
				const hasProducts =
					document.querySelector('h5[data-test="product-name"]') !==
					null
				const hasNoResults =
					document.querySelector('[data-test="no-results"]') !== null
				return hasProducts || hasNoResults
			},
			{ timeout }
		)
	}

	// ==================== FILTER STATUS METHODS ====================

	/**
	 * Check if no results message is displayed
	 * @param {number} timeout - Timeout in milliseconds (default: 5000)
	 * @returns {boolean} True if no results message is visible
	 */
	async hasNoResults(timeout = 5000) {
		try {
			await this.noResultsMessage.waitFor({ state: "visible", timeout })
			return true
		} catch {
			return false
		}
	}

	/**
	 * Check if filter is currently processing
	 * @param {number} timeout - Timeout in milliseconds (default: 1000)
	 * @returns {boolean} True if filter is processing
	 */
	async isFilterProcessing(timeout = 1000) {
		try {
			await this.filterStarted.waitFor({ state: "attached", timeout })
			return true
		} catch {
			return false
		}
	}

	// ==================== FILTER CLEARING METHODS ====================

	/**
	 * Clear all brand filters
	 * @param {string[]} brands - Array of brand names to clear
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async clearAllBrandFilters(brands, timeout = 10000) {
		for (const brand of brands) {
			if (await this.isBrandSelected(brand, timeout)) {
				await this.deselectBrandByName(brand, timeout)
			}
		}
	}

	/**
	 * Clear eco filter if active
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async clearEcoFilter(timeout = 10000) {
		if (await this.isEcoFilterSelected(timeout)) {
			await this.unclickEcoFriendlyFilter(timeout)
		}
	}
}
