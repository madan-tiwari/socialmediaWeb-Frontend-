module.exports = {

    url: 'http://localhost:3000/login',

    elements: {
        searchInputEmail: by.name('email'),
        searchInputPassword: by.name('password'),
        loginButton: by.id('login')
    },

    userInput: function (userEmail, userPassword) {

        var selectorEmail = page.login.elements.searchInputEmail;
        var selectorPassword = page.login.elements.searchInputPassword;
        var selectorButton = page.login.elements.loginButton;


        driver.findElement(selectorEmail).sendKeys(userEmail, selenium.Key.ENTER);
        driver.findElement(selectorPassword).sendKeys(userPassword, selenium.Key.ENTER);
        return driver.findElement(selectorButton).click();

    }


};
