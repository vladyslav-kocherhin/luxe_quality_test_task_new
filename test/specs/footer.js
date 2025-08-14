import { expect } from '@wdio/globals';
const loginPage = require('../pageobjects/login.page');
const footer = require('../pageobjects/footer');

describe('Footer Tests', () => {

    beforeEach(async () => {
    await loginPage.open();
    });

    it('Footer Links', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    const fbUrl = await footer.openSocialLinkAndGetUrl('facebook');
    expect(fbUrl).toContain('https://www.facebook.com/saucelabs');
    const twitterUrl = await footer.openSocialLinkAndGetUrl('twitter');
    expect(twitterUrl).toContain('https://x.com/saucelabs');
    const linkedinUrl = await footer.openSocialLinkAndGetUrl('linkedin');
    expect(linkedinUrl).toContain('https://www.linkedin.com/company/sauce-labs/');
});

});