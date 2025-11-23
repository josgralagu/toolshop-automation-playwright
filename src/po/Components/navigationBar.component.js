export class NavigationBarComponent {
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

        // ==================== CATEGORY NAVIGATION ELEMENTS ====================
        this.handToolsLink = page.locator('[data-test="nav-hand-tools"]');
        this.powerToolsLink = page.locator('[data-test="nav-power-tools"]');
        this.otherLink = page.locator('[data-test="nav-other"]');
    }

    // ==================== NAVIGATION METHODS ====================
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

    // ==================== LANGUAGE METHODS ====================

    /**
     * Change page language to specified language code
     * @param {string} languageCode - Language code (DE, EN, ES, FR, NL, TR)
     */
    async changeLanguage(languageCode) {
        // Wait for language dropdown to be ready
        await this.languageDropdownButton.waitFor({
            state: "visible",
            timeout: 20000,
        });
        
        // Click dropdown and wait for options to appear
        await this.languageDropdownButton.click();
        
        const selector = `[data-test="lang-${languageCode.toLowerCase()}"]`;
        const languageOption = this.page.locator(selector);
        
        // Wait for specific language option to be visible and clickable
        await languageOption.waitFor({
            state: "visible",
            timeout: 20000,
        });
        
        // Click the language option
        await languageOption.click();
        
        // Wait for the language dropdown button to reflect the new language
        // We expect the button to show the language code in uppercase (e.g., "NL")
        await this.page.waitForFunction(
            (expectedLanguage) => {
                const button = document.querySelector('[data-test="language-select"]');
                return button && button.textContent.trim().toUpperCase() === expectedLanguage;
            },
            languageCode.toUpperCase(),
            { timeout: 15000 }
        );
        
        // Additional wait for DOM stability
        await this.page.waitForTimeout(500);
    }

    /**
   * Get currently selected language from dropdown
   * @returns {string} Current language text
   */
    async getCurrentLanguage() {
        return await this.languageDropdownButton.textContent();
    }
}