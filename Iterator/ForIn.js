//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in

//The for...in statement iterates over all enumerable string properties of an object (ignoring properties keyed by symbols), including inherited enumerable properties.

//--- for...in loop only iterates over enumerable, non-symbol properties. 
console.log(`
--- (Fr#1) ---`);

const object = { a: 1, b: 2, c: 3 };

for (const property in object) {
    console.log(`${property}: ${object[property]}`);
}

//--- we can use of Object.hasOwn(): the inherited properties are not displayed.
console.log(`
--- (Fr#2) ---`);

const triangle = { a: 1, b: 2, c: 3 };

function ColoredTriangle() {
    this.color = "red";
}

ColoredTriangle.prototype = triangle;

const obj = new ColoredTriangle();

for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
        console.log(`obj.${prop} = ${obj[prop]}`);
    }
}

//--- Shadowed properties are only visited once:
console.log(`
--- (Fr#3) ---`);

const proto = { a: 1 };
const obj1 = { __proto__: proto, a: 2 };

for (const prop in obj1) {
    console.log(`obj1.${prop} = ${obj[prop]}`);
}

Object.defineProperty(obj1, "a", { enumerable: false });

for (const prop in obj1) {
    console.log(`obj1.${prop} = ${obj1[prop]}`);
}

//--- Deleting a property during iteration:
console.log(`
--- (Fr#4) ---`);

const obj3 = { a: 1, b: 2, c: 3 };

// Deleting a property before it is visited
for (const prop in obj3) {
    console.log(`obj3.${prop} = ${obj3[prop]}`);
    delete obj3.c;
}

const obj4 = { a: 1, b: 2, c: 3 };

// Deleting a property after it is visited
for (const prop in obj4) {
    console.log(`obj4.${prop} = ${obj4[prop]}`);
    delete obj4.a;
}

//--- Changing the prototype during iteration:
console.log(`
--- (Fr#5) ---`);

const obj5 = { a: 1, b: 2 };

for (const prop in obj5) {
    console.log(`obj.${prop} = ${obj5[prop]}`);
    Object.setPrototypeOf(obj5, { c: 3 });
}

//--- Difference between for...of and for...in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of#difference_between_for...of_and_for...in
//--- The for...in statement iterates over the enumerable string properties of an object, while the for...of statement iterates over values that the iterable object defines to be iterated over.

console.log(`
--- (Fr#6) ---`);

Object.prototype.objCustom = function () { };
Array.prototype.arrCustom = function () { };

const iterable = [3, 5, 7];
iterable.foo = "hello";

for (const i in iterable) {
    console.log(i); // "0", "1", "2", "foo", "arrCustom", "objCustom"
}

for (const i in iterable) {
    if (Object.hasOwn(iterable, i)) {
        console.log(i); // "0" "1" "2" "foo"
    }
}

for (const i of iterable) {
    console.log(i); // 3 5 7
}


