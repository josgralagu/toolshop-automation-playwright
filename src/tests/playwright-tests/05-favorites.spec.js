import { test, expect } from "@playwright/test";
import { pages } from "../../po/index.js";
import { createAndLoginUser } from "../../configs/utils/userHelpers";
import { goToProductDetail } from "../../configs/utils/commands";
import { searchProducts, generateValidUser } from "../../configs/utils/testData";


test.describe("Favorite Products", () => {

  /**
   * Test removing a product from favorites list
   * Validates complete favorites management workflow
   */
  test("Remove a product from favorites", async ({ page }) => {
    const user = generateValidUser();

    // Create user and login
    await createAndLoginUser(page, user);

    // Add product to favorites
    await goToProductDetail(page, searchProducts[0]);
    const detailPage = pages('productdetail', page);
    await detailPage.addProductToFavorites();

    // Navigate to favorites and remove product
    const myAccount = pages('myaccount', page);
    const favPage = pages('favorites', page);
    await myAccount.openUserMenu();
    await myAccount.goToMyFavorites();
    await favPage.waitForFavoritesLoad();
    await favPage.deleteFirstFavorite();

    // Verify favorites list is empty
    expect(await favPage.isEmpty()).toBe(true);
  });

  /**
   * Test adding to favorites without authentication
   * Validates authentication requirement for favorites functionality
   */
  test("Add to favorites without auth", async ({ page }) => {
    // Attempt to add to favorites without login
    await goToProductDetail(page, searchProducts[0]);
    const detailPage = pages('productdetail', page);
    await detailPage.clickAddToFavorites();
    
    // Verify error message and page remains on product detail
    await expect(detailPage.favErrorMessage).toBeVisible();
    await expect(page).toHaveURL(/\/product\//);
  });
});