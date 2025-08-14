const { $, $$ } = require('@wdio/globals')
const Page = require('./page');

class CheckoutComplete extends Page {

    get checkoutCompleteContainer() {
        return $('.checkout_complete_container');
    }

    get backToHomeButton() {
        return $('#back-to-products');
    }

    async clickBackToHomeButton() {
        await this.backToHomeButton.click();
    }

    async getTextOfCheckoutCompleteText() {
        return await this.checkoutCompleteContainer.getText();
    }

}

module.exports = new CheckoutComplete();