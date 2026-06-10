import {Page, expect} from '@playwright/test';
import { loginPage } from "./login";
export class hamburgerMenu {
    constructor(private page: Page) {}

    async hamburgerAbout() {
        await this.page.getByRole('button', { name: 'Open Menu' }).click();
        await this.page.locator('[data-test="about-sidebar-link"]').click();
        await this.page.goBack();
    }

    async hamburgerLogout() {
        const login = new loginPage(this.page)
        await this.page.getByRole('button', { name: 'Open Menu' }).click();
        await this.page.locator('[data-test="logout-sidebar-link"]').click();
        await login.correctLogin();
    }

    async hamburgerAllitems() {
        await this.page.locator('[data-test="item-4-title-link"]').click();    
        await this.page.getByRole('button', { name: 'Open Menu' }).click();
        await this.page.locator('[data-test="inventory-sidebar-link"]').click();
        await this.page.goBack();
    }

    async hamburgerCloseMenu() {
        await this.page.getByRole('button', { name: 'Open Menu' }).click();
        await this.page.getByRole('button', { name: 'Close Menu' }).click();
    }
    
}