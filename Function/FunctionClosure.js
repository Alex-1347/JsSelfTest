//---   Nested Functions and closure, see more in Closure
console.log(`
--- (Fc#1) ---`);

function add() {
    let counter = 0;
    function plus() { counter += 1; }
    plus();
    return counter;
}
console.log(add(), add(), add());

//--- closure on self-invoking functions (arrow function working in global context)
console.log(`
--- (Fc#2) ---`);

const Add = (function () {
    let counter = 0;
    return function () { counter += 1; return counter }
})();


console.log(Add(), Add(), Add())

//---  This point to global context in arrow function
console.log(`
--- (Fc#3) ---`);

const selfInvoking = (function () {
    let counter = 0;
    console.log(counter, this)
    return function () { counter += 1; return counter }
})();

console.log(Add(), Add(), Add())


//--- arrow function fn2()() === globalThis is true in non-strict mode
console.log(`
--- (Fc#4) ---`);

const obj3 = {
    getThisGetter() {
        const getter = () => this;
        return getter;
    },
};

const fn1 = obj3.getThisGetter();
console.log(fn1() === obj3); // true

const fn2 = obj3.getThisGetter;
console.log(fn2()() === globalThis); // true in non-strict mode


//--- Nested functions and closures
console.log(`
--- (Fc#5) ---`);

function outside(x) {
    function inside(y) {
        return x + y;
    }
    return inside;
}

const fnInside = outside(3); // Think of it like: give me a function that adds 3 to whatever you give it
console.log(fnInside(5));    // 8

console.log(outside(4)(5));  // 9

//--- Name conflict in Closure
console.log(`
--- (Fc#6) ---`);

function outside() {
    const x = 5;
    function inside(x) {
        return x * 2;
    }
    return inside;
}

console.log(outside()(10)); // 20 (instead of 10)
