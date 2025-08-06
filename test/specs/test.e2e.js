import { expect } from '@wdio/globals';
const LoginPage = require('../pageobjects/login.page');

describe('Valid Login', () => {

    it('Valid Login', async () => {

        await LoginPage.open();

        await LoginPage.inputUsername.setValue('standard_user');
        await LoginPage.inputPassword.setValue('secret_sauce');

        await expect(LoginPage.inputUsername).toHaveValue('standard_user');
        await expect(LoginPage.inputPassword).toHaveValue('secret_sauce');

        const inputType = await LoginPage.inputPassword.getAttribute('type');
        expect(inputType).toBe('password');
        
        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        await expect(LoginPage.shopingCartIcon).toBeExisting();
        await expect(LoginPage.productsList).toBeExisting();
        
    });


    it('Login with invalid password', async () => {

        await LoginPage.open();

        await LoginPage.inputUsername.setValue('standard_user');
        await LoginPage.inputPassword.setValue('wrong_password');

        await expect(LoginPage.inputUsername).toHaveValue('standard_user');
        await expect(LoginPage.inputPassword).toHaveValue('wrong_password');

        const inputType = await LoginPage.inputPassword.getAttribute('type');
        expect(inputType).toBe('password');

        await LoginPage.btnSubmit.click();

        await expect(LoginPage.errorIconX).toBeExisting();
        await expect(LoginPage.errorMessage).toBeExisting();
        await expect(LoginPage.errorMessage).toBeDisplayed();

        const errorText = await LoginPage.errorMessage.getText();
        expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

        const loginBorderColor = await LoginPage.inputUsername.getCSSProperty('border-bottom-color');
        const passwordBorderColor = await LoginPage.inputPassword.getCSSProperty('border-bottom-color');

        expect(loginBorderColor.parsed.hex).toBe('#e2231a'); 
        expect(passwordBorderColor.parsed.hex).toBe('#e2231a');
    });
    
    
    it('Login with invalid login', async () => {

        await LoginPage.open();

         LoginPage.inputUsername.setValue('wrong_login');
        await LoginPage.inputPassword.setValue('secret_sauce');

        await expect(LoginPage.inputUsername).toHaveValue('wrong_login');
        await expect(LoginPage.inputPassword).toHaveValue('secret_sauce');

        const inputType = await LoginPage.inputPassword.getAttribute('type');
        expect(inputType).toBe('password');

        await LoginPage.btnSubmit.click();

        await expect(LoginPage.errorIconX).toBeExisting();
        await expect(LoginPage.errorMessage).toBeExisting();
        await expect(LoginPage.errorMessage).toBeDisplayed();

        const errorText = await LoginPage.errorMessage.getText();
        expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');

        const loginBorderColor = await LoginPage.inputUsername.getCSSProperty('border-bottom-color');
        const passwordBorderColor = await LoginPage.inputPassword.getCSSProperty('border-bottom-color');

        expect(loginBorderColor.parsed.hex).toBe('#e2231a'); 
        expect(passwordBorderColor.parsed.hex).toBe('#e2231a');

    });

    it('Logout', async () => {

        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        await LoginPage.burgerMenuButton.click();

        const menuStatus = await LoginPage.burgerMenu.getAttribute('aria-hidden');
        expect(menuStatus).toBe('false'); 

        const menuOptionsCount = await $$('a.bm-item.menu-item'); 
        expect(menuOptionsCount).toBeElementsArrayOfSize(4);

        await LoginPage.logoutButton.click();

        await expect(browser).toHaveUrl('https://www.saucedemo.com/');

        await expect(LoginPage.inputUsername).toHaveValue('');
        await expect(LoginPage.inputPassword).toHaveValue('');

    });


    it('Saving the card after logout ', async () => {

        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        const addToCartButtons = await $$('button.btn_inventory');
        await addToCartButtons[0].click();

        await expect(LoginPage.shoppingСartBadge).toBeExisting();
        await expect(LoginPage.shoppingСartBadge).toHaveText('1');

        await LoginPage.shopingCartIcon.click();
        await expect(LoginPage.cartItem).toBeExisting();

        await LoginPage.burgerMenuButton.click();

        const menuStatus = await LoginPage.burgerMenu.getAttribute('aria-hidden');
        expect(menuStatus).toBe('false'); 

        const menuOptionsCount = await $$('a.bm-item.menu-item'); 
        expect(menuOptionsCount).toBeElementsArrayOfSize(4);

        await LoginPage.logoutButton.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');

        await expect(LoginPage.inputUsername).toHaveValue('');
        await expect(LoginPage.inputPassword).toHaveValue('');

        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

        await expect(LoginPage.shopingCartIcon).toBeExisting();
        await expect(LoginPage.productsList).toBeExisting();

        await LoginPage.shopingCartIcon.click();

        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');

        await expect(LoginPage.cartItem).toBeExisting();

    });





    it('Sorting', async () => {

        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.navigateTo('https://www.saucedemo.com/inventory.html');

        await expect(LoginPage.filterButton).toBeExisting();
        await LoginPage.filterButton.selectByVisibleText('Name (A to Z)'); 

        await browser.pause(1000);

        const nameElements = await $$('div.inventory_item_name');
        expect(nameElements.length).toBeGreaterThan(0);

        const names = [];
        for (let el of nameElements) {
        names.push(await el.getText());
        }

        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    });

    it('Sorting: Name Z to A', async () => {

    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');
    await browser.url('https://www.saucedemo.com/inventory.html');

    const sortDropdown = await $('.product_sort_container');
    await sortDropdown.selectByVisibleText('Name (Z to A)');

    await browser.pause(1000);

    const nameElements = await $$('div.inventory_item_name');
    expect(nameElements.length).toBeGreaterThan(0);

    const names = [];
    for (let el of nameElements) {
        names.push(await el.getText());
    }

    const sortedNames = [...names].sort().reverse(); 
    expect(names).toEqual(sortedNames);
});

it('Sorting: Price low to high', async () => {

    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');
    await browser.url('https://www.saucedemo.com/inventory.html');

    const sortDropdown = await $('.product_sort_container');
    await sortDropdown.selectByVisibleText('Price (low to high)');

    await browser.pause(1000); 

    const priceElements = await $$('div.inventory_item_price');
    expect(priceElements.length).toBeGreaterThan(0);

    const prices = [];
    for (let el of priceElements) {
        const text = await el.getText();         
        const number = parseFloat(text.replace('$', ''));
        prices.push(number);
    }

    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
});

it('Sorting: Price high to low', async () => {
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');
    await browser.url('https://www.saucedemo.com/inventory.html');

    const sortDropdown = await $('.product_sort_container');
    await sortDropdown.selectByVisibleText('Price (high to low)');

    await browser.pause(1000);

    const priceElements = await $$('div.inventory_item_price');
    expect(priceElements.length).toBeGreaterThan(0);

    const prices = [];
    for (let el of priceElements) {
        const text = await el.getText();         
        const number = parseFloat(text.replace('$', ''));
        prices.push(number);
    }

    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
    
});


})