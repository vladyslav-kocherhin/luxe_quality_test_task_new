const Page = require('./page');

class InventoryPage extends Page {

    get filterDropdown() {
        return $('.product_sort_container');
    }

    get itemNames() {
        return $$('div.inventory_item_name');
    }

    get itemPrices() {
        return $$('div.inventory_item_price');
    }

    get shoppingCartBadge() { 
        return $('.shopping_cart_badge');
    }

    get productsList() {
        return $('#inventory_container');
    }

    get shopingCartIcon() {
        return $('#shopping_cart_container');
    }

    get burgerMenuButton() {
        return $('#react-burger-menu-btn');
    }
    
    get burgerMenu() {
        return $('div.bm-menu-wrap');
    }

    get cartItem() {
        return $('div.cart_item');
    }

    get getBurgerMenuOptions() {
        return $$('a.bm-item.menu-item');
    }

    get getBurgerMenuOptions() {
        return $$('a.bm-item.menu-item');
    }

    get addToCartButtons() {
        return $$('button.btn_inventory'); 
    }

    async sortBy(optionText) {
        await this.filterDropdown.selectByVisibleText(optionText);
    }

    async getBurgerMenuHiddenStatus() {
        return await this.burgerMenu.getAttribute('aria-hidden');
    }

    async clickBurgerMenuButton() {
        await this.burgerMenuButton.click();
    }

    async clickAddToCartButton() {
        const buttons = await this.addToCartButtons;
        await buttons[0].click(); 
    }

    async clickShoppingCartIcon() {
        await this.shopingCartIcon.click();
    }

    async getItemNames() {
        const names = [];
        for (const el of await this.itemNames) {
            names.push(await el.getText());
        }
        return names;
    }

    async getItemPrices() {
        const prices = [];
        for (const el of await this.itemPrices) {
            const text = await el.getText();
            prices.push(parseFloat(text.replace('$', '')));
        }
        return prices;
    }

    open() {
        return super.open('inventory.html');
    }
}

module.exports = new InventoryPage();