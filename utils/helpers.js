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