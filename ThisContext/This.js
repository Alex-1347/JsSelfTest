//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this


//--- What is this?
//In JavaScript, the this keyword refers to an object.
//Which object depends on how this is being invoked (used or called).
//The this keyword refers to different objects depending on how it is used:
//In an object method, this refers to the object.
//Alone, this refers to the global object.
//In a function, this refers to the global object.
//In a function, in strict mode, this is undefined.
//In an event, this refers to the element that received the event.
//Methods like call(), apply(), and bind() can refer this to any object.
//https://www.w3schools.com/JS/js_function_call.asp
console.log(`
--- (Ti#1) ---`)

console.log(this)


//--- (2) this in strict mode (compare result with StrictModeOff)
console.log(`
--- (Ti#2) ---`)

"use strict";// Enter strict mode
function fun() {
   return this;
}
console.log(fun() === undefined);
console.log(fun.call(2) === 2);
console.log(fun.apply(null) === null);
console.log(fun.call(undefined) === undefined);
console.log(fun.bind(true)() === true);


//--- (3) this will be a primitive value as well — but only if the function is in strict mode.
console.log(`
--- (Ti#3) ---`)

function getThisStrict() {
   "use strict";
   return this;
}

// Only for demonstration — you should not mutate built-in prototypes
Number.prototype.getThisStrict = getThisStrict;
console.log(typeof (1).getThisStrict()); // "number"


//--- (4) Callbacks are typically called with a this value of undefined (calling it directly without attaching it to any object), which means if the function is non–strict
console.log(`
--- (Ti#4) ---`)

function logThis() {
   "use strict";
   console.log(this);
}


[1, 2, 3].forEach(logThis);

//--- (5) Callbacks with parameters
console.log(`
--- (Ti#5) ---`);

[1, 2, 3].forEach(logThis, { name: "obj" });


//---(6) In arrow functions when evaluating an arrow function's body, the language does not create a new this binding
console.log(`
--- (Ti#6) ---`);

const globalThis = this;
const foo = () => this;
console.log(foo() === globalThis); // true


//--- (7) In arrow function this is bound to what it was when the function was created
console.log(`
--- (Ti#7) ---`);

const obj = { name: "obj" };

// Attempt to set this using call
console.log(foo.call(obj) === globalThis); // true

// Attempt to set this using bind
const boundFoo = foo.bind(obj);
console.log(boundFoo() === globalThis); // true

//---(8) bind() method has to be used to prevent losing this.
//https://www.w3schools.com/JS/js_function_bind.asp
console.log(`
--- (Ti#8) ---`);

const person = {
   firstName: "John",
   lastName: "Doe",
   display: function () {
      let x = "demo";
      console.log(this.firstName + " " + this.lastName)
   }
}

person.display()
setTimeout(person.display, 1000);

//---(9) this with a getter or setter
console.log(`
--- (Ti#9) ---`);

function sum() {
   return this.a + this.b + this.c;
}

const o = {
   a: 1,
   b: 2,
   c: 3,
   get average() {
      return (this.a + this.b + this.c) / 3;
   },
};

Object.defineProperty(o, "sum", {
   get: sum,
   enumerable: true,
   configurable: true,
});

console.log(o.average, o.sum); // 2 6


//-- about globalThis https://mathiasbynens.be/notes/globalthis


