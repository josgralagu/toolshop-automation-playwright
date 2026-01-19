const path = require('path');

module.exports = {
  // ========== ESMODULES ==========
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
  
  // ========== FEATURES ==========
  paths: ['src/features/**/*.feature'],
  
  // ========== FORMATTERS ==========
  format: [
    'progress-bar',
    'html:reports/cucumber/cucumber-report.html',
    'json:reports/cucumber/cucumber-report.json'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  },
  
  // ========== PARALELISM ==========
  parallel: 2,
  
  // ========== RETRY ==========
  retry: 1,
  retryTagFilter: '@flaky',
  
  // ========== QUIET MODE ==========
  publishQuiet: true,
  
  // ========== WORLD PARAMETERS ==========
  worldParameters: {
    baseUrl: 'https://practicesoftwaretesting.com',
    timeout: 60000,
    headless: true
  }
};