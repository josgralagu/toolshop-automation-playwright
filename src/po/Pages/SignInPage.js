import { BasePage } from "./BasePage.js"
import { URLS } from "../../configs/utils/constants.js"

/**
 * Sign In Page Object
 * Handles user authentication and login functionality
 * Provides methods to fill login form and complete authentication process
 */
export class SignInPage extends BasePage {
	constructor(page) {
		super(page)

		// ==================== LOGIN FORM ELEMENTS ====================
		// getByTestId() requiere testIdAttribute: 'data-test' en playwright.config.js
		this.emailField = page.getByTestId("email")
		this.passwordField = page.getByTestId("password")
		// getByRole es preferido sobre selectores CSS como "input.btnSubmit"
		this.logInButton = page.getByRole("button", { name: "Login" })
	}

	// ==================== NAVIGATION METHODS ====================

	/**
	 * Navigate to sign in page
	 */
	async navigateToSignIn() {
		await this.goto(`${URLS.BASE}${URLS.SIGN_IN}`)
	}

	// ==================== FORM INTERACTION METHODS ====================

	/**
	 * Fill email field with specified email
	 * @param {string} email - Email address to input
	 */
	async fillEmail(email) {
		await this.emailField.fill(email)
	}

	/**
	 * Fill password field with specified password
	 * @param {string} password - Password to input
	 */
	async fillPassword(password) {
		await this.passwordField.fill(password)
	}

	/**
	 * Click login button to submit form
	 */
	async clickLogInButton() {
		await this.logInButton.click()
	}

	// ==================== COMPOSITE METHODS ====================

	/**
	 * Complete login flow with email and password
	 * @param {string} email - User email address
	 * @param {string} password - User password
	 */
	async logIn(email, password) {
		await this.fillEmail(email)
		await this.fillPassword(password)
		await this.clickLogInButton()
		await this.waitForUrl("**/account", { timeout: 15000 })
	}
}
