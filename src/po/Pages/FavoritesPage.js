/**
 * Favorites Page Object
 * Handles interactions with the user's favorite products list
 * Provides methods to manage and verify favorite products
 */
export class FavoritesPage {
  constructor(page) {
    this.page = page;

    // ==================== PAGE ELEMENTS ====================

    // Favorite product elements
    this.favCard = page.locator('[data-test="product-name"]').first();
    this.productName = page.locator('[data-test="product-name"]');
    this.deleteBtn = page.locator('[data-test="delete"]').first();

    // Status messages
    this.emptyMsg = page.locator("text=There are no favorites yet");
  }

  // ==================== WAIT METHODS ====================

  /**
   * Wait for favorites list to load completely
   */
  async waitForFavoritesLoad() {
    await this.productName
      .first()
      .waitFor({ state: "visible", timeout: 15000 });
  }

  /**
   * Wait until no favorite products remain
   */
  async waitUntilNoFavorites() {
    await this.productName
      .first()
      .waitFor({ state: "detached", timeout: 10000 });
  }

  // ==================== FAVORITE MANAGEMENT METHODS ====================

  /**
   * Delete the first favorite product from the list
   */
  async deleteFirstFavorite() {
    await this.deleteBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.deleteBtn.click();
    await this.waitUntilNoFavorites();
  }

  // ==================== STATUS CHECK METHODS ====================

  /**
   * Check if favorites list is empty
   * @returns {boolean} True if no favorites are present
   */
  async isEmpty() {
    return await this.emptyMsg.isVisible();
  }
}
