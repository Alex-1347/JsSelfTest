//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment

//--- logical nullish assignment operator, only evaluates the right operand and assigns to the left if the left operand is nullish (null or undefined).
console.log(`
--- (Nc#1) ---`)

const a = { duration: 50 };

a.duration ??= 10;
console.log(a.duration); // Expected output: 50

a.speed ??= 25;
console.log(a.speed); // Expected output: 25


//--- Nullish coalescing operator ??
console.log(`
--- (Nc#2) ---`)

const nullValue = null;
const emptyText = ""; // falsy
const someNumber = 42;

const valA = nullValue ?? "default for A";
const valB = emptyText ?? "default for B";
const valC = someNumber ?? 0;

console.log(1, valA); // "default for A"
console.log(2, valB); // "" (as the empty string is not null or undefined)
console.log(3, valC); // 42

//--- (3) || Optional chaining https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
console.log(`
--- (Nc#3) ---`)

const adventurer = {
    name: 'Alice',
    cat: {
        name: 'Dinah',
    },
};

const dogName = adventurer.dog?.name;
console.log(dogName); // Expected output: undefined

console.log(adventurer.someNonExistentMethod?.());   // Expected output: undefined

//--- Assigning a default value to a variable
console.log(`
--- (Nc#4) ---`)

const count = 0;
const text = "";

const qty = count || 42;
const message = text || "hi!";
console.log(qty); // 42 
console.log(message); // "hi!" 

const preservingFalsy = message ?? "Hi neighborhood";
console.log(preservingFalsy);

//--- Short-circuiting
console.log(`
--- (Nc#5) ---`)

function e() {
    console.log("e was called");
    return undefined;
}
function b() {
    console.log("b was called");
    return false;
}
function c() {
    console.log("c was called");
    return "foo";
}

console.log(1, e() ?? c());
// Logs "a was called" then "c was called" and then "foo"  as a() returned undefined so both expressions are evaluated

console.log(2, b() ?? c());
// Logs "b was called" then "false" as b() returned false (and not null or undefined), the right hand side expression was not evaluated
