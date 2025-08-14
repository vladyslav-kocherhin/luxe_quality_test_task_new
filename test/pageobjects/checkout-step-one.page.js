const { $, $$ } = require('@wdio/globals')
const Page = require('./page');

class CheckoutStepOne extends Page {

    get checkoutForm() {
        return $('.checkout_info');
    }

    get firstNameCheckoutField() {
        return $('#first-name');
    }

    get lastNameCheckoutField() {
        return $('#last-name'); 
    }

    get postalCodeCheckoutField() {
        return $('#postal-code');
    }

    get continueCheckoutButton() {
        return $('#continue');
    }

    async clickContinueCheckoutButton() {
        await this.continueCheckoutButton.click();
    }

    async setFirstNameCheckoutField(value) {
        await this.firstNameCheckoutField.setValue(value);
    }

    async setLastNameCheckoutField(value) {
        await this.lastNameCheckoutField.setValue(value);
    }

    async setPostalCodeCheckoutField(value) {
        await this.postalCodeCheckoutField.setValue(value);
    }

}

module.exports = new CheckoutStepOne();