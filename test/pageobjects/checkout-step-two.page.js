const { $, $$ } = require('@wdio/globals')
const Page = require('./page');

class CheckoutStepTwo extends Page {

    get cartItem() {
        return $('div.cart_item');
    }

    get finishCheckoutButton() {
        return $('#finish');
    }

    async clickFinishCheckoutButton() {
        await this.finishCheckoutButton.click();
    }

    async getOverviewItem() {
        return await this.cartItem;
    }

    async getItemPrice() {
        return await this.cartItem.$('.inventory_item_price').getText();
    }

    async getSummaryTotalPrice() {
        return await $('.summary_total_label').getText();
    }

}

module.exports = new CheckoutStepTwo();