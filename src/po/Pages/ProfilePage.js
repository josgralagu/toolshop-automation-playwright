import { BasePage } from "./BasePage.js"
import { expect } from "@playwright/test"

/**
 * Profile Page Object
 * Handles interactions and data management on the user profile page
 */
export class ProfilePage extends BasePage {
	constructor(page) {
		super(page)

		this.firstNameField = page.getByTestId("first-name")
		this.lastNameField = page.getByTestId("last-name")
		this.emailField = page.getByTestId("email")
		this.phoneField = page.getByTestId("phone")
		this.updateProfileButton = page.getByTestId("update-profile-submit")

		this.successMessage = page
			.getByRole("alert")
			.filter({ hasText: /successfully updated/i })
		this.errorMessage = page
			.getByRole("alert")
			.filter({
				hasText: /phone field must not be greater than 24 characters/i
			})
	}

	// ==================== FORM INTERACTION METHODS ====================

	/**
	 * Fill phone number field.
	 * fill() auto-waits for visibility — no explicit waitFor needed.
	 * @param {string} number
	 */
	async fillPhoneNumber(number) {
		await this.phoneField.fill(number)
	}

	/**
	 * Submit profile changes.
	 * click() auto-waits for visibility and enabled state.
	 */
	async submitProfileChanges() {
		await this.updateProfileButton.click()
	}

	// ==================== WAIT METHODS ====================

	/**
	 * Wait for profile data to load completely.
	 *
	 * Espera a que el campo phone sea visible y Angular haya populado
	 * los datos del usuario. Sin esta espera, fill() podría escribir
	 * sobre un campo aún vacío.
	 */
	async waitForProfileDataLoaded() {
	await this.phoneField.waitFor({
		state: "visible",
		timeout: 10000,
	})

	// Synchronization wait:
	// wait until Angular hydrates profile data into the form
	await expect(this.phoneField).not.toHaveValue("", {
		timeout: 10000,
	})
}

	// ==================== COMPOSITE METHODS ====================

	/**
	 * Complete phone number update flow
	 * @param {string} number
	 * @param {boolean} autoSubmit
	 */
	async updatePhoneNumber(number, autoSubmit = true) {
		await this.waitForProfileDataLoaded()
		await this.phoneField.clear()
		await this.fillPhoneNumber(number)
		if (autoSubmit) {
			await this.submitProfileChanges()
		}
	}
}
