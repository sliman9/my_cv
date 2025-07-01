*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${url}            https://www.saucedemo.com
@{browser}        
...    Chrome    
...    Edge    
...    Safari    
...    Firefox

*** Keywords ***
Suite Setup
    Open Browser 
    ...    ${url}    
    ...    ${browser}[2]
    
    Set Selenium Speed    
    ...    0.3

    Maximize Browser Window
    
Suite Teardown
    Close All Browsers
