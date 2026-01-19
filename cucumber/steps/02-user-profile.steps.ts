import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import type { CustomWorld } from '../support/world'
import { pages } from '../../src/po/index'
import { authenticateNewUser, navigateToProfile } from '../../src/configs/utils/auth-helper'
import { validProfileUpdate, invalidProfileUpdate } from '../../src/configs/utils/testData'

// ========== BACKGROUND ==========
Given('the user has logged into his account', async function(this: CustomWorld) {
    const { user } = await authenticateNewUser(this.page!)

    this.testData.currentUser = user
    this.testData.originalPhone = user.phone
    this.testData.isAuthenticated = true

    console.log(`✅ User Authenticated: ${user.email}`)
})

// ========== WHEN STEPS ==========
When('the user accesses his user profile', async function(this: CustomWorld) {
    await navigateToProfile(this.page!)
})

When('the user updates his phone number with valid data {string}',
    async function(this: CustomWorld, phoneNumber: string) {
        const profilePage = pages("profile", this.page!)
        await profilePage.updatePhoneNumber(phoneNumber)
        this.testData.expectedPhone = phoneNumber
        console.log(`✅ Phone number updated to: ${phoneNumber}`)
    }
)

When('the user attempts to update his phone number with invalid data',
    async function(this:CustomWorld) {
        const profilePage = pages("profile", this.page!)
        await profilePage.updatePhoneNumber(invalidProfileUpdate.phone)
        this.testData.expectedPhone = invalidProfileUpdate.phone
        console.log(`⚠️  Attempted update with invalid data: ${invalidProfileUpdate.phone}`)
    }
)

When('the user saves the changes', async function(this: CustomWorld) {
    const profilePage = pages("profile", this.page!)
    await profilePage.submitProfileChanges()
    await this.page!.waitForTimeout(1000)
    console.log('✅ Changes saved')
})

// ========== THEN STEPS ==========
Then('the user sees an update confirmation message',
    async function(this: CustomWorld) {
        const profilePage = pages("profile", this.page!)
        await expect(profilePage.successMessage).toBeVisible({ timeout: 10000 })
        console.log('✅ Success message visible')
    }
)

Then('the user new phone number is displayed in his profile',
    async function(this: CustomWorld) {
        const profilePage = pages("profile", this.page!)
        await expect(profilePage.phoneField).toHaveValue(this.testData.expectedPhone)
        console.log(`✅ Phone number correctly displays: ${this.testData.expectedPhone}`)
    }
)

Then('the user sees an error update message',
    async function(this: CustomWorld) {
        const profilePage = pages("profile", this.page!)
        await expect(profilePage.errorMessage).toBeVisible({ timeout: 15000 })
        console.log('✅ Error message visible')
    }
)

Then('the user phone number remains unchanged',
    async function(this: CustomWorld) {
        const profilePage = pages("profile", this.page!)
        const currentPhone = await profilePage.phoneField.inputValue()
        expect(currentPhone).toBe(this.testData.originalPhone)
        console.log(`✅ Phone number unchanged: ${currentPhone}`)
    }
)