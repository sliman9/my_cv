import {Page, expect} from '@playwright/test';
export class cartPage {
    constructor(private page: Page) {}

    async removeProductsFromCart() {
        await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await this.page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
        await this.page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
        await this.page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
        await this.page.locator('[data-test="remove-sauce-labs-onesie"]').click();
        await this.page.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click();
    }

    async clickOnShoppingCart(){
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }

    async goBackFromShoppingCart(){
        await this.page.locator('[data-test="continue-shopping"]').click();
    }

    async checkout(){
        await this.page.locator('[data-test="checkout"]').click();
    }
}
