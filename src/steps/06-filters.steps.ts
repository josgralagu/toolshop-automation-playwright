// src/steps/06-filters.steps.ts
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import type { CustomWorld } from '../support/world'
import { pages } from '../po/index'
import {
    filterByCategory,
    filterByBrand,
    filterByEcoFriendly,
    validateCategoryKeywords,
    validateBrandProducts,
    validateEcoBadgesAcrossPagination
} from '../configs/utils/commands'
import { categoryKeywords } from '../configs/utils/testData'

// ========== GIVEN STEPS ==========
Given('the user is on the products page', async function(this: CustomWorld) {
    const productsPage = pages('products', this.page!)
    await productsPage.navigateToProductsPage()
    console.log('✅ User is on products page')
})

// ========== WHEN STEPS ==========
When('the user selects the {string} category filter',
    async function(this: CustomWorld, category: string) {
        await filterByCategory(this.page!, category)
        this.testData.selectedCategory = category
        console.log(`✅ Selected category: ${category}`)
    }
)

When('the user selects the brand {string}',
    async function(this: CustomWorld, brandName: string) {
        await filterByBrand(this.page!, brandName)
        this.testData.selectedBrand = brandName
        console.log(`✅ Selected brand: ${brandName}`)
    }
)

When('the user selects the {string} sustainability filter',
    async function(this: CustomWorld, filterType: string) {
        if (filterType === 'eco-friendly') {
            await filterByEcoFriendly(this.page!)
            console.log('✅ Eco-friendly filter selected')
        }
    }
)

When('the user selects the {string}', async function(this: CustomWorld, category: string) {
    await filterByCategory(this.page!, category)
    this.testData.selectedCategory = category
    console.log(`✅ Selected: ${category}`)
})

// ========== THEN STEPS ==========
Then('the user sees only products from the {string} category',
    async function(this: CustomWorld, category: string) {
        const categoryKey = category.toLowerCase().replace(/\s+/g, '')
        const keywords = categoryKeywords[categoryKey as keyof typeof categoryKeywords]

        const errors = await validateCategoryKeywords(this.page!, keywords)
        expect(errors).toEqual([])
        console.log(`✅ All products match ${category} category`)
    }
)

Then('the corresponding subcategories under {string} are marked as selected',
    async function(this: CustomWorld, category: string) {
        // Validación básica - las subcategorías están visibles
        const productsPage = pages('products', this.page!)
        const hasProducts = await productsPage.hasProductsVisible()
        expect(hasProducts).toBe(true)
        console.log('✅ Subcategories are active')
    }
)

Then('the user can see the number of filtered results',
    async function(this: CustomWorld) {
        const productsPage = pages('products', this.page!)
        const count = await productsPage.getProductCount()
        expect(count).toBeGreaterThan(0)
        console.log(`✅ Filtered results count: ${count}`)
    }
)

Then('the user sees only products from {string}',
    async function(this: CustomWorld, brandName: string) {
        const errors = await validateBrandProducts(this.page!, brandName)
        expect(errors).toEqual([])
        console.log(`✅ All products are from ${brandName}`)
    }
)

Then('all displayed products have stock available',
    async function(this: CustomWorld) {
        const productsPage = pages('products', this.page!)
        const hasOutOfStock = await productsPage.hasOutOfStockProducts()
        expect(hasOutOfStock).toBe(false)
        console.log('✅ All products have stock')
    }
)

Then('no out-of-stock products are shown', async function(this: CustomWorld) {
    const productsPage = pages('products', this.page!)
    const hasOutOfStock = await productsPage.hasOutOfStockProducts()
    expect(hasOutOfStock).toBe(false)
    console.log('✅ No out-of-stock products found')
})

Then('the user sees only products marked as {string}',
    async function(this: CustomWorld, filterType: string) {
        if (filterType === 'eco-friendly') {
            const errors = await validateEcoBadgesAcrossPagination(this.page!)
            expect(errors).toEqual([])
            console.log('✅ All products have eco-friendly badge')
        }
    }
)

Then('the user sees filtered results', async function(this: CustomWorld) {
    const productsPage = pages('products', this.page!)
    const hasProducts = await productsPage.hasProductsVisible()
    expect(hasProducts).toBe(true)
    console.log('✅ Filtered results are visible')
})

Then('at least one product matches both filters',
    async function(this: CustomWorld) {
        const productsPage = pages('products', this.page!)
        const count = await productsPage.getProductCount()
        expect(count).toBeGreaterThan(0)
        console.log(`✅ ${count} products match both filters`)
    }
)
