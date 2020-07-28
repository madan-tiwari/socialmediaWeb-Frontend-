@search
Feature: Register in Social Media
  As a user
  In order to login to the application
  I want to register
  
  Scenario: user registeration vaidation test
    Given I am on the Social Media Registration page
    When I enter "madan" and I enter "madan@gmail.com" and I enter "madan123" and I click SignUp
    Then I should see "Login Here" in the same page