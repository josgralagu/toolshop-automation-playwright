// ====================================================================
// TEST COMMANDS & UTILITY FUNCTIONS - REFACTORED VERSION
// ====================================================================
// Reusable command functions for common test actions
// Centralizes complex logic and improves test maintainability
// Refactored to use improved Page Object Model structure
// ====================================================================

import { pages } from "../../po/index.js";

// ==================== PRODUCT ACTIONS SECTION ====================

/**
 * Complete workflow to add product to cart with specified quantity
 * Includes navigation, search, product selection, and cart addition
 */
export async function addProductToCart(page, productName, quantity = 1) {
  const productsPage = pages('products', page);
  const detailPage = pages('productdetail', page);

  await productsPage.navigateToProductsPage();
  await productsPage.waitForInitialProductsLoad();
  await productsPage.searchAndSelectProduct(productName);
  await detailPage.waitForProductData();
  await detailPage.addToCartByPlusClicks(quantity - 1);
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
    "Hand Tools": () => navigationBarComponent.clickHandToolsLink(),
    "Power Tools": () => navigationBarComponent.clickPowerToolsLink(),
    Other: () => navigationBarComponent.clickOtherLink(),
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
    const noResultsVisible = await productsPage.noResultsMessage.isVisible();
    if (!noResultsVisible) {
      errors.push(`No products found but no "no results" message visible`);
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

  // Convert category name to camelCase for keyword mapping
  const categoryKey =
    category.charAt(0).toLowerCase() + category.slice(1).replace(/\s+/g, "");
  const categoryKeywords = (await import("../utils/testData.js"))
    .categoryKeywords;
  const keywordsToUse = categoryKeywords[categoryKey];

  const productMatchesCategory = keywordsToUse.some((keyword) =>
    firstProductName.toLowerCase().includes(keyword.toLowerCase())
  );

  if (!productMatchesCategory) {
    errors.push(
      `Product "${firstProductName}" does not match category "${category}" keywords`
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