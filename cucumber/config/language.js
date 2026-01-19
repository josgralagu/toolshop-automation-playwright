// cucumber/config/language.js - Config for language tests only

export default [
    "--require-module tsx/cjs",
    "--require cucumber/support/world-setup.ts",
    "--require cucumber/support/hooks.ts",
    "--require cucumber/steps/11-language.steps.ts",
    "--format progress-bar"
].join(" ");
