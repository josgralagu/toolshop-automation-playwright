import { MyAccountPage } from '../src/po/Pages/MyAccountPage.js';
import { ProfilePage } from '../src/po/Pages/ProfilePage.js';
import { validProfileUpdate, invalidProfileUpdate } from '../utils/testData.js';
import { initializeBrowser, closeBrowser, getAuthenticatedPage, pwExpect } from './setup.js';

// ====================================================================
// USER PROFILE TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for user profile information updates
// Uses Mocha as test runner, Playwright & Chai for assertions, Playwright for automation
// Chai Interfaces: EXPECT (value comparisons).

// ====================================================================
const BROWSERS = ['chromium', 'firefox', 'webkit'];

BROWSERS.forEach(browserName => {
  describe(`User Profile [${browserName}]`, function () {

    let browserContext;

    // Setup before each test - initialize browser and authenticate
    beforeEach(async function () {
      browserContext = await initializeBrowser(browserName);
      const { page } = browserContext;
      const authenticatedContext = await getAuthenticatedPage(page);
      browserContext.page = authenticatedContext.page;
    });

    // Cleanup after each test - close browser
    afterEach(async function () {
      await closeBrowser(browserContext);
    });

    /**
     * Test successful profile information update
     * Validates that users can update their phone number with valid data
     * 
     * Interfaces used:
     * - EXPECT: Verify value matches expected result (fluent style)
     */
    it('Successful update of profile information', async function () {
      const { page } = browserContext;
      const myAccountPage = new MyAccountPage(page);
      const profilePage = new ProfilePage(page);

      // Navigate to profile and update phone number
      await myAccountPage.accessToProfile();
      await profilePage.updatePhoneNumber(validProfileUpdate.phone);

      // PLAYWRIGHT EXPECT: Verify element is visible
      await pwExpect(profilePage.successMessage).toBeVisible({ timeout: 10000 });

      // CHAI EXPECT: Verify the value was correctly updated (fluent comparison)
      const phoneValue = await profilePage.phoneField.inputValue();
      expect(phoneValue).to.equal(validProfileUpdate.phone);
    });

    /**
     * Test unsuccessful profile information update
     * Validates error handling for invalid phone number data
     * 
     * Interfaces used:
     * - EXPECT: Verify valid phone value is shown in field
     */
    it('Unsuccessful update of profile information', async function () {
      const { page } = browserContext;
      const myAccountPage = new MyAccountPage(page);
      const profilePage = new ProfilePage(page);

      // Navigate to profile and attempt invalid update
      await myAccountPage.accessToProfile();
      await profilePage.updatePhoneNumber(invalidProfileUpdate.phone);

      // PLAYWRIGHT EXPECT: Verify element is visible
      await pwExpect(profilePage.errorMessage).toBeVisible({ timeout: 15000 });

      // CHAI EXPECT: Verify phone field shows the valid value that was loaded at the beginning (fluent comparison)
      const phoneValue = await profilePage.phoneField.inputValue();
      expect(phoneValue).to.equal(validProfileUpdate.phone);
    });
  });
});