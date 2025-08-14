import { expect } from '@wdio/globals';
const loginPage = require('../pageobjects/login.page');
const inventoryPage = require('../pageobjects/inventory.page');

describe('Valid Login', () => {

    beforeEach(async () => {
    await loginPage.open();
    });

    it('Valid Login', async () => {
    await loginPage.setValueToInputUsername('standard_user');
    await loginPage.setValueToInputPassword('secret_sauce');
    await expect(loginPage.inputUsername).toHaveValue('standard_user');
    await expect(loginPage.inputPassword).toHaveValue('secret_sauce');
    const inputType = await loginPage.getPasswordInputType();
    await expect(inputType).toBe('password'); 
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    await expect(inventoryPage.shopingCartIcon).toBeExisting();
    await expect(inventoryPage.productsList).toBeExisting(); 
    });

    it('Login with invalid password', async () => {
    await loginPage.setValueToInputUsername('standard_user');
    await loginPage.setValueToInputPassword('wrong_password');
    await expect(loginPage.inputUsername).toHaveValue('standard_user');
    await expect(loginPage.inputPassword).toHaveValue('wrong_password');
    const inputType = await loginPage.getPasswordInputType();
    await expect(inputType).toBe('password'); 
    await loginPage.clickLoginButton();
    await expect(loginPage.errorIconX).toBeExisting();
    await expect(loginPage.errorMessage).toBeExisting();
    await expect(loginPage.errorMessage).toBeDisplayed();
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
    const loginBorderColor = await loginPage.getErrorColorOfUsernameField();
    const passwordBorderColor = await loginPage.getErrorColorOfPasswordField();
    expect(loginBorderColor.parsed.hex).toBe('#e2231a'); 
    expect(passwordBorderColor.parsed.hex).toBe('#e2231a');
    });
    
    it('Login with invalid login', async () => {
    await loginPage.setValueToInputUsername('wrong_login');
    await loginPage.setValueToInputPassword('secret_sauce');
    await expect(loginPage.inputUsername).toHaveValue('wrong_login');
    await expect(loginPage.inputPassword).toHaveValue('secret_sauce');
    const inputType = await loginPage.getPasswordInputType();
    await expect(inputType).toBe('password'); 
    await loginPage.clickLoginButton();
    await expect(loginPage.errorIconX).toBeExisting();
    await expect(loginPage.errorMessage).toBeExisting();
    await expect(loginPage.errorMessage).toBeDisplayed();
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
    const loginBorderColor = await loginPage.getErrorColorOfUsernameField();
    const passwordBorderColor = await loginPage.getErrorColorOfPasswordField();
    expect(loginBorderColor.parsed.hex).toBe('#e2231a'); 
    expect(passwordBorderColor.parsed.hex).toBe('#e2231a');
    });

    it('Logout', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.clickBurgerMenuButton();
    const menuStatus = await inventoryPage.getBurgerMenuHiddenStatus();
    expect(menuStatus).toBe('false'); 
    const menuOptionsCount = await inventoryPage.getBurgerMenuHiddenStatus();
    expect(menuOptionsCount).toBeElementsArrayOfSize(4);
    await loginPage.clickLogoutButton();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    await expect(loginPage.inputUsername).toHaveValue('');
    await expect(loginPage.inputPassword).toHaveValue('');
    });

})