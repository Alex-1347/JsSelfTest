//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

//--- syntax cases
console.log(`
--- (Fa#1) ---`)

// Traditional anonymous function
const a1 = (function (a) {
    return a + 100;
});

// 1. Remove the word "function" and place arrow between the argument and opening body brace
const a2 = (a) => {
    return a + 100;
};

// 2. Remove the body braces and word "return" — the return is implied.
const a3 = (a) => a + 100;

// 3. Remove the parameter parentheses
const a4 = a => a + 100;

console.log(a1(100), a2(100), a3(100), a4(100), a4())

//--- code inside braces ({}) is parsed as a sequence of statements, where foo is a label, not a key in an object literal. To fix this, wrap the object literal in parentheses:
console.log(`
--- (Fa#2) ---`)

const a6 = () => { foo: 1 };

// To fix this, wrap the object literal in parentheses:
const a5 = () => ({ foo: 1 });

console.log(a5(), a6())

//--- you may put the line break after the arrow or use parentheses/braces around the function body
console.log(`
--- (Fa#3) ---`)

const func1 = (a, b, c) =>
    1;

const func2 = (a, b, c) => (
    1
);

const func3 = (a, b, c) => {
    return 1;
};

const func4 = (
    a,
    b,
    c,
) => 1;

console.log(func1(1,2,3), func2(1,2,3),func3(1,2,3), func4(1,2,3))

//--- Arrow function expressions should only be used for non-method functions because they do not have their own this
console.log(`
--- (Fa#4) ---`)

"use strict";

const obj = {
    i: 10,
    b: () => console.log(this.i, this),
    c() {
        console.log(this.i, this);
    },
};

obj.b(); // logs undefined, Window { /* … */ } (or the global object)
obj.c(); // 10, { i: 10, b: [Function: b], c: [Function: c] }


//--- this inside the arrow function's body will correctly point to the instance (or the class itself, for static fields). However, because it is a closure, not the function's own binding, the value of this will not change based on the execution context
console.log(`
--- (Fa#5) ---`)

class C {
    a = 1;
    autoBoundMethod = () => {
        console.log(this.a);
    };
}

const c = new C();
c.autoBoundMethod(); // 1
const { autoBoundMethod } = c;
autoBoundMethod(); // 1
// If it were a normal method, it should be undefined in this case

//--- Arrow functions do not have their own arguments object.
console.log(`
--- (Fa#6) ---`)

function foo(n) {
    const f = () => arguments[0] + n; // foo's implicit arguments binding. arguments[0] is n
    return f();
}

console.log(foo(3)); // 3 + 3 = 6

//--- Cannot be used as constructors
console.log(`
--- (Fa#7) ---`)

const Foo = () => { };
try {
    const foo1 = new Foo(); // TypeError: Foo is not a constructor
} catch (error) {
    console.log(error)
}

console.log("prototype" in Foo); // false


//--- With arrow functions, function is essentially created on the globalThis (global) scope, it will assume this is the globalThis
console.log(`
--- (Fa#8) ---`)

const obj6 = {
    count: 10,
    doSomethingLater() {
        // The method syntax binds "this" to the "obj" context.
        setTimeout(() => {
            // Since the arrow function doesn't have its own binding and
            // setTimeout (as a function call) doesn't create a binding
            // itself, the "obj" context of the outer method is used.
            this.count++;
            console.log(this.count);
        }, 300);
    },
};

console.log(obj6.doSomethingLater()) // logs 11


//--- this on array.forEach with ordinary and arrow functions, all arrow functions lexically bind the this
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
console.log(`
--- (Fa#9) ---`);

class Counter {
    constructor() {
        this.sum = 0;
        this.count = 0;
    }
    add(array) {
        // Only function expressions have their own this bindings.
        array.forEach(function countEntry(entry) {
            this.sum += entry;
            ++this.count;
        }, this); //Cannot read properties of undefined (reading 'sum') without this
    }
}

const obj7 = new Counter();
obj7.add([2, 5, 9]);
console.log(1, obj7.count); // 3
console.log(2, obj7.sum); // 16

class Counter1 {
    constructor() {
        this.sum = 0;
        this.count = 0;
    }
    add(array) {
        // If passing the callback function used an arrow function expression, the thisArg parameter could be omitted, since all arrow functions lexically bind the this value. 
        array.forEach((entry) => {
            this.sum += entry;
            ++this.count;
        });
    }
}

const obj8 = new Counter1();
obj8.add([2, 5, 9]);
console.log(3, obj8.count); // 3
console.log(4, obj8.sum); // 16
