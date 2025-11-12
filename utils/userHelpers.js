import { SignUpPage } from "../src/po/Pages/SignUpPage";
import { SignInPage } from "../src/po/Pages/SignInPage";
import { MyAccountPage } from "../src/po/Pages/MyAccountPage";

// ====================================================================
// USER MANAGEMENT HELPER FUNCTIONS
// ====================================================================
// User lifecycle management utilities for test scenarios
// Handles complete user creation and authentication workflows
// ====================================================================

/**
 * Complete user creation and authentication workflow
 * Combines registration and login into single operation
 * 
 * @param {Page} page - Playwright page object
 * @param {Object} userData - Complete user profile data
 * @returns {Object} Original user data for test reference
 */
export async function createAndLoginUser(page, userData) {
  const signUpPage = new SignUpPage(page);
  const signInPage = new SignInPage(page);
  const myAccountPage = new MyAccountPage(page);

  await signUpPage.navigateToSignUp();
  await signUpPage.completeRegistration(userData);
  await signInPage.logIn(userData.email, userData.password);
  await myAccountPage.waitForUserNameVisible();

  return userData;
}