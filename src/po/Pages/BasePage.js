// ====================================================================
// BASE PAGE CLASS
// ====================================================================
// Provides common functionality for all page objects
// Implements DRY and SOLID principles through reusable methods
// ====================================================================

import { NavigationBarComponent } from "../Components/index.js"
import { waitForProductsVisible } from "../../configs/utils/helpers.js"

export class BasePage {
	constructor(page) {
		this.page = page
		this.navigationBar = new NavigationBarComponent(page)
	}

	// ==================== COMMON WAIT METHODS ====================

	/**
	 * Wait for the first element matching the locator to be visible
	 * @param {Locator} locator - Element locator
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async waitForElementVisible(locator, timeout = 10000) {
		// Use first() to avoid strict mode violation for multi-element locators
		await locator.first().waitFor({ state: "visible", timeout })
	}

	/**
	 * Wait for products to become visible with optional container
	 * @param {Locator} productLocator - Product element locator
	 * @param {Locator} containerLocator - Container element locator (optional)
	 * @param {number} timeout - Timeout in milliseconds (default: 15000)
	 */
	async waitForProductsVisible(
		productLocator,
		containerLocator = null,
		timeout = 15000
	) {
		await waitForProductsVisible(
			this.page,
			productLocator,
			containerLocator,
			timeout
		)
	}

	/**
	 * Wait for element to be attached to DOM
	 * @param {Locator} locator - Element locator
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async waitForElementAttached(locator, timeout = 10000) {
		await locator.first().waitFor({ state: "attached", timeout })
	}

	/**
	 * Wait for element to be hidden
	 * @param {Locator} locator - Element locator
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async waitForElementHidden(locator, timeout = 10000) {
		await locator.first().waitFor({ state: "hidden", timeout })
	}

	/**
	 * Wait for element to be detached from DOM
	 * @param {Locator} locator - Element locator
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async waitForElementDetached(locator, timeout = 10000) {
		await locator.first().waitFor({ state: "detached", timeout })
	}

	// ==================== COMMON INTERACTION METHODS ====================

	/**
	 * Safe click with visibility wait
	 * @param {Locator} locator - Element locator
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async safeClick(locator, timeout = 10000) {
		await this.waitForElementVisible(locator, timeout)
		await locator.click()
	}

	/**
	 * Safe fill with visibility wait
	 * @param {Locator} locator - Element locator
	 * @param {string} text - Text to fill
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async safeFill(locator, text, timeout = 10000) {
		await this.waitForElementVisible(locator, timeout)
		await locator.fill(text)
	}

	/**
	 * Safe check with visibility wait
	 * @param {Locator} locator - Element locator
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async safeCheck(locator, timeout = 10000) {
		await this.waitForElementVisible(locator, timeout)
		await locator.check()
	}

	/**
	 * Safe uncheck with visibility wait
	 * @param {Locator} locator - Element locator
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 */
	async safeUncheck(locator, timeout = 10000) {
		await this.waitForElementVisible(locator, timeout)
		await locator.uncheck()
	}

	// ==================== COMMON VALIDATION METHODS ====================

	/**
	 * Check if element is visible
	 * @param {Locator} locator - Element locator
	 * @param {number} timeout - Timeout in milliseconds (default: 3000)
	 * @returns {boolean} True if element is visible
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
	 * Get element text content
	 * @param {Locator} locator - Element locator
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 * @returns {string} Element text content
	 */
	async getElementText(locator, timeout = 10000) {
		await this.waitForElementVisible(locator, timeout)
		return await locator.textContent()
	}

	/**
	 * Get element input value
	 * @param {Locator} locator - Element locator
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 * @returns {string} Input value
	 */
	async getInputValue(locator, timeout = 10000) {
		await this.waitForElementVisible(locator, timeout)
		return await locator.inputValue()
	}

	/**
	 * Get element count
	 * @param {Locator} locator - Element locator
	 * @param {number} timeout - Timeout in milliseconds (default: 10000)
	 * @returns {number} Number of elements
	 */
	async getElementCount(locator, timeout = 10000) {
		try {
			await this.waitForElementVisible(locator, timeout)
		} catch {
			// If waiting for visibility times out, there might be 0 elements
			// Return 0 instead of throwing an error
			return 0
		}
		return await locator.count()
	}

	// ==================== COMMON NAVIGATION METHODS ====================

	/**
	 * Navigate to URL with enhanced reliability and retry mechanism
	 * @param {string} url - URL to navigate to
	 * @param {number} timeout - Timeout in milliseconds (default: 45000)
	 */
	async navigateTo(url, timeout = 45000) {
		let lastError
		const maxRetries = 2

		for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
			try {
				await this.performNavigationAttempt(
					url,
					attempt,
					maxRetries,
					timeout
				)
				return // Success
			} catch (error) {
				lastError = error
				const shouldRetry = await this.handleNavigationError(
					error,
					attempt,
					maxRetries
				)
				if (!shouldRetry) break
			}
		}

		throw lastError
	}

	/**
	 * Perform a single navigation attempt
	 * @param {string} url - URL to navigate to
	 * @param {number} attempt - Current attempt number
	 * @param {number} maxRetries - Maximum number of retries
	 * @param {number} timeout - Total timeout in milliseconds
	 */
	async performNavigationAttempt(url, attempt, maxRetries, timeout) {
		console.log(`Navigation attempt ${attempt} for ${url}`)
		const attemptTimeout = Math.floor(timeout / (maxRetries + 1))
		const waitCondition = attempt === 1 ? "domcontentloaded" : "networkidle"

		await this.page.goto(url, {
			timeout: attemptTimeout,
			waitUntil: waitCondition
		})
	}

	/**
	 * Handle navigation error and determine if retry should occur
	 * @param {Error} error - Navigation error
	 * @param {number} attempt - Current attempt number
	 * @param {number} maxRetries - Maximum number of retries
	 * @returns {boolean} True if retry should be attempted
	 */
	async handleNavigationError(error, attempt, maxRetries) {
		console.warn(`Navigation attempt ${attempt} failed: ${error.message}`)

		if (attempt <= maxRetries) {
			console.log(`Retrying navigation... (${attempt}/${maxRetries})`)
			await this.wait(3000)
			return true
		}

		return false
	}

	/**
	 * Wait for URL to match pattern
	 * @param {string|RegExp} urlPattern - URL pattern to wait for
	 * @param {number} timeout - Timeout in milliseconds (default: 15000)
	 */
	async waitForUrl(urlPattern, timeout = 15000) {
		await this.page.waitForURL(urlPattern, { timeout })
	}

	// ==================== COMMON UTILITY METHODS ====================

	/**
	 * Wait for specified time
	 * @param {number} ms - Time to wait in milliseconds
	 */
	async wait(ms) {
		await this.page.waitForTimeout(ms)
	}

	/**
	 * Take screenshot
	 * @param {string} name - Screenshot name
	 */
	async takeScreenshot(name) {
		await this.page.screenshot({ path: `screenshots/${name}.png` })
	}

	/**
	 * Get page title
	 * @returns {string} Page title
	 */
	async getPageTitle() {
		return await this.page.title()
	}

	/**
	 * Get current URL
	 * @returns {string} Current URL
	 */
	getCurrentUrl() {
		return this.page.url()
	}
}
