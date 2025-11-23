import { URLS } from "../../configs/utils/constants.js";

/**
 * Sign Up Page Object
 * Handles user registration and account creation
 * Provides methods to fill registration form and complete user creation process
 */
export class SignUpPage {
  constructor(page) {
    this.page = page;

    // ==================== REGISTRATION FORM ELEMENTS ====================
    this.firstNameField = page.getByPlaceholder('First name *');
    this.lastNameField = page.getByPlaceholder('Your last name *');
    this.dateOfBirthField = page.getByPlaceholder('YYYY-MM-DD');
    this.streetField = page.getByPlaceholder('Your Street *');
    this.postalCodeField = page.getByPlaceholder('Your Postcode *');
    this.cityField = page.getByPlaceholder('Your City *');
    this.stateField = page.getByPlaceholder('Your State *');
    this.countryDropdown = page.locator('#country');
    this.phoneField = page.getByPlaceholder('Your phone *');
    this.emailField = page.getByPlaceholder('Your email *');
    this.passwordField = page.getByPlaceholder('Your password');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  // ==================== NAVIGATION METHODS ====================

  /**
   * Navigate to sign up page
   */
  async navigateToSignUp() {
    await this.page.goto(`${URLS.BASE}${URLS.SIGN_UP}`);
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
      { locator: this.cityField, value: userData.city },
      { locator: this.stateField, value: userData.state },
      { locator: this.phoneField, value: userData.phone },
      { locator: this.emailField, value: userData.email },
      { locator: this.passwordField, value: userData.password },
    ];

    // Fill all form fields with user data
    for (const { locator, value } of fields) {
      await locator.fill(value);
    }

    // Select country from dropdown and submit registration
    await this.countryDropdown.selectOption(userData.country);
    await this.registerButton.waitFor({ state: "visible", timeout: 10000 });
    await this.registerButton.click();

    // Wait for redirect to login page after successful registration
    await this.page.waitForURL('**/auth/login', { waitUntil: 'load', timeout: 30000 });
  }
}