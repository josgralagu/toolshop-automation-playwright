import { pages } from '../../po/index.js';
import { changeLanguageAndGetTranslations, validateNavigationElements, validateLabelsAndText, validateFormTranslations } from '../../configs/utils/commands.js';
import { LANGUAGES } from '../../configs/utils/testData.js';
import { initializeBrowser, closeBrowser, pwExpect } from '../../configs/mochaConfigs/setup.js';

// ====================================================================
// FEATURE: LANGUAGE CHANGE ON CONTACT PAGE TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for language/internationalization functionality
// Uses Mocha as test runner, Chai for assertions, Playwright for automation
// ====================================================================
const BROWSERS = ['chromium', 'firefox', 'webkit'];

BROWSERS.forEach(browserName => {
  describe(`Feature: Language Change on Contact Page [${browserName}]`, function () {

    let browserContext;

    // Setup before each test - initialize browser and navigate to contact page
    beforeEach(async function () {
      browserContext = await initializeBrowser(browserName);
      const { page } = browserContext;
      const contactPage = pages('contact', page);
      await contactPage.navigate();
    });

    // Cleanup after each test - close browser
    afterEach(async function () {
      await closeBrowser(browserContext);
    });

    /**
     * Test language change functionality for all supported languages
     * Validates that all UI elements translate correctly
     */
    LANGUAGES.forEach(langCode => {
      it(`Change language to ${langCode}`, async function () {
        const { page } = browserContext;

        // Cambiar idioma y obtener traducciones
        const translations = await changeLanguageAndGetTranslations(page, langCode);

        // Validar form labels, placeholders y submit button
        const errors = await validateFormTranslations(page, translations);
        expect(errors, `Validation failed for ${langCode}`).to.deep.equal([]);

        // Validar elementos de navegación
        await validateNavigationElements(page, translations);

        // Validar labels y texto
        await validateLabelsAndText(page, translations);

        // Validar idioma seleccionado en el dropdown
        const actualLanguage = await pages('contact', page).navigationBar.getCurrentLanguage();
        expect(actualLanguage.toUpperCase()).to.contain(langCode);
      });
    });
  });
});