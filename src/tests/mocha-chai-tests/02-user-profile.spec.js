import { updateProfilePhoneNumber } from "../../configs/utils/commands.js"
import {
	validProfileUpdate,
	invalidProfileUpdate,
	generateValidUser
} from "../../configs/utils/testData.js"
import {
	initializeBrowser,
	closeBrowser,
	getAuthenticatedPage,
	pwExpect
} from "../../configs/mochaConfigs/setup.js"
import { pages } from "../../po/index.js"

// ====================================================================
// USER PROFILE TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for user profile information updates
// Uses Mocha as test runner, Playwright & Chai for assertions, Playwright for automation
// Chai Interfaces: EXPECT (value comparisons).

// ====================================================================
const BROWSERS = ["chromium" /*, 'firefox', 'webkit'*/]

BROWSERS.forEach((browserName) => {
	describe(`User Profile [${browserName}]`, function () {
		let browserContext

		// Setup before each test - initialize browser and authenticate
		beforeEach(async function () {
			browserContext = await initializeBrowser(browserName)
			const { page } = browserContext
			const authenticatedContext = await getAuthenticatedPage(page)
			browserContext.page = authenticatedContext.page
		})

		// Cleanup after each test - close browser
		afterEach(async function () {
			await closeBrowser(browserContext)
		})

		/**
		 * Test successful profile information update
		 * Validates that users can update their phone number with valid data
		 *
		 * Interfaces used:
		 * - EXPECT: Verify value matches expected result (fluent style)
		 */
		it("Successful update of profile information", async function () {
			const { page } = browserContext

			// Navigate to profile and perform valid update using command
			await updateProfilePhoneNumber(page, validProfileUpdate.phone)

			// Verify successful update
			const profilePage = pages("profile", page)
			await pwExpect(profilePage.successMessage).toBeVisible({
				timeout: 10000
			})
			await pwExpect(profilePage.phoneField).toHaveValue(
				validProfileUpdate.phone
			)
		})

		/**
		 * Test unsuccessful profile information update
		 * Validates error handling for invalid phone number data
		 *
		 * Interfaces used:
		 * - EXPECT: Verify valid phone value is shown in field
		 */
		it("Unsuccessful update of profile information", async function () {
			const { page } = browserContext

			// Navigate to profile and attempt invalid update using command
			await updateProfilePhoneNumber(page, invalidProfileUpdate.phone)

			// Verify error message and unchanged phone field
			const profilePage = pages("profile", page)
			await pwExpect(profilePage.errorMessage).toBeVisible({
				timeout: 15000
			})
			await pwExpect(profilePage.phoneField).toHaveValue(
				generateValidUser().phone,
				{ timeout: 1000 }
			)
		})
	})
})
