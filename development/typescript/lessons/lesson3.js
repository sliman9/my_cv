// Objects

var costumer = {
    firstName: 'Sulaiman',
    lastName: 'Hashimi',
    cars: ['Volve','Toyota','Tesla']
}

console.log(costumer.firstName)
console.log(costumer['lastName'])

// Dot Notation
costumer.firstName = 'Siom'

// Bracket Notation
costumer['lastName']= 'Hashimid'
console.log(costumer.firstName)

console.log(`My name is ${costumer.firstName} ${costumer.lastName}`)

// Array
var cars = ['Volve','Toyota','Tesla']
console.log (cars[0])
cars[1] = 'Volkswagen'
console.log (cars[1])
console.log(costumer.cars[2])
