//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#comparing_equality_methods
//https://www.w3schools.com/js/js_comparisons.asp

//--- === compare value and type
console.log(`
--- (Cm#1) ---`)

const num = 0;
const obj = new String("0");
const str = "0";

console.log(num === num); // true
console.log(obj === obj); // true
console.log(str === str); // true

console.log(num === obj); // false
console.log(num === str); // false
console.log(obj === str); // false
console.log(null === undefined); // false
console.log(obj === null); // false
console.log(obj === undefined); // false

console.log([NaN].indexOf(NaN)); // -1
switch (NaN) {
    case NaN:
        console.log("Surprise"); // Nothing is logged
}

//--- (2) compare bigint (0n) with other
console.log(`
--- (Cm#2) ---`)

const big = 0n;

console.log(num == str); // true
console.log(big == num); // true
console.log(str == big); // true

console.log(num == obj); // true
console.log(big == obj); // true
console.log(str == obj); // true

//--- (3) This use case demonstrates an instance of the Liskov substitution principle https://en.wikipedia.org/wiki/Liskov_substitution_principle
console.log(`
--- (Cm#3) ---`)

// Add an immutable NEGATIVE_ZERO property to the Number constructor.
Object.defineProperty(Number, "NEGATIVE_ZERO", {
    value: -0,
    writable: false,
    configurable: false,
    enumerable: false,
});

function attemptMutation(v) {
    Object.defineProperty(Number, "NEGATIVE_ZERO", { value: v });
}

const X = new Object;
X.Number = 10
console.log(X.Number)

//--- (4) Similar to same-value equality, but +0 and -0 are considered equal.
console.log(`
--- (Cm#4) ---`)

function sameValueZero(x, y) {
    if (typeof x === "number" && typeof y === "number") {
        // x and y are equal (may be -0 and 0) or they are both NaN
        return x === y || (x !== x && y !== y);
    }
    return x === y;
}

console.log(sameValueZero(-0, +0))

//--- (5) Object.is() and NaN
console.log(`
--- (Cm#5) ---`)

const f2b = (x) => new Uint8Array(new Float64Array([x]).buffer);
const b2f = (x) => new Float64Array(x.buffer)[0];
// Get a byte representation of NaN
const n = f2b(NaN);
// Change the first bit, which is the sign bit and doesn't matter for NaN
n[0] = 1;
const nan2 = b2f(n);
console.log(nan2); // NaN
console.log(Object.is(nan2, NaN)); // true
console.log(f2b(NaN)); // Uint8Array(8) [0, 0, 0, 0, 0, 0, 248, 127]
console.log(f2b(nan2)); // Uint8Array(8) [1, 0, 0, 0, 0, 0, 248, 127]
