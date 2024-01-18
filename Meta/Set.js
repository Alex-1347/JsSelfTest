//https://www.w3schools.com/JS/js_object_sets.asp

//--- a JavaScript Set is a collection of unique values. Each value can only occur once in a Set. A Set can hold any value of any data type. 
console.log(`
--- (St#1) ---`);

const letters = new Set(["a", "b", "c"]);
console.log(letters)

//--- Set looks as ordinary Ilist of data
console.log(`
--- (St#2) ---`);

const iList = new Set([{ 1: "a" }, { 2: "b" }, { 3: { 4: "s" } }]);
console.log(iList)

//--- Set.add
console.log(`
--- (St#3) ---`);

letters.add("a");
letters.add("d");

console.log(letters)

//---  set from string
console.log(`
--- (St#4) ---`);
console.log(new Set("firefox"));

//--- Set.forEach
console.log(`
--- (St#5) ---`);

let text = "";
letters.forEach(function (value) {
    text += value;
})

console.log(text)

//--- Set.values()
console.log(`
--- (St#6) ---`);

const myIterator = letters.values();
console.log(myIterator)

//--- Set.keys()
console.log(`
--- (St#7) ---`);

console.log(letters.keys())

//--- A Set has no keys, entries() returns [value,value] pairs instead of [key,value] pairs on Map.
console.log(`
--- (St#8) ---`);

console.log(letters.entries())

//--- Sets are Objects, typeof Set, instanceof Set
console.log(`
--- (St#9) ---`);

console.log(typeof letters, letters instanceof Set)

//--- Iterating sets https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
console.log(`
--- (St#10) ---`);

const mySet1 = new Set();
mySet1.add(1); // Set(1) { 1 }
mySet1.add(5); // Set(2) { 1, 5 }
mySet1.add(5); // Set(2) { 1, 5 }
const o = { a: 1, b: 2 };
mySet1.add(o);
mySet1.add({ a: 1, b: 2 }); // o is referencing a different object, so this is okay

for (const item of mySet1) {
    console.log(item);
}
// 1, "some text", { "a": 1, "b": 2 }, { "a": 1, "b": 2 }, 5

//---  Keys, Value, entries
console.log(`
--- (St#11) ---`);

for (const item of mySet1.keys()) {
    console.log(item);
}
// 1, "some text", { "a": 1, "b": 2 }, { "a": 1, "b": 2 }, 5

for (const item of mySet1.values()) {
    console.log(item);
}
// 1, "some text", { "a": 1, "b": 2 }, { "a": 1, "b": 2 }, 5

// key and value are the same here
for (const [key, value] of mySet1.entries()) {
    console.log(key);
}
// 1, "some text", { "a": 1, "b": 2 }, { "a": 1, "b": 2 }, 5

//--- Convert Set object to an Array object, with Array.from
console.log(`
--- (St#12) ---`);

const myArr = Array.from(mySet1); // [1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}, 5]
console.log(myArr)

// converting between Set and Array
const mySet2 = new Set([1, 2, 3, 4]);
console.log(mySet2.size); // 4
console.log([...mySet2]); // [1, 2, 3, 4]

//---  Iteration with fileter
console.log(`
--- (St#13) ---`);

// intersect can be simulated via
const intersection = new Set([...mySet1].filter((x) => mySet2.has(x)));

// difference can be simulated via
const difference = new Set([...mySet1].filter((x) => !mySet2.has(x)));

// Iterate set entries with forEach()
mySet2.forEach((value) => {
    console.log(value);
});

//---  Use to remove duplicate elements from an array
console.log(`
--- (St#14) ---`);

const numbers = [2, 3, 4, 4, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 5, 32, 3, 4, 5];
console.log([...new Set(numbers)]);

// the following will also work if run in an HTML document
//mySet1.add(document.body);
//mySet1.has(document.querySelector("body")); // true



