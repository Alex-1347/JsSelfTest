//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null

//--- (1) typeof Numbers
console.log(`
 --- (Tf#1) ---`);

console.log(1, typeof 37 === "number");
console.log(2, typeof 3.14 === "number");
console.log(3, typeof 42 === "number");
console.log(4, typeof Math.LN2 === "number");
console.log(5, typeof Infinity === "number");
console.log(6, typeof NaN === "number"); // Despite being "Not-A-Number"
console.log(7, typeof Number("1") === "number"); // Number tries to parse things into numbers
console.log(8, typeof Number("shoe") === "number"); // including values that cannot be type coerced to a number

//--- (2) typeof bigint
console.log(`
--- (Tf#2) ---`);

console.log(9, typeof 42n === "bigint");

//--- (3) typeof Strings
console.log(`
--- (Tf#3) ---`);

console.log(10, typeof "" === "string");
console.log(11, typeof "bla" === "string");
console.log(12, typeof `template literal` === "string");
console.log(13, typeof "1" === "string"); // note that a number within a string is still typeof string
console.log(14, typeof typeof 1 === "string"); // typeof always returns a string
console.log(15, typeof String(1) === "string"); // String converts anything into a string, safer than toString

//--- (4) typeof Booleans
console.log(`
--- (Tf#4) ---`);

console.log(16, typeof true === "boolean");
console.log(17, typeof false === "boolean");
console.log(18, typeof Boolean(1) === "boolean"); // Boolean() will convert values based on if they're truthy or falsy
console.log(19, typeof !!1 === "boolean"); // two calls of the ! (logical NOT) operator are equivalent to Boolean()

//--- (5) typeof Symbols
console.log(`
--- (Tf#5) ---`);

console.log(20, typeof Symbol() === "symbol");
console.log(21, typeof Symbol("foo") === "symbol");
console.log(22, typeof Symbol.iterator === "symbol");

//--- (6) typeof Undefined
console.log(`
--- (Tf#6) ---`);

console.log(23, typeof undefined === "undefined");
console.log(24, typeof declaredButUndefinedVariable === "undefined");
console.log(25, typeof undeclaredVariable === "undefined");

//--- (7) typeof Objects, Array, new Date, new Boolean, new Number, new Strin
console.log(`
--- (Tf#7) ---`);

console.log(26, typeof { a: 1 } === "object");

// use Array.isArray or Object.prototype.toString.call to differentiate regular objects from arrays
console.log(27, typeof [1, 2, 4] === "object");

console.log(28, typeof new Date() === "object");
console.log(29, typeof /regex/ === "object");

// The following are confusing, dangerous, and wasteful. Avoid them.
console.log(30, typeof new Boolean(true) === "object");
console.log(31, typeof new Number(1) === "object");
console.log(32, typeof new String("abc") === "object");

//--- (8) Functions
console.log(` 
--- (Tf#8) ---`);

console.log(33, typeof function () { } === "function");
console.log(34, typeof class C { } === "function");
console.log(35, typeof Math.sin === "function");

//--- use Array.isArray or Object.prototype.toString.call to differentiate regular objects from arrays
console.log(`
--- (Tf#9) ---`);

console.log(1, Array.isArray([1, 3, 5]));// Expected output: true

console.log(2, Array.isArray('[]'));// Expected output: false

console.log(3, Array.isArray(new Array(5)));// Expected output: true

console.log(4, Array.isArray(new Int16Array([15, 33])));// Expected output: false

console.log(5, Object.prototype.toString.call([1, 2, 3].toString())) // "[object String]"

console.log(5, Object.prototype.toString.call([1, 2, 3])) // "[object Array]"

//--- Object.prototype.toString.call https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
console.log(`
--- (Tf#10) ---`);

const toString = Object.prototype.toString;

console.log(1, toString.call(new Date()));  // [object Date]
console.log(2, toString.call(new String())) // [object String]
// Math has its Symbol.toStringTag
console.log(3, toString.call(Math))         // [object Math]
console.log(4, toString.call(undefined))    // [object Undefined]
console.log(5, toString.call(null));        // [object Null]

function func1(a, b, c) {
    console.log(6, toString.call(arguments[0]));//[object Number]
    console.log(7, toString.call(arguments));   //[object Arguments]
}
func1(1, 2, 3);

const re = new RegExp("ab+c", "i")
console.log(8, toString.call(re))           //[object RegExp]