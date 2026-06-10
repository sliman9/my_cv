# 📚 Complete JavaScript Cheatsheet & Guide

A comprehensive beginner-friendly guide to JavaScript fundamentals with detailed explanations, examples, and quick reference.

---

## 🔧 Part 1: Basics & Execution

### Understanding console.log()

**What it does:** Prints text, variables, or values to the console (the output area in your browser or terminal).

**Why use it:** Essential for seeing what your code is doing and debugging.

**How to use:**
```javascript
console.log('Hello, World!')           // Print text
console.log(42)                        // Print a number
let name = "John"
console.log(name)                      // Print a variable
console.log('Name:', name, 'Age:', 25) // Print multiple things
```

### Running JavaScript Files

**What it does:** Executes a JavaScript file on your computer.

**How to use:**
```
node filename.js             // Run the file in your terminal/PowerShell
```

**Example workflow:**
1. Create a file called `hello.js`
2. Add code: `console.log('Hello from Node.js')`
3. Run in terminal: `node hello.js`
4. See output: `Hello from Node.js`

---

## 📦 Part 2: Variables & Data Types

### What are Variables?

Variables are containers that store data. Think of them as labeled boxes—each box holds information.

### Declaration Keywords

Choose the right keyword based on your needs:

| Keyword | Scope | Reassignable | Use Case |
|---------|-------|--------------|----------|
| `const` | Block | ❌ No | **Use by default** — values that don't change |
| `let` | Block | ✅ Yes | Values that will change |
| `var` | Function | ✅ Yes | ⚠️ Avoid — older, confusing behavior |

**Examples:**
```javascript
// Use const for values that won't change
const PI = 3.14159
const userName = "John"

// Use let when you need to reassign
let age = 25
age = 26                       // ✅ This works

// Avoid var (old style, causes confusion)
var oldWay = "avoid this"
```

### Data Types in JavaScript

JavaScript has 5 main data types:

**1. String** — Text enclosed in quotes
```javascript
let firstName = "Alice"
let greeting = 'Hello, World!'
let message = `Welcome, ${firstName}`   // Template literal (preferred)
```

**2. Number** — Integers or decimals
```javascript
let age = 25
let price = 19.99
let count = 0
let result = 10 / 3            // 3.3333...
```

**3. Boolean** — True or false (used for yes/no decisions)
```javascript
let isLoggedIn = true
let hasPermission = false
let isAdult = age >= 18        // Results in true or false
```

**4. Null** — Explicitly represents "no value" (intentional emptiness)
```javascript
let emptyValue = null
let userInput = null           // No data provided yet
```

**5. Undefined** — A variable that exists but hasn't been assigned a value
```javascript
let unassignedVariable
console.log(unassignedVariable)  // undefined
```

### Working with Strings

**Concatenation** — Joining strings (older method):
```javascript
let firstName = "John"
let lastName = "Doe"
let fullName = firstName + " " + lastName    // "John Doe"
let greeting = "Hello, " + firstName        // "Hello, John"
```

**Template Literals** — Modern, cleaner way using backticks and `${}`:
```javascript
let firstName = "John"
let age = 25
let message = `Hello, ${firstName}! You are ${age} years old.`
// Result: "Hello, John! You are 25 years old."
```

**Why template literals are better:**
- ✅ Easier to read
- ✅ No messy `+` operators
- ✅ Can include variables directly

---

## 🏗️ Part 3: Objects & Arrays

### Objects — Storing Related Data

**What they are:** Collections of related information stored as key-value pairs.

**Real-world analogy:** Like a contact card with name, email, phone, etc.

**How to create:**
```javascript
let customer = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john@example.com"
}
```

**How to access properties:**
```javascript
// Dot notation (most common)
console.log(customer.firstName)     // "John"
console.log(customer.age)           // 30

// Bracket notation (useful for dynamic keys)
console.log(customer["firstName"])  // "John"
console.log(customer["age"])        // 30
```

**How to modify properties:**
```javascript
customer.firstName = "Jane"         // Change firstName
customer.age = 31                   // Change age
customer.phone = "555-1234"         // Add new property
```

### Arrays — Storing Lists of Items

**What they are:** Ordered lists of items, each with a position (index starting at 0).

