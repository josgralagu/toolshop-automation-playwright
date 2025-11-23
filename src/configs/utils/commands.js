// ====================================================================
// TEST COMMANDS & UTILITY FUNCTIONS - REFACTORED VERSION
// ====================================================================
// Reusable command functions for common test actions
// Centralizes complex logic and improves test maintainability
// Refactored to use improved Page Object Model structure
// ====================================================================

import { expect } from '@playwright/test';
import { pages } from "../../po/index.js";
import { languageMap } from './testData.js';

// ==================== PROFILE ACTIONS SECTION ====================
export async function updateProfilePhoneNumber(page, phoneNumber) {
      const myAccountPage = pages('myaccount', page);
      const profilePage = pages('profile', page);
  
      // Navigate to profile and update phone number    
      await myAccountPage.accessToProfile();
      await profilePage.updatePhoneNumber(phoneNumber);
}
// ==================== PRODUCT ACTIONS SECTION ====================

/**
 * Complete workflow to add product to cart with specified quantity
 * Includes navigation, search, product selection, and cart addition
 */
export async function addProductToCart(page, productName, quantity = 1) {
  const productsPage = pages('products', page);
  const detailPage = pages('productdetail', page);

  await productsPage.navigateToProductsPage();
  await productsPage.searchAndSelectProduct(productName);
  await detailPage.waitForProductData();
  await detailPage.addToCartByPlusClicks(quantity - 1);
}

export async function addProductsAndCollectData(page, productNames, qtyPerProduct) {
  const detailPage = pages('productdetail', page);
  const products = [];

  for (let i = 0; i < productNames.length; i++) {
    const name = productNames[i];
    await addProductToCart(page, name, qtyPerProduct); // tu comando ya existente
    const price = await detailPage.getProductPrice();
    products.push({ name, qty: qtyPerProduct, price });
  }
  return products;
}

export async function getCartData(page) {
  const detailPage = pages('productdetail', page);
  const cartPage   = pages('cart', page);

  await detailPage.goToCartViaHeaderLink();
  await cartPage.waitForCartLoad();

  return {
    names:      await cartPage.getProductNames(),
    quantities: await cartPage.getQuantities(),
    prices:     await cartPage.getPrices(),
    lineTotals: await cartPage.getLineTotals(),
    cartTotal:  await cartPage.getCartTotal(),
  };
}

export function calculateExpectedSubtotal(products) {
  return products.reduce((sum, p) => sum + p.price * p.qty, 0);
}

export function getProductNames(products) {
  return products.map(p => p.name);
}

export function getProductQuantities(products) {
  return products.map(p => p.qty);
}

export function getProductPrices(products) {
  return products.map(p => p.price);
}

export function getLineTotalsDifferences(cartLineTotals, products) {
  return cartLineTotals.map((actual, i) => {
    const expected = products[i].price * products[i].qty;
    return {
      index: i,
      actual,
      expected,
      diff: Math.abs(actual - expected),
    };
  });
}

export function sumLineTotalsDifferences(differences) {
  return differences.reduce((sum, item) => sum + item.diff, 0);
}

export function calculateLineTotalsError(cartLineTotals, products) {
  const differences = getLineTotalsDifferences(cartLineTotals, products);
  return sumLineTotalsDifferences(differences);
}

/**
 * Navigate to product detail page for specified product
 * Simplified workflow for quick product access
 */
export async function goToProductDetail(page, productName) {
  const productsPage = pages('products', page);
  await productsPage.navigateToProductsPage();
  await productsPage.waitForInitialProductsLoad();
  await productsPage.searchAndSelectProduct(productName);
}

/**
 * Search and select product from current products page
 * Assumes user is already on products page
 */
export async function searchAndSelectProduct(page, productName) {
  const productsPage = pages('products', page);
  await productsPage.searchAndSelectProduct(productName);
}

// ==================== NAVIGATION SECTION ====================

/**
 * Navigate to products page and wait for initial load completion
 * Primary entry point for product-related test scenarios
 */
export async function navigateToProductsPage(page) {
  const productsPage = pages('products', page);
  await productsPage.navigateToProductsPage();
  await productsPage.waitForInitialProductsLoad();
}

// ==================== FILTER ACTIONS SECTION ====================

/**
 * Apply category filter using navigation menu
 * Supported categories: 'Hand Tools', 'Power Tools', 'Other'
 */
