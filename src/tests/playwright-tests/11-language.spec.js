import { test, expect } from "@playwright/test";
import { pages } from "../../po/index.js";
import { changeLanguageAndGetTranslations, validateNavigationElements, validateLabelsAndText, validateFormTranslations } from "../../configs/utils/commands";
import { LANGUAGES } from "../../configs/utils/testData";

test.describe("Feature: Language Change on Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    const contactPage = pages('contact', page);
    await contactPage.navigate();
  });

  LANGUAGES.forEach(langCode => {
    test(`Change language to ${langCode}`, async ({ page }) => {
      // Change language and get translations
      const translations = await changeLanguageAndGetTranslations(page, langCode);

      // Validate form labels, placeholders and submit button
      const errors = await validateFormTranslations(page, translations);
      expect(errors, `Validation failed for ${langCode}`).toEqual([]);

      // Validate navigation elements
      await validateNavigationElements(page, translations);

      // Validate labels and text
      await validateLabelsAndText(page, translations);

      // Validate selected language in dropdown
      const actualLanguage = await pages('contact', page).navigationBar.getCurrentLanguage();
      expect(actualLanguage.toUpperCase()).toContain(langCode);
    });
  });
});