**How to create:**
```javascript
let cars = ["Volvo", "Toyota", "Tesla"]
let numbers = [10, 20, 30, 40]
let mixed = ["John", 25, true, null]
```

**How to access items:**
```javascript
console.log(cars[0])        // "Volvo" (first item)
console.log(cars[1])        // "Toyota" (second item)
console.log(cars[2])        // "Tesla" (third item)

let firstCar = cars[0]      // Store in variable
```

**Remember:** Indexing starts at **0**, not 1!

**How to modify items:**
```javascript
cars[1] = "BMW"             // Replace "Toyota" with "BMW"
cars[3] = "Audi"            // Add item at index 3 (if it doesn't exist)
```

**Accessing nested data:**
```javascript
let company = {
    name: "Tech Corp",
    employees: ["Alice", "Bob", "Charlie"],
    location: "New York"
}

console.log(company.name)              // "Tech Corp"
console.log(company.employees[0])      // "Alice"
console.log(company.employees[2])      // "Charlie"
```

---

## 🔢 Part 4: Operators

### Comparison Operators

Used to compare two values. Always return `true` or `false`.

```javascript
10 > 5          // true (10 is greater than 5)
5 < 10          // true (5 is less than 10)
10 >= 10        // true (10 equals 10)
9 <= 10         // true (9 is less than or equal to 10)
5 == 5          // true (values are equal)
5 === 5         // true (value AND type match)
5 !== "5"       // true (different types)
```

### Increment & Decrement

```javascript
let count = 5
count++         // count becomes 6 (increment by 1)
count--         // count becomes 5 (decrement by 1)

console.log(count)          // 5
```

### Equality Operators (Important!)

**Loose Equality (`==`)** — Only checks the **value**:
```javascript
let x = 5
console.log(x == 5)         // true (value matches)
console.log(x == "5")       // true (same value, ignores type!)
```

**Strict Equality (`===`)** — Checks **value AND type** (recommended):
```javascript
let x = 5
console.log(x === 5)        // true (value and type match)
console.log(x === "5")      // false (different types!)
```

**Best Practice:** Always use `===` and `!==` to avoid confusion.

### Logical Operators

Used to combine multiple conditions.

**AND (`&&`)** — All conditions must be true:
```javascript
let age = 25
let hasLicense = true

if (age >= 18 && hasLicense) {
    console.log("Can drive")   // Runs because BOTH are true
}

if (age >= 30 && hasLicense) {
    console.log("Can rent car")  // Doesn't run (first is false)
}
```

**OR (`||`)** — At least ONE condition must be true:
```javascript
let isMember = false
let isStudent = true

if (isMember || isStudent) {
    console.log("Get discount")   // Runs because one is true
}

if (isMember || false) {
    console.log("Welcome")        // Doesn't run (both false)
}
```

**NOT (`!`)** — Flips the result:
```javascript
let isRaining = true
console.log(!isRaining)      // false (flipped)

let isSunny = false
console.log(!isSunny)        // true (flipped)
```

---

## ⚡ Part 5: Conditional Statements

### Purpose

Conditionals let your code make decisions—execute different code based on conditions.

### if Statement

Runs code **only if** the condition is true:
```javascript
let temperature = 25

if (temperature > 20) {
    console.log("It's warm!")   // This runs
}
```

### if...else Statement

Runs one block **or** the other:
```javascript
let age = 15

if (age >= 18) {
    console.log("You're an adult")
} else {
    console.log("You're a minor")   // This runs
}
```

### if...else if...else Statement

Test **multiple conditions** in order:
```javascript
let score = 75

if (score >= 90) {
    console.log("Grade: A")
} else if (score >= 80) {
    console.log("Grade: B")
} else if (score >= 70) {
    console.log("Grade: C")         // This runs
} else {
    console.log("Grade: F")
}
```

**Important:** Only the first true condition runs. The rest are skipped.

---

## 🔁 Part 6: Loops

### Purpose

Loops let you repeat code multiple times without rewriting it.

### for Loop

Repeats code a specific **number of times**:

**How it works:**
```javascript
for (let i = 0; i < 5; i++) {
    console.log(i)          // Prints: 0, 1, 2, 3, 4
}
```

