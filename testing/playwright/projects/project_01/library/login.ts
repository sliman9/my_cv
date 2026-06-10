import {Page, expect} from '@playwright/test';
export class loginPage {
    constructor(private page: Page) {}

    async noInput() {
    await this.page.locator('[data-test="password"]').fill('');
    await this.page.locator('[data-test="username"]').fill('');
    await this.page.locator('[data-test="login-button"]').click();
    await expect(this.page.getByText('Epic sadface: Username is required')).toBeVisible();
    }
    
    async noPassword() {
    await this.page.locator('[data-test="password"]').fill('');
    await this.page.locator('[data-test="username"]').fill('standard_user');
    await this.page.locator('[data-test="login-button"]').click();
    await expect(this.page.getByText('Epic sadface: Password is required')).toBeVisible();
    }

    async noUsername() {
    await this.page.locator('[data-test="password"]').fill('secret_sauce');
    await this.page.locator('[data-test="username"]').fill('');
    await this.page.locator('[data-test="login-button"]').click();
    await expect(this.page.getByText('Epic sadface: Username is required')).toBeVisible();
    }

    async wrongUsername() {
    await this.page.locator('[data-test="password"]').fill('secret_sauce');
    await this.page.locator('[data-test="username"]').fill('test');
    await this.page.locator('[data-test="login-button"]').click();
    await expect(this.page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    }

    async wrongPassword() {
    await this.page.locator('[data-test="password"]').fill('test');
    await this.page.locator('[data-test="username"]').fill('standard_user');
    await this.page.locator('[data-test="login-button"]').click();
    await expect(this.page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    }

    async correctLogin() {
    await this.page.locator('[data-test="password"]').fill('secret_sauce');
    await this.page.locator('[data-test="username"]').fill('standard_user');
    await this.page.locator('[data-test="login-button"]').click();
    }

}