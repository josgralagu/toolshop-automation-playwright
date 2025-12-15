import {
	test,
	expect
} from "../../configs/playwrightConfigs/fixtures/auth.fixture"
import { pages } from "../../po/index.js"
import { updateProfilePhoneNumber } from "../../configs/utils/commands.js"
import {
	validProfileUpdate,
	invalidProfileUpdate,
	generateValidUser
} from "../../configs/utils/testData"

test.describe("User Profile", () => {
	/**
	 * Test successful profile information update
	 * Validates that users can update their phone number with valid data
	 */
	test("Successful update of profile information", async ({
		authenticatedPage
	}) => {
		// Navigate to profile and perform valid update
		await updateProfilePhoneNumber(
			authenticatedPage,
			validProfileUpdate.phone
		)

		// Verify successful update
		const profilePage = pages("profile", authenticatedPage)
		await expect(profilePage.successMessage).toBeVisible({ timeout: 10000 })
		await expect(profilePage.phoneField).toHaveValue(
			validProfileUpdate.phone
		)
	})

	/**
	 * Test unsuccessful profile information update
	 * Validates error handling for invalid phone number data
	 */
	test("Unsuccessful update of profile information", async ({
		authenticatedPage
	}) => {
		// Navigate to profile and attempt invalid update
		await updateProfilePhoneNumber(
			authenticatedPage,
			invalidProfileUpdate.phone
		)

		// Verify error message and unchanged phone field
		const profilePage = pages("profile", authenticatedPage)
		await expect(profilePage.errorMessage).toBeVisible({ timeout: 15000 })
		await expect(profilePage.phoneField).toHaveValue(
			generateValidUser().phone,
			{ timeout: 1000 }
		)
	})
})
