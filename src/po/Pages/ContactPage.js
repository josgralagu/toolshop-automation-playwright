export class ContactPage {
  constructor(page) {
    this.page = page;

    // ==================== LANGUAGE SELECTOR ELEMENTS ====================
    this.languageDropdownButton = page.locator('[data-test="language-select"]');
    this.languageOption = (code) => page.locator(`[data-test="lang-${code}"]`);

    // ==================== NAVIGATION ELEMENTS ====================
    this.homeLink = page.locator('[data-test="nav-home"]');
    this.categoriesLink = page.locator('[data-test="nav-categories"]');
    this.contactLink = page.locator('[data-test="nav-contact"]');
    this.signInLink = page.locator('[data-test="nav-sign-in"]');

    // ==================== MAIN CONTENT ELEMENTS ====================
    this.mainHeading = page.locator("h3");

    // ==================== FORM LABEL ELEMENTS ====================
    this.firstNameLabel = page.locator('label[for="first_name"]');
    this.lastNameLabel = page.locator('label[for="last_name"]');
    this.emailLabel = page.locator('label[for="email"]');
    this.subjectLabel = page.locator('label[for="subject"]');
    this.messageLabel = page.locator('label[for="message"]');
    this.attachmentLabel = page.locator('label[for="attachment"]');

    // ==================== FORM INPUT ELEMENTS ====================
    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.lastNameInput = page.locator('[data-test="last-name"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.subjectSelect = page.locator('[data-test="subject"]');
    this.messageTextarea = page.locator('[data-test="message"]');

    // ==================== BUTTON AND MESSAGE ELEMENTS ====================
    this.submitButton = page.locator('[data-test="contact-submit"]');
    this.warningLabel = page.locator("#attachmentHelp");

    // Robust selector for info label that works across all languages
    this.infoLabel = page.locator('p:has(a[href*="github.com/testsmith-io/practice-software-testing"])');
  }

  // ==================== NAVIGATION METHODS ====================

  /**
   * Navigate to contact page and wait for load completion
   */
  async navigate() {
    await this.page.goto("https://practicesoftwaretesting.com/contact");
    await this.page.waitForLoadState("domcontentloaded");
    await this.firstNameInput.waitFor({ state: "visible", timeout: 15000 });
  }

  // ==================== LANGUAGE METHODS ====================

  /**
   * Change page language to specified language code
   * @param {string} languageCode - Language code (DE, EN, ES, FR, NL, TR)
   */
  async changeLanguage(languageCode) {
    await this.languageDropdownButton.waitFor({
      state: "visible",
      timeout: 15000,
    });
    await this.languageDropdownButton.click();
    await this.page.waitForTimeout(1500);

    const selector = `[data-test="lang-${languageCode.toLowerCase()}"]`;
    await this.page.locator(selector).waitFor({ state: "visible", timeout: 15000 });
    await this.page.locator(selector).click();
    await this.page.waitForTimeout(1500);
  }

    /**
   * Get currently selected language from dropdown
   * @returns {string} Current language text
   */
  async getCurrentLanguage() {
    return await this.languageDropdownButton.textContent();
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Get normalized info text with extra spaces removed
   * @returns {string} Normalized info text
   */
  async getNormalizedInfoText() {
    const text = await this.infoLabel.textContent();
    return text.replace(/\s+/g, " ").trim();
  }
}