import { pages } from '../../po/index.js';
import {
  validateContactFormLabels,
  validateContactFormPlaceholders,
  validateContactSubmitButton
} from '../../configs/utils/commands.js';
import { languageMap } from '../../configs/utils/testData.js';
import { initializeBrowser, closeBrowser } from '../../configs/mochaConfigs/setup.js';

// ====================================================================
// FEATURE: LANGUAGE CHANGE ON CONTACT PAGE TESTS - MIGRATED TO MOCHA + CHAI
// ====================================================================
// Tests for language/internationalization functionality
// Uses Mocha as test runner, Chai for assertions, Playwright for automation
// ====================================================================
const BROWSERS = ['chromium', 'firefox', 'webkit'];

BROWSERS.forEach(browserName => {
  const LANGUAGES = ['DE', 'EN', 'ES', 'FR', 'NL', 'TR'];

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
    for (const langCode of LANGUAGES) {
      it(`Change language to ${langCode}`, async function () {
        const { page } = browserContext;
        const contactPage = pages('contact', page);
        const translations = languageMap.contactTranslations[langCode];

        // Change language using page object
        await contactPage.navigationBar.changeLanguage(langCode);

        // Validate form labels translation
        const labelErrors = await validateContactFormLabels(page, translations);
        expect(labelErrors, `Form labels validation failed for ${langCode}`).to.deep.equal([]);

        // Validate form placeholders translation
        const placeholderErrors = await validateContactFormPlaceholders(page, translations);
        expect(placeholderErrors, `Placeholders validation failed for ${langCode}`).to.deep.equal([]);

        // Validate submit button translation
        const buttonErrors = await validateContactSubmitButton(page, translations);
        expect(buttonErrors, `Submit button validation failed for ${langCode}`).to.deep.equal([]);

        // Validate navigation elements translation
        const mainHeadingText = await contactPage.mainHeading.textContent();
        expect(mainHeadingText).to.equal(translations.mainHeading);

        const homeLinkText = await contactPage.navigationBar.homeLink.textContent();
        expect(homeLinkText).to.equal(translations.homeLink);

        const categoriesLinkText = await contactPage.navigationBar.categoriesLink.textContent();
        expect(categoriesLinkText.trim()).to.equal(translations.categoriesLink);

        const contactLinkText = await contactPage.navigationBar.contactLink.textContent();
        expect(contactLinkText).to.equal(translations.contactLink);

        const signInLinkText = await contactPage.navigationBar.signInLink.textContent();
        expect(signInLinkText).to.equal(translations.signInLink);

        // Validate warning label translation (partial match)
        const warningLabelText = await contactPage.warningLabel.textContent();
        expect(warningLabelText).to.include(translations.warningLabel.substring(0, 30));

        // Validate info label translation (partial match)
        const infoText = await contactPage.getNormalizedInfoText();
        expect(infoText).to.include(translations.infoLabel.substring(0, 60).replace(/\s+/g, ' ').trim());

        // Validate selected language in dropdown
        const actualLanguage = await contactPage.navigationBar.getCurrentLanguage();
        expect(actualLanguage.toUpperCase()).to.include(langCode);
      });
    }
  });
});