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
	 * @param {string} path
	 * @param {number} timeout
	 */
	async goto(path, timeout = 45000) {
		await this.page.goto(path, { timeout, waitUntil: "domcontentloaded" })
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
