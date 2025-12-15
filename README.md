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

| Technology             | Version/Type                      |
| ---------------------- | --------------------------------- |
| **Testing Framework**  | Playwright 1.56.1                 |
| **Test Runner**        | Mocha 11.7.5                      |
| **Assertion Library**  | Chai 6.2.1                        |
| **HTTP Testing**       | Supertest 7.1.4                   |
| **Validation Library** | Joi 18.0.2                        |
| **Language**           | JavaScript (ES Modules)           |
| **Node.js Version**    | 16+                               |
| **Architecture**       | Page Object Model (POM)           |
| **Reporters**          | HTML, List, JSON, Spec            |
| **Browsers**           | Chromium, Firefox, Microsoft Edge |

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

### Run all UI tests (Playwright + Mocha)

```bash
npm run test:ui
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

### View Playwright results

```bash
npm run test:playwright:report
```

### View Mocha UI results

The HTML report opens automatically after running `npm run test:mocha`. Find it in `reports/ui/mocha-reports/`

### View API test results

The HTML report opens automatically after running `npm run test:api`. Find it in `reports/api/mocha-reports/`

## 📁 Project Structure

```
toolshop-automation-playwright/
├── api/                                   # API Testing Module (Mocha/Supertest)
│   ├── business/                          # API business logic classes
│   │   ├── AuthService.js                 # Authentication service
│   │   ├── BookingService.js              # Booking business logic
│   │   └── booking.endpoints.js           # API endpoint definitions
│   ├── configs/                           # API configuration
│   │   ├── .mocharc.json                  # Mocha configuration for API tests
│   │   ├── api.config.js                  # API configuration settings
│   │   └── api.setup.js                   # API test setup and global configuration
│   ├── tests/                             # API test specifications
│   │   ├── 01-get-all-ids.spec.js
│   │   ├── 02-get-by-name.spec.js
│   │   ├── 03-get-by-dates.spec.js
│   │   ├── 04-create-booking.spec.js
│   │   ├── 05-get-single-booking.spec.js
│   │   ├── 06-update-booking.spec.js
│   │   └── 07-delete-booking.spec.js
│   └── utilities/                         # API utility functions
│       ├── apiClient.js                   # HTTP client wrapper
│       ├── authWrapper.js                 # Authentication utilities
│       ├── booking.payloads.js            # Request payload definitions
│       ├── booking.schemas.js             # Response schema validations (Joi)
│       ├── time.js                        # Date/time utilities
│       └── validators.js                  # Validation helper functions
├── src/                                   # UI Testing Module (Playwright & Mocha-Chai)
│   ├── configs/                           # Configuration files
│   │   ├── mochaConfigs/                  # Mocha configuration for UI tests
│   │   │   ├── .mocharc.json              # Mocha runner configuration
│   │   │   └── setup.js                   # Global setup with Chai assertions
│   │   ├── playwrightConfigs/             # Playwright configuration
│   │   │   ├── playwright.config.js       # Playwright configuration
│   │   │   └── fixtures/
│   │   │       └── auth.fixture.js        # Authentication fixtures
│   │   └── utils/                         # Shared utilities
│   │       ├── commands.js                # 40+ reusable command functions
│   │       ├── helpers.js                 # Helper utilities
│   │       └── testData.js                # Centralized test data
│   ├── po/                                # Page Object Model (POM)
│   │   ├── Components/                    # Reusable UI components
│   │   │   ├── FilterComponent.js         # Filtering component
│   │   │   ├── NavigationBarComponent.js  # Navigation bar component
│   │   │   ├── PaginationComponent.js     # Pagination component
│   │   │   ├── SearchComponent.js         # Search component
│   │   │   └── index.js                   # Component exports
│   │   ├── Pages/                         # Page objects
│   │   │   ├── BasePage.js                # Base page with common methods
│   │   │   ├── CartPage.js                # Shopping cart page
│   │   │   ├── ContactPage.js             # Contact form page
│   │   │   ├── FavoritesPage.js           # Favorites/wishlist page
│   │   │   ├── MyAccountPage.js           # Account management page
│   │   │   ├── ProductDetailPage.js       # Product detail view
│   │   │   ├── ProductsPage.js            # Products listing page
│   │   │   ├── ProfilePage.js             # User profile page
│   │   │   ├── SignInPage.js              # Login page
│   │   │   ├── SignUpPage.js              # Registration page
│   │   │   └── index.js                   # Page factory and exports
│   │   └── index.js                       # Centralized POM exports
│   └── tests/                             # Test specifications
│       ├── mocha-chai-tests/              # Mocha with Chai assertions
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
│       └── playwright-tests/              # Playwright native tests
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
├── reports/                               # Test reports (git-ignored, generated)
│   ├── api/                               # API test reports
│   │   └── mocha-reports/                 # HTML/JSON reports from Mochawesome
│   │       └── assets/                    # Report assets (CSS, JS)
│   └── ui/                                # UI test reports
│       ├── mocha-reports/                 # HTML/JSON reports from Mochawesome
│       │   └── assets/                    # Report assets
│       ├── playwright-reports/            # Playwright HTML reports
│       │   ├── index.html
│       │   ├── data/
│       │   └── trace/
│       └── playwright-test-results/       # Playwright JSON results
├── eslint.config.js                       # ESLint configuration (ES Modules)
├── package.json                           # Project dependencies and scripts
├── package-lock.json                      # Locked dependency versions
├── .gitignore                             # Git exclusions
└── README.md                              # This file
```

### Directory Notes

- **api/** - Completely independent API testing module at project root
- **src/** - UI testing with parallel Playwright and Mocha-Chai implementations
- **reports/** - All generated test reports (excluded from Git via `.gitignore`)
- **reports/api/** - API test outputs from Mocha/Supertest tests
- **reports/ui/** - UI test outputs from both Playwright and Mocha-Chai runners

## 🎯 Test Execution

### Playwright Tests

| Command                           | Description                                |
| --------------------------------- | ------------------------------------------ |
| `npm run test:playwright`         | Run all Playwright tests                   |
| `npm run test:playwright:headed`  | Run tests in headed mode (visible browser) |
| `npm run test:playwright:chrome`  | Run tests on Chrome/Chromium               |
| `npm run test:playwright:firefox` | Run tests on Firefox                       |
| `npm run test:playwright:msedge`  | Run tests on Microsoft Edge                |
| `npm run test:playwright:ui`      | Run tests with Playwright UI mode          |
| `npm run test:playwright:debug`   | Run tests in debug mode                    |
| `npm run test:playwright:report`  | Show Playwright HTML report                |

### Mocha Tests

| Command                                | Description                                      |
| -------------------------------------- | ------------------------------------------------ |
| `npm run test:mocha`                   | Run all Mocha tests with HTML and Spec reporters |
| `npm run test:mocha:file`              | Run single Mocha test file                       |
| `npm run test:mocha:watch`             | Run Mocha tests in watch mode                    |
| `npm run test:mocha:serial`            | Run Mocha tests sequentially                     |
| `npm run test:mocha:specreporter`      | Run with detailed Spec reporter in console       |
| `npm run test:mocha:grep -- "pattern"` | Run tests matching a specific pattern            |

### API Tests

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `npm run test:api` | Run API tests with HTML and Spec reporters |

### Combined Test Execution

| Command                  | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `npm run test:ui`        | Run both Playwright and Mocha tests sequentially |
| `npm run test:ui:headed` | Run UI tests in headed mode                      |
| `npm run test:ui:parallel` | Run Playwright and Mocha tests in parallel     |
| `npm run test:api`       | Run API tests with HTML and Spec reporters       |

### Running Tests by Pattern (Grep)

Filter and run tests matching a specific pattern using the grep command:

```bash
# Run tests with "user-profile" in the name
npm run test:mocha:grep -- "user-profile"

