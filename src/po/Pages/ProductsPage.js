// ====================================================================
// PRODUCTS PAGE
// ====================================================================
import { BasePage } from "./BasePage.js"
import {
	SearchComponent,
	FilterComponent,
	PaginationComponent
} from "../Components/index.js"
import { URLS } from "../../configs/utils/constants.js"
import { waitForProductsVisible } from "../../configs/utils/helpers.js"

export class ProductsPage extends BasePage {
	constructor(page) {
		super(page)

		this.searchComponent = new SearchComponent(page)
		this.filterComponent = new FilterComponent(page)
		this.paginationComponent = new PaginationComponent(page)

		// getByTestId() requiere testIdAttribute: 'data-test' en playwright.config.js
		this.productCards = page.locator("a.card")
		this.productName = page.getByTestId("product-name")
		this.outOfStockLabels = page.getByTestId("out-of-stock")
		this.ecoBadges = page.getByTestId("eco-badge")
	}

	// ==================== NAVIGATION ====================

	async navigateToProductsPage() {
		await this.goto(URLS.BASE)
		await this.waitForInitialProductsLoad()
	}

	// ==================== SEARCH ====================
	// Métodos de búsqueda delegados a SearchComponent.
	// Se mantienen como fachada para que commands.js no necesite
	// conocer la estructura interna de componentes.

	/** @param {string} product */
	async searchProduct(product) {
		await this.searchComponent.searchProduct(product)
	}

	async waitForSearchResults() {
		await this.searchComponent.waitForSearchResults()
	}

	// ==================== FILTERS ====================

	/** @param {string} subcategoryName */
	async clickSubcategoryCheckbox(subcategoryName) {
		await this.filterComponent.clickSubcategoryCheckbox(subcategoryName)
	}

	/** @param {string} brandName */
	async selectBrandByName(brandName) {
		await this.filterComponent.selectBrandByName(brandName)
	}

	/** @param {string} brandName */
	async deselectBrandByName(brandName) {
		await this.filterComponent.deselectBrandByName(brandName)
	}

	async clickEcoFriendlyFilter() {
		await this.filterComponent.clickEcoFriendlyFilter()
	}

	// waitForFilterCycle y waitForFilterResults se usan desde commands.js
	async waitForFilterCycle() {
		await this.filterComponent.waitForFilterCycle()
	}

	async waitForFilterResults() {
		await this.filterComponent.waitForFilterResults()
	}

	// ==================== PAGINATION ====================

	/** @returns {Promise<boolean>} */
	async hasNextPage() {
		return await this.paginationComponent.hasNextPage()
	}

	async clickNextPage() {
		await this.paginationComponent.clickNextPage()
	}

	// ==================== PRODUCT INTERACTION ====================

	/**
	 * Navigate to product detail page by name.
	 * @param {string} productName
	 */
	async accessToProductDetail(productName) {
		await this.waitForSearchResults()
		await this.clickOnProduct(productName)
		await this.waitForUrl(/\/product\//)
	}

	/**
	 * Get locator for a product card filtered by name.
	 * Uses chained filter — recommended Playwright pattern.
	 * @param {string} productName
	 * @returns {import('@playwright/test').Locator}
	 */
	getProductTitleLocator(productName) {
		return this.productCards.filter({
			has: this.page.getByTestId("product-name").filter({ hasText: productName })
		})
	}

	/**
	 * Click on a product card by name.
	 * click() auto-waits for visibility.
	 * @param {string} productName
	 */
	async clickOnProduct(productName) {
		await this.getProductTitleLocator(productName).click()
	}

	/**
	 * Search and navigate to product detail in one step.
	 * @param {string} productName
	 */
	async searchAndSelectProduct(productName) {
		await this.searchProduct(productName)
		await this.waitForSearchResults()
		await this.accessToProductDetail(productName)
	}

	// ==================== WAIT METHODS ====================

	/**
	 * Wait for the first element matching the locator to be visible.
	 * @param {import('@playwright/test').Locator} locator
	 * @param {number} timeout
	 */
	async waitForElementVisible(locator, timeout = 10000) {
		await locator.first().waitFor({ state: "visible", timeout })
	}

	/**
	 * Wait for products to become visible with optional container.
	 * @param {import('@playwright/test').Locator} productLocator
	 * @param {import('@playwright/test').Locator|null} containerLocator
	 * @param {number} timeout
	 */
	async waitForProductsVisible(productLocator, containerLocator = null, timeout = 15000) {
		await waitForProductsVisible(this.page, productLocator, containerLocator, timeout)
	}

	/** @param {number} timeout */
	async waitForInitialProductsLoad(timeout = 15000) {
		await this.waitForProductsVisible(this.productName, null, timeout)
	}

	/**
	 * Check if element is visible without throwing.
	 * @param {import('@playwright/test').Locator} locator
	 * @param {number} timeout
	 * @returns {Promise<boolean>}
	 */
	async isElementVisible(locator, timeout = 3000) {
		try {
			await locator.waitFor({ state: "visible", timeout })
			return true
		} catch {
			return false
		}
	}

	/**
	 * Get element count, waiting for at least one to be visible first.
	 * @param {import('@playwright/test').Locator} locator
	 * @param {number} timeout
	 * @returns {Promise<number>}
	 */
	async getElementCount(locator, timeout = 10000) {
		try {
			await this.waitForElementVisible(locator, timeout)
		} catch {
			return 0
		}
		return await locator.count()
	}

	// ==================== VALIDATION ====================

	/**
	 * Get product names that don't contain any of the expected keywords.
	 * @param {string[]} keywords
	 * @returns {Promise<string[]>}
	 */
	async getInvalidProductNames(keywords) {
		const productNames = await this.getProductNames()
		if (productNames.length === 0) throw new Error("No products found")
		return productNames.filter(
			(name) => !this.doesProductMatchKeywords(name, keywords)
		)
	}

	/**
	 * Case-insensitive keyword match against a product name.
	 * @param {string} productName
	 * @param {string[]} keywords
	 * @returns {boolean}
	 */
	doesProductMatchKeywords(productName, keywords) {
		const normalizedName = productName.trim().toLowerCase()
		return keywords.map((k) => k.toLowerCase()).some((kw) => normalizedName.includes(kw))
	}

	/**
	 * Validate that all products on current page have eco badges.
	 * @returns {Promise<boolean>}
	 */
	async validateCurrentPageEcoBadges() {
		const ecoBadgesCount = await this.getElementCount(this.ecoBadges)
		const totalProducts = await this.getElementCount(this.productCards)
		return ecoBadgesCount === totalProducts && totalProducts > 0
	}

	// ==================== DATA RETRIEVAL ====================

	/** @returns {Promise<number>} */
	async getProductCount() {
		await this.waitForElementVisible(this.productName.first())
		return await this.productCards.count()
	}

	/**
	 * Get all product names on current page.
	 * allTextContents() has no auto-wait — waitForInitialProductsLoad
	 * must be called before this.
	 * @returns {Promise<string[]>}
	 */
	async getProductNames() {
		return await this.productName.allTextContents()
	}

	/** @returns {Promise<number>} */
	async getCurrentPageProductCount() {
		return await this.getElementCount(this.productCards)
	}

	// ==================== STATUS CHECKS ====================

	/** @returns {Promise<boolean>} */
	async hasProductsVisible() {
		return await this.isElementVisible(this.productName.first())
	}

	/** @returns {Promise<boolean>} */
	async hasOutOfStockProducts() {
		await this.waitForInitialProductsLoad()
		return (await this.outOfStockLabels.count()) > 0
	}
}
