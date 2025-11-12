export class ProfilePage {
  constructor(page) {
    this.page = page;

    // ==================== PROFILE FORM ELEMENTS ====================
    this.firstNameField = page.locator('[data-test="first-name"]');
    this.lastNameField = page.locator('[data-test="last-name"]');
    this.emailField = page.locator('[data-test="email"]');
    this.phoneField = page.locator('[data-test="phone"]');
    this.updateProfileButton = page.locator('[data-test="update-profile-submit"]');

    // ==================== MESSAGE ELEMENTS ====================
    this.successMessage = page.getByRole("alert").filter({ hasText: /successfully updated/i });
    this.errorMessage = page.getByRole("alert").filter({
      hasText: /phone field must not be greater than 24 characters/i,
    });
  }

  // ==================== FORM INTERACTION METHODS ====================

  /**
   * Fill phone number field with specified number
   * @param {string} number - Phone number to input
   */
  async fillPhoneNumber(number) {
    await this.phoneField.fill(number);
  }

  /**
   * Submit profile changes
   */
  async submitProfileChanges() {
    await this.updateProfileButton.click();
  }

  // ==================== WAIT METHODS ====================

  /**
   * Wait for profile data to load completely
   */
  async waitForProfileDataLoaded() {
    await this.phoneField.waitFor({ state: "visible", timeout: 10000 });
    await this.page.waitForTimeout(2000);
  }

  // ==================== COMPOSITE METHODS ====================

  /**
   * Complete phone number update flow
   * @param {string} number - New phone number to set
   */
  async updatePhoneNumber(number) {
    await this.waitForProfileDataLoaded();
    await this.fillPhoneNumber(number);
    await this.submitProfileChanges();
  }
}