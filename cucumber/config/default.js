// cucumber/config/default.js - Cucumber configuration file
// Centralizes common Cucumber CLI options

const commonOptions = [
    "--require-module tsx/cjs",
    "--require cucumber/support/world-setup.ts",
    "--require cucumber/support/hooks.ts",
    "--require cucumber/steps/02-user-profile.steps.ts",
    "--require cucumber/steps/03-product-details.steps.ts",
    "--require cucumber/steps/05-favorites.steps.ts",
    "--require cucumber/steps/06-filters.steps.ts",
    "--require cucumber/steps/07-filters-subcategory.steps.ts",
    "--require cucumber/steps/11-language.steps.ts",
    "--format progress-bar"
];

// Export for programmatic use
export const config = commonOptions.join(" ");

// Default export for Cucumber CLI
export default config;
