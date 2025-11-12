import { test, expect } from "@playwright/test";
import { createAndLoginUser } from "../../../utils/userHelpers";
import { goToProductDetail } from "../../../utils/commands";
import { MyAccountPage } from "../Pages/MyAccountPage";
import { FavoritesPage } from "../Pages/FavoritesPage";
import { ProductDetailPage } from "../Pages/ProductDetailPage";
import { searchProducts } from "../../../utils/testData";
import { generateValidUser } from "../../../utils/testData";

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
    const detailPage = new ProductDetailPage(page);
    await detailPage.addProductToFavorites();

    // Navigate to favorites and remove product
    const myAccount = new MyAccountPage(page);
    const favPage = new FavoritesPage(page);
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
    const detailPage = new ProductDetailPage(page);
    await detailPage.clickAddToFavorites();
    
    // Verify error message and page remains on product detail
    await expect(detailPage.favErrorMessage).toBeVisible();
    await expect(page).toHaveURL(/\/product\//);
  });
});