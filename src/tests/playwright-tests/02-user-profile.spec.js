import { test, expect } from "@playwright/test"
import { pages } from "../../po/index.js"
import {
	validProfileUpdate,
	invalidProfileUpdate
} from "../../configs/utils/testData"

test.describe("User Profile", () => {
	test("Successful update of profile information", async ({ page }) => {
		await page.goto("https://practicesoftwaretesting.com/account", {
			waitUntil: "domcontentloaded"
		})

		const myAccountPage = pages("myaccount", page)
		const profilePage = pages("profile", page)
		await myAccountPage.accessToProfile()
		await profilePage.updatePhoneNumber(validProfileUpdate.phone)

		await expect(profilePage.successMessage).toBeVisible({ timeout: 10000 })
		await expect(profilePage.phoneField).toHaveValue(validProfileUpdate.phone)
	})

	test("Unsuccessful update of profile information", async ({ page }) => {
		await page.goto("https://practicesoftwaretesting.com/account", {
			waitUntil: "domcontentloaded"
		})

		const myAccountPage = pages("myaccount", page)
		const profilePage = pages("profile", page)
		await myAccountPage.accessToProfile()
		await profilePage.waitForProfileDataLoaded()
		const originalPhone = await profilePage.getPhoneValue()

		await profilePage.updatePhoneNumber(invalidProfileUpdate.phone)

		await expect(profilePage.errorMessage).toBeVisible({ timeout: 15000 })
		await expect(profilePage.phoneField).toHaveValue(originalPhone, { timeout: 5000 })
	})
})
