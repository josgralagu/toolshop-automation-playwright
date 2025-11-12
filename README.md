# 🧪 Toolshop Automation Framework

> A comprehensive automated testing framework built with Playwright for the Practice Software Testing demo application.

## 📋 Project Overview

This project implements end-to-end tests covering key e-commerce functionalities including:
- User profiles management
- Product catalog and details
- Shopping cart operations
- Favorites system
- Advanced filtering capabilities
- Multi-language support

## 🛠️ Technical Stack

| Technology | Version/Type |
|------------|--------------|
| **Testing Framework** | Playwright 1.56.1 |
| **Language** | JavaScript |
| **Architecture** | Page Object Model (POM) |
| **Reporters** | HTML, List, JSON |
| **Browsers** | Chromium, Firefox, Microsoft Edge |

## 📁 Project Structure

```
toolshop-automation-playwright/
├── src/
│   ├── fixtures/
│   │   └── auth.fixture.js
│   ├── po/
│   │   ├── Pages/
│   │   │   ├── CartPage.js
│   │   │   ├── ContactPage.js
│   │   │   ├── FavoritesPage.js
│   │   │   ├── MyAccountPage.js
│   │   │   ├── ProductDetailPage.js
│   │   │   ├── ProductsPage.js
│   │   │   ├── ProfilePage.js
│   │   │   ├── SignInPage.js
│   │   │   └── SignUpPage.js
│   │   └── Tests/
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
│   └── utils/
│       ├── commands.js
│       ├── constants.js
│       ├── helpers.js
│       ├── testData.js
│       ├── testSetup.js
│       └── userHelpers.js
├── playwright.config.js
├── package.json
└── README.md
```

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

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

## 🎯 Test Execution

### Basic Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run tests in headed mode |
| `npm run test:chromium` | Run tests on Chrome |
| `npm run test:firefox` | Run tests on Firefox |
| `npm run test:msedge` | Run tests on Microsoft Edge |
| `npm run test:all` | Run tests on all browsers |
| `npm run test:ui` | Run tests with UI mode |
| `npm run test:debug` | Run tests in debug mode |

## ⚙️ Configuration Details

### Playwright Configuration

```javascript
{
  baseURL: 'https://practicesoftwaretesting.com',
  timeout: 60000,
  retries: 2,
  workers: 2,
  viewport: { width: 1920, height: 1080 }
}
```

### Test Execution Settings

- **Parallel Execution**: 2 workers
- **Retry Mechanism**: 2 retries for failed tests
- **Headless Mode**: Enabled for all browsers
- **Timeout**: 60 seconds per test
- **Screenshots**: Only on failure
- **Videos**: Retained on failure
- **Trace**: On first retry

## 🧩 Test Coverage

### User Management
- ✅ Successful profile updates
- ✅ Unsuccessful profile update validations

### Product Features
- ✅ View product details for multiple products
- ✅ Subtotal calculation with various configurations

### Shopping Experience
- ✅ Add/remove products from favorites
- ✅ Authentication validation
- ✅ Complete checkout process

### Filtering System
- ✅ Category filtering
- ✅ Subcategory filtering
- ✅ Brand filtering
- ✅ Sustainability filtering
- ✅ Multiple combined filters

### Internationalization
- ✅ Multi-language support (DE, EN, ES, FR, NL, TR)

## 🏗️ Framework Features

| Feature | Description |
|---------|-------------|
| **Architecture** | Page Object Model for maintainability |
| **Test Data** | Centralized management system |
| **User Generation** | Dynamic user creation for isolation |
| **Utilities** | Common operations and helpers |
| **Reporting** | Comprehensive HTML and JSON reports |
| **Error Handling** | Screenshots and videos on failure |

## 📊 Test Results and Reports

View the HTML report after test execution:

```bash
npm run report
```

Reports are generated in the `playwright-report` directory with:
- Detailed test results
- Execution timelines
- Failure analysis
- Screenshots and videos

## 🔧 Maintenance Guide

### Adding New Tests

1. **Create Page Object** (if needed)
   ```javascript
   // src/po/Pages/NewPage.js
   ```

2. **Add Test Specification**
   ```javascript
   // src/po/Tests/12-new-feature.spec.js
   ```

3. **Update Test Data**
   ```javascript
   // src/utils/testData.js
   ```

4. **Add Utility Functions** (if needed)
   ```javascript
   // src/utils/commands.js
   ```

### Updating Selectors

When UI changes occur, update selectors in the corresponding Page Object class. All selectors use `data-test` attributes where available for maximum stability.