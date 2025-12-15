import { expect, assert, should } from "chai"
import { expect as pwExpect, chromium, firefox, webkit } from "@playwright/test"
import { pages } from "../../po/index.js"
import { generateValidUser } from "../utils/testData.js"

// ====================================================================
// MOCHA SETUP & HOOKS
// ====================================================================
// Global setup for all Mocha tests with Chai assertions
// Configures timeouts, global test utilities, and browser helpers
// Supports all 3 Chai interfaces: expect, should, assert
// ====================================================================

/**
 * Make expect available globally for all tests
 */
global.expect = expect

/**
 * Make assert available globally for all tests
 */
global.assert = assert

/**
 * Enable should interface globally
 */
should()

// ====================================================================
// BROWSER UTILITIES
// ====================================================================

/**
 * Initialize Playwright browser instance
 * Called once per test to create fresh browser context
 *
 * @returns {Promise<Object>} Object containing { browser, context, page }
 */
export async function initializeBrowser(browserType = "chromium") {
	const browsers = { chromium: chromium, firefox: firefox, webkit: webkit }

	const browser = await browsers[browserType].launch({ headless: false })

	const context = await browser.newContext({
		baseURL: "https://practicesoftwaretesting.com",
		viewport: { width: 1920, height: 1080 }
	})

	const page = await context.newPage()

	return { browser, context, page }
}

/**
 * Close browser and context after test
 * Ensures clean state between tests
 *
 * @param {Object} params - { browser, context }
 */
export async function closeBrowser({ browser, context }) {
	if (context) {
		await context.close()
	}
	if (browser) {
		await browser.close()
	}
}

/**
 * Create an authenticated page for tests that require login
 * Handles signup + signin flow automatically
 *
 * @param {Page} page - Playwright page instance
 * @returns {Promise<Object>} Object containing { page, user }
 */
export async function getAuthenticatedPage(page) {
	const signUpPage = pages("signup", page)
	const signInPage = pages("signin", page)
	const myAccountPage = pages("myaccount", page)

	const user = generateValidUser()
	console.log(`🆕 Creating test user: ${user.email}`) // eslint-disable-line no-console

	await signUpPage.navigateToSignUp()
	await signUpPage.completeRegistration(user)

	await signInPage.logIn(user.email, user.password)
	await myAccountPage.waitForUserNameVisible()

	return { page, user }
}

export { pwExpect }
