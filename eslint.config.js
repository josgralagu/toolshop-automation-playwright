import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import json from "@eslint/json";
import playwright from "eslint-plugin-playwright";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  {
    ignores: [
      "node_modules/",
      "reports/",
      ".git/",
      "eslint.config.js",
      "src/configs/playwrightConfigs/**/playwright.config.js",
    ],
  },
  {
	name: "js rules config",
	files: ["**/*.js"],
	plugins: { js },
	extends: ["js/recommended"],
	rules: {
      "no-unassigned-vars": "warn",
      "no-unmodified-loop-condition": "warn",
      "no-use-before-define": [
        "error",
        { functions: false, classes: true, variables: true },
      ],
      "no-useless-escape": "error",
      "no-empty-function": ["error", { allow: ["arrowFunctions"] }],
      "no-var": "warn",
      "require-await": "warn",
      "no-console": "warn",
      camelcase: [
        "warn",
        {
          ignoreDestructuring: true,
          ignoreImports: false,
          ignoreGlobals: true,
          properties: "always",
          allow: ["^content_Type$"],
        },
      ],
    },
  },
  {
    name: "import rules config",
    files: ["**/*.js"],
    extends: [ importPlugin.flatConfigs.recommended ],
	  rules: {
        "import/no-absolute-path": "warn",
	  },
  },
  { 
    name: "js language options",
	  files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2024,
      },
    },
  },
  { 
	  name: "json rules config",
    files: ["**/*.json"],
    ignores: ["package-lock.json", "package.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  { 
	  name: "playwright rules config",
    files: [
      "src/tests/playwright-tests/**/*.js",
      "src/po/**/*.js",
      "src/configs/playwrightConfigs/fixtures/**/*.js"
    ],
    ignores: ["src/po/**/index.js"],
	  extends: [playwright.configs["flat/recommended"]],
    rules: { "no-console": "off",
             "playwright/no-wait-for-timeout": "off",
     }
  },
  {
	  name: "mocha & chai globals config",
    files: ["src/tests/mocha-chai-tests/**/*.js", "api/tests/**/*.js", "api/configs/**/api.setup.js"],
    languageOptions: {
      globals: {
        ...globals.mocha,
        ...globals.chai,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
]);