@ui @regression @critical @profile
Feature: User Profile Management
    As a registered user
    I want to manage my profile information
    So that I can keep my account up to date

    Background: User is authenticated
        Given the user has logged into his account
    
    @smoke @profile-update
    Scenario: Succesful update of profile information
        When the user accesses his user profile
        And the user updates his phone number with valid data "3384518342"
        And the user saves the changes
        Then the user sees an update confirmation message
        And the user new phone number is displayed in his profile

    @regression @error-handling
    Scenario: Unsuccesful update to profile information
        When the user accesses his user profile
        And the user attempts to update his phone number with invalid data
        And the user saves the changes
        Then the user sees an error update message
        And the invalid phone number is displayed in his profile
        