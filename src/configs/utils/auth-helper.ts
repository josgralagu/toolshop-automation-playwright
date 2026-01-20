import type { Page } from 'playwright'
import { pages } from '../../po/index'
import { generateValidUser } from './testData'

/**
 * Authenticates a new user in the application
 * Same process flow that is applied on the playwright fixture
 */

export async function authenticateNewUser (page: Page) {
    const signUpPage = pages("signup", page)
    const signInPage = pages("signin", page)
    const myAccountPage = pages("myaccount", page)

    //Generates an unique user
    const user = generateValidUser()
    console.log(`🆕 Creating test user: ${user.email}`)

    //Registration
    console.log(`📍 [1/4] Navigating to sign up page...`)
    await signUpPage.navigateToSignUp()
    //await page.waitForLoadState('domcontentloaded')
    await signUpPage.firstNameField.waitFor({ state: 'attached', timeout: 15000 })
    console.log(`✅ [1/4] Navigated to sign up`)

    console.log(`📍 [2/4] Completing registration...`)
    await signUpPage.completeRegistration(user)
    console.log(`✅ [2/4] Registration completed`)

    //Login
    console.log(`📍 [3/4] Logging in...`)
    await signInPage.logIn(user.email, user.password)
    await page.waitForLoadState('domcontentloaded')
    console.log(`✅ [3/4] Logged in`)

    console.log(`📍 [4/4] Waiting for user name...`)
    await myAccountPage.waitForUserNameVisible()
    console.log(`✅ [4/4] User name visible`)

    console.log(`✅ User authenticated: ${user.email}`)

    return {
        page,
        user
    }
}

    /**
     * Navigate to the authenticated user profile
     */
    export async function navigateToProfile(page: Page) {
        const myAccountPage = pages("myaccount", page)
        await page.waitForLoadState('domcontentloaded')
        await myAccountPage.accessToProfile()
        await page.waitForLoadState('domcontentloaded')
        console.log(`✅ Navigated to profile page`)
    }
