// For Loops

for(let i=0; i<5; i=i+1){
    console.log('Hello World!');
}

for(let b=0; b<10; b++){
    console.log("Yur");
}

var cars = ['Volvo', 'Toyota', 'Tesla', 'Subaru']
for(let car of cars){
    console.log(car)
    if (car == ('Volvo')){
        console.log('This is a nice Volvo!')
    }
    else if (car == ('Toyota')){
        console.log('This is a sturdy Toyota')
    }
    else if (car == ('Tesla')){
        console.log('Elon fanboy')
    }
    else {
        console.log('Meh')
    }
}

//ES6 syntax for each loop
cars.forEach(car => {
    console.log(car)
})