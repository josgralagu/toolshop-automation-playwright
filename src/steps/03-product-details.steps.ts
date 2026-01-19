// src/steps/03-product-details.steps.ts
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import type { CustomWorld } from '../support/world'
import { pages } from '../po/index'

// ========== GIVEN STEPS ==========
Given('there are products available in the store', async function(this: CustomWorld) {
    const productsPage = pages('products', this.page!)
    await productsPage.navigateToProductsPage()

    const productCount = await productsPage.getProductCount()
    expect(productCount).toBeGreaterThan(0)

    console.log(`✅ Products available: ${productCount}`)
})

// ========== WHEN STEPS ==========
When('the user searches for a product named {string}',
    async function(this: CustomWorld, productName: string) {
        const productsPage = pages('products', this.page!)
        await productsPage.searchProduct(productName)
        this.testData.searchedProduct = productName
        console.log(`✅ Searched for: ${productName}`)
    }
)

When('the user selects the product from the results',
    async function(this: CustomWorld) {
        const productsPage = pages('products', this.page!)
        await productsPage.waitForVisibleResult()

        // Click en el primer producto de los resultados
        await this.page!.locator('a.card').first().click()
        await this.page!.waitForURL(/\/product\//, { timeout: 15000 })

        console.log('✅ Product selected from results')
    }
)

// ========== THEN STEPS ==========
Then('the user can see the product price', async function(this: CustomWorld) {
    const detailPage = pages('productdetail', this.page!)
    await detailPage.waitForProductData()
    await expect(detailPage.productPrice).toBeVisible()

    const price = await detailPage.getProductPrice()
    console.log(`✅ Product price visible: $${price}`)
})

Then('the user can see the description and features of the product',
    async function(this: CustomWorld) {
        const detailPage = pages('productdetail', this.page!)
        await expect(detailPage.productDescription).toBeVisible()
        console.log('✅ Product description visible')
    }
)
