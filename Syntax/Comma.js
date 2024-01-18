//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator

//--- assignment expression, not a declaration, previous expression before comma is discarded
console.log(`
--- (Co#1) ---`);

const a = (1, b = 2, c = -1, d = -5);
console.log(a, b, c, d) // 3, because b=2 and c=3 is  assignment expression, not a declaration, previous expression is discarded

//--- x = y = 3 - x value assign from y value, what assign from 3
console.log(`
--- (Co#2) ---`);
let x, y, z;

console.log((x = y = 3, z = 4)); // Returns 4
console.log(x); // 3 (left-most)

//---  printing the values of the diagonal elements in the array - used string expression plus cycle with two variable, in this case coma is declaration
console.log(`
--- (Co#3) ---`);

const e = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, Math.random),
); // A 10×10 array of random numbers

for (let i = 0, j = 9; i <= 9; i++, j--) {
    console.log(`e[${i}][${j}] = ${e[i][j]}`);
}

//--- Processing and then returning last value (x += 1, x) the same as ++x
console.log(`
--- (Co#4) ---`);

function myFunc() {
    let x = 0;
    return (x += 1, x); // the same as return ++x;
}
console.log(myFunc())

//--- Comma and grouping operation in arrow function  [].map((x) => ((sum += x), x * x));
console.log(`
--- (Co#5) ---`);

let sum = 0;
const squares = [1, 2, 3, 4, 5].map((x) => ((sum += x), x * x));
console.log(squares); // [1, 4, 9, 16, 25]
console.log(sum); // 15

//--- the grouping operator still returns the reference, the comma operator returns a new value
console.log(`
--- (Co#6) ---`);

const obj = {
    value: "val",
    method(x) {
        console.log(x, this.value);
    },
};

console.log(2, obj.method); //[Function: method]
console.log(3, obj.method("a")); //3 undefined + b val
console.log(4, (obj.method)("b")); //4 undefined + c undefined (the grouping operator still returns the reference)
console.log(5, (0, obj.method)("c")); //5 undefined (the comma operator returns a new value)

//--- The comma operator always returns the last expression as a value instead of a reference. 
console.log(`
--- (Co#7) ---`);

globalThis.isDirectEval = false;

{
    const isDirectEval = true;
    console.log(eval("isDirectEval")); // true
    console.log((eval)("isDirectEval")); // true (the grouping operator still returns a reference to `eval`)
    console.log((0, eval)("isDirectEval")); // false (the comma operator returns a new value)
}