# Run tests with "checkout" in the name
npm run test:mocha:grep -- "checkout"

# Run tests with "filter" in the name
npm run test:mocha:grep -- "filter"

# Run tests with "language" in the name
npm run test:mocha:grep -- "language"
```

This feature allows you to execute specific test suites without running the entire test suite, useful for focused testing and debugging.

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

The project includes a dedicated API testing module at the root level using Mocha and Supertest for testing backend endpoints:

**Location**: `api/` (root directory)

**Key Components**:

- **Business Logic** (`api/business/`): API business logic classes for request handling
- **Tests** (`api/tests/`): API test specifications
- **Utilities** (`api/utilities/`): Helper functions for API operations
- **Configuration** (`api/configs/`): Mocha setup and configuration for API test environment

**Configuration Files**:

- `.mocharc.json` - Mocha configuration with Spec and Mochawesome reporters
- `api.setup.js` - API test setup and global configuration
- `api.config.js` - API configuration settings

**Technology Stack**:

- Supertest - HTTP assertions for API testing
- Mocha - Test runner
- Chai - Assertion library
- Joi - Schema validation for responses

## ⚙️ Configuration Details

### Playwright Configuration

**File**: [src/configs/playwrightConfigs/playwright.config.js](src/configs/playwrightConfigs/playwright.config.js)

**Key Settings:**

- **Base URL**: `https://practicesoftwaretesting.com`
- **Test Directory**: `src/tests/playwright-tests/**/*.spec.js`
- **Timeout**: 80 seconds per test
- **Retries**: 2 attempts for failed tests
- **Workers**: 2 parallel executions (can be adjusted)
- **Viewport**: 1920x1080 px
- **Screenshot**: Only on failure
- **Video**: Retained on failure only
- **Trace**: On first retry for debugging