export async function filterByCategory(page, categoryName) {
  const basePage = pages('base', page);
  await basePage.navigationBar.clickCategoriesLink();

  const categoryActions = {
    "Hand Tools": () => basePage.navigationBar.clickHandToolsLink(),
    "Power Tools": () => basePage.navigationBar.clickPowerToolsLink(),
    Other: () => basePage.navigationBar.clickOtherLink(),
  };

  const action = categoryActions[categoryName];
  if (!action) throw new Error(`Category "${categoryName}" not supported`);

  await action();
}

/**
 * Apply subcategory filter using checkbox selection
 * Includes wait for complete filter cycle
 */
export async function filterBySubcategory(page, subcategoryName) {
  const productsPage = pages('products', page);
  await productsPage.clickSubcategoryCheckbox(subcategoryName);
  await productsPage.waitForFilterCycle();
  await productsPage.waitForFilterResults();
}

/**
 * Remove specific subcategory filter
 * Useful for test cleanup between scenarios
 */
export async function clearSubcategoryFilter(page, subcategoryName) {
  const productsPage = pages('products', page);
  await productsPage.clickSubcategoryCheckbox(subcategoryName);
  await productsPage.waitForFilterCycle();
  await productsPage.waitForInitialProductsLoad();
}

/**
 * Apply brand filter by selecting checkbox
 * Includes filter cycle completion wait
 */
export async function filterByBrand(page, brandName) {
  const productsPage = pages('products', page);
  await productsPage.selectBrandByName(brandName);
}

/**
 * Remove specific brand filter selection
 * Useful for test cleanup between scenarios
 */
export async function deselectBrand(page, brandName) {
  const productsPage = pages('products', page);
  await productsPage.deselectBrandByName(brandName);
}

/**
 * Activate eco-friendly product filter
 * Filters products to show only eco-certified items
 */
export async function filterByEcoFriendly(page) {
  const productsPage = pages('products', page);
  await productsPage.clickEcoFriendlyFilter();
}

export async function applyMultipleFilters(page, category, brand) {
  await filterByCategory(page, category);
  await filterByBrand(page, brand);
}

