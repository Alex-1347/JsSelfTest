let T = require('./tracePrototypeChainOf.js');
//--- (1) super (MyBase in VB)
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super#calling_methods_from_super
console.log(`
--- (Sp#1) ---`)


class Base {
    static getName() {
        console.log(this.name);
    }
}

class Extended extends Base {
    static getName() {
        super.getName();
    }
}

Extended.getName();
const Z = new Extended

console.log(T.tracePrototypeChainOf(Z))

//--- (2) Setting super.prop sets the property on this instead
console.log(`
--- (Sp#2) ---`)

class A { }
class B extends A {
    setX() {
        super.x = 1;
    }
}

const b = new B();
b.setX();
console.log(b); // B { x: 1 }
console.log(Object.hasOwn(b, "x")); // true

//--- (3)  non-writable property
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super#calling_methods_from_super
console.log(`
--- (Sp#3) ---`)

class X {
    constructor() {
        // Create a non-writable property
        Object.defineProperty(this, "prop", {
            configurable: true,
            writable: false,
            value: 1,
        });
    }
}

class Y extends X {
    constructor() {
        super();
    }
    foo() {
        try {
            super.prop = 2; // Cannot overwrite the value.
        } catch (error) {
            console.log(error)
        }

    }
}

const y = new Y();
try {
    y.foo(); // TypeError: "prop" is read-only
} catch (error) {
    console.log(error)
}

console.log(y.prop); // 1

//--- (4) ReferenceError to super constructor
console.log(`
--- (Sp#4) ---`)

class Base1 { }
class Good extends Base1 { }
class AlsoGood extends Base1 {
    constructor() {
        return { a: 5 };
    }
}
class Bad extends Base1 {
    constructor() { }
}
class SuperGood extends Base1 {
    constructor() {
        super();
    }
}

const g = new Good();
const g1 = new AlsoGood();
const g2 = new SuperGood();

console.log(T.tracePrototypeChainOf(g))
console.log(T.tracePrototypeChainOf(g1))
console.log(T.tracePrototypeChainOf(g2))

try {
    const g3 = new Bad(); // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
} catch (error) {
    console.log(error)
}
