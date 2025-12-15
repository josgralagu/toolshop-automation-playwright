import { test, expect } from "@playwright/test"
import {
	navigateToProductsPage,
	filterByBrand,
	validateBrandProducts,
	deselectBrand
} from "../../configs/utils/commands"
import { brands } from "../../configs/utils/testData"

test.describe("Area: Filter - Filter products by brand showing only items in stock", () => {
	/**
	 * Setup before each test - navigate to products page
	 */
	test.beforeEach(async ({ page }) => {
		await navigateToProductsPage(page)
	})

	/**
	 * Test brand filtering functionality with stock validation
	 * Validates that brand filters show only in-stock products
	 */
	brands.forEach((brandName) => {
		test(`Filter by brand "${brandName}" showing only items in stock`, async ({
			page
		}) => {
			await filterByBrand(page, brandName)

			// Validate filtered results contain only in-stock products
			const errors = await validateBrandProducts(page, brandName)
			expect(errors).toEqual([])

			// Cleanup - deselect brand filter
			await deselectBrand(page, brandName)
		})
	})
})
