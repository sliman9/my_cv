*** Settings ***
Library           SeleniumLibrary
Library    XML

*** Variables ***

*** Keywords ***
#? --- Adding the Items ---
Adding the Sauce Labs Backpack
    Click Button    add-to-cart-sauce-labs-backpack
Adding the Sauce Labs Bike Light
    Click Button    add-to-cart-sauce-labs-bike-light
Adding the Sauce Labs Bolt T-Shirt
    Click Button    add-to-cart-sauce-labs-bolt-t-shirt
Adding the Sauce Labs Fleece Jacket
    Click Button    add-to-cart-sauce-labs-fleece-jacket
Adding the Sauce Labs Onesie
    Click Button    add-to-cart-sauce-labs-onesie
Adding the Test.allTheThings() T-Shirt (Red)
    Click Button    add-to-cart-test.allthethings()-t-shirt-(red)

#? --- Removing the Items ---
Removing the Sauce Labs Backpack
    Click Button    remove-sauce-labs-backpack
Removing the Sauce Labs Bike Light
    Click Button    remove-sauce-labs-bike-light
Removing the Sauce Labs Bolt T-Shirt
    Click Button    remove-sauce-labs-bolt-t-shirt
Removing the Sauce Labs Fleece Jacket
    Click Button    remove-sauce-labs-fleece-jacket
Removing the Sauce Labs Onesie
    Click Button    remove-sauce-labs-onesie
Removing the Test.allTheThings() T-Shirt (Red)
    Click Button    remove-test.allthethings()-t-shirt-(red)
