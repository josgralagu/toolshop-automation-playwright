import { test, expect } from "@playwright/test"
import { pages } from "../../po/index.js"
import { goToProductDetail } from "../../configs/utils/commands"
import { searchProducts } from "../../configs/utils/testData"

test.describe("Favorite Products", () => {
	test("Remove a product from favorites", async ({ page }) => {
		await goToProductDetail(page, searchProducts[0])
		const detailPage = pages("productdetail", page)
		await detailPage.addProductToFavorites()

		const myAccount = pages("myaccount", page)
		const favPage = pages("favorites", page)
		await myAccount.goToMyFavorites()
		await favPage.waitForFavoritesLoad()
		await favPage.deleteFirstFavorite()

		await expect(favPage.productName).toHaveCount(0, { timeout: 10000 })
		expect(await favPage.isEmpty()).toBe(true)
	})

	test.describe("Unauthenticated", () => {
		test.use({ storageState: { cookies: [], origins: [] } })

		test("Add to favorites without auth", async ({ page }) => {
			await goToProductDetail(page, searchProducts[0])
			const detailPage = pages("productdetail", page)
			await detailPage.clickAddToFavorites()

			await expect(detailPage.favErrorMessage).toBeVisible()
			await expect(page).toHaveURL(/\/product\//)
		})
	})
})
