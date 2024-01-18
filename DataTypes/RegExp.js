//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions

//--- (1) Matching duplicate words with text.match
console.log(`
--- (Rg#1) ---`)

function findDuplicates(text) {
    return text.match(/\b(\w+)\s+\1\b/i)?.[1];
}

console.log(findDuplicates("foo foo bar")); // 'foo'
console.log(findDuplicates("foo bar foo")); // undefined
console.log(findDuplicates("Hello hello")); // 'Hello'
console.log(findDuplicates("Hello hellos")); // undefined

//--- Assignment with destructuring, Unpacking values from a regular expression with exec
console.log(`
--- (Rg#2) ---`)

const result = /(a+)(b+)(c+)/.exec("aaabcc");
let u = "", v = "", w = "";
[, u, v, w] = result;
console.log(u, v, w); // "aaa" "b" "cc"