//  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
// Iterable objects include instances of built-ins such as Array, String, TypedArray, Map, Set, NodeList (and other DOM collections), as well as the arguments object, generators produced by generator functions, and user-defined iterables.
//--- @@iterator the same is [Symbol.iterator]() looks as ForEach()

//--- simplest iterator over array items - array.keys()
console.log(`
--- (It#1) ---`)

const fruits = ["Banana", "Orange", "Apple", "Mango"];
const keys = fruits.keys()
console.log(keys)

for (let x of keys) {
    console.log(x)
}

//--- For of
console.log(`
--- (It#2) ---`)

for (const value of ["a", "b", "c"]) {
    console.log(value);
}

//--- Transforming a Javascript iterable into an array array.entries()
console.log(`
--- (It#3) ---`)

console.log(fruits.entries())

let arr = Array.from(fruits.entries());
console.log(arr)

//--- Array.prototype[@@iterator]()] - check typeOf iterable parameter https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator
console.log(`
--- (It#4) ---`);

function logIterable(it) {
    if (typeof it[Symbol.iterator] !== "function") {
        console.log(it, "is not iterable.");
        return;
    }
    for (const letter of it) {
        console.log(letter);
    }
}

logIterable(["a", "b", "c"]);
logIterable("xyz");
logIterable(123);  // Number - 123 is not iterable

//--- iterable iterator  (function* () { yield {}; }) (),
console.log(`
--- (It#5) ---`)

const myObj = {};

const x = new WeakSet(
    (function* () {
        yield {};
        yield myObj;
        yield {};
    })(),
);

console.log(x.has(myObj));


//--- array and parameters spreading ... from *[Symbol.iterator]() {}
console.log(`
--- (It#6) ---`)

const myIterable = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    },
};

console.log([...myIterable]);

//--- spreading chars from string 
console.log(`
--- (It#7) ---`)

console.log([..."abc"])


//--- desctructing assignment from set 
console.log(`
--- (It#8) ---`)

let a, b, c
[a, b, c] = new Set(["a", "b", "c"]);
console.log(a);

//--- create User-defined iterables
console.log(`
--- (It#9) ---`)

const obj = {
    [Symbol.iterator]() {
        let i = 0;
        return {
            next() {
                i++;
                console.log("Returning", i);
                if (i === 3) return { done: true, value: i };
                return { done: false, value: i };
            },
            return() {
                console.log("Closing");
                return { done: true };
            },
        };
    },
};
console.dir(1, obj)
console.log(2, JSON.stringify(obj))
console.log(3, Array.from(obj));

//--- unpack uder defined iterables to array
console.log(`
--- (It#10) ---`)

const [d] = obj;
console.log('d', d);
const [e, f, g] = obj;
console.log([e, f, g]);

//--- and read unpacked value with array.map
console.log(`
--- (It#11) ---`);

[e, f, g].map((x) => console.log(x))

//--- for-of  over User-defined iterables
console.log(`
--- (It#12) ---`)

for (const d of obj) {
    console.log(d)
}

//--- pass break to iterables perform return() instead next()
console.log(`
--- (It#13) ---`)

for (const d of obj) {
    console.log(d)
    break;
}

//--- Defining custom iterator function from array, index in Iterators are stateful 
console.log(`
--- (It#14) ---`)

function makeIterator(array) {
    let nextIndex = 0;
    return {
        next() {
            return nextIndex < array.length
                ? {
                    value: array[nextIndex++],
                    done: false,
                }
                : {
                    done: true,
                };
        },
    };
}

const it = makeIterator(["a", "b"]);

console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().done);

//--- Defining an iterable property (Simple Class As Array with index)
console.log(`
--- (It#15) ---`)

class SimpleClassAsArray {
    #data;

    constructor(data) {
        this.#data = data;
    }

    [Symbol.iterator]() {
        // Use a new index for each iterator. This makes multiple
        // iterations over the iterable safe for non-trivial cases,
        // such as use of break or nested looping over the same iterable.
        let index = 0;

        return {
            // Note: using an arrow function allows `this` to point to the
            // one of `[@@iterator]()` instead of `next()`
            next: () => {
                if (index < this.#data.length) {
                    return { value: this.#data[index++], done: false };
                } else {
                    return { done: true };
                }
            },
        };
    }
}

const simple = new SimpleClassAsArray([1, 2, 3, 4, 5]);
console.log(Array.from(simple))

for (const val of simple) {
    console.log(val);
}

//--- You can redefine the iteration behavior by supplying our own @@iterator
console.log(`
--- (It#16) ---`)

// need to construct a String object explicitly to avoid auto-boxing
const someString = "hi";

console.log(1, typeof someString[Symbol.iterator]);

const iterator = someString[Symbol.iterator]();
console.log(2, `${iterator}`);

console.log(3, iterator.next());
console.log(4, iterator.next());
console.log(5, iterator.next());



//--- create createNodeIterator on dom.window.document - https://developer.mozilla.org/en-US/docs/Web/API/Document/createNodeIterator
console.log(`
--- (It#17) ---`);

let jdom = require('../Html/HtmlDom1.js');
const iterator3 = jdom.dom.window.document.createNodeIterator(jdom.dom.window.document);

let currentNode;
while ((currentNode = iterator3.nextNode())) {
    console.log(currentNode, currentNode.nodeName);
}

