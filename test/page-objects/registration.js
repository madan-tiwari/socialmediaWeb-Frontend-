module.exports = {

    url: 'http://localhost:3000/register',

    elements: {
        searchInputName: by.name('fullName'),
        searchInputEmail: by.name('email'),
        searchInputPassword: by.name('password'),
        registerButton: by.name('register')
    },
    userInput: function (userName, userEmail, userPassword) {

        var selectorName = page.registration.elements.searchInputName;
        var selectorEmail = page.registration.elements.searchInputEmail;
        var selectorPassword = page.registration.elements.searchInputPassword;
        var selectorButton = page.registration.elements.registerButton;
        driver.findElement(selectorName).sendKeys(userName, selenium.Key.ENTER);
        driver.findElement(selectorEmail).sendKeys(userEmail, selenium.Key.ENTER);
        driver.findElement(selectorPassword).sendKeys(userPassword, selenium.Key.ENTER);
        driver.findElement(selectorButton).click();

    }
};
