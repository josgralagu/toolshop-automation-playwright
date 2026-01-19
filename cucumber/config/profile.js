// cucumber/config/profile.js - Config for profile tests only

export default [
    "--require-module tsx/cjs",
    "--require cucumber/support/world-setup.ts",
    "--require cucumber/support/hooks.ts",
    "--require cucumber/steps/02-user-profile.steps.ts",
    "--format progress-bar"
].join(" ");
