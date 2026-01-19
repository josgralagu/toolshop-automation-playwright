# src/features/07-filters-subcategory.feature
@ui @regression @filters @subcategory
Feature: Filter Products by Subcategory
  As a user
  I want to filter products by subcategory
  So that I can find specific types of products within a category

  Background: User is on products page
    Given the user is on the products page

  @smoke
  Scenario Outline: Filter by subcategory and verify results
    When the user selects the "<subcategory>" subcategory filter
    Then the user sees only products from the "<subcategory>" subcategory

    Examples:
      | subcategory |
      | Hammer      |
      | Hand Saw    |
      | Wrench      |
