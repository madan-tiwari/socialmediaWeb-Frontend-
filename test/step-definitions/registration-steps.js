module.exports = function () {
    this.Given(/^I am on the Social Media Registration page$/, function () {

        // load Social Media
        return helpers.loadPage(page.registration.url);
    });

    this.When(/^I enter "([^"]*)" and I enter "([^"]*)"$/, function (userName, userEmail) {
        // Write code here that turns the phrase above into concrete actions
        return page.registration.userInput(userName, userEmail);

    });

      // this.Then(/^I should be in login page$/, function (callback) {
      //   // Write code here that turns the phrase above into concrete actions
      //   //callback(null, 'pending');
      // });
    this.Then(/^I should see "([^"]*)"$/, function (expectedText) {
        // eslint-disable-next-line no-undef
        return driver.findElement(By.name('password'))
            .getText().then((textValue) => {
              // eslint-disable-next-line no-undef
                assert.equal(expectedText, textValue);
            });
    });

};
