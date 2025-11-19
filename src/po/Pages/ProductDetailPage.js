export class ProductDetailPage {
  constructor(page) {
    this.page = page;

    // ==================== PRODUCT INFORMATION ELEMENTS ====================
    this.productPrice = page.locator('[data-test="unit-price"]');
    this.productDescription = page.locator('[data-test="product-description"]');
    this.brandBadge = page.locator('[aria-label="brand"]');

    // ==================== QUANTITY MANAGEMENT ELEMENTS ====================
    this.quantityInput = page.locator('[data-test="quantity"]');
    this.increaseButton = page.locator('[data-test="increase-quantity"]');

    // ==================== ACTION BUTTONS ====================
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.addToFavoritesButton = page.locator('[data-test="add-to-favorites"]');
    this.cartLink = page.locator('[data-test="nav-cart"]');

    // ==================== MESSAGE ELEMENTS ====================
    this.successMsg = page.locator("div.toast-success");
    this.favSuccessMessage = page.locator(
      '[aria-label="Product added to your favorites list."]'
    );
    this.favErrorMessage = page.locator(
      'div[role="alert"]:has-text("Unauthorized")'
    );
  }

  // ==================== WAIT METHODS ====================

  /**
   * Wait for product data to load completely
   */
  async waitForProductData() {
    await this.productPrice.waitFor({ state: "visible", timeout: 10000 });
    await this.productDescription.waitFor({ state: "visible", timeout: 10000 });
  }

  /**
   * Wait for success message to appear and disappear
   */
  async waitForSuccessMessage() {
    await this.successMsg.waitFor({ state: "visible", timeout: 10000 });
    await this.successMsg.waitFor({ state: "detached", timeout: 10000 });
  }

  /**
   * Wait for favorites success message to appear and disappear
   */
  async waitForFavSuccessMsg() {
    await this.favSuccessMessage.waitFor({ state: "visible", timeout: 10000 });
    await this.favSuccessMessage.waitFor({ state: "detached", timeout: 10000 });
  }

  // ==================== QUANTITY METHODS ====================

  /**
   * Increase product quantity by clicking increase button
   * @param {number} times - Number of times to click increase button
   */
  async increaseQuantity(times = 1) {
    for (let i = 0; i < times; ++i) await this.increaseButton.click();
  }

  /**
   * Get current quantity value from input field
   * @returns {number} Current quantity
   */
  async getCurrentQuantity() {
    await this.quantityInput.waitFor({ state: "visible", timeout: 10000 });
    return parseInt(await this.quantityInput.inputValue(), 10);
  }

  // ==================== CART METHODS ====================

  /**
   * Click add to cart button
   */
  async clickAddToCartButton() {
    await this.addToCartButton.waitFor({ state: "visible", timeout: 10000 });
    await this.addToCartButton.click();
  }

  /**
   * Complete add to cart flow with quantity adjustment
   * @param {number} clicks - Number of times to increase quantity before adding
   */
  async addToCartByPlusClicks(clicks = 1) {
    await this.increaseQuantity(clicks);
    await this.clickAddToCartButton();
    await this.waitForSuccessMessage();
  }

  /**
   * Get product price as numeric value
   * @returns {number} Product price
   */
  async getProductPrice() {
    const text = await this.productPrice.textContent();
    return parseFloat(text);
  }

  /**
   * Navigate to cart page via header link
   */
  async goToCartViaHeaderLink() {
    await this.cartLink.click();
    await this.page.waitForURL("**/checkout", { timeout: 15000 });
  }

  // ==================== FAVORITES METHODS ====================

  /**
   * Click add to favorites button
   */
  async clickAddToFavorites() {
    await this.addToFavoritesButton.waitFor({ state: "visible", timeout: 25000, });
    await this.addToFavoritesButton.click();
  }

  /**
   * Complete add to favorites flow
   */
  async addProductToFavorites() {
    await this.clickAddToFavorites();
    await this.waitForFavSuccessMsg();
  }

  // ==================== BRAND METHODS ====================

  /**
   * Get brand badge text content
   * @returns {string} Brand name
   */
  async getBrandBadgeText() {
    await this.brandBadge.waitFor({ state: "visible", timeout: 10000 });
    return await this.brandBadge.textContent();
  }
}