export async function validateMultipleFiltersAndNavigate(page, category, brand, keywords) {
  const errors = await validateMultipleFiltersBasic(page, category, brand, keywords);
  if (errors.length === 0) {
    await page.click('a.card');
    await page.waitForURL(/\/product\//, { timeout: 15000 });
  }
  return errors;
}

export async function verifyProductDetails(page) {
  const detailPage = pages('productdetail', page);
  await detailPage.waitForProductData();
  const actualBrand = await detailPage.getBrandBadgeText();
  return actualBrand.trim();
}

export async function validateAndNavigateToProductDetails(page, category, brand, categoryKeywords) {
  const categoryKey = category.charAt(0).toLowerCase() + category.slice(1).replace(/\s+/g, '');
  const keywords = categoryKeywords[categoryKey];
  const errors = await validateMultipleFiltersAndNavigate(page, category, brand, keywords);
  return errors;
}

// ==================== PAGINATION VALIDATION SECTION ====================

/**
 * Generic pagination validation across all result pages
 * Executes validation function on each page of results
 * @param {Function} validatePageFn - Function returning array of validation errors
 * @param {number} maxPages - Safety limit to prevent infinite loops
 */
export async function validateAcrossPagination(
  page,
  validatePageFn,
  maxPages = 10
) {
  const productsPage = pages('products', page);
  const allErrors = [];
  let currentPage = 1;

  while (currentPage <= maxPages) {
    await productsPage.waitForInitialProductsLoad();

    const pageErrors = await validatePageFn(productsPage);
    allErrors.push(...pageErrors);

    const hasNextPage = await productsPage.hasNextPage();
    if (!hasNextPage) break;

    await productsPage.clickNextPage();
    currentPage++;
  }

  if (currentPage >= maxPages) {
    allErrors.push(
      `Reached maximum page limit (${maxPages}) - possible infinite loop`
    );
  }

  return allErrors;
}

// ==================== SPECIFIC VALIDATION FUNCTIONS ====================

/**
 * Validate no out-of-stock products across all pagination pages
 * Comprehensive stock availability check for filtered results
 */
export async function validateNoOutOfStockAcrossPagination(page) {
  return validateAcrossPagination(page, async (productsPage) => {
    const hasOutOfStock = await productsPage.hasOutOfStockProducts();
    if (hasOutOfStock) {
      return ["Found out-of-stock products on current page"];
    }
    return [];
  });
}

/**
 * Validate product names contain expected keywords across pagination
 * Ensures filtered results match category or subcategory criteria
 */
export async function validateKeywordsAcrossPagination(page, keywords) {
  return validateAcrossPagination(page, async (productsPage) => {
    const invalidNames = await productsPage.getInvalidProductNames(keywords);
    if (invalidNames.length > 0) {
      return [`Found products without keywords: ${invalidNames.join(", ")}`];
    }
    return [];
  });
}

/**
 * Comprehensive brand filter validation
 * Checks product availability and stock status for brand filters
 */
export async function validateBrandProducts(page, brandName) {
  const productsPage = pages('products', page);
  const errors = [];

  const productCount = await productsPage.getCurrentPageProductCount();
  if (productCount === 0) {
    errors.push(`No products found for brand "${brandName}"`);
    return errors;
  }

  const outOfStockErrors = await validateNoOutOfStockAcrossPagination(page);
  errors.push(...outOfStockErrors);

  return errors;
}

/**
 * Subcategory filter validation with keyword matching
 * Handles both successful results and no-results scenarios
 */
export async function validateSubcategoryResults(
  page,
  subcategoryName,
  keywords
) {
  const productsPage = pages('products', page);
  const errors = [];

  const hasProducts = await productsPage.hasProductsVisible();

  if (!hasProducts) {
    const noResultsVisible = await productsPage.filterComponent.hasNoResults();
    if (!noResultsVisible) {
      errors.push(`No products found for subcategory "${subcategoryName}" but no "no results" message visible`);
    }
    return errors;
  }

  const keywordErrors = await validateKeywordsAcrossPagination(page, keywords);
  errors.push(...keywordErrors);

  return errors;
}

/**
 * Validate eco-friendly badge presence across all pagination pages
 * Ensures eco filter shows only certified products
 */
export async function validateEcoBadgesAcrossPagination(page) {
  return validateAcrossPagination(page, async (productsPage) => {
    const allEco = await productsPage.validateCurrentPageEcoBadges();
    if (!allEco) {
      return ["Not all products have ECO badge"];
    }
    return [];
  });
}

// ==================== CONTACT PAGE SECTION ====================

/**
 * Change contact page language using dropdown selector
 * @param {string} languageCode - Two-letter language code (DE, EN, ES, FR, NL, TR)
 */
export async function changeLanguage(page, languageCode) {
  const basePage = pages('base', page);
  await basePage.navigationBar.changeLanguage(languageCode);
}

/**
 * Basic validation for multiple filter combinations
 * Verifies category and brand filters produce expected results
 */
export async function validateMultipleFiltersBasic(
  page,
  category,
  brand,
  keywords
) {
  const productsPage = pages('products', page);
  const errors = [];

  await productsPage.waitForInitialProductsLoad();

  const hasProducts = await productsPage.hasProductsVisible();
  if (!hasProducts) {
    errors.push(`No products visible for ${category} + ${brand}`);
    return errors;
  }

  const firstProductName = await productsPage.productName.first().textContent();

  // Use the provided keywords parameter instead of dynamic import
  const productMatchesCategory = keywords.some((keyword) =>
    firstProductName.toLowerCase().includes(keyword.toLowerCase())
  );

  if (!productMatchesCategory) {
    errors.push(
      `Product "${firstProductName}" does not match category "${category}" keywords: ${keywords.join(", ")}`
    );
  }

  return errors;
}

/**
 * Validate contact form label translations
 * Comprehensive check of all form field labels against expected translations
 */
export async function validateContactFormLabels(page, translations) {
  const contactPage = pages('contact', page);
  const errors = [];

  const labelChecks = [
    {
      key: "firstName",
      locator: contactPage.firstNameLabel,
      expected: translations.firstNameField,
    },
    {
      key: "lastName",
      locator: contactPage.lastNameLabel,
      expected: translations.lastNameField,
    },
    {
      key: "email",
      locator: contactPage.emailLabel,
      expected: translations.emailField,
    },
    {
      key: "subject",
      locator: contactPage.subjectLabel,
      expected: translations.subjectField,
    },
    {
      key: "message",
      locator: contactPage.messageLabel,
      expected: translations.messageField,
    },
    {
      key: "attachment",
      locator: contactPage.attachmentLabel,
      expected: translations.attachmentLabel,
    },
  ];

  for (const { key, locator, expected } of labelChecks) {
    try {
      const actual = await locator.textContent();
      if (actual.trim() !== expected) {
        errors.push(`Label ${key}: expected "${expected}", got "${actual}"`);
      }
    } catch (e) {
      errors.push(`Label ${key}: element not found`);
    }
  }

  return errors; // Array vacío si todo OK
}

/**
 * Validate contact form placeholder translations
 * Checks both input placeholders and select option text
 */
export async function validateContactFormPlaceholders(page, translations) {
  const errors = [];

  // Input field placeholders validation
  const inputPlaceholders = [
    {
      selector: '[data-test="first-name"]',
      expected: translations.firstNamePlaceholder,
    },
    {
      selector: '[data-test="last-name"]',
      expected: translations.lastNamePlaceholder,
    },
    {
      selector: '[data-test="email"]',
      expected: translations.emailPlaceholder,
    },
  ];

  for (const { selector, expected } of inputPlaceholders) {
    try {
      const actual = await page.locator(selector).getAttribute("placeholder");
      if ((actual || "").trim() !== expected) {
        errors.push(
          `Input placeholder ${selector}: expected "${expected}", got "${actual}"`
        );
      }
    } catch (e) {
      errors.push(`Input placeholder ${selector}: element not found`);
    }
  }

  // Select dropdown placeholder validation
  try {
    const selectedOption = await page
      .locator('[data-test="subject"] option[selected]')
      .textContent();
    if ((selectedOption || "").trim() !== translations.subjectPlaceholder) {
      errors.push(
        `Select placeholder: expected "${translations.subjectPlaceholder}", got "${selectedOption}"`
      );
    }
  } catch (e) {
    errors.push(`Select placeholder: element not found`);
  }

  return errors;
}

/**
 * Validate contact form submit button translation
 * Checks button value attribute against expected translation
 */
export async function validateContactSubmitButton(page, translations) {
  const contactPage = pages('contact', page);
  const errors = [];

  try {
    const actualValue = await contactPage.submitButton.getAttribute("value");
    if (actualValue !== translations.submitButton) {
      errors.push(
        `Submit button: expected "${translations.submitButton}", got "${actualValue}"`
      );
    }
  } catch (e) {
    errors.push(`Submit button: element not found`);
  }

  return errors;
}

/**
 * Validate category keyword matching across pagination
 * Wrapper function for category-specific keyword validation
 */
export async function validateCategoryKeywords(page, keywords) {
  return validateKeywordsAcrossPagination(page, keywords);
}

export async function changeLanguageAndGetTranslations(page, langCode) {
  const contactPage = pages('contact', page);
  await contactPage.navigationBar.changeLanguage(langCode);
  return languageMap.contactTranslations[langCode];
}

export async function validateNavigationElements(page, translations) {
  const contactPage = pages('contact', page);
  await expect(contactPage.mainHeading).toHaveText(translations.mainHeading);
  await expect(contactPage.navigationBar.homeLink).toHaveText(translations.homeLink);
  await expect(contactPage.navigationBar.categoriesLink).toHaveText(translations.categoriesLink);
  await expect(contactPage.navigationBar.contactLink).toHaveText(translations.contactLink);
  await expect(contactPage.navigationBar.signInLink).toHaveText(translations.signInLink);
}

export async function validateLabelsAndText(page, translations) {
  const contactPage = pages('contact', page);
  await expect(contactPage.warningLabel).toContainText(translations.warningLabel.substring(0, 30));
  const infoText = await contactPage.getNormalizedInfoText();
  expect(infoText).toContain(translations.infoLabel.substring(0, 60).replace(/\s+/g, ' ').trim());
}

export async function validateFormTranslations(page, translations) {
  const labelErrors = await validateContactFormLabels(page, translations);
  const placeholderErrors = await validateContactFormPlaceholders(page, translations);
  const buttonErrors = await validateContactSubmitButton(page, translations);
  return [...labelErrors, ...placeholderErrors, ...buttonErrors];
}