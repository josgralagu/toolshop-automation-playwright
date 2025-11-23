// ====================================================================
// PRODUCTS PAGE - REFACTORED VERSION
// ====================================================================
// Refactored using DRY and SOLID principles with component composition
// Extends BasePage and uses reusable components for search, filters, and pagination
// ====================================================================

import { BasePage } from "./BasePage.js";
import { SearchComponent, FilterComponent, PaginationComponent } from "../Components/index.js";
import { URLS } from "../../configs/utils/constants.js";

export class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Initialize reusable components
        this.searchComponent = new SearchComponent(page);
        this.filterComponent = new FilterComponent(page);
        this.paginationComponent = new PaginationComponent(page);

        // ==================== PRODUCT DISPLAY ELEMENTS ====================
        this.productCards = page.locator("a.card");
        this.productName = page.locator('h5[data-test="product-name"]');
        this.outOfStockLabels = page.locator('[data-test="out-of-stock"]');
        this.ecoBadges = page.locator('[data-test="eco-badge"]');
    }

    // ==================== NAVIGATION METHODS ====================

    /**
     * Navigate to products page
     */
    async navigateToProductsPage() {
        await this.navigateTo(URLS.BASE);
        await this.waitForInitialProductsLoad();
    }

    // ==================== SEARCH METHODS (Delegated to SearchComponent) ====================

    /**
     * Fill search field with product name
     * @param {string} product - Product name to search for
     */
    async fillSearch(product) {
        await this.searchComponent.fillSearch(product);
    }

    /**
     * Complete search operation for a product
     * @param {string} product - Product name to search for
     */
    async searchProduct(product) {
        await this.searchComponent.searchProduct(product);
    }

    /**
     * Wait for search results to become visible
     */
    async waitForVisibleResult() {
        await this.searchComponent.waitForSearchResults();
    }

    /**
     * Get first product name from search results
     * @returns {string} First product name
     */
    async getFirstProductName() {
        return await this.searchComponent.getFirstProductName();
    }

    // ==================== FILTER METHODS (Delegated to FilterComponent) ====================

    /**
     * Select subcategory filter by exact name match
     * @param {string} subcategoryName - Subcategory name to filter by
     */
    async clickSubcategoryCheckbox(subcategoryName) {
        await this.filterComponent.clickSubcategoryCheckbox(subcategoryName);
    }

    /**
     * Select brand filter by name
     * @param {string} brandName - Brand name to filter by
     */
    async selectBrandByName(brandName) {
        await this.filterComponent.selectBrandByName(brandName);
    }

    /**
     * Deselect brand filter by name
     * @param {string} brandName - Brand name to deselect
     */
    async deselectBrandByName(brandName) {
        await this.filterComponent.deselectBrandByName(brandName);
    }

    /**
     * Activate eco-friendly filter
     */
    async clickEcoFriendlyFilter() {
        await this.filterComponent.clickEcoFriendlyFilter();
    }

    /**
     * Wait for filter operation to complete
     */
    async waitForFilterCycle() {
        await this.filterComponent.waitForFilterCycle();
    }

    /**
     * Wait for filter results to load
     */
    async waitForFilterResults() {
        await this.filterComponent.waitForFilterResults();
    }

    // ==================== PAGINATION METHODS (Delegated to PaginationComponent) ====================

    /**
     * Check if next page is available
     * @returns {boolean} True if next page exists and is enabled
     */
    async hasNextPage() {
        return await this.paginationComponent.hasNextPage();
    }

    /**
     * Get the number of pagination pages available
     * @returns {number} Count of pagination pages
     */
    async getNextPageCount() {
        return await this.paginationComponent.getPageCount();
    }

    /**
     * Navigate to next page of results
     */
    async clickNextPage() {
        await this.paginationComponent.clickNextPage();
    }

    // ==================== PRODUCT INTERACTION METHODS ====================

    /**
     * Access product detail page by product name
     * @param {string} productName - Name of product to access
     */
    async accessToProductDetail(productName) {
        await this.waitForVisibleResult();
        await this.clickOnProduct(productName);
        await this.waitForUrl(/\/product\//);
    }

    /**
     * Get locator for specific product by name
     * @param {string} productName - Product name to locate
     * @returns {Locator} Product element locator
     */
    getProductTitleLocator(productName) {
        return this.productCards.filter({
            has: this.page.locator(
                `h5[data-test="product-name"]:has-text("${productName}")`
            ),
        });
    }

    /**
     * Click on specific product by name
     * @param {string} productName - Product name to click
     */
    async clickOnProduct(productName) {
        const productLocator = this.getProductTitleLocator(productName);
        await this.safeClick(productLocator);
    }

    // ==================== WAIT METHODS ====================

    /**
     * Wait for initial products to load on page
     * @param {number} timeout - Timeout in milliseconds (default: 15000)
     */
    async waitForInitialProductsLoad(timeout = 15000) {
        await this.waitForProductsVisible(this.productName, null, timeout);
    }

    // ==================== VALIDATION METHODS ====================

    /**
     * Get product names that don't match expected keywords
     * @param {string[]} keywords - Expected keywords to match against
     * @returns {string[]} Array of invalid product names
     */
    async getInvalidProductNames(keywords) {
        const productNames = await this.getProductNames();
        if (productNames.length === 0) throw new Error("No products found");

        return productNames.filter(name =>
            !this.doesProductMatchKeywords(name, keywords)
        );
    }

    /**
     * Validate products contain expected keywords
     * @param {string[]} keywords - Expected keywords to validate
     * @returns {object} Validation result with status and invalid products
     */
    async validateProductsContainKeywords(keywords) {
        const productNames = await this.getProductNames();
        if (productNames.length === 0) {
            throw new Error("No hay productos para validar");
        }

        const invalidProducts = await this.getInvalidProductNames(keywords);

        return {
            valid: invalidProducts.length === 0,
            invalidProducts,
            keywords
        };
    }

    /**
     * Check if product name matches any of the keywords (case-insensitive)
     * @param {string} productName - Product name to check
     * @param {string[]} keywords - Keywords to match against
     * @returns {boolean} True if product name matches any keyword
     */
    doesProductMatchKeywords(productName, keywords) {
        const normalizedName = productName.trim().toLowerCase();
        const normalizedKeywords = keywords.map(k => k.toLowerCase());
        
        return normalizedKeywords.some(keyword =>
            normalizedName.includes(keyword)
        );
    }

    /**
     * Validate current page has only eco-friendly products
     * @returns {boolean} True if all products have eco badges
     */
    async validateCurrentPageEcoBadges() {
        const ecoBadgesCount = await this.getElementCount(this.ecoBadges);
        const totalProducts = await this.getElementCount(this.productCards);
        return ecoBadgesCount === totalProducts && totalProducts > 0;
    }

    // ==================== DATA RETRIEVAL METHODS ====================

    /**
     * Get count of products on current page
     * @returns {number} Product count
     */
    async getProductCount() {
        await this.waitForElementVisible(this.productName.first());
        return await this.productCards.count();
    }

    /**
     * Get names of all products on current page
     * @returns {string[]} Array of product names
     */
    async getProductNames() {
        return await this.productName.allTextContents();
    }

    /**
     * Get current page product count
     * @returns {number} Number of products on current page
     */
    async getCurrentPageProductCount() {
        return await this.getElementCount(this.productCards);
    }

    // ==================== STATUS CHECK METHODS ====================

    /**
     * Check if products are visible on page
     * @returns {boolean} True if products are visible
     */
    async hasProductsVisible() {
        return await this.isElementVisible(this.productName.first());
    }

    /**
     * Check if out-of-stock products exist on page
     * @returns {boolean} True if out-of-stock products found
     */
    async hasOutOfStockProducts() {
        await this.waitForInitialProductsLoad();
        const count = await this.outOfStockLabels.count();
        return count > 0;
    }

    /**
     * Verify product name matches expected name
     * @param {string} expectedName - Expected product name
     * @returns {boolean} True if product name matches
     */
    async verifyProductNameMatches(expectedName) {
        const actualName = await this.getFirstProductName();
        return actualName === expectedName;
    }

    // ==================== COMPOSITE METHODS ====================

    /**
     * Search and select product in one operation
     * @param {string} productName - Product name to search and select
     */
    async searchAndSelectProduct(productName) {
        await this.searchProduct(productName);
        await this.waitForVisibleResult();
        await this.accessToProductDetail(productName);
    }

    /**
     * Apply multiple filters in sequence
     * @param {Object} filters - Object containing filter options
     * @param {string} filters.brand - Brand name to filter by
     * @param {string} filters.subcategory - Subcategory name to filter by
     * @param {boolean} filters.ecoFriendly - Whether to apply eco filter
     */
    async applyMultipleFilters(filters) {
        const filterActions = [
            { condition: filters.brand, action: () => this.selectBrandByName(filters.brand) },
            { condition: filters.subcategory, action: () => this.clickSubcategoryCheckbox(filters.subcategory) },
            { condition: filters.ecoFriendly, action: () => this.clickEcoFriendlyFilter() }
        ];

        for (const { condition, action } of filterActions) {
            if (condition) await action();
        }
    }

    /**
     * Clear all active filters
     * @param {string[]} brands - Array of brand names that might be active
     */
    async clearAllFilters(brands = []) {
        await this.filterComponent.clearAllBrandFilters(brands);
        await this.filterComponent.clearEcoFilter();
    }

    /**
     * Navigate through all pages and collect data
     * @param {Function} dataCollector - Function to collect data from each page
     * @param {number} maxPages - Maximum number of pages to process
     * @returns {Array} Collected data from all pages
     */
    async collectDataAcrossPages(dataCollector, maxPages = 10) {
        const pageProcessor = async (pageNumber) => {
            await this.waitForInitialProductsLoad();
            return await dataCollector(pageNumber);
        };

        return await this.paginationComponent.navigateThroughAllPages(pageProcessor, maxPages);
    }
}