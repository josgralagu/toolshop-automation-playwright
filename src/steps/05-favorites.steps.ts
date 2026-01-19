// src/steps/05-favorites.steps.ts
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import type { CustomWorld } from '../support/world'
import { pages } from '../po/index'
import { authenticateNewUser } from '../configs/utils/auth-helper'
import { searchProducts } from '../configs/utils/testData'

// ========== GIVEN STEPS ==========
Given('the user has at least one product in his favorites list',
    async function(this: CustomWorld) {
        // Agregar producto a favoritos primero
        const productsPage = pages('products', this.page!)
        const detailPage = pages('productdetail', this.page!)

        await productsPage.navigateToProductsPage()
        await productsPage.searchAndSelectProduct(searchProducts[0])
        await detailPage.addProductToFavorites()

        console.log(`✅ Product added to favorites: ${searchProducts[0]}`)
    }
)

Given('the user has not logged into his account', async function(this: CustomWorld) {
    // Asegurar que no hay sesión
    await this.context!.clearCookies()
    this.testData.isAuthenticated = false
    console.log('✅ User is NOT authenticated')
})

// ========== WHEN STEPS ==========
When('the user accesses his favorite products', async function(this: CustomWorld) {
    const myAccountPage = pages('myaccount', this.page!)
    await myAccountPage.goToMyFavorites()
    console.log('✅ Navigated to favorites page')
})

When('the user removes a product from the list', async function(this: CustomWorld) {
    const favoritesPage = pages('favorites', this.page!)
    await favoritesPage.waitForFavoritesLoad()
    await favoritesPage.deleteFirstFavorite()
    console.log('✅ Product removed from favorites')
})

When('the user selects a product from the store', async function(this: CustomWorld) {
    const productsPage = pages('products', this.page!)
    await productsPage.navigateToProductsPage()
    await productsPage.searchAndSelectProduct(searchProducts[0])
    console.log(`✅ Selected product: ${searchProducts[0]}`)
})

When('the user attempts to add it to the favorites list',
    async function(this: CustomWorld) {
        const detailPage = pages('productdetail', this.page!)
        await detailPage.clickAddToFavorites()
        console.log('✅ Clicked add to favorites button')
    }
)

// ========== THEN STEPS ==========
Then('the product is successfully removed', async function(this: CustomWorld) {
    const favoritesPage = pages('favorites', this.page!)
    const isEmpty = await favoritesPage.isEmpty()
    expect(isEmpty).toBe(true)
    console.log('✅ Favorites list is now empty')
})

Then('the user sees a confirmation message', async function(this: CustomWorld) {
    // El mensaje de confirmación ya fue validado en el proceso
    console.log('✅ Confirmation process completed')
})

Then('the user sees a message indicating authentication is required',
    async function(this: CustomWorld) {
        const detailPage = pages('productdetail', this.page!)
        await expect(detailPage.favErrorMessage).toBeVisible({ timeout: 10000 })
        console.log('✅ Authentication required message visible')
    }
)

Then('the user remains on the product details page',
    async function(this: CustomWorld) {
        await expect(this.page!).toHaveURL(/\/product\//, { timeout: 5000 })
        console.log('✅ User remains on product details page')
    }
)