**Browser Support:**

- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- Microsoft Edge (Desktop Edge)

**Execution Modes:**

- Headless: Default mode (no visible browser)
- Headed: Visible browser with `--headed` flag
- UI Mode: Interactive mode with `--ui` flag
- Debug Mode: Step-by-step debugging with `--debug` flag

### Mocha UI Configuration

**File**: [src/configs/mochaConfigs/.mocharc.json](src/configs/mochaConfigs/.mocharc.json)

**Key Settings:**

- **Setup File**: [src/configs/mochaConfigs/setup.js](src/configs/mochaConfigs/setup.js)
- **Test Pattern**: `src/tests/mocha-chai-tests/**/*.spec.js`
- **Timeout**: 80 seconds per test
- **Retries**: 2 attempts on failure
- **Parallel Execution**: 2 jobs (default)
- **Reporters**: Spec (console) + Mochawesome (HTML)
- **Report Output**: `reports/ui/mocha-reports/`
- **Report Format**: `toolshop-test-[status]_[datetime]-report`

**Global Setup Features:**

- Chai assertions (`expect`, `should`, `assert`) available globally
- Browser initialization for Chromium, Firefox, WebKit
- Automatic user generation and authentication
- Fresh browser state between tests
- Global hooks for setup/teardown

### Mocha API Configuration

**File**: [api/configs/.mocharc.json](api/configs/.mocharc.json)

**Key Settings:**

- **Setup File**: [api/configs/api.setup.js](api/configs/api.setup.js)
- **Test Pattern**: `api/tests/**/*.spec.js`
- **Timeout**: 80 seconds per test
- **Retries**: 2 attempts on failure
- **Parallel Execution**: Disabled (serial) for API test stability
- **Reporters**: Spec (console) + Mochawesome (HTML)
- **Report Output**: `reports/api/mocha-reports/`
- **Report Format**: `api-test-[status]_[datetime]`

**API Features:**

- Supertest for HTTP assertions and requests
- Joi schema validation for response bodies
- Automatic test data generation
- Comprehensive API endpoint testing
- Request/response logging in HTML reports
- Independent module structure at project root

### Test Data Configuration

**File**: [src/configs/utils/testData.js](src/configs/utils/testData.js)

**Contains:**

- **User Data**: Dynamic user generation with unique emails
- **Product Search**: Product names and search terms
- **Filter Data**: Categories, subcategories, brands
- **Cart Configurations**: Multiple product combinations
- **Translation Data**: Multi-language contact form mappings
- **Validation Data**: Expected values for assertions

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

The framework integrates multiple reporters for comprehensive test result visualization across all testing frameworks (Playwright, Mocha UI, and Mocha API).

### Playwright Reports

Playwright tests generate HTML, JSON, and List format reports:

```bash
npm run test:playwright:report
```

**Report Locations:**

- **HTML Report**: `reports/ui/playwright-reports/index.html`
- **Test Results (JSON)**: `reports/ui/playwright-test-results/`
- **Trace Files**: `reports/ui/playwright-reports/trace/` (for debugging)

**Reports include:**

- Detailed test results with execution timelines
- Failure analysis with screenshots and videos
- Console logs and error traces
- Trace files for step-by-step debugging

### Mocha UI Reports

Mocha UI tests are configured with dual reporters:

**1. Spec Reporter (Console Output)**

```bash
npm run test:mocha:specreporter
```

Real-time console output showing:

- Pass/fail status for each test with execution time
- Detailed error messages and stack traces
- Clean test organization by describe/it blocks
- Hierarchical test structure

**2. HTML Reporter (Mochawesome)**

```bash
npm run test:mocha
```

Interactive HTML reports with:

- Test statistics and charts
- Pass/fail details with stack traces
- Console output captured per test
- Code view for test methods
- Automatic browser opening to view reports
- Summary dashboard with overall statistics

**Report Locations:**

- **HTML Reports**: `reports/ui/mocha-reports/`
- **Report Format**: `toolshop-test-[status]_[datetime]-report.html` and `.json`

### API Reports

API tests are configured with the same dual reporters as UI tests:

