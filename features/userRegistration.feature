Feature: Uset registration
As a new user
I want to register for an account
So that I can access the SocialNexa

# happy
  Scenario: Successful user registration
    Given Iam in registration page
    When I enter the username as "testuser"
    And I enter valid email address as "testuser123@gmail.com"
    * I enter password as "vikram"
    * I enter the name as "Test User"
    * I click on the register button
    Then I should redirect to Login page

