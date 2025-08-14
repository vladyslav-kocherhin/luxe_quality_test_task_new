const { $ } = require('@wdio/globals')
const Page = require('./page');

class LoginPage extends Page {

    get inputUsername() {
        return $('#user-name');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnSubmit() {
        return $('#login-button');
    }

    get errorIconX() {
        return $('svg.error_icon');
    }

    get errorMessage() {
        return $('.error-message-container.error');
    }

    get errorMessageText() {
        return $('div.error-message-container');
    }

    get logoutButton() {
        return $('#logout_sidebar_link');
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async setValueToInputUsername(value) {
        await this.inputUsername.setValue(value);
    }

    async setValueToInputPassword(value) {
        await this.inputPassword.setValue(value);
    }

    async getPasswordInputType() {
        return await this.inputPassword.getAttribute('type');
    }

    async clickLoginButton() {
        await this.btnSubmit.click();
    }

    async clickLogoutButton() {
        await this.logoutButton.click();
    }

    async getErrorMessageText() {
        return await this.errorMessage.getText();
    }

    async getErrorColorOfUsernameField() {
        return await this.inputUsername.getCSSProperty('border-bottom-color');
    }

    async getErrorColorOfPasswordField() {
        return await this.inputPassword.getCSSProperty('border-bottom-color');
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
