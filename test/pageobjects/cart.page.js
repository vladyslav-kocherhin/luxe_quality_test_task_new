const { $, $$ } = require('@wdio/globals')
const Page = require('./page');

class Cart extends Page {

    get addToCartButtons() {
        return $$('button.btn_inventory');
    }

    get shopingCartIcon() {
        return $('#shopping_cart_container');
    }

    get shoppingCartBadge() { 
        return $('.shopping_cart_badge');
    }

    get cartItem() {
        return $('div.cart_item');
    }

    get removeFromCartButton() {
        return $('#remove-sauce-labs-backpack');
    }

    get checkoutButton() {
        return $('#checkout');
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }

    async getTextOfCartItem() {
        return await this.cartItem.$('.inventory_item_price').getText();
    }

    async clickRemoveFromCartButton() {
        await this.removeFromCartButton.click();
    }

    async clickAddToCartButton() {
        const buttons = await this.addToCartButtons;
        await buttons[0].click(); 
    }

    async clickShoppingCartIcon() {
        await this.shopingCartIcon.click();
    }

}

module.exports = new Cart();