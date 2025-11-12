import { ProductsPage } from "../src/po/Pages/ProductsPage";
import { ProductDetailPage } from "../src/po/Pages/ProductDetailPage";
import { CartPage } from "../src/po/Pages/CartPage";

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
    productsPage: new ProductsPage(page),
    detailPage: new ProductDetailPage(page),
    cartPage: new CartPage(page),
  };
}