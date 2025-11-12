import { test as base } from '@playwright/test';
import { SignUpPage } from '../po/Pages/SignUpPage';
import { SignInPage } from '../po/Pages/SignInPage';
import { MyAccountPage } from '../po/Pages/MyAccountPage';
import { generateValidUser } from '../../utils/testData';

// ====================================================================
// AUTHENTICATION TEST FIXTURES
// ====================================================================
// Provides pre-authenticated test contexts to eliminate test dependencies
// and ensure each test runs with a fresh, isolated user state
// ====================================================================

/**
 * Primary test fixture providing authenticated page context
 * 
 * Features:
 * - Generates unique user for each test execution
 * - Handles complete registration and authentication flow
 * - Ensures test isolation and independence
 * - Reduces test flakiness in parallel execution environments
 * 
 * Usage: test('test name', async ({ authenticatedPage }) => { ... })
 */
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    const signInPage = new SignInPage(page);
    const myAccountPage = new MyAccountPage(page);
    
    // Generate unique test user data  
    const user = generateValidUser();
    
    console.log(`🆕 Creating test user: ${user.email}`);
    
    // Complete user registration process    
    await signUpPage.navigateToSignUp();
    await signUpPage.completeRegistration(user);
    
    // Perform automatic authentication
    await signInPage.logIn(user.email, user.password);
    await myAccountPage.waitForUserNameVisible();
    
    // Provide authenticated page context to test
    await use(page);
  },

  /**
   * Extended fixture providing both page context and user data
   * 
   * Designed for tests requiring access to user credentials or profile data
   * 
   * Usage: test('test name', async ({ authenticatedUser }) => {
   *   const { page, user } = authenticatedUser;
   * })
   */
  authenticatedUser: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    const signInPage = new SignInPage(page);
    const myAccountPage = new MyAccountPage(page);
    
    // Generate and register unique user account
    const user = generateValidUser();
    console.log(`🆕 Creating test user: ${user.email}`);
    
    await signUpPage.navigateToSignUp();
    await signUpPage.completeRegistration(user);
    
    // Authenticate with generated credentials    
    await signInPage.logIn(user.email, user.password);
    await myAccountPage.waitForUserNameVisible();
    
    // Provide complete authenticated context to test
    await use({ page, user });
  },
});

// Re-export expect for consistent test syntax
export { expect } from '@playwright/test';