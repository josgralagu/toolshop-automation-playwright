# 🧪 Toolshop Automation Framework

> A comprehensive automated testing framework built with Playwright and Mocha for the Practice Software Testing demo application.

[![Playwright](https://img.shields.io/badge/Playwright-1.56.1-45ba4b?logo=playwright)](https://playwright.dev/)
[![Mocha](https://img.shields.io/badge/Mocha-11.7.5-8D6748?logo=mocha)](https://mochajs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

## 📋 Project Overview

This project implements end-to-end tests covering key e-commerce functionalities including:
- User profiles management
- Product catalog and details
- Shopping cart operations
- Favorites system
- Advanced filtering capabilities
- Multi-language support

The framework supports both **Playwright native tests** and **Mocha-based test migrations**, providing flexibility for different testing approaches.

## 🛠️ Technical Stack

| Technology | Version/Type |
|------------|--------------|
| **Testing Framework** | Playwright 1.56.1 |
| **Test Runner** | Mocha 11.7.5 |
| **Assertion Library** | Chai 6.2.1 |
| **Language** | JavaScript (ES Modules) |
| **Architecture** | Page Object Model (POM) |
| **Reporters** | HTML, List, JSON, Spec |
| **Browsers** | Chromium, Firefox, Microsoft Edge, WebKit |

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git**

## 🚀 Installation

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd toolshop-automation-playwright
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Install Playwright browsers

```bash
npx playwright install
```

## 📁 Project Structure

```
toolshop-automation-playwright/
├── src/
│   ├── fixtures/
│   │   └── auth.fixture.js          # Authentication setup for Playwright tests
│   ├── po/
│   │   ├── Pages/                    # Page Object Models
│   │   │   ├── CartPage.js
│   │   │   ├── ContactPage.js
│   │   │   ├── FavoritesPage.js
│   │   │   ├── MyAccountPage.js
│   │   │   ├── ProductDetailPage.js
│   │   │   ├── ProductsPage.js
│   │   │   ├── ProfilePage.js
│   │   │   ├── SignInPage.js
│   │   │   └── SignUpPage.js
│   │   └── Tests/                    # Playwright test specifications
│   │       ├── 02-user-profile.spec.js
│   │       ├── 03-product-details.spec.js
│   │       ├── 04-checkout.spec.js
│   │       ├── 05-favorites.spec.js
│   │       ├── 06-filters-category.spec.js
│   │       ├── 07-filters-subcategory.spec.js
│   │       ├── 08-filters-brand.spec.js
│   │       ├── 09-filters-sustainability.spec.js
│   │       ├── 10-filters-multiple.spec.js
│   │       └── 11-language.spec.js
├── tests-mocha-migration/            # Mocha-based test files
│   ├── 02-user-profile.spec.js       # User profile management tests
│   ├── 03-product-details.spec.js    # Product detail page tests
│   ├── 04-checkout.spec.js           # Shopping cart and checkout tests
│   ├── 05-favorites.spec.js          # Favorites functionality tests
│   ├── 06-filters-category.spec.js   # Category filter tests
│   ├── 07-filters-subcategory.spec.js # Subcategory filter tests
│   ├── 08-filters-brand.spec.js      # Brand filter tests
│   ├── 09-filters-sustainability.spec.js # Sustainability filter tests
│   ├── 10-filters-multiple.spec.js   # Multiple filter combination tests
│   ├── 11-language.spec.js           # Multi-language support tests
│   └── setup.js                      # Mocha global setup and utilities
├── utils/                            # Utility functions and helpers
│   ├── commands.js                   # Common command operations
│   ├── constants.js                  # URL and constant definitions
│   ├── helpers.js                    # Helper functions
│   ├── testData.js                   # Test data configurations
│   ├── testSetup.js                  # Test setup utilities
│   └── userHelpers.js                # User-related helper functions
├── .mocharc.json                     # Mocha configuration file
├── playwright.config.js              # Playwright configuration
├── package.json                      # Project dependencies and scripts
└── README.md                         # This file
```

## 🎯 Test Execution

### Playwright Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all Playwright tests |
| `npm run test:headed` | Run tests in headed mode (visible browser) |
| `npm run test:chromium` | Run tests on Chrome/Chromium |
| `npm run test:firefox` | Run tests on Firefox |
| `npm run test:msedge` | Run tests on Microsoft Edge |
| `npm run test:webkit` | Run tests on Safari (WebKit) |
| `npm run test:all` | Run tests on all browsers (headless) |
| `npm run test:all-headed` | Run tests on all browsers (headed) |
| `npm run test:ui` | Run tests with Playwright UI mode |
| `npm run test:debug` | Run tests in debug mode |
| `npm run codegen` | Generate test code with Playwright Codegen |

### Mocha Tests

| Command | Description |
|---------|-------------|
| `npm run testmocha` | Run all Mocha tests |
| `npm run testmocha:single` | Run single Mocha test |
| `npm run testmocha:parallel` | Run Mocha tests in parallel (2 jobs) |
| `npm run testmocha:sequential` | Run Mocha tests sequentially |
| `npm run testmocha:watch` | Run Mocha tests in watch mode |

## 🧩 Test Coverage

### User Management
- ✅ Successful profile updates
- ✅ Unsuccessful profile update validations
- ✅ Authentication flows

### Product Features
- ✅ View product details for multiple products
- ✅ Product search functionality
- ✅ Subtotal calculation with various configurations

### Shopping Experience
- ✅ Add/remove products from favorites
- ✅ Authentication validation
- ✅ Complete checkout process
- ✅ Cart operations

### Filtering System
- ✅ Category filtering
- ✅ Subcategory filtering
- ✅ Brand filtering
- ✅ Sustainability filtering
- ✅ Multiple combined filters

### Internationalization
- ✅ Multi-language support (DE, EN, ES, FR, NL, TR)
- ✅ Translation verification

## ⚙️ Configuration Details

### Playwright Configuration (`playwright.config.js`)

```javascript
{
  baseURL: 'https://practicesoftwaretesting.com',
  testDir: './src/po/Tests',
  timeout: 60000,
  retries: 2,
  workers: 2,
  fullyParallel: true,
  viewport: { width: 1920, height: 1080 }
}
```

**Test Execution Settings:**
- **Parallel Execution**: 2 workers
- **Retry Mechanism**: 2 retries for failed tests
- **Headless Mode**: Enabled for all browsers
- **Timeout**: 60 seconds per test
- **Screenshots**: Only on failure
- **Videos**: Retained on failure
- **Trace**: On first retry

**Browser Configuration:**
- **Chromium** (Desktop Chrome)
- **Firefox** (Desktop Firefox)
- **Microsoft Edge** (Desktop Edge)
- **Viewport**: 1920x1080

### Mocha Configuration (`.mocharc.json`)

```json
{
  "require": ["tests-mocha-migration/setup.js"],
  "diff": true,
  "extension": ["js"],
  "reporter": "spec",
  "timeout": 60000,
  "ui": "bdd",
  "retries": 2,
  "parallel": true,
  "jobs": 2
}
```

**Mocha Settings:**
- **Test Setup**: `tests-mocha-migration/setup.js`
- **Reporter**: Spec (detailed test output)
- **Timeout**: 60 seconds per test
- **UI Style**: BDD (Behavior-Driven Development)
- **Retries**: 2 attempts on failure
- **Parallel Execution**: Enabled (2 jobs)
- **Assertion Libraries**: Chai (expect, should, assert)
- **Browser Support**: Chromium, Firefox, WebKit

**Mocha Setup Features (`setup.js`):**
- Global Chai assertions (expect, should, assert)
- Browser initialization utilities for all three browser types
- Authentication helpers for tests requiring logged-in users
- Automatic cleanup after each test
- Consistent test environment across all Mocha tests

## 🏗️ Framework Features

| Feature | Description |
|---------|-------------|
| **Architecture** | Page Object Model for maintainability |
| **Test Data** | Centralized management system |
| **User Generation** | Dynamic user creation for test isolation |
| **Utilities** | Common operations and helpers |
| **Dual Framework** | Playwright and Mocha support |
| **Reporting** | Comprehensive HTML, JSON, and Spec reports |
| **Error Handling** | Screenshots and videos on failure |
| **Parallel Execution** | Faster test runs with 2 workers |

## 📊 Test Results and Reports

### Playwright Reports

View the HTML report after test execution:

```bash
npm run report
```

**Reports include:**
- Detailed test results
- Execution timelines
- Failure analysis
- Screenshots and videos
- Console logs

**Report Locations:**
- **HTML Report**: `./playwright-report/`
- **Test Results**: `./test-results/`
- **JSON Results**: `./test-results/results.json`

### Mocha Reports

Mocha tests output results directly to the console using the Spec reporter, providing:
- Real-time test execution feedback
- Pass/fail status for each test
- Execution time per test
- Detailed error messages and stack traces

## 🔧 Maintenance Guide

### Adding New Tests

1. **Create Page Object** (if needed)
   ```javascript
   // src/po/Pages/NewPage.js
   export class NewPage {
     constructor(page) {
       this.page = page;
       // Define locators
     }
     // Add methods
   }
   ```

2. **Add Playwright Test Specification**
   ```javascript
   // src/po/Tests/12-new-feature.spec.js
   import { test, expect } from '@playwright/test';
   import { NewPage } from '../Pages/NewPage';
   ```

3. **Add Mocha Test Specification** (if needed)
   ```javascript
   // tests-mocha-migration/12-new-feature.spec.js
   import { initializeBrowser, closeBrowser } from './setup.js';
   ```

4. **Update Test Data**
   ```javascript
   // utils/testData.js
   export const newFeatureData = { /* ... */ };
   ```

5. **Add Utility Functions** (if needed)
   ```javascript
   // utils/commands.js or utils/helpers.js
   ```

### Updating Selectors

When UI changes occur, update selectors in the corresponding Page Object class. All selectors use `data-test` attributes where available for maximum stability.

### Best Practices

- Keep Page Objects focused on a single page or component
- Use descriptive method names that reflect user actions
- Maintain test independence - each test should run in isolation
- Use centralized test data from `utils/testData.js`
- Add JSDoc comments for complex methods
- Follow the existing naming conventions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow existing code structure and naming conventions
- Use Page Object Model pattern for new pages
- Add JSDoc comments for methods
- Include test descriptions and comments
- Ensure tests are independent and can run in any order
- Write clear commit messages

## 👤 Author

**José Emmanuel Grajales Lagunes**

## 📄 License

This project is licensed under the ISC License.

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Mocha Documentation](https://mochajs.org/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [Practice Software Testing](https://practicesoftwaretesting.com)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

---

*This README was created and formatted using [Dillinger](https://dillinger.io/) for easy markdown editing.*

**Happy Testing! 🚀**
