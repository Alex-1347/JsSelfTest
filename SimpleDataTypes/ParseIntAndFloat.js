//--- The parseInt() parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems). Does not handle BigInt values and see Math.Trunc()
console.log(`
--- (Pi#1) ---`)

console.log(1, parseInt("0xF", 16))
console.log(2, parseInt("F", 16))
console.log(3, parseInt("17", 8))
console.log(4, parseInt("015", 10)) // but `parseInt('015', 8)` will return 13
console.log(5, parseInt("15,123", 10))
console.log(6, parseInt("FXX123", 16))
console.log(7, parseInt("1111", 2))
console.log(8, parseInt("15 * 3", 10))
console.log(9, parseInt("15e2", 10))
console.log(10, parseInt("15px", 10))
console.log(11, parseInt("12", 13))

console.log(12, parseInt("Hello", 8)) // Not a number at all
console.log(13, parseInt("546", 2)) // Digits other than 0 or 1 are invalid for binary radix

console.log(14, parseInt("-F", 16))
console.log(15, parseInt("-0F", 16))
console.log(16, parseInt("-0XF", 16))
console.log(17, parseInt("-17", 8))
console.log(18, parseInt("-15", 10))
console.log(19, parseInt("-1111", 2))
console.log(20, parseInt("-15e1", 10))
console.log(21, parseInt("-12", 13))

//The following example returns 224:
console.log(22, parseInt("0e0", 16))

//parseInt() does not handle BigInt values. 
console.log(23, parseInt("900719925474099267n"))
console.log(24, BigInt("900719925474099267"))

//In general, it's a bad idea to use parseInt() on non-strings, especially to use it as a substitution for Math.trunc(). 
console.log(25, parseInt(15.99, 10)) // 15
console.log(26, parseInt(-15.1, 10)) // -15

//where parseInt() stops at the decimal point. parseInt() will return a one-digit integer:
console.log(27, parseInt(4.7 * 1e22, 10)) // Very large number becomes 4
console.log(28, parseInt(0.00000000000434, 10)) // Very small number becomes 4

console.log(29, parseInt(0.0000001, 10)) // 1
console.log(30, parseInt(0.000000123, 10)) // 1
console.log(31, parseInt(1e-7, 10)) // 1
console.log(32, parseInt(1000000000000000000000, 10)) // 1
console.log(33, parseInt(123000000000000000000000, 10)) // 1
console.log(34, parseInt(1e21, 10)) // 1


//--- The parseFloat() function parses a string argument and returns a floating point number.    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat
console.log(`
--- (Pi#2) ---`)
function circumference(r) {
    return parseFloat(r) * 2.0 * Math.PI;
}

console.log(circumference(4.567))             // Expected output: 28.695307297889173
console.log(circumference('4.567abcdefgh'))   // Expected output: 28.695307297889173
console.log(circumference('abcdefgh'))        // Expected output: NaN
