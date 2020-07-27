module.exports = function () {
    this.Given(/^I am on the Social Media Login page$/, function () {

        // load
        return helpers.loadPage(page.login.url);
    });
    this.When(/^I enter "([^"]*)" and I enter "([^"]*)" and I click login$/, function (userEmail, userPassword) {


        return page.login.userInput(userEmail, userPassword);
    });
    this.Then(/^I should see "([^"]*)" in the results$/, function (expectedText) {
        // eslint-disable-next-line no-undef
        return driver.findElement(By.id('welcome'))
        .getText().then((textValue) => {
            // eslint-disable-next-line no-undef
            assert.equal(expectedText, textValue);
        });
    });

};
