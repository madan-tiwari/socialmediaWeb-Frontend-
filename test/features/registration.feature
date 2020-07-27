@search
Feature: Register in Social Media
  As a user
  In order to login to the application
  I want to register
  
  Scenario: user registeration vaidation test
    Given I am on the Social Media Registration page
    When I enter "Test" and I enter "test@gmail.com" and I click SignUp
    Then I should see "Password is required."