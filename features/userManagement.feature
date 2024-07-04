Feature: Uset management
As a new user
I want to register for an account
And also login using the registered credentials
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

  Scenario: Successful user login
    Given Iam in login page
    When I enter the registered username as "testuser"
    And I enter registered password as "vikram"
    * I click on the login button
    Then I should redirect to Home page
