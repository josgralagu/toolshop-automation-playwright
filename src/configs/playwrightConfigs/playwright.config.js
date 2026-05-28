// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const isCI = !!process.env.CI;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "../../tests/playwright-tests",
  /* Output folder for test artifacts */
  outputDir: "../../../reports/ui/playwright-test-results",
  /*"../../../test-results"*/
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,
  /* Retries: more in CI for network/challenge resilience */
  retries: isCI ? 2 : 1,
  /* Workers: 1 in CI to reduce traffic profile, 2 locally */
  workers: isCI ? 1 : 2,

  /* Timeout per test: more headroom in CI */
  timeout: isCI ? 120000 : 80000,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { outputFolder: "../../../reports/ui/playwright-reports" }],
    ["list"],
    [
      "json",
      {
        outputFile: "../../../reports/ui/playwright-test-results/results.json",
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
	/* Different Test ID Attribute */
	testIdAttribute: 'data-test',
	
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "https://practicesoftwaretesting.com",

    /* Screenshots only on failures */
    screenshot: "only-on-failure",

    /* Videos only when the test fails */
    video: "retain-on-failure",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.js/
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        headless: isCI,
        actionTimeout: 15000,
        viewport: { width: 1920, height: 1080 },
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        headless: true,
        actionTimeout: 15000,
        viewport: { width: 1920, height: 1080 },
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "msedge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        headless: isCI,
        actionTimeout: 15000,
        viewport: { width: 1920, height: 1080 },
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
    /*{
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        headless: true,
        viewport: { width: 1920, height: 1080 },
      },
    },*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
