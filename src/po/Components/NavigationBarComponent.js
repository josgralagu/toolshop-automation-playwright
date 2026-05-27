export class NavigationBarComponent {
	constructor(page) {
		this.page = page

		// ==================== LANGUAGE SELECTOR ====================
		// getByTestId() requiere testIdAttribute: 'data-test' en playwright.config.js
		this.languageDropdownButton = page.getByTestId("language-select")
		this.languageOption = (code) => page.getByTestId(`lang-${code.toLowerCase()}`)

		// ==================== NAVIGATION LINKS ====================
		this.homeLink = page.getByTestId("nav-home")
		this.categoriesLink = page.getByTestId("nav-categories")
		this.contactLink = page.getByTestId("nav-contact")
		this.signInLink = page.getByTestId("nav-sign-in")

		// ==================== CATEGORY LINKS ====================
		this.handToolsLink = page.getByTestId("nav-hand-tools")
		this.powerToolsLink = page.getByTestId("nav-power-tools")
		this.otherLink = page.getByTestId("nav-other")
	}

	// ==================== NAVIGATION ====================

	/**
	 * Open categories dropdown.
	 * click() auto-waits for visibility.
	 */
	async clickCategoriesLink() {
		await this.categoriesLink.click()
	}

	/**
	 * Navigate to Hand Tools category.
	 * Category nav does NOT emit filter_completed — API response is intercepted.
	 * The promise is registered before clicking to avoid missing the response.
	 */
	async clickHandToolsLink() {
		const responsePromise = this.page.waitForResponse(
			(r) => r.url().includes("/products") && r.status() === 200,
			{ timeout: 15000 }
		)
		await this.handToolsLink.click()
		await this.page.waitForURL("**/category/hand-tools", { timeout: 15000 })
		await responsePromise
	}

	/**
	 * Navigate to Power Tools category.
	 */
	async clickPowerToolsLink() {
		const responsePromise = this.page.waitForResponse(
			(r) => r.url().includes("/products") && r.status() === 200,
			{ timeout: 15000 }
		)
		await this.powerToolsLink.click()
		await this.page.waitForURL("**/category/power-tools", { timeout: 15000 })
		await responsePromise
	}

	/**
	 * Navigate to Other category.
	 */
	async clickOtherLink() {
		const responsePromise = this.page.waitForResponse(
			(r) => r.url().includes("/products") && r.status() === 200,
			{ timeout: 15000 }
		)
		await this.otherLink.click()
		await this.page.waitForURL("**/category/other", { timeout: 15000 })
		await responsePromise
	}

	// ==================== LANGUAGE ====================

	/**
	 * Change page language to specified language code.
	 * Waits for the dropdown button text to confirm the change took effect.
	 * @param {string} languageCode - DE, EN, ES, FR, NL, TR
	 */
	async changeLanguage(languageCode) {
		await this.languageDropdownButton.click()

		const option = this.languageOption(languageCode)
		await option.click()

		// waitForFunction es legítimo aquí: confirmamos que el DOM refleja
		// el cambio de idioma antes de continuar con las validaciones.
		await this.page.waitForFunction(
			(expectedLanguage) => {
				const button = document.querySelector('[data-test="language-select"]')
				return button && button.textContent.trim().toUpperCase() === expectedLanguage
			},
			languageCode.toUpperCase(),
			{ timeout: 15000 }
		)

		// Pequeña pausa para estabilidad del DOM tras el cambio de idioma
		await this.page.waitForTimeout(500)
	}

	/**
	 * Get the currently selected language code from the dropdown.
	 * @returns {Promise<string>}
	 */
	async getCurrentLanguage() {
		return await this.languageDropdownButton.textContent()
	}
}
