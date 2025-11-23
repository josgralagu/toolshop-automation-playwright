// ====================================================================
// PAGES INDEX - CENTRALIZED PAGE OBJECT MANAGEMENT
// ====================================================================
// Centralized exports and factory function for all page objects
// Implements DRY and SOLID principles for page object management
// ====================================================================

import { BasePage } from './BasePage.js';
import { CartPage } from './CartPage.js';
import { ContactPage } from './ContactPage.js';
import { FavoritesPage } from './FavoritesPage.js';
import { MyAccountPage } from './MyAccountPage.js';
import { ProductDetailPage } from './ProductDetailPage.js';
import { ProductsPage } from './ProductsPage.js';
import { ProfilePage } from './ProfilePage.js';
import { SignInPage } from './SignInPage.js';
import { SignUpPage } from './SignUpPage.js';

/**
 * Factory function to create page object instances
 * @param {string} name - Page name (case-insensitive)
 * @param {object} page - Playwright page object
 * @returns {object} Page object instance
 */
export function pages(name, page) {
    const items = {
        base: new BasePage(page),
        cart: new CartPage(page),
        contact: new ContactPage(page),
        favorites: new FavoritesPage(page),
        myaccount: new MyAccountPage(page),
        productdetail: new ProductDetailPage(page),
        products: new ProductsPage(page),
        profile: new ProfilePage(page),
        signin: new SignInPage(page),
        signup: new SignUpPage(page)
    };
    return items[name.toLowerCase()];
}

// Export individual page classes for direct imports
export {
    BasePage,
    CartPage,
    ContactPage,
    FavoritesPage,
    MyAccountPage,
    ProductDetailPage,
    ProductsPage,
    ProfilePage,
    SignInPage,
    SignUpPage
};