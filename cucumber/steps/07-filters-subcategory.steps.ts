// src/steps/07-filters-subcategory.steps.ts
import { When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import type { CustomWorld } from '../support/world'
import {
	filterBySubcategory,
	validateSubcategoryResults
} from '../../src/configs/utils/commands'
import { subcategoryKeywords } from '../../src/configs/utils/testData'

// Note: 'Given the user is on the products page' step is defined in 06-filters.steps.ts

// ========== WHEN STEPS ==========
When('the user selects the {string} subcategory filter',
	async function(this: CustomWorld, subcategory: string) {
		await filterBySubcategory(this.page!, subcategory)
		this.testData.selectedSubcategory = subcategory
		console.log(`✅ Selected subcategory: ${subcategory}`)
	}
)

// ========== THEN STEPS ==========
Then('the user sees only products from the {string} subcategory',
	async function(this: CustomWorld, subcategory: string) {
		const keywords = subcategoryKeywords[subcategory]
		const errors = await validateSubcategoryResults(
			this.page!,
			subcategory,
			keywords
		)

		expect(errors).toEqual([])
		console.log(`✅ All products match ${subcategory} subcategory`)
	}
)
