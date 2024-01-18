//--- callback function on map
console.log(`
--- (Fk#1) ---`);

const f9 = ['x', 'xx', 'xxx', 'xxxx'];
console.log(f9.map((x) => x.length)); //arrow syntax as parameters

//--- Callback with Rest parameters
console.log(`
--- (Fk#2) ---`);

function multiply(multiplier, ...theArgs) {
    return theArgs.map((x) => multiplier * x);
}

const arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]