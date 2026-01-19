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
    await signUpPage.navigateToSignUp()
    await signUpPage.completeRegistration(user)

    //Login
    await signInPage.logIn(user.email, user.password)
    await myAccountPage.waitForUserNameVisible()

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
        await myAccountPage.accessToProfile()
        console.log(`✅ Navigated to profile page`)
    }
