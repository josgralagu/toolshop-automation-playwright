// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

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
  forbidOnly: !!process.env.CI,
  /* Number of retries for all tests */
  retries: 2,
  /* Number of workers for parallel execution */
  workers: 2,

  /* Timeout per test. */
  timeout: 80000,

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
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        headless: true,
        actionTimeout: 10000,
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        headless: true,
        actionTimeout: 10000,
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "msedge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        headless: true,
        actionTimeout: 10000,
        viewport: { width: 1920, height: 1080 },
      },
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
