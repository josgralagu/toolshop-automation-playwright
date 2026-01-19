# src/features/05-favorites.feature
@ui @regression @favorites
Feature: Favorite Products
  As a registered user
  I want to manage my favorite products
  So that I can easily find items I'm interested in

  @smoke @authenticated
  Scenario: Remove a product from favorites list
    Given the user has logged into his account
    And the user has at least one product in his favorites list
    When the user accesses his favorite products
    And the user removes a product from the list
    Then the product is successfully removed
    And the user sees a confirmation message

  @critical
  Scenario: Add a product to favorites without authentication
    Given the user has not logged into his account
    When the user selects a product from the store
    And the user attempts to add it to the favorites list
    Then the user sees a message indicating authentication is required
    And the user remains on the product details page
