//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

//--- allows an iterable, such as an array or string. used in (1) function argument, (2) array, (3) literal and (4) object

//--- 1. Replace apply() in Function arguments list 
console.log(`
--- (Sp#1) ---`)
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));   // Expected output: 6
console.log(sum.apply(null, numbers));   // Expected output: 6


//--- 2. Spread in array 
console.log(`
--- (Sp#2) ---`)

const parts = ["shoulders", "knees"];
const lyrics = ["head", ...parts, "and", "toes"];
console.log(lyrics)

//--- make a shallow copy of an array
console.log(`
--- (Sp#3) ---`)

const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // like arr.slice()

arr2.push(4);// arr2 becomes [1, 2, 3, 4]
console.log(arr2)

//--- Apply for new operator - When calling a constructor with new, it's not possible to directly use an array and apply(), because apply() calls the target function instead of constructing it, which means, among other things, that new.target will be undefined, therefore only this way is possible
console.log(`
--- (Sp#4) ---`)

const dateFields = [1970, 0, 1]; // 1 Jan 1970
const d = new Date(...dateFields);
console.log(d)

//--- concatenate arrays instead Array.prototype.concat()
console.log(`
--- (Sp#5) ---`)

//without spread
let arr3 = arr1.concat(arr2)
console.log(arr3)

Array.prototype.unshift.apply(arr1, arr2);
console.log(arr1)

//the same with spread
let arr5 = [...arr1, ...arr2];
console.log(arr5)

//--- Conditionally adding values to an array
console.log(`
--- (Sp#6) ---`)

const isSummer = false;
let fruits = ["apple", "banana", ...(isSummer ? ["watermelon"] : [])];
// the same with spread
fruits = ["apple", "banana", isSummer ? "watermelon" : undefined];

console.log(fruits)

//--- 3. Spread in object 

//Overriding properties when one object is spread into another object

console.log(`
--- (Sp#7) ---`)

const obj1 = { foo: "bar", x: 42 };
const obj2 = { foo: "baz", y: 13 };

const mergedObj = { x: 41, ...obj1, ...obj2, y: 9 }; // { x: 42, foo: "baz", y: 9 }
console.log(mergedObj)

//--- Conditionally adding properties to an object, no key at all with Object.keys().
console.log(`
--- (Sp#8) ---`)

const isSummer1 = false;
const fruits1 = {
  apple: 10,
  banana: 5,
  ...(isSummer1 ? { watermelon: 30 } : {}),
};
console.log(fruits1)

//--- Object.assign() can be used to mutate an object, whereas spread syntax can't.
console.log(`
--- (Sp#9) ---`)

//with assign
const obj7 = { foo: "bar", x: 42 };
Object.assign(obj7, { x: 1337 });
console.log(obj7);

const obj8 = { foo: "baz", y: 13 };

//with spread
const merge = (...objects) => ({ ...objects });

const mergedObj1 = merge(obj7, obj8);// { 0: { foo: 'bar', x: 42 }, 1: { foo: 'baz', y: 13 } }
console.log(mergedObj1);

const mergedObj2 = merge({}, obj7, obj8);// { 0: {}, 1: { foo: 'bar', x: 42 }, 2: { foo: 'baz', y: 13 } }
console.log(mergedObj2);

