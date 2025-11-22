import { test, expect } from "../../configs/playwrightConfigs/fixtures/auth.fixture";
import { pages } from "../../po/index.js";
import { validProfileUpdate, invalidProfileUpdate } from "../../configs/utils/testData";

test.describe("User Profile", () => {

  /**
   * Test successful profile information update
   * Validates that users can update their phone number with valid data
   */  
  test("Successful update of profile information", async ({ authenticatedPage }) => {
    const myAccountPage = pages('myaccount', authenticatedPage);
    const profilePage = pages('profile', authenticatedPage);

    // Navigate to profile and update phone number    
    await myAccountPage.accessToProfile();
    await profilePage.updatePhoneNumber(validProfileUpdate.phone);

    // Verify successful update
    await expect(profilePage.successMessage).toBeVisible({ timeout: 10000 });
    await expect(profilePage.phoneField).toHaveValue(validProfileUpdate.phone);
  });

  /**
   * Test unsuccessful profile information update
   * Validates error handling for invalid phone number data
   */
  test("Unsuccessful update of profile information", async ({ authenticatedPage }) => {
    const myAccountPage = pages('myaccount', authenticatedPage);
    const profilePage = pages('profile', authenticatedPage);

    // Navigate to profile and attempt invalid update
    await myAccountPage.accessToProfile();
    await profilePage.updatePhoneNumber(invalidProfileUpdate.phone);

    // Verify error message and unchanged phone field
    await expect(profilePage.errorMessage).toBeVisible({ timeout: 10000 });
    await expect(profilePage.phoneField).toHaveValue(validProfileUpdate.phone);
  });
});