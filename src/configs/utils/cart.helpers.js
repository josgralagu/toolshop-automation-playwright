// ====================================================================
// CART HELPERS
// ====================================================================
// Cart domain logic: add-to-cart orchestration, data extraction,
// subtotal calculations, and line-total validation.
// ====================================================================

import { pages } from "../../po/index.js"
import { URLS } from "./constants.js"

// ==================== CART ORCHESTRATION ====================

/**
 * Complete workflow to add product to cart with specified quantity.
 * @param {import('@playwright/test').Page} page
 * @param {string} productName
 * @param {number} quantity
 */
export async function addProductToCart(page, productName, quantity = 1) {
	const productsPage = pages("products", page)
	const detailPage = pages("productdetail", page)

	await productsPage.navigateToProductsPage()
	await productsPage.searchAndSelectProduct(productName)
	await detailPage.waitForProductData()
	await detailPage.addToCartByPlusClicks(quantity - 1)
}

/**
 * Add multiple products to cart and collect their data.
 * @param {import('@playwright/test').Page} page
 * @param {string[]} productNames
 * @param {number} qtyPerProduct
 * @returns {Promise<Array<{name: string, qty: number, price: number}>>}
 */
export async function addProductsAndCollectData(page, productNames, qtyPerProduct) {
	const detailPage = pages("productdetail", page)
	const products = []

	for (const name of productNames) {
		await addProductToCart(page, name, qtyPerProduct)
		const price = await detailPage.getProductPrice()
		products.push({ name, qty: qtyPerProduct, price })
	}
	return products
}

/**
 * Retrieve comprehensive cart data including products, quantities, and totals.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<{names: string[], quantities: number[], prices: number[], lineTotals: number[], cartTotal: number}>}
 */
export async function getCartData(page) {
	const cartPage = pages("cart", page)

	await page.goto(`${URLS.BASE}${URLS.CART}`, {
		waitUntil: "domcontentloaded"
	})
	await cartPage.waitForCartLoad()

	return {
		names: await cartPage.getProductNames(),
		quantities: await cartPage.getQuantities(),
		prices: await cartPage.getPrices(),
		lineTotals: await cartPage.getLineTotals(),
		cartTotal: await cartPage.getCartTotal()
	}
}

// ==================== CART CALCULATIONS (pure functions) ====================

/**
 * @param {Array<{price: number, qty: number}>} products
 * @returns {number}
 */
export function calculateExpectedSubtotal(products) {
	return products.reduce((sum, p) => sum + p.price * p.qty, 0)
}

/** @param {Array<{name: string}>} products */
export function getProductNames(products) {
	return products.map((p) => p.name)
}

/** @param {Array<{qty: number}>} products */
export function getProductQuantities(products) {
	return products.map((p) => p.qty)
}

/** @param {Array<{price: number}>} products */
export function getProductPrices(products) {
	return products.map((p) => p.price)
}

/**
 * @param {number[]} cartLineTotals
 * @param {Array<{price: number, qty: number}>} products
 * @returns {Array<{index: number, actual: number, expected: number, diff: number}>}
 */
export function getLineTotalsDifferences(cartLineTotals, products) {
	return cartLineTotals.map((actual, i) => {
		const expected = products[i].price * products[i].qty
		return { index: i, actual, expected, diff: Math.abs(actual - expected) }
	})
}

/** @param {Array<{diff: number}>} differences */
export function sumLineTotalsDifferences(differences) {
	return differences.reduce((sum, item) => sum + item.diff, 0)
}

/**
 * @param {number[]} cartLineTotals
 * @param {Array<{price: number, qty: number}>} products
 * @returns {number}
 */
export function calculateLineTotalsError(cartLineTotals, products) {
	return sumLineTotalsDifferences(getLineTotalsDifferences(cartLineTotals, products))
}
