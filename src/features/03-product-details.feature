# src/features/03-product-details.feature
@ui @regression @product
Feature: Product Details Page
  As a customer
  I want to view detailed product information
  So that I can make informed purchasing decisions

  Background: Products are available
    Given there are products available in the store

  @smoke
  Scenario Outline: View details of available product
    When the user searches for a product named "<product_name>"
    And the user selects the product from the results
    Then the user can see the product price
    And the user can see the description and features of the product

    Examples:
      | product_name   |
      | Bolt Cutters   |
      | Belt Sander    |
      | Safety Goggles |
