import {Page, expect} from '@playwright/test';
export class productsPage {
    constructor(private page: Page) {}

    private productNames: string[] = ['sauce-labs-backpack', 'sauce-labs-bike-light', 'sauce-labs-bolt-t-shirt', 'sauce-labs-fleece-jacket', 'sauce-labs-onesie', 'test.allthethings()-t-shirt-(red)'];
    private productNumbers: string[] = ['4', '0', '1', '5', '2', '3'];

    async addMainPageProduct(productname: string) {
        await this.page.locator(`[data-test="add-to-cart-${productname}"]`).click();
    }

    async removeMainPageProduct(productname: string) {
        await this.page.locator(`[data-test="remove-${productname}"]`).click();
    }

    async backButtonProductPage() {
        await this.page.locator('[data-test="back-to-products"]').click();
    }

    async viewProduct(productNumbers: string) {
        await this.page.locator(`[data-test="item-${productNumbers }-title-link"]`).click();
    }

    async addToCartProductSpecificPage() {
        await this.page.locator('[data-test="add-to-cart"]').click();
    }

    async removeFromCartProductSpecificPage() {
        await this.page.locator('[data-test="remove"]').click();
    }

    async changeProductsOrder() {
        await this.page.locator('[data-test="product-sort-container"]').selectOption('za');
        await this.page.locator('[data-test="product-sort-container"]').selectOption('lohi');
        await this.page.locator('[data-test="product-sort-container"]').selectOption('hilo');
        await this.page.locator('[data-test="product-sort-container"]').selectOption('az');
    }

    async productProcesBackpack() {
        await this.addMainPageProduct(this.productNames[0]);    
        await this.removeMainPageProduct(this.productNames[0]);
        await this.viewProduct(this.productNumbers[0]);
        await this.addToCartProductSpecificPage();
        await this.removeFromCartProductSpecificPage();
        await this.backButtonProductPage();
    }

    async productProcesBikelight() {
        await this.addMainPageProduct(this.productNames[1]);    
        await this.removeMainPageProduct(this.productNames[1]);
        await this.viewProduct(this.productNumbers[1]);
        await this.addToCartProductSpecificPage();
        await this.removeFromCartProductSpecificPage();
        await this.backButtonProductPage();
    }

    async productProcesTShirt() {
        await this.addMainPageProduct(this.productNames[2]);    
        await this.removeMainPageProduct(this.productNames[2]);
        await this.viewProduct(this.productNumbers[2]);
        await this.addToCartProductSpecificPage();
        await this.removeFromCartProductSpecificPage();
        await this.backButtonProductPage();
    }

    async productProcesFleecejacket() {
        await this.addMainPageProduct(this.productNames[3]);    
        await this.removeMainPageProduct(this.productNames[3]);
        await this.viewProduct(this.productNumbers[3]);
        await this.addToCartProductSpecificPage();
        await this.removeFromCartProductSpecificPage();
        await this.backButtonProductPage();
    }

    async productProcesOnesie() {
        await this.addMainPageProduct(this.productNames[4]);    
        await this.removeMainPageProduct(this.productNames[4]);
        await this.viewProduct(this.productNumbers[4]);
        await this.addToCartProductSpecificPage();
        await this.removeFromCartProductSpecificPage();
        await this.backButtonProductPage();
    }

    async productProcesRedTShirt() {
        await this.addMainPageProduct(this.productNames[5]);    
        await this.removeMainPageProduct(this.productNames[5]);
        await this.viewProduct(this.productNumbers[5]);
        await this.addToCartProductSpecificPage();
        await this.removeFromCartProductSpecificPage();
        await this.backButtonProductPage();
    }

    async addAllProducts() {
        await this.addMainPageProduct(this.productNames[0]);
        await this.addMainPageProduct(this.productNames[1]);
        await this.addMainPageProduct(this.productNames[2]);
        await this.addMainPageProduct(this.productNames[3]);
        await this.addMainPageProduct(this.productNames[4]);
        await this.addMainPageProduct(this.productNames[5]);
    }
}