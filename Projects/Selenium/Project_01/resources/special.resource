*** Settings ***
Resource   page_objects/log_in.resource
Resource   special.resource
Resource   page_objects/products.resource

*** Variables ***

*** Keywords ***
This means that i should be able to log in
    So i will first input the username
    Then i will input the password
    Finally i press the 'log_in' button

This means that i should be able to add the following products in my cart
    Adding the Sauce Labs Backpack
    Adding the Sauce Labs Bike Light
    Adding the Sauce Labs Bolt T-Shirt
    Adding the Sauce Labs Fleece Jacket
    Adding the Sauce Labs Onesie
    Adding the Test.allTheThings() T-Shirt (Red)

But also that i should be able to remove the following products in my cart
    Removing the Sauce Labs Backpack
    Removing the Sauce Labs Bike Light
    Removing the Sauce Labs Bolt T-Shirt
    Removing the Sauce Labs Fleece Jacket
    Removing the Sauce Labs Onesie
    Removing the Test.allTheThings() T-Shirt (Red)

This means i should get a complete overview of the current prices
    