import { test, expect } from "../../configs/playwrightConfigs/fixtures/auth.fixture";
import { pages } from "../../po/index.js";
import { goToProductDetail } from "../../configs/utils/commands";
import { searchProducts } from "../../configs/utils/testData";


test.describe("Favorite Products", () => {

  /**
   * Test removing a product from favorites list
   * Validates complete favorites management workflow
   */
  test("Remove a product from favorites", async ({ authenticatedPage }) => {

    // Add product to favorites
    await goToProductDetail(authenticatedPage, searchProducts[0]);
    const detailPage = pages('productdetail', authenticatedPage);
    await detailPage.addProductToFavorites();

    // Navigate to favorites and remove product
    const myAccount = pages('myaccount', authenticatedPage);
    const favPage = pages('favorites', authenticatedPage);
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