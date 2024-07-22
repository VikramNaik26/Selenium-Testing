Feature: User management
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

  Scenario: Successful post creation
    Given Iam in home page
    When I enter the post content as "New post!!!"
    And I click on the share button
    Then I should see the new uploaded post with the content as "New post!!!"

  Scenario: Unsuccessful user registration
    Given Iam in registration page
    When I enter the following details:
      | username   | email   | password   | name   |
      | <username> | <email> | <password> | <name> |
    And I click on the register button
    Then I should see a register error message "<error_message>"
    And I should remain on the registration page

    Examples:
      | username | email                  | password | name      | error_message        |
      |          | testuser@gmail.com     | pass123  | Test User | Missing fields       |
      | testuser |                        | pass123  | Test User | Missing fields       |
      | testuser | testuser@gmail.com     |          | Test User | Missing fields       |
      | testuser | testuser@gmail.com     | pass123  |           | Missing fields       |
      | testuser | testuser123@gmail.com  | vikram   | Test User | user already exists  |

   Scenario Outline: Unsuccessful user login
    Given Iam in login page
    When I enter the following credentials:
      | username   | password   |
      | <username> | <password> |
    And I click on the login button
    Then I should see a login error message "<error_message>"
    And I should remain on the login page

    Examples:
      | username | password | error_message                    |
      |          | pass123  | Missing fields                   |
      | testuser |          | Missing fields                   |
      | testuser | wrong    | wrong password or username       |
      | nonexist | pass123  | user not found                   |
