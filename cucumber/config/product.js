// cucumber/config/product.js - Config for product tests only

export default [
    "--require-module tsx/cjs",
    "--require cucumber/support/world-setup.ts",
    "--require cucumber/support/hooks.ts",
    "--require cucumber/steps/03-product-details.steps.ts",
    "--format progress-bar"
].join(" ");
