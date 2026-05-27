// ====================================================================
// TEST COMMANDS & UTILITY FUNCTIONS
// ====================================================================
// Reusable command functions for common test actions
// Centralizes complex logic and improves test maintainability
// ====================================================================

import { expect } from "@playwright/test"
import { pages } from "../../po/index.js"
import { languageMap } from "./testData.js"

// Re-export cart helpers (moved to cart.helpers.js for cohesion)
export {
	addProductToCart,
	addProductsAndCollectData,
	getCartData,
	calculateExpectedSubtotal,
	getProductNames,
	getProductQuantities,
	getProductPrices,
	getLineTotalsDifferences,
	sumLineTotalsDifferences,
	calculateLineTotalsError
} from "./cart.helpers.js"

// ==================== PROFILE ACTIONS SECTION ====================

/**
 * Update user profile phone number
 * @param {import('@playwright/test').Page} page
 * @param {string} phoneNumber
 */
export async function updateProfilePhoneNumber(page, phoneNumber) {
	const myAccountPage = pages("myaccount", page)
	const profilePage = pages("profile", page)

	await myAccountPage.accessToProfile()
	await profilePage.updatePhoneNumber(phoneNumber)
}

// ==================== PRODUCT NAVIGATION & SEARCH SECTION ====================

/**
 * Navigate to products page and wait for initial load completion.
 *
 * Corrección: se eliminó la llamada duplicada a waitForInitialProductsLoad().
 * navigateToProductsPage() ya la invoca internamente.
 *
 * @param {import('@playwright/test').Page} page
 */
export async function navigateToProductsPage(page) {
	const productsPage = pages("products", page)
	await productsPage.navigateToProductsPage()
}

/**
 * Navigate to product detail page for specified product
 * @param {import('@playwright/test').Page} page
 * @param {string} productName
 */
export async function goToProductDetail(page, productName) {
	const productsPage = pages("products", page)
	await productsPage.navigateToProductsPage()
	await productsPage.searchAndSelectProduct(productName)
}

/**
 * Search and select product from current products page.
 * Assumes user is already on products page.
 * @param {import('@playwright/test').Page} page
 * @param {string} productName
 */
export async function searchAndSelectProduct(page, productName) {
	const productsPage = pages("products", page)
	await productsPage.searchAndSelectProduct(productName)
}

// ==================== FILTER OPERATIONS SECTION ====================

/**
 * Apply category filter using navigation menu.
 * Supported: 'Hand Tools', 'Power Tools', 'Other'
 * @param {import('@playwright/test').Page} page
 * @param {string} categoryName
 */
export async function filterByCategory(page, categoryName) {
	const basePage = pages("base", page)
	await basePage.navigationBar.clickCategoriesLink()

	const categoryActions = {
		"Hand Tools": () => basePage.navigationBar.clickHandToolsLink(),
		"Power Tools": () => basePage.navigationBar.clickPowerToolsLink(),
		Other: () => basePage.navigationBar.clickOtherLink()
	}

	const action = categoryActions[categoryName]
	if (!action) throw new Error(`Category "${categoryName}" not supported`)

	await action()
}

/**
 * Apply subcategory filter using checkbox selection
 * @param {import('@playwright/test').Page} page
 * @param {string} subcategoryName
 */
export async function filterBySubcategory(page, subcategoryName) {
	const productsPage = pages("products", page)
	await productsPage.clickSubcategoryCheckbox(subcategoryName)
	await productsPage.waitForFilterCycle()
	await productsPage.waitForFilterResults()
}

/**
 * Remove specific subcategory filter
 * @param {import('@playwright/test').Page} page
 * @param {string} subcategoryName
 */
export async function clearSubcategoryFilter(page, subcategoryName) {
	const productsPage = pages("products", page)
	await productsPage.clickSubcategoryCheckbox(subcategoryName)
	await productsPage.waitForFilterCycle()
	await productsPage.waitForInitialProductsLoad()
}

/**
 * Apply brand filter by selecting checkbox
 * @param {import('@playwright/test').Page} page
 * @param {string} brandName
 */
