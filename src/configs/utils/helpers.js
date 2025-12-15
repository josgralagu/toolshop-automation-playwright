// ====================================================================
// GENERAL UTILITY FUNCTIONS
// ====================================================================
// Reusable helper functions for common operations
// ====================================================================

/**
 * Generate unique email address for test user creation
 * Uses timestamp and random number to ensure uniqueness
 *
 * @returns {string} Unique email address
 */
export function generateUniqueEmail() {
	const timestamp = Date.now()
	const random = Math.floor(Math.random() * 10000)
	return `test-${timestamp}-${random}@yopmail.com`
}

/**
 * Wait for products to become visible on the page
 * Handles both container and individual product visibility with configurable timeout
 *
 * @param {Page} page - Playwright page object
 * @param {Locator} productLocator - Locator for product elements
 * @param {Locator} containerLocator - Optional container locator for parent element
 * @param {number} timeout - Maximum wait time in milliseconds (default: 15000)
 */
export async function waitForProductsVisible(
	page,
	productLocator,
	containerLocator = null,
	timeout = 15000
) {
	if (containerLocator) {
		await containerLocator.waitFor({ state: "visible", timeout })
	}
	await productLocator.first().waitFor({ state: "visible", timeout })
}
