*** Settings ***
Library    SeleniumLibrary
#Library    page_objects/

*** Variables ***
${url}

*** Keywords ***
Suite Setup
    Open Browser    ${url}    Chrome
    screen