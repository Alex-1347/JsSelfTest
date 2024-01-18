//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
let X = require ('./tracePrototypeChainOf.js');

//--- (1) Objects 
console.log(`
--- (Pt#1) ---`)

const o = { a: 1 };
console.log(X.tracePrototypeChainOf(o))
// The newly created object o has Object.prototype as its [[Prototype]]
// Object.prototype has null as its prototype.
// o ---> Object.prototype ---> null

//--- (2) Array
console.log(`
--- (Pt#2) ---`)

const e = ["yo", "whadup", "?"];
// Arrays inherit from Array.prototype
// (which has methods indexOf, forEach, etc.)
// b ---> Array.prototype ---> Object.prototype ---> null
console.log(X.tracePrototypeChainOf(e))

//--- (3) Function
console.log(`
--- (Pt#3) ---`)

function f() {
    return 2;
}
// Functions inherit from Function.prototype
// (which has methods call, bind, etc.)
// f ---> Function.prototype ---> Object.prototype ---> null
console.log(X.tracePrototypeChainOf(f))

//--- (4) Constructor
console.log(`
--- (Pt#4) ---`)

function Constructor() { }
const obj1 = new Constructor();
// obj ---> Constructor.prototype ---> Object.prototype ---> null
console.log(X.tracePrototypeChainOf(obj1))

//--- (5) Access to prototype getPrototypeOf/setPrototypeOf, __proto__ keyword
console.log(`
--- (Pt#5) ---`)

const p = { e: 2, __proto__: o };
// It is possible to point the newly created object's [[Prototype]] to
// another object via the __proto__ literal property. 
// (Not to be confused with Object.prototype.__proto__ accessors)
// p ---> o ---> Object.prototype ---> null
console.log(Object.getPrototypeOf(p))
console.log(X.tracePrototypeChainOf(p))

//--- (6) set prototype using Object.create
console.log(`
--- (Pt#6) ---`)

const personPrototype = {
    greet() {
        console.log("hello!");
    }
};
const carl = Object.create(personPrototype);
console.log(carl.greet())

//--- (7) Using a prototype constructor with Object.assign
console.log(`
--- (Pt#7) ---`)

function Person(name) {
    this.name = name;
}
Object.assign(Person.prototype, personPrototype);

const reuben = new Person("Reuben");
console.log(reuben.greet())

//--- (8) Own property
console.log(`
--- (Pt#8) ---`)

const irma = new Person("Irma");

console.log(Object.hasOwn(irma, "name")); // true
console.log(Object.hasOwn(irma, "greet"));
console.log(X.tracePrototypeChainOf(reuben))
console.log(X.tracePrototypeChainOf(irma))

//--- (9) To build longer prototype chains, we can set the [[Prototype]] of Constructor.prototype via the Object.setPrototypeOf() function.
console.log(`
--- (Pt#9) ---`)

function Base() { }
function Derived() { }
// Set the `[[Prototype]]` of `Derived.prototype` to `Base.prototype`
Object.setPrototypeOf(Derived.prototype, Base.prototype);

Base.prototype.foo = "bar";
const BaseInstance = new Base();
Base.prop = "some value";
console.log(X.tracePrototypeChainOf(Base))
console.log("BaseInstancing.prop:", BaseInstance.prop);
console.log("BaseInstancing.foo: ", BaseInstance.foo);
console.log("Base.prop:          ", Base.prop);
console.log("Base.foo:           ", Base.foo);
console.log("Base.prototype.prop:", Base.prototype.prop);
console.log("Base.prototype.foo: ", Base.prototype.foo);
console.log('')

const obj = new Derived();
// obj ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null

console.log(X.tracePrototypeChainOf(Derived))
console.log("Derived.prop:          ", Derived.prop);
console.log("Derived.foo:           ", Derived.foo);
console.log("Derived.prototype.prop:", Derived.prototype.prop);
console.log("Derived.prototype.foo: ", Derived.prototype.foo);

//--- (10) In class terms, this is equivalent to using the extends syntax.
console.log(`
--- (Pt#10) ---`)

class Base1 { }
class Derived1 extends Base1 { }

const obj2 = new Derived1();
// obj ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null
console.log(X.tracePrototypeChainOf(Base1))
console.log(X.tracePrototypeChainOf(Derived1))
console.log(X.tracePrototypeChainOf(obj2))

//--- (11) With constructor functions
console.log(`
--- (Pt#11) ---`)

function Graph() {
    this.vertices = [];
    this.edges = [];
}

Graph.prototype.addVertex = function (v) {
    this.vertices.push(v);
};

const g = new Graph();
// g is an object with own properties 'vertices' and 'edges'.
// g.[[Prototype]] is the value of Graph.prototype when new Graph() is executed.

g.addVertex(5)
g.addVertex(10)
console.log(g.vertices)

//--- (12) Object.create() creates a new object. The [[Prototype]] of this object is the first argument of the function:
console.log(`
--- (Pt#12) ---`)

const a = { a: 1 };
// a ---> Object.prototype ---> null

const b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (inherited)

const c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null
console.log(c);

const d = Object.create(null);
// d ---> null (d is an object that has null directly as its prototype)
console.log(d.hasOwnProperty);
// undefined, because d doesn't inherit from Object.prototype
console.log(X.tracePrototypeChainOf(a))
console.log(X.tracePrototypeChainOf(b))
console.log(X.tracePrototypeChainOf(c))
console.log(X.tracePrototypeChainOf(d))

//--- (13) The instanceof operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object
console.log(`
--- (Pt#13) ---`)

function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// Expected output: true

console.log(auto instanceof Object);
  // Expected output: true



