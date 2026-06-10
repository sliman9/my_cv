export function printAge(age){
    console.log(age)
}

export function printHeight(height){
    var description = '';
    if (height <= 150){
        description = 'short ass';
    }
    else if (height <= 170){
        description = 'medium ass';
    }
    else {
        description = 'tall ass';
    }
    console.log(`Your height in cm is ${height} you ${description}`);
}
