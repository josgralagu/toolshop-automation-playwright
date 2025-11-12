import { test, expect } from "@playwright/test";
import { ContactPage } from "../Pages/ContactPage";
import { 
  validateContactFormLabels, 
  validateContactFormPlaceholders, 
  validateContactSubmitButton 
} from "../../../utils/commands";
import { languageMap } from "../../../utils/testData";

const LANGUAGES = ["DE", "EN", "ES", "FR", "NL", "TR"];

test.describe("Feature: Language Change on Contact Page", () => {

  /**
   * Setup before each test - navigate to contact page
   */
  test.beforeEach(async ({ page }) => {
    const contactPage = new ContactPage(page);
    await contactPage.navigate();
  });

  /**
   * Test language change functionality for all supported languages
   * Validates that all UI elements translate correctly
   */
  for (const langCode of LANGUAGES) {
    test(`Change language to ${langCode}`, async ({ page }) => {
      const contactPage = new ContactPage(page);
      const translations = languageMap.contactTranslations[langCode];

      // Change language using page object
      await contactPage.changeLanguage(langCode);

      // Validate form labels translation
      const labelErrors = await validateContactFormLabels(page, translations);
      expect(labelErrors, `Form labels validation failed for ${langCode}`).toEqual([]);

      // Validate form placeholders translation
      const placeholderErrors = await validateContactFormPlaceholders(page, translations);
      expect(placeholderErrors, `Placeholders validation failed for ${langCode}`).toEqual([]);

      // Validate submit button translation
      const buttonErrors = await validateContactSubmitButton(page, translations);
      expect(buttonErrors, `Submit button validation failed for ${langCode}`).toEqual([]);

      // Validate navigation elements translation
      await expect(contactPage.mainHeading).toHaveText(translations.mainHeading);
      await expect(contactPage.homeLink).toHaveText(translations.homeLink);
      await expect(contactPage.categoriesLink).toHaveText(translations.categoriesLink);
      await expect(contactPage.contactLink).toHaveText(translations.contactLink);
      await expect(contactPage.signInLink).toHaveText(translations.signInLink);

      // Validate warning label translation (partial match)
      await expect(contactPage.warningLabel).toContainText(translations.warningLabel.substring(0, 30));

      // Validate info label translation (partial match)
      const infoText = await contactPage.getNormalizedInfoText();
      expect(infoText).toContain(translations.infoLabel.substring(0, 60).replace(/\s+/g, ' ').trim());

      // Validate selected language in dropdown
      const actualLanguage = await contactPage.getCurrentLanguage();
      expect(actualLanguage.toUpperCase()).toContain(langCode);
    });
  }
});