**Breaking it down:**
- `let i = 0` — Start at 0
- `i < 5` — Keep going while i is less than 5
- `i++` — Add 1 each time

**Practical example:**
```javascript
// Print "Hello" 3 times
for (let i = 0; i < 3; i++) {
    console.log("Hello")    // Prints 3 times
}

// Loop through array indices
let fruits = ["Apple", "Banana", "Cherry"]
for (let i = 0; i < 3; i++) {
    console.log(fruits[i])  // Prints each fruit
}
```

### for...of Loop

Loops through **array values** (easier and cleaner):
```javascript
let cars = ["Volvo", "Toyota", "Tesla"]

for (let car of cars) {
    console.log(car)        // Prints: Volvo, Toyota, Tesla
}
```

**With conditions:**
```javascript
let cars = ["Volvo", "Toyota", "Tesla"]

for (let car of cars) {
    if (car === "Tesla") {
        console.log(car + " - Electric!")
    } else {
        console.log(car + " - Gas")
    }
}
```

### forEach Method (ES6)

Modern way to loop using an arrow function:
```javascript
let numbers = [1, 2, 3, 4]

numbers.forEach(num => {
    console.log(num * 2)    // Prints: 2, 4, 6, 8
})
```

**Choosing which loop to use:**
- `for` — Need the index number
- `for...of` — Just want the values
- `forEach` — Want clean, modern syntax

---

## 🔧 Part 7: Functions

### Purpose

Functions are reusable blocks of code. Write once, use many times.

### Declarative Function

Can be called **before** it's defined (due to hoisting):
```javascript
greet()                     // Works! (hoisting)

function greet() {
    console.log("Hello!")
}

greet()                     // Also works
```

### Arrow Function (Modern Syntax)

Cleaner, more modern way to write functions:
```javascript
let greet = () => {
    console.log("Hello!")
}

greet()                     // Call it the same way
```

### Functions with Parameters

Accept **input** to work with different data:
```javascript
function sayName(name) {
    console.log("Hello, " + name)
}

sayName("John")         // Output: Hello, John
sayName("Sarah")        // Output: Hello, Sarah
sayName("Bob")          // Output: Hello, Bob
```

**Multiple parameters:**
```javascript
function add(a, b) {
    console.log(a + b)
}

add(5, 3)               // Output: 8
add(10, 20)             // Output: 30

function introduce(firstName, age, city) {
    console.log(`${firstName} is ${age} and lives in ${city}`)
}

introduce("John", 25, "New York")
// Output: John is 25 and lives in New York
```

### Functions with Return Values

Send data **back** to the caller:
```javascript
function multiply(a, b) {
    return a * b
}

let result = multiply(5, 3)
console.log(result)         // 15

function getGrade(score) {
    if (score >= 90) return "A"
    if (score >= 80) return "B"
    if (score >= 70) return "C"
    return "F"
}

console.log(getGrade(85))   // "B"
console.log(getGrade(92))   // "A"
```

**Remember:** `return` stops the function and sends the value back.

---

## 📤 Part 8: Modules (Import & Export)

### Purpose

Split code into separate files and reuse it.

### Exporting Functions

Create a file `helpers/printHelper.js`:
```javascript
export function printAge(age) {
    console.log("Age: " + age)
}

export function greetUser(name) {
    console.log("Hello, " + name)
}
```

### Importing Functions

In another file, use those functions:
```javascript
import { printAge, greetUser } from "../helpers/printHelper.js"

printAge(29)                // Output: Age: 29
greetUser("John")           // Output: Hello, John
```

### Importing Everything

Import all functions with an alias:
```javascript
import * as helper from "../helpers/printHelper.js"

helper.printAge(29)
helper.greetUser("John")
```

### Setup Required

Add this to your `package.json`:
```javascript
{
  "type": "module"
}
```

Without this, Node.js won't recognize `import`/`export`.

---

## 🏛️ Part 9: Classes

### Purpose

Classes are blueprints for creating objects with shared properties and methods.

### What is a Class?

Think of it as a template. Instead of creating similar objects manually, define once and create many.

**Without a class** (repetitive):
```javascript
let person1 = {
    name: "John",
    greet: function() { console.log("Hi, I'm " + this.name) }
}

let person2 = {
    name: "Sarah",
    greet: function() { console.log("Hi, I'm " + this.name) }
}
```

