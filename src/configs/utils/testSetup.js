import { pages } from "../../po/index.js";

// ====================================================================
// TEST SETUP UTILITIES
// ====================================================================
// Initialization functions for test page object setup
// Provides consistent page object initialization across tests
// ====================================================================

/**
 * Initialize and return commonly used page objects
 * Centralizes page object creation for test consistency
 * 
 * @param {Page} page - Playwright page object
 * @returns {Object} Collection of initialized page objects
 */
export function setupProductPages(page) {
  return {
    productsPage: pages('products', page),
    detailPage: pages('productdetail', page),
    cartPage: pages('cart', page),
  };
}