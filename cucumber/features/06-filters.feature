# src/features/06-filters.feature
@ui @regression @filters
Feature: Filter Products
  As a customer
  I want to filter products by different criteria
  So that I can find products that match my needs

  Background: User is on products page
    Given the user is on the products page

  @smoke @category
  Scenario Outline: Filter products by category
    When the user selects the "<category>" category filter
    Then the user sees only products from the "<category>" category
    And the corresponding subcategories under "<category>" are marked as selected
    And the user can see the number of filtered results

    Examples:
      | category    |
      | Hand Tools  |
      | Power Tools |
      | Other       |

  @brand @stock
  Scenario Outline: Filter products by brand showing only items in stock
    When the user selects the brand "<brand_name>"
    Then the user sees only products from "<brand_name>"
    And all displayed products have stock available
    And no out-of-stock products are shown

    Examples:
      | brand_name           |
      | ForgeFlex Tools      |

  @sustainability
  Scenario: Filter products by sustainability type
    When the user selects the "eco-friendly" sustainability filter
    Then the user sees only products marked as "eco-friendly"
    And the user can see the number of filtered results

  @multiple-filters
  Scenario Outline: Apply multiple filters and verify sample product
    When the user selects the "<category>"
    And the user selects the brand "<brand>"
    Then the user sees filtered results
    And at least one product matches both filters

    Examples:
      | category    | brand                |
      | Hand Tools  | ForgeFlex Tools      |
      | Power Tools | MightyCraft Hardware |
