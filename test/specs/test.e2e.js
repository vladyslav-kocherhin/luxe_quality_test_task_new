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

        await LoginPage.removeFromCartButton.click();

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

it('Footer Links', async () => {
    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');

    const originalWindow = await browser.getWindowHandle();
    await LoginPage.facebookLink.click();

    await browser.waitUntil(async () => {
        const handles = await browser.getWindowHandles();
        return handles.length > 1;
    }, {
        timeout: 2000,
        timeoutMsg: 'Facebook tab did not open'});

    const windowHandles = await browser.getWindowHandles();
    expect(windowHandles.length).toBeGreaterThan(1);

    const newWindowHandle = windowHandles.find(handle => handle !== originalWindow);
    await browser.switchToWindow(newWindowHandle);

    const newTabUrl = await browser.getUrl();
    expect(newTabUrl).toContain('https://www.facebook.com/saucelabs');

    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);

    await LoginPage.twitterLink.click();

    await browser.waitUntil(async () => {
        const handles = await browser.getWindowHandles();
        return handles.length > 1;
    }, {
        timeout: 2000,
        timeoutMsg: 'Twitter tab did not open'});

    handles = await browser.getWindowHandles();
    newTab = handles.find(handle => handle !== originalWindow);
    await browser.switchToWindow(newTab);

    url = await browser.getUrl();
    expect(url).toContain('https://x.com/saucelabs');

    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);

    await LoginPage.linkedinLink.click();

    await browser.waitUntil(async () => {
        const handles = await browser.getWindowHandles();
        return handles.length > 1;
    }, {
        timeout: 2000,
        timeoutMsg: 'LinkedIn tab did not open'});

    handles = await browser.getWindowHandles();
    newTab = handles.find(handle => handle !== originalWindow);
    await browser.switchToWindow(newTab);

    url = await browser.getUrl();
    expect(url).toContain('https://www.linkedin.com/company/sauce-labs/');

});

it('Valid Checkout with Tax', async () => {

    await LoginPage.open();
    await LoginPage.login('standard_user', 'secret_sauce');

    const addToCartButtons = await $$('button.btn_inventory');
    await addToCartButtons[0].click();

    await expect(LoginPage.shoppingСartBadge).toBeExisting();
    await expect(LoginPage.shoppingСartBadge).toHaveText('1');

    await LoginPage.shopingCartIcon.click();
    await expect(LoginPage.cartItem).toBeExisting();

    const cartItemPriceText = await LoginPage.cartItem.$('.inventory_item_price').getText();
    const cartItemPrice = parseFloat(cartItemPriceText.replace('$', ''));

    await LoginPage.checkoutButton.click();
    await expect(LoginPage.checkoutForm).toBeExisting();

    await LoginPage.firstNameCheckoutField.setValue('Vladyslav');
    await LoginPage.lastNameCheckoutField.setValue('Kocherhin');
    await LoginPage.postalCodeCheckoutField.setValue('12345');

    await expect(LoginPage.firstNameCheckoutField).toHaveValue('Vladyslav');
    await expect(LoginPage.lastNameCheckoutField).toHaveValue('Kocherhin');
    await expect(LoginPage.postalCodeCheckoutField).toHaveValue('12345');

    await LoginPage.continueCheckoutButton.click();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');

    const overviewItem = await $('div.cart_item');
    expect(await overviewItem.isExisting()).toBe(true);

    const overviewItemPriceText = await overviewItem.$('.inventory_item_price').getText();
    const overviewItemPrice = parseFloat(overviewItemPriceText.replace('$', ''));
    expect(overviewItemPrice).toBeCloseTo(cartItemPrice, 2);

    const summaryTotalText = await $('.summary_total_label').getText();
    const totalPrice = parseFloat(summaryTotalText.replace('Total: $', ''));

    const tax = 2.40;
    const expectedTotal = parseFloat((cartItemPrice + tax).toFixed(2));

    expect(totalPrice).toBeCloseTo(expectedTotal, 2);

    await LoginPage.finishCheckoutButton.click();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
    const completeText = await LoginPage.checkoutCompleteContainer.getText();
        expect(completeText).toContain('Thank you for your order!');

    await LoginPage.backToHomeButton.click();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    await expect(LoginPage.productsList).toBeExisting();
    await expect(LoginPage.shoppingСartBadge).not.toBeExisting();

});

})