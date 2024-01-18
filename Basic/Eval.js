//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#direct_and_indirect_eval


//--- eval(script), script -  A string representing a JavaScript expression, statement, or sequence of statements. Direct call eval version
console.log(`
--- (Ev#1) ---`)

console.log(eval('2 + 2')); // Expected output: 4

console.log(eval(new String('2 + 2')));// Expected output: 2 + 2

console.log(eval('2 + 2') === eval('4'));// Expected output: true

console.log(eval('2 + 2') === eval(new String('2 + 2')));// Expected output: false

//--- For if, it would be the last expression or statement evaluated.
console.log(`
--- (Ev#2) ---`)

const str = "if (u) { 1 + 1 } else { 1 + 2 }";
let u = true;
let v = eval(str);

console.log(`v is: ${v}`); // v is: 2

u = false;
v = eval(str);

console.log(`v is: ${v}`); // v is: 3

//--- If you assign multiple values then the last value is returned.
console.log(`
--- (Ev#3) ---`)

let q = 5;
const str1 = `if (q === 5) {
  console.log("z is 42");
  z = 42;
  q = 420;
} else {
  z = 0;
}`;

console.log("q is", eval(str1)); // z is 42  q is 420


//--- eval() as a string defining function requires "(" and ")" as prefix and suffix. Function declaration vs function expression
console.log(`
--- (Ev#4) ---`)

// This is a function declaration
const fctStr1 = "function z() {}";
// This is a function expression
const fctStr2 = "(function b() {})";
const fct1 = eval(fctStr1); // return undefined, but `z` is available as a global function now
const fct2 = eval(fctStr2); // return the function `b`
console.log(fct1,fct2)


// Direct and indirect eval - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#direct_and_indirect_eval
//--- Indirect call version using the comma operator to return eval
console.log(`
--- (Ev#5) ---`)

const x = 2;
const y = 4;
console.log(1, eval('x + y'))

//--- Uses global scope, throws because x is undefined
console.log(`
--- (Ev#6) ---`)

try {

    console.log(2, (0, eval)('x + y'))
} catch (error) {
    console.log(error)
}

try {
    const geval = eval;
    console.log(geval("x + y"))

} catch (error) {
    console.log(error)
}

//--- strict mode
console.log(`
--- (Ev#7) ---`)

function strictContext() {
    "use strict";
    eval?.(`with (Math) console.log(PI);`);
}
strictContext(); // Logs 3.141592653589793

//--- source eval string is in strict mode
console.log(`
--- (Ev#8) ---`)

function strictContextStrictEval() {
    "use strict";
    eval?.(`"use strict"; with (Math) console.log(PI);`);
}

try {
    strictContextStrictEval(); // Throws a SyntaxError because the source string is in strict mode
} catch (error) {
    console.log(error)
}

//--- eval new.target
console.log(`
--- (Ev#9) ---`)

function Ctor() {
    eval("console.log(new.target)");
}
console.log(new Ctor()); // [Function: Ctor]

//--- var-declared variables and function declarations would go into the surrounding scope if the source string is not interpreted in strict mode — for indirect eval, they become global variables.
console.log(`
 --- (Ev#10) ---`)

eval("var a = 1;");  // Neither context nor source string is strict, so var creates a variable in the surrounding scope
console.log(a); // 1

// Context is not strict, but eval source is strict,  so b is scoped to the evaluated script
eval("'use strict'; var b = 1;");
try {
    console.log(b); // ReferenceError: b is not defined
} catch (error) {
    console.log(error)
}

//--- Context is strict, but this is indirect eval and the source string is not strict
console.log(`
--- (Ev#11) ---`)

function strictContext() {
    "use strict";
    // Context is strict, but this is indirect and the source string is not strict, so c is still global
    eval?.("var c = 1;");
    // Direct eval in a strict context, so d is scoped
    eval("var d = 1;");
}
strictContext();

console.log(c); // 1
try {
    console.log(d); // ReferenceError: d is not defined
} catch (error) {
    console.log(error)
}

//--- indirect eval - Simply using indirect eval and forcing strict mode
//--- The two code snippets above may seem to work the same way, but they do not; the first one using direct eval suffers from multiple problems.
console.log(`
--- (Ev#12) ---`)

function looseJsonParse1(obj) {
    return eval(`(${obj})`);
}
console.log(looseJsonParse1("{ a: 4 - 1, b: function () {}, c: new Date() }"));


function looseJsonParse2(obj) {
    return eval?.(`"use strict";(${obj})`);
}
console.log(looseJsonParse2("{ a: 4 - 1, b: function () {}, c: new Date() }"));

//new Date() in the evaluated string
function looseJsonParse3(obj) {
    function Date() { }
    return eval(`(${obj})`);
}
console.log(looseJsonParse3(`{ a: 4 - 1, b: function () {}, c: new Date() }`));

//--- The Function() constructor is very similar to the indirect eval 
console.log(`
--- (Ev#13) ---`)

function Date(n) {
    return [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ][n % 7 || 0];
}
function runCodeWithDateFunction(obj) {
    return Function("Date", `"use strict";return (${obj});`)(Date);
}
console.log(runCodeWithDateFunction("Date(5)")); // Saturday


//--- Using bracket accessors to access properties dynamically. 
console.log(`
--- (Ev#14) ---`)

const obj = { a: 20, b: 30 };

const propName = Object.keys(obj); // returns "a" or "b"
console.log(propName)

const result1 = eval(`obj.${propName[1]}`);
console.log(result1)

const result2 = obj[propName[1]]; // obj["a"] is the same as obj.a
console.log(result2)

//--- the same with descendant properties obj.a.b.c
console.log(`
--- (Ev#15) ---`)

const getPropPath = () => ("a.b.c")

function getDescendantProp1(obj, desc) {
    const arr = desc.split(".");
    while (arr.length) {
        obj = obj[arr.shift()];
    }
    return obj;
}

const obj1 = { a: { b: { c: 0 } } };

const propPath = getPropPath(); // suppose it returns "a.b.c"
console.log(propPath)

const result11 = getDescendantProp1(obj1, propPath); // 0
console.log(result11)

function setDescendantProp2(obj, desc, value) {
    const arr = desc.split(".");
    while (arr.length > 1) {
        obj = obj[arr.shift()];
    }
    console.log(arr[0])
    return (obj[arr[0]] = value);
}

const result22 = setDescendantProp2(obj1, propPath, 1); // obj.a.b.c is now 1
console.log(result22)