export async function filterByBrand(page, brandName) {
	const productsPage = pages("products", page)
	await productsPage.selectBrandByName(brandName)
}

/**
 * Remove specific brand filter selection
 * @param {import('@playwright/test').Page} page
 * @param {string} brandName
 */
export async function deselectBrand(page, brandName) {
	const productsPage = pages("products", page)
	await productsPage.deselectBrandByName(brandName)
}

/**
 * Activate eco-friendly product filter
 * @param {import('@playwright/test').Page} page
 */
export async function filterByEcoFriendly(page) {
	const productsPage = pages("products", page)
	await productsPage.clickEcoFriendlyFilter()
}

/**
 * Apply multiple filters in sequence (category + brand)
 * @param {import('@playwright/test').Page} page
 * @param {string} category
 * @param {string} brand
 */
export async function applyMultipleFilters(page, category, brand) {
	await filterByCategory(page, category)
	await filterByBrand(page, brand)
}

// ==================== FILTER VALIDATIONS SECTION ====================

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} category
 * @param {string} brand
 * @param {string[]} keywords
 * @returns {Promise<string[]>}
 */
export async function validateMultipleFiltersBasic(page, category, brand, keywords) {
	const productsPage = pages("products", page)
	const errors = []

	await productsPage.waitForInitialProductsLoad()

	const hasProducts = await productsPage.hasProductsVisible()
	if (!hasProducts) {
		errors.push(`No products visible for ${category} + ${brand}`)
		return errors
	}

	const firstProductName = await productsPage.productName.first().textContent()

	const productMatchesCategory = keywords.some((keyword) =>
		firstProductName.toLowerCase().includes(keyword.toLowerCase())
	)

	if (!productMatchesCategory) {
		errors.push(
			`Product "${firstProductName}" does not match category "${category}" keywords: ${keywords.join(", ")}`
		)
	}

	return errors
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} category
 * @param {string} brand
 * @param {string[]} keywords
 * @returns {Promise<string[]>}
 */
