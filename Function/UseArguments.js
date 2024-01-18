//--- apply arguments for function parameters
console.log(`
--- (Fm#1) ---`);

function f8(a, b, c) {
    console.log(arguments[0]); //a
    console.log(arguments[1]); //b
    console.log(arguments[2]); //c
    return a + b + c;
}

console.log(f8('a', 'b', 'c'))

//---  arguments look as array-like object, but this is not array!
console.log(`
--- (Fm#2) ---`);

function myConcat(separator) {
    let result = ""; // initialize list
    // iterate through arguments
    for (let i = 1; i < arguments.length; i++) {
        result += arguments[i] + separator;
    }
    return result;
}
console.log(myConcat(", ", "red", "orange", "blue"));