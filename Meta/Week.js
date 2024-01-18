//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet

//--- A WeakSet is a collection of garbage-collectable values, including objects and non-registered symbols. Example 1.
console.log(`
--- (Wk#1) ---`);

const ws = new WeakSet();
const foo = {};
const bar = {};

ws.add(foo);
ws.add(bar);

console.log(ws.has(foo)); // true
console.log(ws.has(bar)); // true

ws.delete(foo);           // removes foo from the set
console.log(ws.has(foo)); // false, foo has been removed
console.log(ws.has(bar)); // true, bar is retained

//--- (2) example 2
console.log(`
--- (Wk#2) ---`);

let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

console.log(visitedSet.has(john)); // true
console.log(visitedSet.has(mary)); // false

john = null;    // visitedSet will be cleaned automatically

//--- (3) example 3
console.log(`
--- (Wk#3) ---`);

let arrMessages = [
    { text: "Hello", from: "John" },
    { text: "How goes?", from: "John" },
    { text: "See you soon", from: "Alice" },
    { text: "Spill the tea!!", from: "Mark" },
    { text: "Hahahah", from: "Anne" },
];

let wsReadMessages = new WeakSet();
wsReadMessages.add(arrMessages[1]).add(arrMessages[3]).add(arrMessages[4]);

let arrReadMessages = arrMessages.filter(item => wsReadMessages.has(item));

for (let message of arrReadMessages) {
    console.log(message);
}

//--- A WeakMap is a collection of key/value pairs whose keys must be objects or non-registered symbols, with values of any arbitrary JavaScript type, Example 1
console.log(`
--- (Wk#4) ---`);

const wm1 = new WeakMap();
const wm2 = new WeakMap();
const wm3 = new WeakMap();

const o1 = {};
const o2 = function () { };
const o3 = console;

wm1.set(o1, 37);
wm1.set(o2, "azerty");

wm2.set(o1, o2); // a value can be anything, including an object or a function
wm2.set(o2, undefined);
wm2.set(wm1, wm2); // keys and values can be any objects. Even WeakMaps!

wm3.set(o1, 37);
wm3.get(o1); // 37
console.log(wm3)

console.log(wm1.get(o2)); // "azerty"
console.log(wm2.get(o2)); // undefined, because that is the set value
console.log(wm2.get(o3)); // undefined, because there is no key for o3 on wm2

console.log(wm1.has(o2)); // true
console.log(wm2.has(o2)); // true (even if the value itself is 'undefined')
console.log(wm2.has(o3)); // false

console.log(wm1.has(o1)); // true
wm1.delete(o1);
console.log(wm1.has(o1)); // false

//--- WeakMap Example 2
console.log(`
--- (Wk#5) ---`);

let mark = { name: "Mark" };

let weakMap = new WeakMap();
weakMap.set(mark, "...");

console.log(weakMap.has(mark))
mark = null; // overwrite the reference

// mark is removed from memory!
console.log(weakMap.has(mark))
console.log(mark === null)


