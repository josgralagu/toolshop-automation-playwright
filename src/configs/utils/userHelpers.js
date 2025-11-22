import { pages } from "../../po/index.js";

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
  const signUpPage = pages('signup', page);
  const signInPage = pages('signin', page);
  const myAccountPage = pages('myaccount', page);

  await signUpPage.navigateToSignUp();
  await signUpPage.completeRegistration(userData);
  await signInPage.logIn(userData.email, userData.password);
  await myAccountPage.waitForUserNameVisible();

  return userData;
}