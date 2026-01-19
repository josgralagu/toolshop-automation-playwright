// cucumber/config/favorites.js - Config for favorites tests only

export default [
    "--require-module tsx/cjs",
    "--require cucumber/support/world-setup.ts",
    "--require cucumber/support/hooks.ts",
    "--require cucumber/steps/05-favorites.steps.ts",
    "--format progress-bar"
].join(" ");
