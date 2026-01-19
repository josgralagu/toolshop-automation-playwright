// cucumber/config/filters.js - Config for filters tests only

export default [
    "--require-module tsx/cjs",
    "--require cucumber/support/world-setup.ts",
    "--require cucumber/support/hooks.ts",
    "--require cucumber/steps/06-filters.steps.ts",
    "--format progress-bar"
].join(" ");