**1. Spec Reporter (Console Output)**

```bash
npm run test:api
```

Real-time console output with detailed API test results and assertions.

**2. HTML Reporter (Mochawesome)**

Same as UI tests, with API-specific details and request/response logging.

**Report Locations:**

- **HTML Reports**: `reports/api/mocha-reports/`
- **Report Format**: `api-test-[status]_[datetime].html` and `.json`

### Reporter Configuration

The framework uses the following reporters configured in `.mocharc.json` files:

- **Spec**: Built-in Mocha reporter for console output with real-time feedback
- **Mochawesome**: Interactive HTML reporter with charts, statistics, and code view
- **HTML**: Playwright native HTML reporter for visual test results
- **JSON**: Structured test results for CI/CD integration and automation
- **List**: Playwright list reporter for simple, minimal output

## 🚨 Troubleshooting

### Common Issues

**Issue**: Tests timeout or fail to connect to the application

- **Solution**: Ensure `https://practicesoftwaretesting.com` is accessible and not blocked by your network/firewall
- Verify Node.js and npm are properly installed
- Run `npm install` again to ensure all dependencies are installed

**Issue**: Playwright browser fails to launch

- **Solution**: Run `npx playwright install` to install browser binaries
- Check that you have sufficient disk space for browser installation
- Ensure you have the required system dependencies installed

**Issue**: Mocha tests fail with "Browser not initialized"

- **Solution**: Ensure the setup file is properly configured in `.mocharc.json`
- Verify that browser initialization is called before running tests
- Check that the browser is not crashing due to missing dependencies

**Issue**: Port conflicts or tests running simultaneously

- **Solution**: Run tests serially using `npm run test:mocha:serial` or adjust worker count
- Check that no other processes are using required ports
- Ensure browser instances are properly closed between test runs

**Issue**: Selector or locator issues after UI updates

- **Solution**: Update locators in the corresponding Page Object classes
- Prioritize `data-test` attributes over CSS selectors when possible
- Use wait strategies for dynamic content
- Check the application for DOM structure changes

**Issue**: Report files not generating or appearing in Git status

- **Solution**: All report directories are excluded in `.gitignore` which includes:
  - `reports/` - All test reports
  - `node_modules/` - Dependencies
  - `.env.local` - Local environment files
  - `*.log` - Log files
- If reports still appear in Git status:
  - Run `git status` to verify current tracking
  - Run `git rm --cached -r reports/` to remove tracked reports
  - Run `git commit -m "Remove cached report files"`
  - Verify `.gitignore` contains: `reports/`

**Issue**: Environment variables not being loaded

- **Solution**: Create a `.env.local` file in the project root (automatically ignored)
- Never commit `.env` files with sensitive credentials
- Use `.env.example` as a template for required variables

**Issue**: API tests failing with authentication errors

- **Solution**: Verify API credentials in `api/configs/api.config.js`
- Check that the API server is running and accessible
- Ensure test data hasn't been corrupted or deleted from the backend
- Review `api/configs/api.setup.js` for setup configuration

## 🔧 Maintenance Guide

### Adding New Tests

1. **Create Page Object** (if needed)

   ```javascript
   // src/po/Pages/NewPage.js
   import { BasePage } from "./BasePage.js";

   export class NewPage extends BasePage {
     constructor(page) {
       super(page);
       // Define locators using data-test attributes
       this.submitButton = page.locator('[data-test="submit-btn"]');
     }

     async performAction() {
       // Add methods with JSDoc comments
       await this.submitButton.click();
     }
   }
   ```

2. **Update Central Exports**

   ```javascript
   // src/po/Pages/index.js
   import { NewPage } from "./NewPage.js";

   export { NewPage } from "./NewPage.js";
   // Add to pages object in factory function
   ```

3. **Add Test Specification**

   **For Playwright:**
   ```javascript
   // src/tests/playwright-tests/12-new-feature.spec.js
   import { test, expect } from "@playwright/test";
   import { pages } from "../../po/index.js";

   test.describe("New Feature", () => {
     test("should perform action", async ({ page }) => {
       const newPage = pages("NewPage", page);
       // Test implementation
     });
   });
   ```

   **For Mocha-Chai:**
   ```javascript
   // src/tests/mocha-chai-tests/12-new-feature.spec.js
   import { expect } from "chai";
   import { pages } from "../../po/index.js";
   import { initializeBrowser, closeBrowser } from "../../configs/mochaConfigs/setup.js";

   describe("New Feature", () => {
     let browser;
     let page;

     before(async function () {
       browser = await initializeBrowser();
       page = await browser.newPage();
     });

     after(async function () {
       await closeBrowser(browser);
     });

     it("should perform action", async () => {
       const newPage = pages("NewPage", page);
       // Test implementation
     });
   });
   ```

