const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
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

    get shopingCartIcon() {
        return $('#shopping_cart_container');
    }

    get productsList() {
        return $('#inventory_container');
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

    get burgerMenuButton() {
        return $('#react-burger-menu-btn');
    }

    get burgerMenu() {
        return $('div.bm-menu-wrap');
    }

    get logoutButton() {
        return $('#logout_sidebar_link');
    }

    get shoppingСartBadge() { 
        return $('.shopping_cart_badge');
    }

    get cartItem() {
        return $('div.cart_item');
    }

    get filterButton() {
        return $('select.product_sort_container');
    }

    get filterOptionNameAtoZ() {
        return $('option[value="az"]');
    }

    get filterOptionNameZtoA() {
        return $('option[value="za"]');
    }

    get filterOptionPriceLowToHigh() {
        return $('option[value="lohi"]');
    }

    get filterOptionPriceHighToLow() {
        return $('option[value="hilo"]');
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
