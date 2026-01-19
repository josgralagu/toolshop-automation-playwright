// cucumber-firefox.config.cjs - Configuration for Firefox
module.exports = {
  requireModule: ['tsx/cjs'],
  require: [
    'src/support/world-setup.ts',
    'src/support/hooks.ts',
    'src/steps/02-user-profile.steps.ts',
    'src/steps/03-product-details.steps.ts',
    'src/steps/05-favorites.steps.ts',
    'src/steps/06-filters.steps.ts',
    'src/steps/11-language.steps.ts'
  ],

  paths: ['src/features/*.feature'],

  format: [
    'progress-bar',
    'html:reports/cucumber/cucumber-firefox-report.html',
    'json:reports/cucumber/cucumber-firefox-report.json'
  ],

  formatOptions: {
    snippetInterface: 'async-await'
  },

  parallel: 1, // Sequential execution for single browser

  worldParameters: {
    baseUrl: 'https://practicesoftwaretesting.com',
    timeout: 60000,
    headless: false,
    browser: 'firefox' // Firefox
  }
};
