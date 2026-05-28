// ====================================================================
// BASE PAGE CLASS
// ====================================================================
// Minimal shared contract for all page objects.
// Only contains: page reference, navigation bar, navigation, URL wait.
// ====================================================================

import { NavigationBarComponent } from "../Components/index.js"

export class BasePage {
	constructor(page) {
		this.page = page
		this.navigationBar = new NavigationBarComponent(page)
	}

	/**
	 * Navigate to URL with domcontentloaded strategy.
	 * Detects Cloudflare challenge pages and throws with a clear message
	 * instead of letting locators timeout with opaque errors.
	 * @param {string} path
	 * @param {number} timeout
	 */
	async goto(path, timeout = 45000) {
		await this.page.goto(path, { timeout, waitUntil: "domcontentloaded" })
		const title = await this.page.title()
		if (/(security|challenge|cloudflare|just a moment)/i.test(title)) {
			throw new Error(
				`Bot protection page detected at ${path}. Title: "${title}". ` +
				"This is a Cloudflare challenge blocking the test runner."
			)
		}
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
