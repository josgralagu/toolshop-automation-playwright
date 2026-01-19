# src/features/11-language.feature
@ui @regression @language
Feature: Language Selection
  As a user
  I want to change the website language
  So that I can use it in my preferred language

  Background: User is on contact page
    Given the user is on the contact page

  @smoke
  Scenario Outline: Change language and verify contact page translation
    When the user changes the language to "<language>"
    Then the contact page title is displayed in "<language>"
    And the form labels are translated to "<language>"
    And the submit button text is in "<language>"
    And the selected language is "<language>"

    Examples:
      | language |
      | DE       |
      | EN       |
      | ES       |
      | FR       |
      | NL       |
      | TR       |
