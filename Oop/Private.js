//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
//private class members can be created by using a hash # prefix:
//Private fields
//Private methods
//Private static fields
//Private static methods
//Private getters
//Private setters
//Private static getters
//Private static setters


//--- (1) You can use the in operator to check whether an externally defined object possesses a private property.
console.log(`
--- (Pv#1) ---`);

class C {
    #x;
    constructor(x) {
        this.#x = x;
    }
    static getX(obj) {
        if (#x in obj) return obj.#x;
        return "obj must be an instance of C";
    }
}
console.log(C.getX(new C("foo")));       // "foo"
console.log(C.getX(new C(0.196)));       // 0.196
console.log(C.getX(new C(new Date())));  // the current date and time
console.log(C.getX({}));                 // "obj must be an instance of C"

//--- (2) #privateField from the ClassWithPrivateField base class is private to ClassWithPrivateField and is not accessible from the derived Subclass
console.log(`
--- (Pv#2) ---`);

class ClassWithPrivateField {
    #privateField;
    constructor() {
        this.#privateField = 42;
    }
    get getPrivateField() {
        return `${this.#privateField}🛑`;
    }

}

class Subclass extends ClassWithPrivateField {
    #subPrivateField;
    constructor() {
        super();
        this.#subPrivateField = 23;
    }
    get getSubPrivateField() {
        return `${this.#subPrivateField}🎬`;
    }
}

const S = new Subclass(); // In some dev tools, it shows Subclass {#privateField: 42, #subPrivateField: 23}
console.log(S.getPrivateField, S.getSubPrivateField)

//--- (3) A class's constructor can return a different object, which will be used as the new this for the derived class constructor. 
console.log(`
--- (Pv#3) ---`);

class ClassWithPrivateStaticField {
    static #privateStaticField = 42;

    static publicStaticMethod() {
        // When invoked through super, `this` still refers to Subclass
        return this.#privateStaticField;
    }
}

class Subclass1 extends ClassWithPrivateStaticField {
    static callSuperMethod() {
        return super.publicStaticMethod();
    }
}

try {
    Subclass1.callSuperMethod(); // TypeError: Cannot read private member #privateStaticField from an object whose class did not declare it
} catch (error) {
    console.log(error)
}

//--- (4) Simulating private constructors
// Many other languages include the capability to mark a constructor as private, which prevents the class from being instantiated outside of the class itself
// JavaScript does not have a native way to do this, but it can be accomplished by using a private static flag.
console.log(`
--- (Pv#4) ---`);

class PrivateConstructor {
    static #isInternalConstructing = false;

    constructor() {
        if (!PrivateConstructor.#isInternalConstructing) {
            throw new TypeError("PrivateConstructor is not constructable");
        }
        PrivateConstructor.#isInternalConstructing = false;
        // More initialization logic
    }
    static create() {
        PrivateConstructor.#isInternalConstructing = true;
        const instance = new PrivateConstructor();
        return instance;
    }
}
try {
    new PrivateConstructor();    // TypeError: PrivateConstructor is not constructable
} catch (error) {
    console.log(error)
}

PrivateConstructor.create(); // PrivateConstructor {}


