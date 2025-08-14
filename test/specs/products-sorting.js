import { expect } from '@wdio/globals';
const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');

describe('Products sorting', () => {

    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await browser.execute(() => {
        window.onbeforeunload = null;
    });
    
    });

    it('should sort by Name (A to Z)', async () => {
        await inventoryPage.sortBy('Name (A to Z)');
        const names = await inventoryPage.getItemNames();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    });

    it('should sort by Name (Z to A)', async () => {
        await inventoryPage.sortBy('Name (Z to A)');
        const names = await inventoryPage.getItemNames();
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    });

    it('should sort by Price (low to high)', async () => {
        await inventoryPage.sortBy('Price (low to high)');
        const prices = await inventoryPage.getItemPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    it('should sort by Price (high to low)', async () => {
        await inventoryPage.sortBy('Price (high to low)');
        const prices = await inventoryPage.getItemPrices();
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    });

});