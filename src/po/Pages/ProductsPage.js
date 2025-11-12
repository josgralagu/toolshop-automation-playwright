import { URLS } from "../../../utils/constants";

export class ProductsPage {
  constructor(page) {
    this.page = page;

    // ==================== SEARCH ELEMENTS ====================
    this.searchField = page.locator('[data-test="search-query"]');
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.searchResultsContainer = page.locator(
      'div.container[data-test="search_completed"]'
    );

    // ==================== PRODUCT DISPLAY ELEMENTS ====================
    this.productCards = page.locator("a.card");
    this.productName = page.locator('h5[data-test="product-name"]');
    this.outOfStockLabels = page.locator('[data-test="out-of-stock"]');
    this.ecoBadges = page.locator('[data-test="eco-badge"]');

    // ==================== CATEGORY NAVIGATION ELEMENTS ====================
    this.categoriesLink = page.locator('[data-test="nav-categories"]');
    this.handToolsLink = page.locator('[data-test="nav-hand-tools"]');
    this.powerToolsLink = page.locator('[data-test="nav-power-tools"]');
    this.otherLink = page.locator('[data-test="nav-other"]');

    // ==================== FILTER ELEMENTS ====================
    this.ecoFilter = page.locator('input[data-test="eco-friendly-filter"]');
    this.brandCheckbox = (brandName) =>
      page.locator(
        `.checkbox label:has-text("${brandName}") input[type="checkbox"]`
      );

    // ==================== PAGINATION ELEMENTS ====================
    this.paginationNextButton = page.locator('a[aria-label="Next"]');
    this.paginationContainer = page.locator(".pagination");

    // ==================== FILTER STATUS ELEMENTS ====================
    this.filterStarted = page.locator('[data-test="filter_started"]');
    this.filterCompleted = page.locator('[data-test="filter_completed"]');
    this.noResultsMessage = page.locator('[data-test="no-results"]');
  }

  // ==================== NAVIGATION METHODS ====================

  /**
   * Navigate to products page
   */
  async navigateToProductsPage() {
    await this.page.goto(URLS.BASE);
  }

  /**
   * Click categories navigation link
   */
  async clickCategoriesLink() {
    await this.categoriesLink.waitFor({ state: "visible", timeout: 10000 });
    await this.categoriesLink.click();
  }

  /**
   * Navigate to Hand Tools category
   */
  async clickHandToolsLink() {
    await this.handToolsLink.waitFor({ state: "visible", timeout: 10000 });
    await this.handToolsLink.click();
    await this.page.waitForURL("**/category/hand-tools", { timeout: 15000 });
  }

  /**
   * Navigate to Power Tools category
   */
  async clickPowerToolsLink() {
    await this.powerToolsLink.waitFor({ state: "visible", timeout: 10000 });
    await this.powerToolsLink.click();
    await this.page.waitForURL("**/category/power-tools", { timeout: 15000 });
  }

  /**
   * Navigate to Other category
   */
  async clickOtherLink() {
    await this.otherLink.waitFor({ state: "visible", timeout: 10000 });
    await this.otherLink.click();
    await this.page.waitForURL("**/category/other", { timeout: 15000 });
  }

  // ==================== SEARCH METHODS ====================

  /**
   * Fill search field with product name
   * @param {string} product - Product name to search for
   */
  async fillSearch(product) {
    await this.searchField.waitFor({ state: "visible", timeout: 10000 });
    await this.searchField.fill(product);
  }

  /**
   * Complete search operation for a product
   * @param {string} product - Product name to search for
   */
  async searchProduct(product) {
    await this.fillSearch(product);
    await this.searchButton.click();
  }

