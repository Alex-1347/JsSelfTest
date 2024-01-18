//https://www.w3schools.com/js/js_numbers.asp

//--- (1) JavaScript Numbers are Always 64-bit Floating Point
console.log(`
--- (Nm#1) ---`);

let x = 999999999999999;   // x will be 999999999999999
let y = 9999999999999999;  // y will be 10000000000000000 
console.log(x, y, y - x)


//--- (2) limits
console.log(`
--- (Nm#2) ---`);

console.log(1, Number.EPSILON)
console.log(2, Number.MAX_VALUE)
console.log(3, Number.MIN_VALUE)
console.log(4, Number.MAX_SAFE_INTEGER)
console.log(5, Number.MIN_SAFE_INTEGER)
console.log(6, Number.NEGATIVE_INFINITY)
console.log(7, Number.POSITIVE_INFINITY)


//--- (3) JavaScript BigInt is a new datatype (ES2020) that can be used to store integer values that are too big to be represented by a normal JavaScript Number.
console.log(`
--- (Nm#3) ---`);

let z = BigInt("123456789012345678901234567890");
console.log(z)

//--- (4) The JavaScript interpreter works from left to right. 
//JavaScript uses the + operator for both addition and concatenation.
console.log(`
--- (Nm#4) ---`);

console.log(1, 20 + 30)     //because x and y are both numbers.
console.log(2, '20' + 30)
console.log(3, 20 + '30')   // because string present

let a = "100";
let b = "10";
let c = a - b;
console.log(4, c)
console.log(5, 20 / '30')
console.log(6, 20 * '30')

//--- (5) NaN - Not a Number
console.log(`
--- (Nm#5) ---`);

console.log(20 / 'apple')


//--- (6) typeof NaN returns number:
console.log(`
--- (Nm#6) ---`);

console.log(typeof NaN)

//--- (7) operation with NaM
console.log(`
--- (Nm#7) ---`);

let q = NaN;
let w = 5;
let r = '5';
let e = q + w;
let t = q + r;
console.log(e, t)

//---(8) Infinity (or -Infinity) is the value JavaScript will return if you calculate a number outside the largest possible number.
console.log(`
--- (Nm#8) ---`);

let myNumber = 32;
// Execute until Infinity
while (myNumber != Infinity) {
    myNumber = myNumber * myNumber;
}

console.log(2 / 0);
console.log(-2 / 0);

//--- (9) hexadecimal preceded by 0x.
console.log(`
--- (Nm#9) ---`);

console.log(0xFFAABB);

//--- (10) toString() method to output numbers from base 2 to base 36.
console.log(`
--- (Nm#10) ---`);

let mNumber = 32;
console.log(1, mNumber.toString(32));
console.log(2, mNumber.toString(16));
console.log(3, mNumber.toString(12));
console.log(4, mNumber.toString(10));
console.log(5, mNumber.toString(8));
console.log(6, mNumber.toString(2));


//---(11) JavaScript Numbers as Objects
console.log(`
--- (Nm#11) ---`);

let p = 500;
let o = new Number(500);
console.log(o, p)

//--- (12) Note the difference between (x==y) and (x===y).
console.log(`
--- (Nm#12) ---`);

console.log(o == p, o === p)

//--- (13) Comparing two JavaScript objects always returns false.
console.log(`
 -- (Nm#13) ---`);

let l = new Number(500);
console.log(o == l, o === l)

//--- (14) toFixed
console.log(`
--- (Nm#14) ---`);

let num = 5.56789;
console.log(num.toFixed(), num.toFixed(2))

//more - https://www.w3schools.com/jsref/jsref_obj_number.asp


//--- (15) Number ParseInt  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt
console.log(`
--- (Nm#15) ---`);

function roughScale(x, base) {
    const parsed = Number.parseInt(x, base);
    if (Number.isNaN(parsed)) {
        return 0;
    }
    return parsed * 100;
}

console.log(roughScale(' 0xF', 16)); // Expected output: 1500
console.log(roughScale('321', 2)); // Expected output: 0

//--- (16) Number parseFloat  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat
console.log(`
--- (Nm#16) ---`);

function circumference(r) {
    if (Number.isNaN(Number.parseFloat(r))) {
        return 0;
    }
    return parseFloat(r) * 2.0 * Math.PI;
}

console.log(circumference('4.567abcdefgh')); // Expected output: 28.695307297889173
console.log(circumference('abcdefgh')); // Expected output: 0


//--- The isNaN() function determines whether a value is NaN or not. Note: coercion inside the isNaN function has interesting rules. You may alternatively want to use Number.isNaN() to determine if the value is Not-A-Number.    
console.log(`
--- (Nm#17) ---`)

console.log(1, isNaN(NaN)) // true
console.log(2, isNaN(undefined)) // true
console.log(3, isNaN({})) // true

console.log(4, isNaN(true)) // false
console.log(5, isNaN(null)) // false
console.log(6, isNaN(37)) // false

// Strings
console.log(7, isNaN("37")) // false: "37" is converted to the number 37 which is not NaN
console.log(8, isNaN("37.37")) // false: "37.37" is converted to the number 37.37 which is not NaN
console.log(9, isNaN("37,5")) // true
console.log(10, isNaN("123ABC")) // true: Number("123ABC") is NaN
console.log(11, isNaN("")) // false: the empty string is converted to 0 which is not NaN
console.log(12, isNaN(" ")) // false: a string with spaces is converted to 0 which is not NaN

// Dates
console.log(13, isNaN(new Date())) // false) Date objects can be converted to a number (timestamp)
console.log(14, isNaN(new Date().toString())) // true) the string representation of a Date object cannot be parsed as a number

// Arrays
console.log(15, isNaN([])) // false) the primitive representation is "", which coverts to the number 0
console.log(16, isNaN([1])) // false) the primitive representation is "1"
console.log(17, isNaN([1, 2])) // true) the primitive representation is "1,2", which cannot be parsed as number

//--- The global isFinite() function determines whether the passed value is a finite number. If needed, the parameter is first converted to a number. More robust Number.isFinite()
console.log(`
--- (Nm#18) ---`)

console.log(1, isFinite(Infinity)) // false
console.log(2, isFinite(NaN)) // false
console.log(3, isFinite(-Infinity)) // false

console.log(4, isFinite(0)) // true
console.log(5, isFinite(2e64)) // true
console.log(6, isFinite(910)) // true

// Would've been false with the more robust Number.isFinite():
console.log(7, isFinite(null)) // true
console.log(8, isFinite("0")) // true

console.log(9, Number.isFinite(null))
console.log(10, Number.isFinite("0"))
