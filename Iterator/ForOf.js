//The for...of statement executes a loop that operates on a sequence of values sourced from an iterable object.
//Iterable objects include instances of built-ins such as Array, String, TypedArray, Map, Set, NodeList (and other DOM collections), as well as the arguments object, generators produced by generator functions, and user-defined iterables.

//--- Iterating over an Array
console.log(`
--- (Ff#1) ---`);

const iterableArr1 = [10, 20, 30];

for (const value of iterableArr1) {
    console.log(value);
}

//--- Iterating over a string
console.log(`
--- (Ff#2) ---`);
const iterableStr1 = "boo";

for (const value of iterableStr1) {
    console.log(value);
}

//--- Iterating over a TypedArray
console.log(`
--- (Ff#3) ---`);

const iterableTyped1 = new Uint8Array([0x00, 0xff]);

for (const value of iterableTyped1) {
    console.log(value);
}

//--- Iterating over a Map
console.log(`
--- (Ff#4) ---`);

const iterableMap1 = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
]);

for (const entry of iterableMap1) {
    console.log(entry);
}
for (const [key, value] of iterableMap1) {
    console.log(value);
}

//--- Iterating over a Set
console.log(`
--- (Ff#5) ---`);

const iterableSet1 = new Set([1, 1, 2, 2, 3, 3]);

for (const value of iterableSet1) {
    console.log(value);
}

//--- Iterating over the arguments object
console.log(`
--- (Ff#6) ---`);

function foo() {
    for (const value of arguments) {
        console.log(value);
    }
}

foo(1, 2, 3);

//--- Iterating over a NodeList - dom.window.document.querySelectorAll 
console.log(`
--- (Ff#7) ---`);

let jsdom = require ('../Html/HtmlDom1.js');
const Divs = jsdom.dom.window.document.querySelectorAll("div");

for (const one of Divs) {
    console.log(one.outerHTML)
}

//<div id="1">a</div>
//<div id="2">b</div>


//--- Iterating over a user-defined iterable - Iterating over an object with an @@iterator [Symbol.iterator]() method that returns a custom iterator
console.log(`
--- (Ff#8) ---`);

const iterableList1 = {
    [Symbol.iterator]() {
        let i = 1;
        return {
            next() {
                if (i <= 3) {
                    return { value: i++, done: false };
                }
                return { value: undefined, done: true };
            },
        };
    },
};

for (const value of iterableList1) {
    console.log(value);
}

//--- Iterating over an object with an @@iterator generator method *[Symbol.iterator]()
console.log(`
--- (Ff#9) ---`);

const iterableList2 = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    },
};

for (const value of iterableList2) {
    console.log(value);
}


//--- Iterable iterators (iterators with a [@@iterator]() method that returns this) are a fairly common technique to make iterators usable for for...of
console.log(`
--- (Ff#10) ---`);

let i = 1;

const iteratorList3 = {
    next() {
        if (i <= 3) {
            return { value: i++, done: false };
        }
        return { value: undefined, done: true };
    },
    [Symbol.iterator]() {
        return this;
    },
};

for (const value of iteratorList3) {
    console.log(value);
}


//--- Iterating over a generator function*
console.log(`
--- (Ff#11) ---`);

function* source1() {
    yield 1;
    yield 2;
    yield 3;
  }
  
  const generator1 = source1();
  
  for (const value of generator1) {
    console.log(value);
  }

 //--- Execution of the break statement in the first loop causes it to exit early. The iterator is not finished yet, so the second loop will continue from where the first one stopped at.
 console.log(`
--- (Ff#12) ---`);

const source2 = [1, 2, 3];

const iterator2 = source2[Symbol.iterator]();

for (const value of iterator2) {
  console.log(value);
  if (value === 1) {
    break;
  }
  console.log("This string will not be logged.");
}
// 1

// Another loop using the same iterator
// picks up where the last loop left off.
for (const value of iterator2) {
  console.log(value);
}
// 2
// 3

// The iterator is used up.
// This loop will execute no iterations.
for (const value of iterator2) {
  console.log(value);
}

//--- Difference between for...of and for...in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of#difference_between_for...of_and_for...in
console.log(`
--- (Ff#13) ---`);

Object.prototype.objCustom = function () {};
Array.prototype.arrCustom = function () {};

const iterable = [3, 5, 7];
iterable.foo = "hello";

for (const i in iterable) {
  console.log(i);
}
// "0", "1", "2", "foo", "arrCustom", "objCustom"

for (const i in iterable) {
  if (Object.hasOwn(iterable, i)) {
    console.log(i);
  }
}
// "0" "1" "2" "foo"

for (const i of iterable) {
  console.log(i);
}
// 3 5 7