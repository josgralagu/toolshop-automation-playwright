import { test, expect } from "@playwright/test"
import {
	navigateToProductsPage,
	filterByCategory,
	validateCategoryKeywords
} from "../../configs/utils/commands"
import { categoryKeywords } from "../../configs/utils/testData"

test.describe("Filter products by category", () => {
	const categories = [
		{ name: "Hand Tools", keywords: categoryKeywords.handTools },
		{ name: "Power Tools", keywords: categoryKeywords.powerTools },
		{ name: "Other", keywords: categoryKeywords.other }
	]

	/**
	 * Test category filtering functionality
	 * Validates that each category filter shows appropriate products
	 */
	categories.forEach(({ name, keywords }) => {
		test(`Filter by ${name}`, async ({ page }) => {
			// Navigate to products page
			await navigateToProductsPage(page)

			// Apply category filter
			await filterByCategory(page, name)

			// Validate filtered results contain expected keywords
			const errors = await validateCategoryKeywords(page, keywords)
			expect(errors).toEqual([])
		})
	})
})
