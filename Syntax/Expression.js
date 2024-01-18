// you can also use almost any expression as a statement, there are 8 types of expression https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/Expression_statement

//--- 1. function call like [x].forEach(y)
console.log(`
--- (Ep#1) ---`);

[1, 2, 3].forEach((i) => console.log(i));

//--- 2. template literal `${x}`
console.log(`
--- (Ep#2) ---`);

const person = "Mike";
const age = 28;

function myTag(strings, personExp, ageExp) {
    const str0 = strings[0]; // "That "
    const str1 = strings[1]; // " is a "
    const str2 = strings[2]; // "."

    const ageStr = ageExp < 100 ? "youngster" : "centenarian";

    // We can even return a string built using a template literal
    return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

const output = myTag`That ${person} is a ${age}.`;

console.log(output);

//--- 3. Assignment operators like [x, ...y] = z  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#assignment_operators
console.log(`
--- (Ep#3) ---`);

let a, b, rest;
[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);

//--- 4. increment operator like x++ or ++x
console.log(`
--- (Ep#4) ---`);

let x = 3;
const y = x++;

console.log(`x:${x}, y:${y}`); // Expected output: "x:4, y:3"

let k = 3;
const l = ++k;

console.log(`k:${k}, l:${l}`); // Expected output: "k:4, l:4"

//--- 5. Delete statement 
console.log(`
--- (Ep#5) ---`);

var object1 = {
    property1: 42,
};

const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

console.log(1, descriptor1) //{ value: 42, writable: true, enumerable: true, configurable: true }
console.log(2, descriptor1.configurable);  //  true
console.log(3, delete object1.property1); // true 
console.log(4, object1) // {}

//--- 6. Import statement
console.log(`
--- (Ep#6) ---`);

let Imported
import("../Oop/tracePrototypeChainOf.js").then((X) => {
    Imported = true
    console.log(1, X.tracePrototypeChainOf(rest));
});

(async () => {
    if (!Imported) {
        const {
            default: X,
            foo,
            bar,
        } = await import("../Oop/tracePrototypeChainOf.js");
        console.log(2, X.tracePrototypeChainOf(rest))
    }
})();

//--- 7. yield generator function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
console.log(`
--- (Ep#7) ---`);

function* foo(index) {
    while (index < 2) {
        yield index;
        index++;
    }
}

const iterator1 = foo(0);

console.log(1, iterator1.next().value);  // Expected output: 0
console.log(2, iterator1.next().value);  // Expected output: 1
console.log(2, iterator1.next().value);

//--- 8. yield* operator  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*
console.log(`
--- (Ep#8) ---`);

function* func1(x) {
    yield x;
}

function* func2(x) {
    yield* func1(x);
}

const iterator2 = func2(5);

console.log(iterator2.next().value);

