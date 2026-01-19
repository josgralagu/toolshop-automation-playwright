// cucumber.js - Cucumber configuration file
// Centralizes common Cucumber CLI options

const commonOptions = [
    "--require-module tsx/cjs",
    "--require src/support/world-setup.ts",
    "--require src/support/hooks.ts",
    "--require src/steps/02-user-profile.steps.ts",
    "--require src/steps/03-product-details.steps.ts",
    "--require src/steps/05-favorites.steps.ts",
    "--require src/steps/06-filters.steps.ts",
    "--require src/steps/11-language.steps.ts",
    "--format progress-bar"
];

// Export for programmatic use
export const config = commonOptions.join(" ");

// Default export for Cucumber CLI
export default config;
