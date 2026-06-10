// Declerative Functions
helloOne()

function helloOne(){
    console.log('Hello One!')
}

// Anoymus Function
var helloTwo = function (){
    console.log('Hello Two!')
}

helloTwo()

// ES6 Function or arrow function
var helloThree = () => {
    console.log('Hello Three!')
}

helloThree()

// Function with Arguments
function fullDetails(name, lastName, age, height){
    console.log(`Your full name is ${name} ${lastName}, you are ${age} years old and your height is ${height} centimeters`)
}

fullDetails('Sulaiman', 'Hashimi', 29, 177)

// Function with return
function multiplyByTwo(number){
    var result = number * 2
    return result
}

var myResult = multiplyByTwo(10)
console.log(myResult)

// Functions with Import
import { printAge } from "../helpers/printHelper.js";
printAge(5);

import { printHeight } from "../helpers/printHelper.js";
printHeight(177);

import * as helper from "../helpers/printHelper.js"
helper.printHeight(177)