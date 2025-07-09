*** Settings ***
Resource    ./resources/default.resource
Resource    ./resources/special.resource

Suite Setup    Suite Setup    
Suite Teardown    Suite Teardown

*** Test Cases ***
As the user i should be able to naviage the frontpage of the website
    This means that i should be able to log in

As the user i should be able to add and remove the products from my cart
    This means that i should be able to add the following products in my cart
    But also that i should be able to remove the following products in my cart

