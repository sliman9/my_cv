*** Settings ***
Library           SeleniumLibrary
# Library         page_objects/     # Uncomment if you use page object model

*** Variables ***
${url}            https://www.saucedemo.com
@{browser}        Chrome    Edge    Safari    Firefox

*** Keywords ***
Suite Setup
    Safe Browser Setup

Suite Teardown
    Close All Browsers
    Set Screenshot Directory    ../results

Safe Browser Setup
    # Try to open the browser, catch failure, and take screenshot if it fails
    ${status}    ${message}=    Run Keyword And Ignore Error    Open Browser    ${url}    ${browser}
    Set Screenshot Directory    ../results
    Run Keyword If    '${status}' == 'FAIL'    Log    Browser failed to open: ${message}
    Run Keyword If    '${status}' == 'FAIL'    Capture Page Screenshot
    Run Keyword If    '${status}' == 'FAIL'    Fail    Suite Setup failed: ${message}