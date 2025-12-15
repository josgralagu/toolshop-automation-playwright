import { test, expect } from "@playwright/test"
import {
	navigateToProductsPage,
	filterBySubcategory,
	validateSubcategoryResults
} from "../../configs/utils/commands"
import {
	subcategories,
	subcategoryKeywords
} from "../../configs/utils/testData"

test.describe("Filter Products by Subcategory", () => {
	/**
	 * Setup before each test - navigate to products page
	 */
	test.beforeEach(async ({ page }) => {
		await navigateToProductsPage(page)
	})

	/**
	 * Test subcategory filtering functionality
	 * Validates that each subcategory filter shows appropriate products
	 */
	subcategories.forEach((subcategory) => {
		test(`Filter by subcategory: ${subcategory}`, async ({ page }) => {
			// Apply subcategory filter
			await filterBySubcategory(page, subcategory)

			// Validate filtered results
			const keywords = subcategoryKeywords[subcategory]
			const errors = await validateSubcategoryResults(
				page,
				subcategory,
				keywords
			)

			// Verify no validation errors
			expect(errors).toEqual([])
		})
	})
})
