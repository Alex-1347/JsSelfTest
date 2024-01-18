//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
let X = require('./tracePrototypeChainOf.js');

//--- objects, defining constructor and check prototype chain with instanceof 
console.log(`
--- (Tn#1) ---`)

// defining constructors
function C() { }
function D() { }

const o1 = new C();

console.log(1, o1 instanceof C); // true, because: Object.getPrototypeOf(o) === C.prototype
console.log(2, o1 instanceof D); // false, because D.prototype is nowhere in o's prototype chain

console.log(3, o1 instanceof Object); // true, because:
console.log(4, C.prototype instanceof Object); // true

//--- Re-assign `constructor.prototype` (you should  rarely do this in practice) and check prototype chain with instanceof 
console.log(`
--- (Tn#2) ---`)

C.prototype = {};
const o2 = new C();

console.log(1, o2 instanceof C); // true

console.log(2, o1 instanceof C); // false, because C.prototype is nowhere in  o's prototype chain anymore

D.prototype = new C(); // add C to [[Prototype]] linkage of D
const o3 = new D();

console.log(3, o3 instanceof D); // true
console.log(4, o3 instanceof C); // true since C.prototype is now in o3's prototype chain

//--- string leieral vs String object
console.log(`
--- (Tn#3) ---`)

const literalString = "This is a literal string";
const stringObject = new String("String created with constructor");

console.log(1, literalString instanceof String); // false, string primitive is not a String
console.log(2, stringObject instanceof String); // true

console.log(3, literalString instanceof Object); // false, string primitive is not an Object
console.log(4, stringObject instanceof Object); // true

console.log(5, stringObject instanceof Date); // false

//--- Objects created using Object.create() and check instanceof
console.log(`
--- (Tn#4) ---`)

// defining constructor
function Shape() { }

function Rectangle() {
    Shape.call(this);       // call super constructor.
}

Rectangle.prototype = Object.create(Shape.prototype);

Rectangle.prototype.constructor = Rectangle;

const rect = new Rectangle();

console.log(1, rect instanceof Object); // true
console.log(2, rect instanceof Shape); // true
console.log(3, rect instanceof Rectangle); // true
console.log(4, rect instanceof String); // false

console.log(5, X.tracePrototypeChainOf(rect))

//--- Object with null prototype
console.log(`
--- (Tn#5) ---`)

const literalObject = {};
const nullObject = Object.create(null);
nullObject.name = "My object";

console.log(1, literalObject instanceof Object); // true, every object literal has Object.prototype as prototype
console.log(2, ({}) instanceof Object); // true, same case as above
console.log(3, nullObject instanceof Object); // false, prototype is end of prototype chain (null)


//--- Overriding the behavior of instanceof - static [Symbol.hasInstance] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#overriding_the_behavior_of_instanceof
console.log(`
--- (Tn#6) ---`)

class Cl {
    #value = "foo";

    static [Symbol.hasInstance](x) {
        return #value in x;
    }

    static getValue(x) {
        return x.#value;
    }
}

const x = { __proto__: Cl.prototype };

if (x instanceof Cl) {
    console.log(Cl.getValue(x));    // Doesn't run, because x is not a Cl
}
console.log(X.tracePrototypeChainOf(x))

//--- extends class with custom  instanceof method and check class chain
console.log(`
--- (Tn#7) ---`)

class A {
    #value = "foo";

    static [Symbol.hasInstance](x) {
        return this === A && #value in x;
    }
}

class E extends A { }
console.log(1, new A() instanceof E); // false
console.log(2, new A() instanceof A); // true
console.log(3, { __proto__: A.prototype } instanceof A); // false
