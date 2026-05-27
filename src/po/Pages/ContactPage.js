import { BasePage } from "./BasePage.js"

export class ContactPage extends BasePage {
	constructor(page) {
		super(page)

		// ==================== MAIN CONTENT ELEMENTS ====================
		this.mainHeading = page.getByRole("heading", { level: 3 })

		// ==================== FORM LABEL ELEMENTS ====================
		// Los labels se localizan por su atributo `for`, que los vincula al input.
		// getByRole("label") no existe en Playwright — se mantiene locator con atributo for.
		this.firstNameLabel = page.locator('label[for="first_name"]')
		this.lastNameLabel = page.locator('label[for="last_name"]')
		this.emailLabel = page.locator('label[for="email"]')
		this.subjectLabel = page.locator('label[for="subject"]')
		this.messageLabel = page.locator('label[for="message"]')
		this.attachmentLabel = page.locator('label[for="attachment"]')

		// ==================== FORM INPUT ELEMENTS ====================
		// getByLabel es la práctica recomendada para inputs con label asociado
		this.firstNameInput = page.getByLabel("First name")
		this.lastNameInput = page.getByLabel("Last name")
		this.emailInput = page.getByLabel("Email address")
		// getByRole("combobox") para selects con nombre accesible
		this.subjectSelect = page.getByRole("combobox", { name: /subject/i })
		this.messageTextarea = page.getByLabel("Message")

		// ==================== BUTTON AND MESSAGE ELEMENTS ====================
		this.submitButton = page.getByTestId("contact-submit")
		this.warningLabel = page.locator("#attachmentHelp")

		// Selector robusto para el info label
		this.infoLabel = page.locator(
			'p:has(a[href*="github.com/testsmith-io/practice-software-testing"])'
		)
	}

	// ==================== NAVIGATION METHODS ====================

	/**
	 * Navigate to contact page and wait for load completion
	 */
	async navigate() {
		await this.page.goto("https://practicesoftwaretesting.com/contact")
		await this.page.waitForLoadState("domcontentloaded")
		await this.firstNameInput.waitFor({ state: "visible", timeout: 15000 })
	}

	// ==================== UTILITY METHODS ====================

	/**
	 * Get normalized info text with extra spaces removed
	 * @returns {Promise<string>} Normalized info text
	 */
	async getNormalizedInfoText() {
		const text = await this.infoLabel.textContent()
		return text.replace(/\s+/g, " ").trim()
	}
}