  /**
   * Access product detail page by product name
   * @param {string} productName - Name of product to access
   */
  async accessToProductDetail(productName) {
    await this.waitForVisibleResult();
    await this.clickOnProduct(productName);
    await this.page.waitForURL(/\/product\//, { timeout: 15000 });
  }

  // ==================== FILTER METHODS ====================

  /**
   * Select subcategory filter by exact name match
   * @param {string} subcategoryName - Subcategory name to filter by
   */
  async clickSubcategoryCheckbox(subcategoryName) {
    const checkboxLabel = this.page.locator(
      `.checkbox label:text-is("${subcategoryName}")`
    );
    await checkboxLabel.waitFor({ state: "visible", timeout: 10000 });
    await checkboxLabel.click();
  }

  /**
   * Select brand filter by name
   * @param {string} brandName - Brand name to filter by
   */
  async selectBrandByName(brandName) {
    await this.brandCheckbox(brandName).waitFor({
      state: "visible",
      timeout: 10000,
    });
    await this.brandCheckbox(brandName).check();
    await this.waitForFilterCycle();
  }

  /**
   * Deselect brand filter by name
   * @param {string} brandName - Brand name to deselect
   */
  async deselectBrandByName(brandName) {
    await this.brandCheckbox(brandName).waitFor({
      state: "visible",
      timeout: 10000,
    });
    await this.brandCheckbox(brandName).uncheck();
    await this.waitForFilterCycle();
  }

  /**
   * Activate eco-friendly filter
   */
  async clickEcoFriendlyFilter() {
    await this.ecoFilter.waitFor({ state: "visible", timeout: 10000 });
    await this.ecoFilter.check();
    await this.waitForFilterCycle();
  }

  // ==================== WAIT METHODS ====================

  /**
   * Wait for initial products to load on page
   */
  async waitForInitialProductsLoad() {
    await this.productName
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  }

  /**
   * Wait for search results to become visible
   */
  async waitForVisibleResult() {
    await this.searchResultsContainer.waitFor({
      state: "visible",
      timeout: 15000,
    });
    await this.searchResultsContainer
      .locator('h5[data-test="product-name"]')
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  }

  /**
   * Wait for filter operation to complete
   */
  async waitForFilterCycle() {
    await this.filterStarted.waitFor({ state: "attached", timeout: 5000 });
    await this.filterCompleted.waitFor({ state: "attached", timeout: 15000 });
  }

  /**
   * Wait for filter results to load
   */
  async waitForFilterResults() {
    await this.page.waitForFunction(
      () => {
        const hasProducts =
          document.querySelector('h5[data-test="product-name"]') !== null;
        const hasNoResults =
          document.querySelector('[data-test="no-results"]') !== null;
        return hasProducts || hasNoResults;
      },
      { timeout: 15000 }
    );
  }

  // ==================== PAGINATION METHODS ====================

  /**
   * Check if next page is available
   * @returns {boolean} True if next page exists and is enabled
   */
  async hasNextPage() {
    const buttonCount = await this.paginationNextButton.count();
    if (buttonCount === 0) return false;

    await this.paginationNextButton.waitFor({
      state: "visible",
      timeout: 10000,
    });
    const isDisabled = await this.paginationNextButton.evaluate((el) =>
      el.closest("li")?.classList.contains("disabled")
    );
    return !isDisabled;
  }

  /**
   * Get the number of pagination pages available
   * @returns {number} Count of pagination pages (excluding Previous and Next buttons)
   */
  async getNextPageCount() {
    const paginationItems = await this.page
      .locator(".pagination .page-item")
      .count();
    return paginationItems - 2; // Exclude "Previous" and "Next" buttons
  }

  /**
   * Navigate to next page of results
   */
  async clickNextPage() {
    const canNavigate = this.hasNextPage();
    if (!canNavigate)
      throw new Error("Next page button is disabled - cannot navigate");

    await this.paginationNextButton.click();
    await this.waitForInitialProductsLoad();
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

    const normalizedKeywords = keywords.map((k) => k.toLowerCase());
    return productNames.filter(
      (name) =>
        !normalizedKeywords.some((keyword) =>
          name.trim().toLowerCase().includes(keyword)
        )
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

    const normalizedKeywords = keywords.map((k) => k.toLowerCase());
    const invalidProducts = [];

    for (const name of productNames) {
      const normalizedName = name.trim().toLowerCase();
      const matches = normalizedKeywords.some((keyword) =>
        normalizedName.includes(keyword)
      );
      if (!matches) invalidProducts.push(name);
    }

    return { valid: invalidProducts.length === 0, invalidProducts, keywords };
  }

  /**
   * Validate current page has only eco-friendly products
   * @returns {boolean} True if all products have eco badges
   */
  async validateCurrentPageEcoBadges() {
    const ecoBadgesCount = await this.ecoBadges.count();
    const totalProducts = await this.productCards.count();
    return ecoBadgesCount === totalProducts && totalProducts > 0;
  }

  // ==================== DATA RETRIEVAL METHODS ====================

  /**
   * Get count of products on current page
   * @returns {number} Product count
   */
  async getProductCount() {
    await this.productName
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
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
   * Get first product name from search results
   * @returns {string} First product name
   */
  async getFirstProductName() {
    await this.waitForVisibleResult();
    const firstProduct = this.searchResultsContainer.locator("a.card").first();
    return await firstProduct
      .locator('h5[data-test="product-name"]')
      .textContent();
  }

  /**
   * Get current page product count
   * @returns {number} Number of products on current page
   */
  async getCurrentPageProductCount() {
    return await this.productCards.count();
  }

  // ==================== STATUS CHECK METHODS ====================

  /**
   * Check if products are visible on page
   * @returns {boolean} True if products are visible
   */
  async hasProductsVisible() {
    return await this.productName
      .first()
      .isVisible({ timeout: 3000 })
      .catch(() => false);
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
    const actualName = this.getFirstProductName();
    return actualName === expectedName;
  }

  // ==================== PRODUCT INTERACTION METHODS ====================

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
    await productLocator.waitFor({ state: "visible", timeout: 10000 });
    await productLocator.click();
  }
}