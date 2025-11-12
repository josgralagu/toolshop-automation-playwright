export class MyAccountPage {
  constructor(page) {
    this.page = page;

    // ==================== NAVIGATION ELEMENTS ====================
    this.userName = page.locator('[data-test="nav-menu"]');
    this.myFavoritesLink = page.locator('[data-test="nav-my-favorites"]');
    this.myProfileLink = page.locator('[data-test="nav-my-profile"]');
  }

  // ==================== WAIT METHODS ====================

  /**
   * Wait for user name element to be visible
   */
  async waitForUserNameVisible() {
    await this.userName.waitFor({ state: "visible", timeout: 10000 });
  }

  /**
   * Wait for profile link to be visible
   */
  async waitForMyProfileLinkVisible() {
    await this.myProfileLink.waitFor({ state: "visible", timeout: 10000 });
  }

  // ==================== USER MENU METHODS ====================

  /**
   * Open user menu dropdown
   */
  async openUserMenu() {
    await this.userName.click();
  }

  /**
   * Click on profile link in user menu
   */
  async clickOnProfileLink() {
    await this.waitForMyProfileLinkVisible();
    await this.myProfileLink.click();
  }

  // ==================== NAVIGATION METHODS ====================

  /**
   * Navigate to favorites page via user menu
   */
  async goToMyFavorites() {
    await this.myFavoritesLink.waitFor({ state: "visible", timeout: 10000 });
    await this.myFavoritesLink.click();
    await this.page.waitForURL("**/account/favorites", { timeout: 15000 });
  }

  /**
   * Complete flow to access profile page
   */
  async accessToProfile() {
    await this.userName.click();
    await this.clickOnProfileLink();
    await this.page.waitForURL("**/account/profile", { timeout: 15000 });
  }
}