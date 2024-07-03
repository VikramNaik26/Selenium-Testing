Feature: Search Techverito on google

  Scenario: Search Techverito on google
    Given I visit google homepage
    When I search for "Techverito"
    Then I should see the results