**With a class** (clean and reusable):
```javascript
class Person {
    constructor(name) {
        this.name = name
    }
    
    greet() {
        console.log("Hi, I'm " + this.name)
    }
}

let person1 = new Person("John")
let person2 = new Person("Sarah")

person1.greet()     // "Hi, I'm John"
person2.greet()     // "Hi, I'm Sarah"
```

### Defining a Class

```javascript
class User {
    // Constructor runs when creating a new instance
    constructor(name, email) {
        this.name = name
        this.email = email
    }
    
    // Methods (functions inside the class)
    printInfo() {
        console.log(this.name + " (" + this.email + ")")
    }
    
    updateEmail(newEmail) {
        this.email = newEmail
    }
}
```

### Using a Class

```javascript
// Create instances
let user1 = new User("John", "john@email.com")
let user2 = new User("Sarah", "sarah@email.com")

// Call methods
user1.printInfo()           // "John (john@email.com)"
user2.printInfo()           // "Sarah (sarah@email.com)"

// Modify properties
user1.updateEmail("john.new@email.com")
user1.printInfo()           // "John (john.new@email.com)"
```

### Exporting & Importing Classes

**Export** (in `helpers/User.js`):
```javascript
export class User {
    constructor(name) {
        this.name = name
    }
    
    greet() {
        console.log("Hello, I'm " + this.name)
    }
}
```

**Import** (in another file):
```javascript
import { User } from "../helpers/User.js"

let user = new User("John")
user.greet()                // "Hello, I'm John"
```

---

---

## 📋 Quick Reference Cheatsheet

Use this when you need a quick reminder. For detailed explanations, scroll up!

### Variables & Types
```javascript
const name = "John"         // Constant (preferred)
let age = 25                // Variable (can change)
var old = "avoid"           // Old style (avoid)

// Data types
let str = "text"            // String
let num = 42                // Number
let bool = true             // Boolean
let nothing = null          // Null
let notSet = undefined      // Undefined
```

### Objects & Arrays
```javascript
let obj = { name: "John", age: 25 }
obj.name                    // Access
obj.age = 26                // Modify

let arr = [1, 2, 3, 4]
arr[0]                      // Access (1)
arr[1] = 99                 // Modify
```

### Operators
```javascript
// Comparison
10 > 5; 5 < 10; 10 >= 10; 9 <= 10

// Equality (always use === and !==)
x === 5                     // Strict equal
x !== 5                     // Strict not equal

// Logical
age > 18 && hasLicense      // AND
isMember || isStudent       // OR
!isRaining                  // NOT
```

### Conditionals
```javascript
if (condition) {
    // code
} else if (condition2) {
    // code
} else {
    // code
}
```

### Loops
```javascript
// Count
for (let i = 0; i < 5; i++) {
    console.log(i)
}

// Loop through array
for (let item of array) {
    console.log(item)
}

// Modern loop
array.forEach(item => {
    console.log(item)
})
```

### Functions
```javascript
// Declarative
function add(a, b) {
    return a + b
}

// Arrow
let add = (a, b) => {
    return a + b
}

// Call
add(5, 3)
```

### Classes
```javascript
class User {
    constructor(name) {
        this.name = name
    }
    
    greet() {
        console.log("Hi, " + this.name)
    }
}

let user = new User("John")
user.greet()
```

### Imports & Exports
```javascript
// Export
export function myFunc() {}
export class MyClass {}

// Import
import { myFunc, MyClass } from "./file.js"
import * as module from "./file.js"

// Setup in package.json
{ "type": "module" }
```

---

## 🎯 Tips for Success

1. **Practice regularly** — Write code every day
2. **Use console.log()** — Debug and see what's happening
3. **Read error messages** — They tell you what's wrong
4. **Start simple** — Master basics before advanced topics
5. **Build projects** — Apply what you learn to real problems
6. **Use `const` by default** — Switch to `let` only when needed
7. **Always use `===`** — Avoid confusion with `==`
8. **Name variables clearly** — `userName` not `un`
9. **Comment your code** — Explain the "why", not the "what"
10. **Ask for help** — Coding is a community

---

**Happy Coding! 🚀**



