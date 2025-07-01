*** Settings ***
Library           SeleniumLibrary

*** Variables ***
@{username}    
...    standard_user
...    locked_out_user
...    problem_user
...    performance_glitch_user
...    error_user
...    visual_user

${password}       secret_sauce

*** Keywords ***
So i will first input the username
    ${random_index}=    
    ...    Evaluate    
    ...    random.randint(0, len(${username})-1)    
    ...    modules=random
    
    ${random_user}=     
    ...    Set Variable    
    ...    ${username}[${random_index}]
    
    Input Text         
    ...    id=user-name    
    ...    ${random_user}

Then i will input the password
    Input Password    
    ...    id=password    
    ...    ${password}

Finally i press the 'log_in' button
    Click Element    
    ...    id=login-button