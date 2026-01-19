import type { Page, Locator } from 'playwright'

declare module '../po/index.js' {
    export function pages(name: 'signup', page: Page): SignUpPage
    export function pages(name: 'signin', page: Page): SignInPage
    export function pages(name: 'myaccount', page: Page): MyAccountPage
    export function pages(name: 'profile', page: Page): ProfilePage
    export function pages(name: 'products', page: Page): ProductsPage
    export function pages(name: 'productdetail', page: Page): ProductDetailPage
    export function pages(name: 'cart', page: Page): CartPage
    export function pages(name: 'contact', page: Page): ContactPage
    export function pages(name: 'favorites', page: Page): FavoritesPage
    export function pages(name: 'base', page: Page): BasePage

    //Interfaces for each Page Object
    export interface SignUpPage {
        navigateToSignUp(): Promise<void>
        completeRegistration(userData: any): Promise<void>
        firstNameField: Locator
        lastNameField: Locator
        emailField: Locator
        passwordField: Locator
        registerButton: Locator
    }

    export interface SignInPage {
        navigateToSignIn(): Promise<void>
        logIn(email: string, password: string): Promise<void>
        fillEmail(email: string): Promise<void>
        fillPassword(password: string): Promise<void>
        clickLogInButton(): Promise<void>
        emailField: Locator
        passwordField: Locator
        logInButton: Locator
    }

    export interface MyAccountPage {
        waitForUserNameVisible(): Promise<void>
        accessToProfile(): Promise<void>
        goToMyFavorites(): Promise<void>
        openUserMenu(): Promise<void>
        clickOnProfileLink(): Promise<void>
        userName: Locator
        myFavoritesLink: Locator
        myProfileLink: Locator
    }

    export interface ProfilePage {
        fillPhoneNumber(number: string): Promise <void>
        submitProfileChanges(): Promise<void>
        updatePhoneNumber(number: string): Promise<void>
        waitForProfileDataLoaded(): Promise<void>
        successMessage: Locator
        errorMessage: Locator
        phoneField: Locator
        updateProfileButton: Locator
        firstNameField: Locator
        lastNameField: Locator
        emailField: Locator
    }

    export interface ProductsPage {
        navigateToProductsPage(): Promise<void>
        searchProduct(name: string): Promise<void>
        searchAndSelectProduct(name: string): Promise<void>
        waitForInitialProductsLoad(): Promise<void>
        fillSearch(product: string): Promise<void>
        waitForVisibleResult(): Promise<void>
        getFirstProductName(): Promise<string>
        clickSubcategoryCheckbox(name: string): Promise<void>
        selectBrandByName(name: string): Promise<void>
        deselectBrandByName(name: string): Promise<void>
        clickEcoFriendlyFilter(): Promise<void>
        waitForFilterCycle(): Promise<void>
        waitForFilterResults(): Promise<void>
        hasNextPage(): Promise<boolean>
        clickNextPage(): Promise<void>
        getProductCount(): Promise<number>
        getProductNames(): Promise<string[]>
        hasProductsVisible(): Promise<boolean>
        hasOutOfStockProducts(): Promise<boolean>
        validateCurrentPageEcoBadges(): Promise<boolean>
        getInvalidProductNames(keywords: string[]): Promise<string[]>
        productCards: Locator
        productName: Locator
        searchComponent: any
        filterComponent: any
        paginationComponent: any
    }

    export interface ProductDetailPage {
        waitForProductData(): Promise<void>
        getProductPrice(): Promise<number>
        addToCartByPlusClicks(clicks: number): Promise<void>
        goToCartViaHeaderLink(): Promise<void>
        clickAddToFavorites(): Promise<void>
        addProductToFavorites(): Promise<void>
        getBrandBadgeText(): Promise<string>
        increaseQuantity(times: number): Promise<void>
        clickAddToCartButton(): Promise<void>
        waitForSuccessMessage(): Promise<void>
        productPrice: Locator
        productDescription: Locator
        brandBadge: Locator
        quantityInput: Locator
        increaseButton: Locator
        addToCartButton: Locator
        addToFavoritesButton: Locator
        cartLink: Locator
        successMsg: Locator
        favSuccessMessage: Locator
        favErrorMessage: Locator
    }

    export interface CartPage {
        waitForCartLoad(): Promise<void>
        getProductNames(): Promise<string[]>
        getQuantities(): Promise<number[]>
        getPrices(): Promise<number[]>
        getLineTotals(): Promise<number[]>
        getCartTotal(): Promise<number>
        cartItems: Locator
        productTitle: Locator
        productQuantity: Locator
        productPrice: Locator
        linePrice: Locator
        cartTotal: Locator
    }

    export interface ContactPage {
        navigate(): Promise<void>
        getNormalizedInfoText(): Promise<string>
        mainHeading: Locator
        firstNameLabel: Locator
        lastNameLabel: Locator
        emailLabel: Locator
        subjectLabel: Locator
        messageLabel: Locator
        attachmentLabel: Locator
        firstNameInput: Locator
        lastNameInput: Locator
        emailInput: Locator
        subjectSelect: Locator
        messageTextarea: Locator
        submitButton: Locator
        warningLabel: Locator
        infoLabel: Locator
        navigationBar: any
    }

    export interface FavoritesPage {
        waitForFavoritesLoad(): Promise<void>
        deleteFirstFavorite(): Promise<void>
        isEmpty(): Promise<boolean>
        waitUntilNoFavorites(): Promise<void>
        favCard: Locator
        productName: Locator
        deleteBtn: Locator
        emptyMsg: Locator
    }

    export interface BasePage {
        navigateTo(url: string): Promise<void>
        waitForUrl(pattern: string | RegExp): Promise<void>
        safeClick(locator: Locator): Promise<void>
        safeFill(locator: Locator, text: string): Promise<void>
        isElementVisible(locator: Locator): Promise<boolean>
        getElementText(locator: Locator): Promise<string>
        waitForElementVisible(locator: Locator): Promise<void>
        navigationBar: any
    }
}
