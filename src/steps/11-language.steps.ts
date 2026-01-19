// src/steps/11-language.steps.ts
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import type { CustomWorld } from '../support/world'
import { pages } from '../po/index'
import {
    changeLanguageAndGetTranslations,
    validateNavigationElements,
    validateLabelsAndText,
    validateFormTranslations
} from '../configs/utils/commands'

// ========== GIVEN STEPS ==========
Given('the user is on the contact page', async function(this: CustomWorld) {
    const contactPage = pages('contact', this.page!)
    await contactPage.navigate()
    console.log('✅ User is on contact page')
})

// ========== WHEN STEPS ==========
When('the user changes the language to {string}',
    async function(this: CustomWorld, langCode: string) {
        const translations = await changeLanguageAndGetTranslations(this.page!, langCode)
        this.testData.selectedLanguage = langCode
        this.testData.translations = translations
        console.log(`✅ Language changed to: ${langCode}`)
    }
)

// ========== THEN STEPS ==========
Then('the contact page title is displayed in {string}',
    async function(this: CustomWorld, language: string) {
        const contactPage = pages('contact', this.page!)
        const translations = this.testData.translations

        await expect(contactPage.mainHeading).toHaveText(translations.mainHeading)
        console.log(`✅ Page title in ${language}: ${translations.mainHeading}`)
    }
)

Then('the form labels are translated to {string}',
    async function(this: CustomWorld, language: string) {
        const translations = this.testData.translations
        const errors = await validateFormTranslations(this.page!, translations)

        expect(errors, `Form translation errors for ${language}`).toEqual([])
        console.log(`✅ Form labels translated to ${language}`)
    }
)

Then('the submit button text is in {string}',
    async function(this: CustomWorld, language: string) {
        const contactPage = pages('contact', this.page!)
        const translations = this.testData.translations

        const buttonText = await contactPage.submitButton.getAttribute('value')
        expect(buttonText).toBe(translations.submitButton)
        console.log(`✅ Submit button in ${language}: ${buttonText}`)
    }
)

Then('the selected language is {string}', async function(this: CustomWorld, language: string) {
    const contactPage = pages('contact', this.page!)
    const currentLang = await contactPage.navigationBar.getCurrentLanguage()

    expect(currentLang.toUpperCase()).toContain(language)
    console.log(`✅ Selected language is: ${language}`)
})
