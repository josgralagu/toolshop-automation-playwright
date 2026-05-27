import { BasePage } from "./BasePage.js"

export class MyAccountPage extends BasePage {
	constructor(page) {
		super(page)

		// getByTestId() requiere testIdAttribute: 'data-test' en playwright.config.js
		this.userName = page.getByTestId("nav-menu")
		this.myFavoritesLink = page.getByTestId("nav-my-favorites")
		this.myProfileLink = page.getByTestId("nav-my-profile")
	}

	// ==================== WAIT METHODS ====================

	/**
	 * Wait for user name element to be visible.
	 * Usado como barrera para confirmar que el login fue exitoso
	 * y que el DOM ya refleja el estado autenticado.
	 * No hay acción de Playwright posterior que dispare auto-wait aquí.
	 */
	async waitForUserNameVisible() {
		await this.userName.waitFor({ state: "visible", timeout: 10000 })
	}

	// ==================== USER MENU METHODS ====================

	/**
	 * Open user menu dropdown.
	 * click() auto-waits for visibility.
	 */
	async openUserMenu() {
		await this.userName.click()
	}

	// ==================== NAVIGATION METHODS ====================

	/**
	 * Navigate to favorites page via user menu.
	 * myFavoritesLink.click() auto-waits — no explicit waitFor needed.
	 */
	async goToMyFavorites() {
		await this.openUserMenu()
		await this.myFavoritesLink.click()
		await this.waitForUrl("**/account/favorites", { timeout: 15000 })
	}

	/**
	 * Navigate to profile page via user menu.
	 * myProfileLink.click() auto-waits — no explicit waitFor needed.
	 */
	async accessToProfile() {
		await this.openUserMenu()
		await this.myProfileLink.click()
		await this.waitForUrl("**/account/profile", { timeout: 15000 })
	}
}
