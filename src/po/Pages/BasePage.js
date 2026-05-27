// ====================================================================
// BASE PAGE CLASS
// ====================================================================
// Provides common functionality for all page objects.
// Only contains methods that are actually used across page objects.
// ====================================================================

import { NavigationBarComponent } from "../Components/index.js"
import { waitForProductsVisible } from "../../configs/utils/helpers.js"

export class BasePage {
	constructor(page) {
		this.page = page
		this.navigationBar = new NavigationBarComponent(page)
	}

	// ==================== WAIT METHODS ====================

	/**
	 * Wait for the first element matching the locator to be visible.
	 * Used before allTextContents() and count() which don't have auto-wait.
	 * @param {import('@playwright/test').Locator} locator
	 * @param {number} timeout
	 */
	async waitForElementVisible(locator, timeout = 10000) {
		await locator.first().waitFor({ state: "visible", timeout })
	}

	/**
	 * Wait for products to become visible with optional container.
	 * @param {import('@playwright/test').Locator} productLocator
	 * @param {import('@playwright/test').Locator|null} containerLocator
	 * @param {number} timeout
	 */
	async waitForProductsVisible(productLocator, containerLocator = null, timeout = 15000) {
		await waitForProductsVisible(this.page, productLocator, containerLocator, timeout)
	}

	// ==================== VISIBILITY CHECK ====================

	/**
	 * Check if element is visible without throwing.
	 * Used for conditional logic — not as a replacement for expect assertions.
	 * @param {import('@playwright/test').Locator} locator
	 * @param {number} timeout
	 * @returns {Promise<boolean>}
	 */
	async isElementVisible(locator, timeout = 3000) {
		try {
			await locator.waitFor({ state: "visible", timeout })
			return true
		} catch {
			return false
		}
	}

	/**
	 * Get element count.
	 * Waits for at least one element to be visible before counting,
	 * since count() has no auto-wait.
	 * @param {import('@playwright/test').Locator} locator
	 * @param {number} timeout
	 * @returns {Promise<number>}
	 */
	async getElementCount(locator, timeout = 10000) {
		try {
			await this.waitForElementVisible(locator, timeout)
		} catch {
			return 0
		}
		return await locator.count()
	}

	// ==================== NAVIGATION ====================

	/**
	 * Navigate to URL.
	 * Uses domcontentloaded to avoid hanging on slow external resources.
	 * Retries are handled by Playwright's retries config, not manually.
	 * @param {string} url
	 * @param {number} timeout
	 */
	async navigateTo(url, timeout = 45000) {
		await this.page.goto(url, { timeout, waitUntil: "domcontentloaded" })
	}

	/**
	 * Wait for URL to match pattern.
	 * @param {string|RegExp} urlPattern
	 * @param {number} timeout
	 */
	async waitForUrl(urlPattern, timeout = 15000) {
		await this.page.waitForURL(urlPattern, { timeout })
	}
}
