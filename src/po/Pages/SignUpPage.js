import { BasePage } from "./BasePage.js"
import { URLS } from "../../configs/utils/constants.js"

/**
 * Sign Up Page Object
 * Handles user registration and account creation
 * Provides methods to fill registration form and complete user creation process
 */
export class SignUpPage extends BasePage {
	constructor(page) {
		super(page)

		this.timeout = process.env.CI ? 180000 : 30000

		// ==================== REGISTRATION FORM ELEMENTS ====================
		// getByLabel es la práctica recomendada para inputs de formulario,
		// ya que refleja cómo los usuarios y lectores de pantalla identifican los campos.
		// getByTestId se usa como fallback donde no hay label asociado claro.
		this.firstNameField = page.getByLabel("First name")
		this.lastNameField = page.getByLabel("Last name")
		this.dateOfBirthField = page.getByTestId("dob")
		this.streetField = page.getByLabel("Street")
		this.postalCodeField = page.getByTestId("postal_code")
		this.houseNumberField = page.getByLabel("House number")
		this.cityField = page.getByLabel("City")
		this.stateField = page.getByLabel("State")
		// <select> sin label semántico claro → getByRole con name o getByTestId
		this.countryDropdown = page.getByRole("combobox", { name: /country/i })
		this.phoneField = page.getByLabel("Phone")
		this.emailField = page.getByLabel("Email address")
		this.passwordField = page.getByLabel("Password")
		this.registerButton = page.getByRole("button", { name: "Register" })
	}

	// ==================== NAVIGATION METHODS ====================

	/**
	 * Navigate to sign up page
	 */
	async navigateToSignUp() {
		await this.goto(`${URLS.BASE}${URLS.SIGN_UP}`)
	}

	// ==================== REGISTRATION METHODS ====================

	/**
	 * Complete user registration with provided data
	 * @param {object} userData - User registration data object
	 */
	async completeRegistration(userData) {
		const fields = [
			{ locator: this.firstNameField, value: userData.firstName },
			{ locator: this.lastNameField, value: userData.lastName },
			{ locator: this.dateOfBirthField, value: userData.dateOfBirth },
			{ locator: this.streetField, value: userData.address },
			{ locator: this.postalCodeField, value: userData.postcode },
			{ locator: this.houseNumberField, value: userData.houseNumber },
			{ locator: this.cityField, value: userData.city },
			{ locator: this.stateField, value: userData.state },
			{ locator: this.phoneField, value: userData.phone },
			{ locator: this.emailField, value: userData.email },
			{ locator: this.passwordField, value: userData.password }
		]

		for (const { locator, value } of fields) {
			await locator.fill(value)
		}

		await this.countryDropdown.selectOption(userData.country)
		await this.registerButton.click()

		await this.waitForUrl("**/auth/login", {
			waitUntil: "load",
			timeout: 30000
		})
	}
}
