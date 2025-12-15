import { test as base } from "@playwright/test"
import { pages } from "../../../po/index.js"
import { generateValidUser } from "../../utils/testData"

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
		const signUpPage = pages("signup", page)
		const signInPage = pages("signin", page)
		const myAccountPage = pages("myaccount", page)

		// Generate unique test user data
		const user = generateValidUser()

		console.log(`🆕 Creating test user: ${user.email}`)

		// Complete user registration process
		await signUpPage.navigateToSignUp()
		await signUpPage.completeRegistration(user)

		// Perform automatic authentication
		await signInPage.logIn(user.email, user.password)
		await myAccountPage.waitForUserNameVisible()

		// Provide authenticated page context to test
		await use(page)
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
		const signUpPage = pages("signup", page)
		const signInPage = pages("signin", page)
		const myAccountPage = pages("myaccount", page)

		// Generate and register unique user account
		const user = generateValidUser()
		console.log(`🆕 Creating test user: ${user.email}`)

		await signUpPage.navigateToSignUp()
		await signUpPage.completeRegistration(user)

		// Authenticate with generated credentials
		await signInPage.logIn(user.email, user.password)
		await myAccountPage.waitForUserNameVisible()

		// Provide complete authenticated context to test
		await use({ page, user })
	}
})

// Re-export expect for consistent test syntax
export { expect } from "@playwright/test"
