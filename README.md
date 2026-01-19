# 🧪 Toolshop Automation Framework

> A comprehensive automated testing framework built with Playwright, Cucumber, Mocha, and Supertest for end-to-end (E2E), UI, and API testing of the Practice Software Testing demo application.

[![Playwright](https://img.shields.io/badge/Playwright-1.56.1-45ba4b?logo=playwright)](https://playwright.dev/)
[![Cucumber](https://img.shields.io/badge/Cucumber-12.5.0-00b700?logo=cucumber)](https://cucumber.io/)
[![Mocha](https://img.shields.io/badge/Mocha-11.7.5-8D6748?logo=mocha)](https://mochajs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)](https://nodejs.org/)
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

The framework supports multiple testing approaches: **Cucumber + TypeScript** for BDD/E2E scenarios, **Playwright native tests** for E2E scenarios, **Mocha-Chai tests** for UI validations, and **Supertest** for API testing, providing flexibility and comprehensive coverage.

## 🛠️ Technical Stack

| Technology             | Version/Type                      |
| ---------------------- | --------------------------------- |
| **BDD Framework**      | Cucumber 12.5.0                   |
| **Testing Framework**  | Playwright 1.56.1                 |
| **Test Runner**        | Mocha 11.7.5                      |
| **Assertion Library**  | Chai 6.2.1                        |
| **HTTP Testing**       | Supertest 7.1.4                   |
| **Validation Library** | Joi 18.0.2                        |
| **Language**           | TypeScript, JavaScript (ESM)     |
| **Node.js Version**    | 20+                               |
| **Architecture**       | Page Object Model (POM)           |
| **Reporters**          | Cucumber HTML, Mochawesome, JSON  |
| **Browsers**           | Chromium, Firefox                  |
| **CI/CD**              | GitHub Actions                     |

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 20 or higher)
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

### Run Cucumber BDD tests (Recommended)

```bash
npm run test:cucumber
```

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

## 📁 Project Structure

```
toolshop-automation-playwright/
├── cucumber/              # Cucumber BDD tests
│   ├── config/           # Cucumber configuration files
│   ├── features/         # Gherkin feature files
│   ├── steps/            # Step definitions in TypeScript
│   └── support/          # Hooks, world setup
├── src/                  # Shared code
│   ├── configs/
│   │   └── utils/        # Utility functions, test data
│   ├── po/               # Page Objects (used by all tests)
│   ├── tests/            # Playwright & Mocha test files
│   └── types/            # TypeScript type definitions
├── api/                  # API testing module (independent)
├── reports/              # Test reports (generated)
└── .github/
    └── workflows/        # CI/CD pipelines
```

### Directory Notes

- **cucumber/** - BDD tests with Cucumber + TypeScript
- **src/po/** - Page Objects shared by all test frameworks
- **src/configs/utils/** - Helper functions and test data
- **api/** - Independent API testing module
- **reports/** - Generated test reports (excluded from Git)

## 🥒 Cucumber Tests

### Running Cucumber Tests

| Command                           | Description                                |
| --------------------------------- | ------------------------------------------ |
| `npm run test:cucumber`           | Run all Cucumber tests (Chromium)        |
| `npm run test:cucumber:chrome`    | Run Cucumber tests on Chrome             |
| `npm run test:cucumber:firefox`   | Run Cucumber tests on Firefox            |
| `npm run test:cucumber:both`       | Run Chrome + Firefox in parallel         |
| `npm run test:cucumber:smoke`      | Run smoke tests (@smoke tag)            |
| `npm run test:cucumber:regression` | Run regression tests (@regression tag)  |
| `npm run test:cucumber:critical`   | Run critical tests (@critical tag)      |
| `npm run test:cucumber:dry`        | Dry run (validate without executing)    |

### Run by Feature

| Command                           | Description                                |
| --------------------------------- | ------------------------------------------ |
| `npm run test:cucumber:profile`    | User profile tests                        |
| `npm run test:cucumber:product`    | Product details tests                     |
| `npm run test:cucumber:favorites`  | Favorites tests                          |
| `npm run test:cucumber:filters`    | Filter tests                              |
| `npm run test:cucumber:language`   | Language tests                            |

### View Cucumber Reports

```bash
# Chrome report
npm run test:cucumber:report:chrome

# Firefox report
npm run test:cucumber:report:firefox
```

**Report Location:** `reports/cucumber/chrome/cucumber-report.html` or `reports/cucumber/firefox/cucumber-report.html`

### Cucumber Test Tags

| Tag        | Description                        |
| ---------- | ---------------------------------- |
| @smoke      | Critical path tests                  |
| @regression | Full regression suite               |
| @critical   | Must-pass tests                     |
| @ui         | All UI tests                        |
| @profile    | User profile management             |
| @product    | Product details                     |
| @filters    | Filtering functionality             |
| @language   | Multi-language support              |

## 🎯 Test Coverage

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

## 🎬 CI/CD with GitHub Actions

The project includes automated testing with GitHub Actions:

**Workflow:** `.github/workflows/cucumber.yml`

**Triggers:**
- Push to `main`, `master`, `develop`
- Pull requests to `main`, `master`, `develop`
- Manual workflow dispatch

**What it does:**
1. Checks out code
2. Sets up Node.js 20
3. Installs dependencies
4. Installs Playwright browsers
5. Runs Cucumber tests
6. Uploads HTML reports as artifacts
7. Uploads screenshots on failure

**View Results:** Go to your repository → Actions tab → Select workflow run

## 🧩 Cucumber Configuration

### Configuration Files

Located in `cucumber/config/`:

| File              | Purpose                          |
| ----------------- | -------------------------------- |
| `default.js`      | All steps & features              |
| `profile.js`      | Profile tests only                |
| `product.js`      | Product tests only                |
| `favorites.js`    | Favorites tests only              |
| `filters.js`      | Filter tests only                 |
| `language.js`     | Language tests only               |

### World Parameters

Pass parameters via `--world-parameters`:

```bash
# Run with Firefox
npm run test:cucumber:firefox

# Custom viewport
npx cucumber-js --config cucumber/config/default.js --world-parameters '{"viewport":{"width":1280,"height":720}}'
```

## 🔌 API Testing Module

The project includes a dedicated API testing module at the root level using Mocha and Supertest for testing backend endpoints:

**Location**: `api/` (root directory)

**Key Components**:

- **Business Logic** (`api/business/`): API business logic classes for request handling
- **Tests** (`api/tests/`): API test specifications
- **Utilities** (`api/utilities/`): Helper functions for API operations
- **Configuration** (`api/configs/`): Mocha setup and configuration for API test environment

## 📊 Test Results and Reports

### Cucumber Reports

**Report Locations:**
- **Chrome**: `reports/cucumber/chrome/cucumber-report.html`
- **Firefox**: `reports/cucumber/firefox/cucumber-report.html`
- **Screenshots**: `reports/cucumber/chrome/screenshots/` or `reports/cucumber/firefox/screenshots/`

**Reports include:**
- Feature/scenario execution status
- Step-by-step results with timing
- Screenshots on failure (embedded in HTML)
- Tags and categorization

### Playwright Reports

```bash
npm run test:playwright:report
```

**Report Locations:**
- **HTML Report**: `reports/ui/playwright-reports/index.html`
- **Test Results (JSON)**: `reports/ui/playwright-test-results/`
- **Trace Files**: `reports/ui/playwright-reports/trace/`

### Mocha Reports

**UI Tests:** `reports/ui/mocha-reports/`
**API Tests:** `reports/api/mocha-reports/`

## 🏗️ Framework Architecture

### Page Object Model (POM)

The framework implements a sophisticated POM pattern with:

- **Page Objects**: Each page has dedicated class with locators and methods
- **Components**: Reusable UI components (Navigation, Filters, Search, Pagination)
- **Centralized Exports**: Clean import interface via [`src/po/index.js`](src/po/index.js:1)
- **Factory Pattern**: Dynamic page instantiation with [`pages(pageName, page)`](src/po/Pages/index.js:25)

### Cucumber Architecture

- **Features**: Gherkin `.feature` files in `cucumber/features/`
- **Steps**: TypeScript step definitions in `cucumber/steps/`
- **Hooks**: Setup/teardown in `cucumber/support/hooks.ts`
- **World**: Custom World class in `cucumber/support/world.ts`
- **Config**: Centralized config in `cucumber/config/`

## 🔧 Maintenance Guide

### Adding New Cucumber Scenarios

1. **Create/Update Feature File**

   ```gherkin
   # cucumber/features/new-feature.feature
   @smoke
   Feature: New Feature
     Scenario: Test scenario
       Given the user is on the products page
       When the user performs action
       Then the result is visible
   ```

2. **Add Step Definitions**

   ```typescript
   // cucumber/steps/new-feature.steps.ts
   import { Given, When, Then } from '@cucumber/cucumber'
   import { pages } from '../../src/po/index'

   Given('the user is on the products page', async function() {
     const productsPage = pages('products', this.page!)
     await productsPage.navigateToProductsPage()
   })
   ```

3. **Update Configuration**

   Add to `cucumber/config/default.js`:
   ```js
   "--require cucumber/steps/new-feature.steps.ts",
   ```

4. **Run Tests**

   ```bash
   npm run test:cucumber
   ```

### Best Practices

- **BDD Style**: Write features in Given-When-Then format
- **Reusability**: Share steps across features when possible
- **Tags**: Use tags for categorization (@smoke, @regression, etc.)
- **Documentation**: Add feature descriptions for clarity
- **Page Objects**: Always use Page Objects, avoid direct selectors in steps
- **Test Data**: Use centralized test data from `src/configs/utils/testData.js`

## 🚨 Troubleshooting

### Common Issues

**Issue**: Cucumber tests fail with "Cannot find module"

- **Solution**: Ensure all step files are included in `cucumber/config/*.js`
- Verify TypeScript compilation is working with tsx

**Issue**: Tests timeout or fail to connect to the application

- **Solution**: Ensure `https://practicesoftwaretesting.com` is accessible
- Verify Node.js and npm are properly installed
- Run `npm install` again to ensure all dependencies are installed

**Issue**: Cucumber screenshots not appearing in report

- **Solution**: Screenshots are embedded as base64 in HTML report
- Ensure `this.attach()` is called with Buffer, not base64 string
- Check that tests are actually failing (screenshots only on failure)

**Issue**: Step definition not found

- **Solution**: Check for duplicate steps in multiple step files
- Ensure step is properly exported
- Verify step file is included in cucumber config

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Format and lint your code**
5. **Commit your changes** (use conventional commits)
6. **Push to the branch**
7. **Open a Pull Request**

### Coding Standards

- **Code Style**: Follow ESLint configuration
- **BDD**: Write clear, readable Gherkin scenarios
- **TypeScript**: Use types for step definitions
- **Page Objects**: Use POM pattern for all page interactions
- **Documentation**: Update README.md for new features

## 👤 Author

**José Emmanuel Grajales Lagunes**

## 📄 License

This project is licensed under the ISC License.

## 🔗 Resources

### Documentation & Learning

- [Cucumber Documentation](https://cucumber.io/docs/cucumber/) - BDD framework
- [Playwright Documentation](https://playwright.dev/) - Official Playwright docs
- [Mocha Documentation](https://mochajs.org/) - Test runner and CLI reference
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - TypeScript language

### Project Resources

- [Practice Software Testing](https://practicesoftwaretesting.com) - Test application
- [Page Object Model Pattern](https://playwright.dev/docs/pom) - POM best practices
- [BDD with Cucumber](https://cucumber.io/docs/bdd/) - Behaviour Driven Development

---

**Happy Testing! 🚀**
