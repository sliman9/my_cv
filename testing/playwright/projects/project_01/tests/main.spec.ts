import { productsPage } from "../library/products";
import { loginPage } from "../library/login";
import { hamburgerMenu } from "../library/hamburger";
import { generalKeywords } from '../library/general'
import { cartPage } from "../library/cart";
import { purchasePage } from "../library/purchase";
import { test } from '@playwright/test';

test.describe('As the user i want to use the enitre website', ()=>{
    let general: generalKeywords;
    let login: loginPage;
    let cart: cartPage;
    let products: productsPage;
    let hamburger: hamburgerMenu;
    let purchase: purchasePage;

    test.beforeEach(async ({ page }) => {
        general = new generalKeywords(page);
        login = new loginPage(page);
        cart = new cartPage(page);
        products = new productsPage(page);
        hamburger = new hamburgerMenu(page);
        purchase = new purchasePage(page);
        await general.navigateToSite();
    });

    test('As the user i want to be able to login', async ()=>{
        await login.noInput();
        await login.noPassword();
        await login.noUsername();
        await login.wrongPassword();
        await login.wrongUsername();
        await login.correctLogin();
    })

    test('As the user i want to be able to use the hamburger menu', async ()=>{
        await login.correctLogin();
        await hamburger.hamburgerAbout();
        await hamburger.hamburgerLogout();
        await hamburger.hamburgerAllitems();
        await hamburger.hamburgerCloseMenu();
    })

    test('As the user i want to be able to use the products page', async ()=>{
        await login.correctLogin();
        await products.changeProductsOrder();
        await products.productProcesBackpack();
        await products.productProcesBikelight();
        await products.productProcesFleecejacket();
        await products.productProcesOnesie();
        await products.productProcesRedTShirt();
        await products.productProcesTShirt();  
    })

    test('As the user i want to be able to use the cart', async ()=>{
        await login.correctLogin();
        await products.addAllProducts();
        await cart.clickOnShoppingCart();
        await cart.removeProductsFromCart();
        await cart.goBackFromShoppingCart();
        await products.addAllProducts();
        await cart.clickOnShoppingCart();
        await cart.checkout();
    })

    test('As the user i want to be able to finalize my purchase process', async ()=>{
        await login.correctLogin();
        await products.addAllProducts();
        await cart.clickOnShoppingCart();
        await cart.checkout();
        await purchase.noFirstName();
        await purchase.noLastName();
        await purchase.noPostalCode();
        await purchase.CorrectDetails();
        await purchase.finishingPurchase();
    })
})