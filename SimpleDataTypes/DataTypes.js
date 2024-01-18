//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
//https://tc39.es/ecma262/multipage/abstract-operations.html#sec-type-conversion

//--- (1) Variables in JavaScript are not directly associated with any particular value type, and any variable can be assigned (and re-assigned) values of all types:
console.log(`
 --- (Dt#1) ---`);

let foo = 42; // foo is now a number
console.log(foo)
foo = "bar"; // foo is now a string
console.log(foo)
foo = true; // foo is now a boolean
console.log(foo)

//--- (2) conversion of week types
console.log(`
 --- (Dt#2) ---`);
const result = foo + "false"; // JavaScript coerces foo to a string, so it can be concatenated with the other operand
console.log(result); // 421

//--- (3) NULL
console.log(`
 --- (Dt#3) ---`);

function getVowels(str) {
    const m = str.match(/[aeiou]/gi);
    if (m === null) {
        return 0;
    }
    return m.length;
}

console.log(getVowels('sky'));  // Expected output: 0

//--- (4) See more in TypeOf.js 
console.log(`
 --- (Dt#4) ---`);

console.log(typeof null === "object");

//--- (5) Hexadecimal escape sequences
console.log(`
 --- (Dt#5) ---`);

console.log("\xA9")

//--- (6) Unicode escape sequences
console.log(`
 --- (Dt#6) ---`);

console.log('\u{2F804}', "\uD87E\uDC04", `🛑`)
console.log(String.fromCodePoint(9731, 9733, 9842, 0x2f804))

//--- (7) See more in TypeOf.js , TemplateString