export async function validateMultipleFiltersAndNavigate(page, category, brand, keywords) {
	const errors = await validateMultipleFiltersBasic(page, category, brand, keywords)
	if (errors.length === 0) {
		await page.locator("a.card").first().click()
		await page.waitForURL(/\/product\//, { timeout: 15000 })
	}
	return errors
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} category
 * @param {string} brand
 * @param {Object} categoryKeywords
 * @returns {Promise<string[]>}
 */
export async function validateAndNavigateToProductDetails(page, category, brand, categoryKeywords) {
	const categoryKey =
		category.charAt(0).toLowerCase() + category.slice(1).replace(/\s+/g, "")
	const keywords = categoryKeywords[categoryKey]
	return validateMultipleFiltersAndNavigate(page, category, brand, keywords)
}

/**
 * Verify product details page loads correctly
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string>} Brand name trimmed
 */
export async function verifyProductDetails(page) {
	const detailPage = pages("productdetail", page)
	await detailPage.waitForProductData()
	const actualBrand = await detailPage.getBrandBadgeText()
	return actualBrand.trim()
}

// ==================== PAGINATION VALIDATIONS SECTION ====================

/**
 * Generic pagination validation across all result pages
 * @param {import('@playwright/test').Page} page
 * @param {Function} validatePageFn
 * @param {number} maxPages
 * @returns {Promise<string[]>}
 */
export async function validateAcrossPagination(page, validatePageFn, maxPages = 10) {
	const productsPage = pages("products", page)
	const allErrors = []
	let currentPage = 1

	while (currentPage <= maxPages) {
		await productsPage.waitForInitialProductsLoad()

		const pageErrors = await validatePageFn(productsPage)
		allErrors.push(...pageErrors)

		const hasNextPage = await productsPage.hasNextPage()
		if (!hasNextPage) break

		await productsPage.clickNextPage()
		currentPage++
	}

	if (currentPage >= maxPages) {
		allErrors.push(`Reached maximum page limit (${maxPages}) - possible infinite loop`)
	}

	return allErrors
}

/**
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string[]>}
 */
export async function validateNoOutOfStockAcrossPagination(page) {
	return validateAcrossPagination(page, async (productsPage) => {
		const hasOutOfStock = await productsPage.hasOutOfStockProducts()
		return hasOutOfStock ? ["Found out-of-stock products on current page"] : []
	})
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string[]} keywords
 * @returns {Promise<string[]>}
 */
export async function validateKeywordsAcrossPagination(page, keywords) {
	return validateAcrossPagination(page, async (productsPage) => {
		const invalidNames = await productsPage.getInvalidProductNames(keywords)
		return invalidNames.length > 0
			? [`Found products without keywords: ${invalidNames.join(", ")}`]
			: []
	})
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string[]} keywords
 * @returns {Promise<string[]>}
 */
export async function validateCategoryKeywords(page, keywords) {
	return validateKeywordsAcrossPagination(page, keywords)
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} brandName
 * @returns {Promise<string[]>}
 */
export async function validateBrandProducts(page, brandName) {
	const productsPage = pages("products", page)
	const errors = []

	const productCount = await productsPage.getCurrentPageProductCount()
	if (productCount === 0) {
		errors.push(`No products found for brand "${brandName}"`)
		return errors
	}

	const outOfStockErrors = await validateNoOutOfStockAcrossPagination(page)
	errors.push(...outOfStockErrors)
	return errors
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} subcategoryName
 * @param {string[]} keywords
 * @returns {Promise<string[]>}
 */
export async function validateSubcategoryResults(page, subcategoryName, keywords) {
	const productsPage = pages("products", page)
	const errors = []

	const hasProducts = await productsPage.hasProductsVisible()

	if (!hasProducts) {
		const noResultsVisible = await productsPage.filterComponent.hasNoResults()
		if (!noResultsVisible) {
			errors.push(
				`No products found for subcategory "${subcategoryName}" but no "no results" message visible`
			)
		}
		return errors
	}

	const keywordErrors = await validateKeywordsAcrossPagination(page, keywords)
	errors.push(...keywordErrors)
	return errors
}

/**
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string[]>}
 */
export async function validateEcoBadgesAcrossPagination(page) {
	return validateAcrossPagination(page, async (productsPage) => {
		const allEco = await productsPage.validateCurrentPageEcoBadges()
		return allEco ? [] : ["Not all products have ECO badge"]
	})
}

// ==================== LANGUAGE & CONTACT ACTIONS SECTION ====================

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} langCode
 * @returns {Promise<Object>} Translation object for the specified language
 */
export async function changeLanguageAndGetTranslations(page, langCode) {
	const contactPage = pages("contact", page)
	await contactPage.navigationBar.changeLanguage(langCode)
	return languageMap.contactTranslations[langCode]
}

// ==================== CONTACT FORM VALIDATIONS SECTION ====================

/**
 * @param {import('@playwright/test').Page} page
 * @param {Object} translations
 * @returns {Promise<string[]>}
 */
