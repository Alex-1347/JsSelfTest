//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

//--- (1) Map is KeyValue set
console.log(`
--- (Kv#1) ---`)

var myMap = new Map();

myMap.set('a', 1);
myMap.set('b', 2);
myMap.set('c', 3);
console.log(myMap);

console.log(myMap.get('a'));

myMap.set('a', 97);

console.log(myMap.get('a'));

console.log(myMap.size);

myMap.delete('b');

console.log(myMap.size);

//--- (2) Map Object
console.log(`
--- (Kv#2) ---`)

const keyString = "a string";
const keyObj = {};
const keyFunc = function () { };

// setting the values
myMap.set(keyString, "value associated with 'a string'");
myMap.set(keyObj, "value associated with keyObj");
myMap.set(keyFunc, "value associated with keyFunc");

console.log(1, myMap); // 3
console.log(2, myMap.size); // 3

console.log(3, myMap.get(keyString)); // "value associated with 'a string'"
console.log(4, myMap.get(keyObj)); // "value associated with keyObj"
console.log(5, myMap.get(keyFunc)); // "value associated with keyFunc"

console.log(6, myMap.get("a string")); // "value associated with 'a string'", because keyString === 'a string'
console.log(7, myMap.get({})); // undefined, because keyObj !== {}
console.log(8, myMap.get(function () { })); // undefined, because keyFunc !== function () {}

//--- (3) NaN
console.log(`
--- (Kv#3) ---`)

myMap.set(NaN, "not a number");

console.log(myMap.get(NaN));

const otherNaN = Number("foo");
console.log(myMap.get(otherNaN));

//--- (4) iteration with For [key, value] of myMap
console.log(`
--- (Kv#4) ---`)

for (const [key, value] of myMap) {
    console.log(1, `${key} = ${value}`);
}

for (const key of myMap.keys()) {
    console.log(2, key);
}

for (const value of myMap.values()) {
    console.log(3, value);
}

//--- (5) iteration Map.forEach((value, key) => {}
console.log(`
--- (Kv#5) ---`)

myMap.forEach((value, key) => {
    console.log(`${key} = ${value}`);
});

//--- (6) Relation with Array objects new Map(Array), Array.from(Map), [...Map]
console.log(`
--- (Kv#6) ---`)

const kvArray = [
    ["key1", "value1"],
    ["key2", "value2"],
];

// Use the regular Map constructor to transform a 2D key-value Array into a map
myMap = new Map(kvArray);

console.log(1, myMap.get("key1")); // "value1"

// Use Array.from() to transform a map into a 2D key-value Array
console.log(2, Array.from(myMap)); // Will show you exactly the same Array as kvArray

// A succinct way to do the same, using the spread syntax
console.log(3, [...myMap]);

// Or use the keys() or values() iterators, and convert them to an array
console.log(4, Array.from(myMap.keys())); // ["key1", "key2"]

//--- (7) Map can clone
console.log(`
--- (Kv#7) ---`)

const original = new Map([[1, "one"]]);
console.log(1, original)

const clone = new Map(original);

console.log(2, clone.get(1)); // one
console.log(3, original === clone); // false (useful for shallow comparison)

//--- (8) Map can Merge
console.log(`
--- (Kv#8) ---`)

const first = new Map([
    [1, "one"],
    [2, "two"],
    [3, "three"],
]);

const second = new Map([
    [1, "uno"],
    [2, "dos"],
]);

// Merge two maps. The last repeated key wins.
// Spread syntax essentially converts a Map to an Array
var merged = new Map([...first, ...second]);

console.log(merged.get(1)); // uno
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three

//--- (9) Map can megre with array
console.log(`
--- (Kv#9) ---`)

merged = new Map([...first, ...second, [1, "eins"]]);

console.log(merged.get(1)); // eins
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three


//https://www.w3schools.com/JS/js_object_maps.asp
//A Map holds key-value pairs where the keys can be any datatype.
//A Map remembers the original insertion order of the keys.
//A Map has a property that represents the size of the map.

//--- (10) create from Array
console.log(`
--- (Kv#10) ---`);
const fruits = new Map([
    ["apples", 500],
    ["bananas", 300],
    ["oranges", 200]
]);

console.log(fruits)

//--- (11) add item
console.log(`
--- (Kv#11) ---`);

fruits.set('lemon', 400)
fruits.set('lemson', 600)
console.log(fruits)

//--- (12) Being able to use objects as keys is an important Map feature.
console.log(`
--- (Kv#12) ---`);

const apples = { name: 'Apples' };
const bananas = { name: 'Bananas' };
const oranges = { name: 'Oranges' };

fruits.set(apples, 500);
fruits.set(bananas, 300);
fruits.set(oranges, 200);
console.log(fruits)

//--- for-of iteration
console.log(`
--- (Kv#13) ---`);

let total = 0;
for (const x of fruits.values()) {
    total += x;
}
console.log(total)

//--- (14) Keys
console.log(`
--- (Kv#14) ---`);

let text = "";
for (const x of fruits.keys()) {
    text += x;
}
console.log(text)