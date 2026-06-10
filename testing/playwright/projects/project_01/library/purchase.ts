import {Page, expect} from '@playwright/test';
export class purchasePage {
    constructor(private page: Page) {}

    async noFirstName() {
        await this.page.locator('[data-test="firstName"]').fill('');
        await this.page.locator('[data-test="lastName"]').fill('test');
        await this.page.locator('[data-test="postalCode"]').fill('test');
        await this.page.locator('[data-test="continue"]').click();
        await expect(this.page.getByText('Error: First Name is required')).toBeVisible();
    }

    async noLastName() {
        await this.page.locator('[data-test="firstName"]').fill('test');
        await this.page.locator('[data-test="lastName"]').fill('');
        await this.page.locator('[data-test="postalCode"]').fill('test');
        await this.page.locator('[data-test="continue"]').click();
        await expect(this.page.getByText('Error: Last Name is required')).toBeVisible();
    }

    async noPostalCode() {
        await this.page.locator('[data-test="firstName"]').fill('test');
        await this.page.locator('[data-test="lastName"]').fill('test');
        await this.page.locator('[data-test="postalCode"]').fill('');
        await this.page.locator('[data-test="continue"]').click();
        await expect(this.page.getByText('Error: Postal Code is required')).toBeVisible();
    }

    async CorrectDetails() {
        await this.page.locator('[data-test="firstName"]').fill('test');
        await this.page.locator('[data-test="lastName"]').fill('test');
        await this.page.locator('[data-test="postalCode"]').fill('test');
        await this.page.locator('[data-test="continue"]').click();
    }

    async finishingPurchase() {
        await expect(this.page.getByText('Payment Information:')).toBeVisible();
        await expect(this.page.getByText('Shipping Information:')).toBeVisible();
        await expect(this.page.getByText('Price Total')).toBeVisible();
        await this.page.locator('[data-test="finish"]').click();
        await this.page.locator('[data-test="complete-header"]').hover();
        await this.page.locator('[data-test="back-to-products"]').click();
    }
}
