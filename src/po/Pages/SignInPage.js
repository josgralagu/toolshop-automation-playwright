import { URLS } from "../../configs/utils/constants.js";

/**
 * Sign In Page Object
 * Handles user authentication and login functionality
 * Provides methods to fill login form and complete authentication process
 */
export class SignInPage {
  constructor(page) {
    this.page = page;

    // ==================== LOGIN FORM ELEMENTS ====================
    this.emailField = page.getByPlaceholder('Your email');
    this.passwordField = page.getByPlaceholder('Your password');
    this.logInButton = page.locator('input.btnSubmit');
  } 

  // ==================== NAVIGATION METHODS ====================

  /**
   * Navigate to sign in page
   */
  async navigateToSignIn() {
    await this.page.goto(`${URLS.BASE}${URLS.SIGN_IN}`);
  }

  // ==================== FORM INTERACTION METHODS ====================

  /**
   * Fill email field with specified email
   * @param {string} email - Email address to input
   */
  async fillEmail(email) {
    await this.emailField.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailField.fill(email);
  }

  /**
   * Fill password field with specified password
   * @param {string} password - Password to input
   */
  async fillPassword(password) {
    await this.passwordField.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordField.fill(password);
  }

  /**
   * Click login button to submit form
   */
  async clickLogInButton() {
    await this.logInButton.waitFor({ state: "visible", timeout: 15000 });
    await this.logInButton.click();
  }

  // ==================== COMPOSITE METHODS ====================

  /**
   * Complete login flow with email and password
   * @param {string} email - User email address
   * @param {string} password - User password
   */
  async logIn(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogInButton();
    await this.page.waitForURL('**/account', { timeout: 15000 });
  }
}