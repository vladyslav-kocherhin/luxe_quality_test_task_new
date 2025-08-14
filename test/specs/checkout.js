import { expect } from '@wdio/globals';
const loginPage = require('../pageobjects/login.page');
const checkout = require('../pageobjects/cart.page');
const inventoryPage = require('../pageobjects/inventory.page');
const cartPage = require('../pageobjects/cart.page');
const checkoutStepOne = require('../pageobjects/checkout-step-one.page');
const checkoutStepTwo = require('../pageobjects/checkout-step-two.page');
const checkoutComplete = require('../pageobjects/checkout-complete.page');

describe('Checkout', () => {

    beforeEach(async () => {
    await loginPage.open(); 
    await loginPage.login('standard_user', 'secret_sauce');
    });

    it('Saving the card after logout', async () => {
    await inventoryPage.clickAddToCartButton();
    await expect(inventoryPage.shoppingCartBadge).toBeExisting();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    await inventoryPage.clickShoppingCartIcon();
    await expect(checkout.shopingCartIcon).toBeExisting();
    await inventoryPage.clickBurgerMenuButton();
    const menuStatus = await inventoryPage.getBurgerMenuHiddenStatus();
    expect(menuStatus).toBe('false'); 
    const menuOptionsCount = await inventoryPage.getBurgerMenuOptions;
    expect(menuOptionsCount).toBeElementsArrayOfSize(4);
    await loginPage.clickLogoutButton();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    await expect(loginPage.inputUsername).toHaveValue('');
    await expect(loginPage.inputPassword).toHaveValue('');
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    await expect(inventoryPage.shopingCartIcon).toBeExisting();
    await expect(inventoryPage.productsList).toBeExisting();
    await inventoryPage.clickShoppingCartIcon();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
    await expect(inventoryPage.cartItem).toBeExisting();
    await cartPage.clickRemoveFromCartButton();
    });

    it('Valid Checkout with Tax', async () => {
    await inventoryPage.clickAddToCartButton();
    await expect(inventoryPage.shoppingCartBadge).toBeExisting();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    await inventoryPage.clickShoppingCartIcon();
    await expect(cartPage.shopingCartIcon).toBeExisting();
    const cartItemPriceText = await cartPage.getTextOfCartItem();
    const cartItemPrice = parseFloat(cartItemPriceText.replace('$', ''));
    await cartPage.clickCheckoutButton();
    await expect(checkoutStepOne.checkoutForm).toBeExisting();
    await checkoutStepOne.setFirstNameCheckoutField('Vladyslav');
    await checkoutStepOne.setLastNameCheckoutField('Kocherhin');
    await checkoutStepOne.setPostalCodeCheckoutField('12345');
    await expect(checkoutStepOne.firstNameCheckoutField).toHaveValue('Vladyslav');
    await expect(checkoutStepOne.lastNameCheckoutField).toHaveValue('Kocherhin');
    await expect(checkoutStepOne.postalCodeCheckoutField).toHaveValue('12345');
    await checkoutStepOne.clickContinueCheckoutButton();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
    const overviewItem = await checkoutStepTwo.getOverviewItem();
    expect(await overviewItem.isExisting()).toBe(true);
    const overviewItemPriceText = await checkoutStepTwo.getItemPrice();
    const overviewItemPrice = parseFloat(overviewItemPriceText.replace('$', ''));
    expect(overviewItemPrice).toBeCloseTo(cartItemPrice, 2);
    const summaryTotalText = await checkoutStepTwo.getSummaryTotalPrice();
    const totalPrice = parseFloat(summaryTotalText.replace('Total: $', ''));
    const tax = 2.40;
    const expectedTotal = parseFloat((cartItemPrice + tax).toFixed(2));
    expect(totalPrice).toBeCloseTo(expectedTotal, 2);
    await checkoutStepTwo.clickFinishCheckoutButton();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');

    const completeText = await checkoutComplete.getTextOfCheckoutCompleteText();
    expect(completeText).toContain('Thank you for your order!');
    await checkoutComplete.clickBackToHomeButton();
    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    await expect(inventoryPage.productsList).toBeExisting();
    await expect(inventoryPage.shoppingCartBadge).not.toBeExisting();
    });
 
});