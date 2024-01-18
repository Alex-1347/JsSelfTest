//--- Using call, bind, and apply - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#using_call_bind_and_apply
console.log(`
--- (Fb#1) ---`)

const obj5 = {
    num: 100,
};

// Setting "num" on globalThis to show how it is NOT used.
globalThis.num = 42;

// A simple traditional function to operate on "this"
const add = function (a, b, c) {
    return this.num + a + b + c;
};

console.log(add.call(obj5, 1, 2, 3)); // 106
console.log(add.apply(obj5, [1, 2, 3])); // 106
const boundAdd = add.bind(obj5);
console.log(boundAdd(1, 2, 3)); // 106

//--- Function Borrowing with the bind() method, an object can borrow a method from another object. https://www.w3schools.com/JS/js_function_bind.asp 
//--- creates a bound function that has the same body as the original function. The this object of the bound function is associated with the specified object, and has the specified initial parameters.
console.log(`
--- (Fb#2) ---`);

const person = {
    firstName: "John",
    lastName: "Doe",
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}

const member = {
    firstName: "Hege",
    lastName: "Nilsen",
}

let fullName = person.fullName.bind(member);

console.log(fullName)

const person1 = {
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}

//--- Call() //https://www.w3schools.com/JS/js_function_call.asp
console.log(`
--- (Fb#3) ---`);

console.log(person.fullName.call(member))

//--- Call with parameters
console.log(`
--- (Fb#4) ---`);

const person2 = {
    fullName: function (city, country) {
        return this.firstName + " " + this.lastName + "," + city + "," + country;
    }
}

console.log(person2.fullName.call(member, "Oslo", "Norway"));

//--- apply()
//The call() method takes arguments separately.
//The apply() method takes arguments as an array.
console.log(`
--- (Fb#5) ---`);

console.log(person2.fullName.call(member, ["Oslo", "Norway"]));

//--- apply can used for calculate Max Method on Arrays
console.log(`
--- (Fb#6) ---`);

console.log(Math.max.apply(null, [1, 2, 3]));
console.log(Math.max.apply(Math, [1, 2, 3]));
console.log(Math.max.apply('', [1, 2, 3]));


//--- Using call() and apply(), you can pass the value of this as if it's an explicit parameter. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
console.log(`
--- (Fb#7) ---`);

function add1(c, d) {
    return this.a + this.b + c + d;
}

const o = { a: 1, b: 3 };

// The first argument is bound to the implicit 'this' parameter; the remaining
// arguments are bound to the named parameters.
console.log(add1.call(o, 5, 7)); // 16

// The first argument is bound to the implicit 'this' parameter; the second
// argument is an array whose members are bound to the named parameters.
console.log(add1.apply(o, [10, 20])); // 34


//--- f.bind(someObject) creates a new function with the same body and scope as f,
console.log(`
--- (Fb#8) ---`);

function f() {
    return this.a;
}

const g = f.bind({ a: "azerty" });
console.log(g()); // azerty

const h = g.bind({ a: "yoo" }); // bind only works once!
console.log(h()); // azerty

const o1 = { a: 37, f, g, h };
console.log(o1.a, o1.f(), o1.g(), o1.h()); // 37 37 azerty azerty