export async function validateContactFormLabels(page, translations) {
	const contactPage = pages("contact", page)
	const errors = []

	const labelChecks = [
		{ key: "firstName", locator: contactPage.firstNameLabel, expected: translations.firstNameField },
		{ key: "lastName", locator: contactPage.lastNameLabel, expected: translations.lastNameField },
		{ key: "email", locator: contactPage.emailLabel, expected: translations.emailField },
		{ key: "subject", locator: contactPage.subjectLabel, expected: translations.subjectField },
		{ key: "message", locator: contactPage.messageLabel, expected: translations.messageField },
		{ key: "attachment", locator: contactPage.attachmentLabel, expected: translations.attachmentLabel }
	]

	for (const { key, locator, expected } of labelChecks) {
		try {
			const actual = await locator.textContent()
			if (actual.trim() !== expected) {
				errors.push(`Label ${key}: expected "${expected}", got "${actual.trim()}"`)
			}
		} catch {
			errors.push(`Label ${key}: element not found`)
		}
	}

	return errors
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {Object} translations
 * @returns {Promise<string[]>}
 */
export async function validateContactFormPlaceholders(page, translations) {
	const errors = []

	// getByTestId requiere testIdAttribute: 'data-test' en playwright.config.js
	const inputPlaceholders = [
		{ locator: page.getByTestId("first-name"), key: "first-name", expected: translations.firstNamePlaceholder },
		{ locator: page.getByTestId("last-name"), key: "last-name", expected: translations.lastNamePlaceholder },
		{ locator: page.getByTestId("email"), key: "email", expected: translations.emailPlaceholder }
	]

	for (const { locator, key, expected } of inputPlaceholders) {
		try {
			const actual = await locator.getAttribute("placeholder")
			if ((actual || "").trim() !== expected) {
				errors.push(`Input placeholder [${key}]: expected "${expected}", got "${actual}"`)
			}
		} catch {
			errors.push(`Input placeholder [${key}]: element not found`)
		}
	}

	// Select dropdown placeholder validation
	try {
		const selectedOption = await page
			.getByTestId("subject")
			.locator("option[selected]")
			.textContent()
		if ((selectedOption || "").trim() !== translations.subjectPlaceholder) {
			errors.push(
				`Select placeholder: expected "${translations.subjectPlaceholder}", got "${selectedOption}"`
			)
		}
	} catch {
		errors.push(`Select placeholder: element not found`)
	}

	return errors
}

/**
 * Validate contact form submit button translation.
 *
 * El elemento es <input type="submit" value="Senden">, no un <button>.
 * Un <input type="submit"> muestra su texto a través del atributo "value",
 * no de textContent() (que siempre retorna "" para inputs).
 * Se usa inputValue() que es el método correcto de Playwright para leer
 * el valor de cualquier elemento input.
 *
 * @param {import('@playwright/test').Page} page
 * @param {Object} translations
 * @returns {Promise<string[]>}
 */
export async function validateContactSubmitButton(page, translations) {
	const contactPage = pages("contact", page)
	const errors = []

	try {
		// inputValue() lee el atributo "value" del <input type="submit">
		const actualText = (await contactPage.submitButton.inputValue()).trim()
		if (actualText !== translations.submitButton) {
			errors.push(
				`Submit button: expected "${translations.submitButton}", got "${actualText}"`
			)
		}
	} catch {
		errors.push(`Submit button: element not found`)
	}

	return errors
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {Object} translations
 */
export async function validateNavigationElements(page, translations) {
	const contactPage = pages("contact", page)
	await expect(contactPage.mainHeading).toHaveText(translations.mainHeading)
	await expect(contactPage.navigationBar.homeLink).toHaveText(translations.homeLink)
	await expect(contactPage.navigationBar.categoriesLink).toHaveText(translations.categoriesLink)
	await expect(contactPage.navigationBar.contactLink).toHaveText(translations.contactLink)
	await expect(contactPage.navigationBar.signInLink).toHaveText(translations.signInLink)
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {Object} translations
 */
export async function validateLabelsAndText(page, translations) {
	const contactPage = pages("contact", page)
	await expect(contactPage.warningLabel).toContainText(
		translations.warningLabel.substring(0, 30)
	)
	const infoText = await contactPage.getNormalizedInfoText()
	expect(infoText).toContain(
		translations.infoLabel.substring(0, 60).replace(/\s+/g, " ").trim()
	)
}

/**
 * Comprehensive contact form translation validation.
 *
 * Mejora: las tres validaciones se ejecutan en paralelo con Promise.all()
 * en lugar de secuencialmente, reduciendo el tiempo total del test.
 *
 * @param {import('@playwright/test').Page} page
 * @param {Object} translations
 * @returns {Promise<string[]>}
 */
export async function validateFormTranslations(page, translations) {
	const [labelErrors, placeholderErrors, buttonErrors] = await Promise.all([
		validateContactFormLabels(page, translations),
		validateContactFormPlaceholders(page, translations),
		validateContactSubmitButton(page, translations)
	])
	return [...labelErrors, ...placeholderErrors, ...buttonErrors]
}
