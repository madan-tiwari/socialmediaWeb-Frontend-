@search
Feature: Login in Social Media
  As a registered and approved <user-type>
  In order to login to the application
  I want to be able to acess <user-type> dashboard
  
  Scenario: Login for registered and approved user
   Given I am on the Social Media Login page
    When I enter "test@gmail.com" and I enter "test123" and I click login
    Then I should see "WELCOME" in the results