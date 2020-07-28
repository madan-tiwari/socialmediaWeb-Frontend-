module.exports = function () {
    this.Given(/^I am on the Social Media Registration page$/, function () {

        // load Social Media
        return helpers.loadPage(page.registration.url);
    });

    this.When(/^I enter "([^"]*)" and I enter "([^"]*)" and I enter "([^"]*)" and I click SignUp$/, function (userName, userEmail, userPassword) {
        // Write code here that turns the phrase above into concrete actions
        return page.registration.userInput(userName, userEmail, userPassword);

    });

      // this.Then(/^I should be in login page$/, function (callback) {
      //   // Write code here that turns the phrase above into concrete actions
      //   //callback(null, 'pending');
      // });
    this.Then(/^I should see "([^"]*)" in the same page$/, function (expectedText) {
        // eslint-disable-next-line no-undef
        return driver.findElement(By.name('loginhere'))
            .getText().then((textValue) => {
              // eslint-disable-next-line no-undef
                assert.equal(expectedText, textValue);
            });
    });

};
