const { $ } = require('@wdio/globals')
const Page = require('./page');

class Footer extends Page {

get facebookLink() { return $('a[href="https://www.facebook.com/saucelabs"]'); }
get twitterLink() { return $('a[href="https://twitter.com/saucelabs"]'); }
get linkedinLink() { return $('a[href="https://www.linkedin.com/company/sauce-labs/"]'); }

    async clickSocialLink(linkName) {
        switch (linkName) {
            case 'facebook':
                await this.facebookLink.click();
                break;
            case 'twitter':
                await this.twitterLink.click();
                break;
            case 'linkedin':
                await this.linkedinLink.click();
                break;
            default:
                throw new Error(`Unknown link: ${linkName}`);
        }
    }

    async openSocialLinkAndGetUrl(linkName) {
        const originalWindow = await browser.getWindowHandle();
        await this.clickSocialLink(linkName);

        await browser.waitUntil(async () => {
            const handles = await browser.getWindowHandles();
            return handles.length > 1;
        }, {
            timeout: 5000,
            timeoutMsg: `${linkName} tab did not open`,
        });

        const windowHandles = await browser.getWindowHandles();
        const newWindowHandle = windowHandles.find(handle => handle !== originalWindow);
        await browser.switchToWindow(newWindowHandle);
        const url = await browser.getUrl();

        await browser.closeWindow();
        await browser.switchToWindow(originalWindow);

        return url;
    }
}

module.exports = new Footer();