const path = require('path');

module.exports = {
  // ========== ESMODULES ==========
  //requireModule: ['ts-node/esm'],
  //requireModule: ['tsx'], // Usa tsx para cargar .ts con ES Modules
  require: [
    'src/support/world-setup.ts',
    'src/support/hooks.ts',
    'src/steps/**/*.ts'
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