4. **Add Utility Functions** (if needed)

   ```javascript
   // src/configs/utils/commands.js
   // Add to appropriate category section with JSDoc comments
   export async function newHelperFunction(page, param) {
     // Implementation
   }
   ```

5. **Add Test Data** (if needed)

   ```javascript
   // src/configs/utils/testData.js
   export const newFeatureData = {
     // Add test data for new feature
   };
   ```

### Updating Selectors

When UI changes occur, update selectors in the corresponding Page Object class:

1. Open the affected Page Object file
2. Update locators to match new `data-test` attributes
3. Run affected tests to verify
4. All selectors should prioritize `data-test` attributes for maximum stability

### Formatting and Linting

The project includes multiple script commands for code quality:

```bash
# Format UI files (Playwright and Mocha)
npm run format:ui

# Lint UI files
npm run lint:ui

# Format and lint together
npm run format&lint:ui

# Fix linting issues automatically
npm run fix:ui

# Format API files
npm run format:api

# Lint API files
npm run lint:api

# Fix API linting issues
npm run fix:api

# Format entire project
npm run format:project

# Lint entire project
npm run lint:project

# Fix entire project
npm run fix:project
```

### Running Tests with Specific Patterns

Use grep to run tests matching specific patterns:

```bash
# Run tests matching a pattern
npm run test:mocha:grep -- "user-profile"

# Run API tests (all)
npm run test:api

# Run specific browser
npm run test:playwright:chrome
```

### Best Practices

- **Page Objects**: Keep focused on single page/component responsibilities
- **Method Names**: Use descriptive names reflecting user actions
- **Test Independence**: Each test runs in isolation with fresh data
- **Documentation**: Add comprehensive JSDoc comments for complex methods
- **Data Management**: Use centralized test data from [testData.js](src/configs/utils/testData.js)
- **Error Handling**: Implement proper wait strategies and error recovery
- **Selectors**: Always use `data-test` attributes when available
- **Code Style**: Follow ESLint configuration for consistent code style
- **Assertions**: Use appropriate Chai assertions for clear test intent

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone <your-fork-url>
   cd toolshop-automation-playwright
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the project structure and naming conventions
   - Add appropriate tests for new features
   - Update documentation as needed

4. **Format and lint your code**
   ```bash
   npm run format&lint:project
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: Add amazing feature"
   ```

6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe the changes clearly
   - Reference any related issues
   - Ensure all tests pass

### Coding Standards

- **Code Style**: Follow ESLint configuration (JavaScript ES Modules)
- **Page Objects**: Use POM pattern for all new page interactions
- **Naming**: Use descriptive names for classes, methods, and test cases
- **Comments**: Add JSDoc comments for all public methods
- **Tests**: Ensure tests are independent and can run in any order
- **Assertions**: Use descriptive assertion messages for clarity
- **Locators**: Prioritize `data-test` attributes over CSS/XPath selectors
- **Configuration**: Update `.mocharc.json` for test-related changes
- **Documentation**: Update README.md for new features or significant changes
- **Git Commits**: Use conventional commit messages (feat:, fix:, docs:, etc.)

## 👤 Author

**José Emmanuel Grajales Lagunes**

## 📄 License

This project is licensed under the ISC License.

## 🔗 Resources

### Documentation & Learning

- [Playwright Documentation](https://playwright.dev/) - Official Playwright docs with API reference
- [Mocha Documentation](https://mochajs.org/) - Test runner and CLI reference
- [Chai Assertion Library](https://www.chaijs.com/) - Assertion syntax and patterns
- [Supertest Documentation](https://github.com/visionmedia/supertest) - HTTP assertion library
- [Joi Validation Library](https://joi.dev/) - Schema validation for API testing

### Project Resources

- [Practice Software Testing](https://practicesoftwaretesting.com) - Test application
- [Page Object Model Pattern](https://playwright.dev/docs/pom) - POM best practices
- [ESLint Documentation](https://eslint.org/) - Code quality and style rules
- [Prettier Documentation](https://prettier.io/) - Code formatter

### Best Practices

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Testing Library Principles](https://testing-library.com/docs/queries/about)
- [API Testing Guide](https://restfulapi.net/testing/)
- [Page Object Model Examples](https://github.com/microsoft/playwright/blob/main/tests/pageobject-example.spec.ts)

---

**Happy Testing! 🚀**
