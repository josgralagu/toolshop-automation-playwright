# 🧪 Toolshop Automation Framework

> A comprehensive automated testing framework built with Playwright, Mocha, and Supertest for end-to-end (E2E), UI, and API testing of the Practice Software Testing demo application.

[![Playwright](https://img.shields.io/badge/Playwright-1.56.1-45ba4b?logo=playwright)](https://playwright.dev/)
[![Mocha](https://img.shields.io/badge/Mocha-11.7.5-8D6748?logo=mocha)](https://mochajs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

## 📋 Project Overview

This project implements comprehensive automated tests covering key e-commerce functionalities including:
- User profiles management
- Product catalog and details
- Shopping cart operations
- Favorites system
- Advanced filtering capabilities
- Multi-language support
- API endpoint validation

The framework supports three testing approaches: **Playwright native tests** for E2E scenarios, **Mocha-Chai tests** for UI validations, and **Supertest** for API testing, providing flexibility and comprehensive coverage.

## 🛠️ Technical Stack

| Technology | Version/Type |
|------------|--------------|
| **Testing Framework** | Playwright 1.56.1 |
| **Test Runner** | Mocha 11.7.5 |
| **Assertion Library** | Chai 6.2.1 |
| **HTTP Testing** | Supertest 7.1.4 |
| **Validation Library** | Joi 18.0.2 |
| **Language** | JavaScript (ES Modules) |
| **Node.js Version** | 16+ |
| **Architecture** | Page Object Model (POM) |
| **Reporters** | HTML, List, JSON, Spec |
| **Browsers** | Chromium, Firefox, Microsoft Edge |

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** package manager
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

## ⚡ Quick Start

### Run all tests (UI + E2E + API)

```bash
npm run test:all
```

### Run only Playwright E2E tests

```bash
npm run test:playwright
```

### Run only Mocha UI tests

```bash
npm run test:mocha
```

### Run API tests

```bash
npm run test:api
```

### View results

```bash
npm run test:playwright:report
```

## 📁 Project Structure

```
toolshop-automation-playwright/
├── src/
│   ├── api/                               # API Testing Module
│   │   ├── configs/
│   │   │   └── .mocharc.json              # Mocha configuration for API tests
│   │   ├── business/                      # API business logic classes
│   │   ├── tests/                         # API test specifications
│   │   └── utilities/                     # API utility functions
│   ├── configs/
│   │   ├── mochaConfigs/
│   │   │   ├── .mocharc.json              # Mocha configuration
│   │   │   └── setup.js                   # Mocha global setup with Chai assertions
│   │   ├── playwrightConfigs/
│   │   │   ├── fixtures/
│   │   │   │   └── auth.fixture.js        # Authentication fixtures for Playwright
│   │   │   └── playwright.config.js       # Playwright configuration
│   │   └── utils/
│   │       ├── commands.js                # 40+ reusable command functions
│   │       ├── helpers.js                 # Helper utilities
│   │       └── testData.js                # Centralized test data
│   ├── po/                                # Page Object Model
│   │   ├── Components/                    # Reusable UI components
│   │   │   ├── FilterComponent.js
│   │   │   ├── index.js
│   │   │   ├── NavigationBarComponent.js
│   │   │   ├── PaginationComponent.js
│   │   │   └── SearchComponent.js
│   │   ├── Pages/                         # Page objects
│   │   │   ├── BasePage.js
│   │   │   ├── CartPage.js
│   │   │   ├── ContactPage.js
│   │   │   ├── FavoritesPage.js
│   │   │   ├── index.js
│   │   │   ├── MyAccountPage.js
│   │   │   ├── ProductDetailPage.js
│   │   │   ├── ProductsPage.js
│   │   │   ├── ProfilePage.js
│   │   │   ├── SignInPage.js
│   │   │   └── SignUpPage.js
│   │   └── index.js                       # Centralized exports
│   └── tests/
│       ├── mocha-chai-tests/              # Mocha-Chai test specifications
│       │   ├── 02-user-profile.spec.js
│       │   ├── 03-product-details.spec.js
│       │   ├── 04-checkout.spec.js
│       │   ├── 05-favorites.spec.js
│       │   ├── 06-filters-category.spec.js
│       │   ├── 07-filters-subcategory.spec.js
│       │   ├── 08-filters-brand.spec.js
│       │   ├── 09-filters-sustainability.spec.js
│       │   ├── 10-filters-multiple.spec.js
│       │   └── 11-language.spec.js
│       └── playwright-tests/              # Playwright test specifications
│           ├── 02-user-profile.spec.js
│           ├── 03-product-details.spec.js
│           ├── 04-checkout.spec.js
│           ├── 05-favorites.spec.js
│           ├── 06-filters-category.spec.js
│           ├── 07-filters-subcategory.spec.js
│           ├── 08-filters-brand.spec.js
│           ├── 09-filters-sustainability.spec.js
│           ├── 10-filters-multiple.spec.js
│           └── 11-language.spec.js
├── package.json                           # Project dependencies and scripts
├── package-lock.json                      # Locked dependency versions
└── README.md                             # This file
```

## 🎯 Test Execution

### Playwright Tests

| Command | Description |
|---------|-------------|
| `npm run test:playwright` | Run all Playwright tests |
| `npm run test:playwright:headed` | Run tests in headed mode (visible browser) |
| `npm run test:playwright:chrome` | Run tests on Chrome/Chromium |
| `npm run test:playwright:firefox` | Run tests on Firefox |
| `npm run test:playwright:msedge` | Run tests on Microsoft Edge |
| `npm run test:playwright:ui` | Run tests with Playwright UI mode |
| `npm run test:playwright:debug` | Run tests in debug mode |
| `npm run test:playwright:report` | Show Playwright HTML report |

### Mocha Tests

| Command | Description |
|---------|-------------|
| `npm run test:mocha` | Run all Mocha tests |
| `npm run test:mocha:file` | Run single Mocha test file |
| `npm run test:mocha:watch` | Run Mocha tests in watch mode |
| `npm run test:mocha:serial` | Run Mocha tests sequentially |
| `npm run test:mocha:reporter` | Run with detailed spec reporter |
| `npm run test:mocha:grep` | Run tests matching a specific pattern |

### API Tests

| Command | Description |
|---------|-------------|
| `npm run test:api` | Run API tests with Mocha and Supertest |

### Combined Test Execution

| Command | Description |
|---------|-------------|
| `npm run test:all` | Run both Playwright and Mocha tests sequentially |
| `npm run test:all:headed` | Run tests in headed mode |
| `npm run test:all:parallel` | Run both test frameworks in parallel |

## 🧩 Test Coverage

### User Management
- ✅ Successful profile updates
- ✅ Unsuccessful profile update validations
- ✅ Authentication flows with automatic user generation

### Product Features
- ✅ View product details for multiple products
- ✅ Product search functionality
- ✅ Subtotal calculation with various configurations

### Shopping Experience
- ✅ Add/remove products from favorites
- ✅ Authentication validation
- ✅ Complete checkout process
- ✅ Cart operations with line total validation

### Filtering System
- ✅ Category filtering (Hand Tools, Power Tools, Other)
- ✅ Subcategory filtering with keyword validation
- ✅ Brand filtering
- ✅ Sustainability (ECO) filtering
- ✅ Multiple combined filters with pagination support

### Internationalization
- ✅ Multi-language support (DE, EN, ES, FR, NL, TR)
- ✅ Contact form translation verification
- ✅ Navigation element translation validation

## 🔌 API Testing Module

The project includes a dedicated API testing module using Mocha and Supertest for testing backend endpoints:

**Location**: `src/api/`

**Key Components**:
- **Business Logic** (`src/api/business/`): API business logic classes for request handling
- **Tests** (`src/api/tests/`): API test specifications
- **Utilities** (`src/api/utilities/`): Helper functions for API operations
- **Configuration** (`src/api/configs/`): Mocha setup for API test environment

**Technology Stack**:
- Supertest - HTTP assertions for API testing
- Mocha - Test runner
- Chai - Assertion library
- Joi - Schema validation for responses

## ⚙️ Configuration Details

### Playwright Configuration

**Key Settings:**
- **Base URL**: `https://practicesoftwaretesting.com`
- **Test Directory**: `src/tests/playwright-tests`
- **Timeout**: 80 seconds per test
- **Retries**: 2 attempts for failed tests
- **Workers**: 2 parallel executions
- **Viewport**: 1920x1080

**Browser Support:**
- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- Microsoft Edge (Desktop Edge)

**Artifacts:**
- Screenshots: Only on failure
- Videos: Retained on failure
- Trace: On first retry

### Mocha Configuration

**Key Settings:**
- **Setup File**: `src/configs/mochaConfigs/setup.js`
- **Timeout**: 80 seconds per test
- **Retries**: 2 attempts
- **Parallel Execution**: 2 jobs
- **Reporter**: Spec (detailed output)

**Global Setup Features:**
- Chai assertions (expect, should, assert) available globally
- Browser initialization utilities for Chromium, Firefox, WebKit
- Automatic user generation and authentication
- Clean browser state between tests

## 🏗️ Framework Architecture

### Page Object Model (POM)
The framework implements a sophisticated POM pattern with:

- **Page Objects**: Each page has dedicated class with locators and methods
- **Components**: Reusable UI components (Navigation, Filters, Search, Pagination)
- **Centralized Exports**: Clean import interface via [`src/po/index.js`](src/po/index.js:1)
- **Factory Pattern**: Dynamic page instantiation with [`pages(pageName, page)`](src/po/Pages/index.js:25)
- **Barrel Exports**: Organized component exports via [`src/po/Components/index.js`](src/po/Components/index.js:1)

### Index.js Files Architecture

The project uses barrel exports for clean module management:

**Main PO Index** ([`src/po/index.js`](src/po/index.js:1)):
- Centralizes all page and component exports
- Provides single import point for test files
- Exports both factory function and individual page classes

**Pages Index** ([`src/po/Pages/index.js`](src/po/Pages/index.js:1)):
- Factory function [`pages()`](src/po/Pages/index.js:25) for dynamic page instantiation
- Case-insensitive page name resolution
- Individual page class exports for direct imports
- Implements DRY and SOLID principles

**Components Index** ([`src/po/Components/index.js`](src/po/Components/index.js:1)):
- Centralized component class exports
- Clean import interface for page objects
- Maintains component organization structure

### Command Utilities
The [`commands.js`](src/configs/utils/commands.js) file provides 40+ reusable functions organized by:

1. **Profile Actions** - User profile management
2. **Product Navigation & Search** - Product discovery workflows
3. **Cart Operations** - Adding products and retrieving cart data
4. **Cart Calculations & Validations** - Price calculations and validation logic
5. **Filter Operations** - Category, brand, and eco-friendly filtering
6. **Filter Validations** - Filter result validation functions
7. **Pagination Validations** - Cross-page validation workflows
8. **Language & Contact Actions** - Language switching and translation handling
9. **Contact Form Validations** - Form field translation validations

### Test Data Management
Centralized test data in [`testData.js`](src/configs/utils/testData.js) includes:

- **User Data**: Dynamic user generation with unique emails
- **Product Data**: Search terms, category keywords, cart configurations
- **Filter Data**: Subcategories, brands, multiple filter combinations
- **Translation Data**: Complete multi-language mappings for contact forms

## 📊 Test Results and Reports

### Playwright Reports

View the HTML report after test execution:

```bash
npm run test:playwright:report
```

**Report Locations:**
- **HTML Report**: `./playwright-report/`
- **Test Results**: `./test-results/`
- **JSON Results**: `./test-results/results.json`

**Reports include:**
- Detailed test results with execution timelines
- Failure analysis with screenshots and videos
- Console logs and error traces

### Mocha Reports

Mocha tests output real-time results using the Spec reporter, providing:
- Pass/fail status for each test with execution time
- Detailed error messages and stack traces
- Clean test organization by describe/it blocks

## 🚨 Troubleshooting

### Common Issues

**Issue**: Tests timeout or fail to connect to the application
- **Solution**: Ensure `https://practicesoftwaretesting.com` is accessible and not blocked by your network/firewall
- Verify Node.js and npm are properly installed
- Run `npm install` again to ensure all dependencies are installed

**Issue**: Playwright browser fails to launch
- **Solution**: Run `npx playwright install` to install browser binaries
- Check that you have sufficient disk space for browser installation

**Issue**: Mocha tests fail with "Browser not initialized"
- **Solution**: Ensure the setup file is properly configured in `.mocharc.json`
- Verify that `initializeBrowser()` is called before running tests

**Issue**: Port conflicts or tests running simultaneously
- **Solution**: Run tests serially using `npm run test:mocha:serial` or `npm run test:playwright` (single worker)
- Check that no other processes are using required ports

**Issue**: Snapshot or selector issues after UI updates
- **Solution**: Update locators in the corresponding Page Object classes
- Prioritize `data-test` attributes over CSS selectors when possible

## 🔧 Maintenance Guide

### Adding New Tests

1. **Create Page Object** (if needed)
   ```javascript
   // src/po/Pages/NewPage.js
   export class NewPage {
     constructor(page) {
       this.page = page;
       // Define locators using data-test attributes
     }
     // Add methods with JSDoc comments
   }
   ```

2. **Update Central Exports**
   ```javascript
   // src/po/Pages/index.js
   export { NewPage } from './NewPage.js';
   ```

3. **Add Test Specification**
   ```javascript
   // For Playwright: src/tests/playwright-tests/12-new-feature.spec.js
   import { test, expect } from '@playwright/test';
   import { pages } from '../../po/index.js';

   // For Mocha: src/tests/mocha-chai-tests/12-new-feature.spec.js  
   import { initializeBrowser, closeBrowser } from '../../configs/mochaConfigs/setup.js';
   ```

4. **Add Utility Functions** (if needed)
   ```javascript
   // src/configs/utils/commands.js
   // Add to appropriate category section
   ```

### Updating Selectors

When UI changes occur, update selectors in the corresponding Page Object class. All selectors prioritize `data-test` attributes for maximum stability.

### Best Practices

- **Page Objects**: Keep focused on single page/component responsibilities
- **Method Names**: Use descriptive names reflecting user actions
- **Test Independence**: Each test runs in isolation with fresh user data
- **Documentation**: Add comprehensive JSDoc comments for complex methods
- **Data Management**: Use centralized test data from `testData.js`
- **Error Handling**: Implement proper wait strategies and error recovery

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
- Add comprehensive JSDoc comments for methods
- Ensure tests are independent and can run in any order
- Write clear commit messages following conventional commits

## 👤 Author

**José Emmanuel Grajales Lagunes**

## 📄 License

This project is licensed under the ISC License.

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Mocha Documentation](https://mochajs.org/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Joi Validation Library](https://joi.dev/)
- [Practice Software Testing](https://practicesoftwaretesting.com)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

---

**Happy Testing! 🚀**
