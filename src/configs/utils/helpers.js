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
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `test-${timestamp}-${random}@yopmail.com`;
}

export async function waitForProductsVisible(page, productLocator, containerLocator = null, timeout = 15000) {
  if (containerLocator) {
    await containerLocator.waitFor({ state: 'visible', timeout });
  }
  await productLocator.first().waitFor({ state: 'visible', timeout });
}