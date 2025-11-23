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
      // Cambiar idioma y obtener traducciones
      const translations = await changeLanguageAndGetTranslations(page, langCode);

      // Validar form labels, placeholders y submit button
      const errors = await validateFormTranslations(page, translations);
      expect(errors, `Validation failed for ${langCode}`).toEqual([]);

      // Validar elementos de navegación
      await validateNavigationElements(page, translations);

      // Validar labels y texto
      await validateLabelsAndText(page, translations);

      // Validar idioma seleccionado en el dropdown
      const actualLanguage = await pages('contact', page).navigationBar.getCurrentLanguage();
      expect(actualLanguage.toUpperCase()).toContain(langCode);
    });
  });
});