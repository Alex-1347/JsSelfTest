// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

//--- common Object syntax and initializer https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
console.log(`
--- (Ob#1) ---`)

let expression = [1, 2], prototype = [3, 4], spreadProperty = [5, 6]

obj4 = {
    a: "foo",
    b: 42,
    c: {},
    1: "number literal property",
    "foo:bar": "string literal property",

    shorthandProperty() { },

    method(parameters) {
        // …
    },

    get property() { },
    set property(value) { },

    [expression]: "computed property",

    __proto__: prototype,

    ...spreadProperty,
};

console.log(obj4, obj4.length)


//--- you should directly call() the Object.prototype method on your target object instead, to prevent the object from having an overriding property that produces unexpected results.
console.log(`
--- (Ob#2) ---`)

const obj = {
    foo: 1,
    // You should not define such a method on your own object,
    // but you may not be able to prevent it from happening if
    // you are receiving the object from external input
    propertyIsEnumerable() {
        return false;
    },
};

console.log(obj.propertyIsEnumerable("foo"));
console.log(Object.prototype.propertyIsEnumerable.call(obj, "foo"));


//--- (3) create object from NULL prototype with Object.create(null)
console.log(`
--- (Ob#3) ---`)

const normalObj = {}; // create a normal object
const nullProtoObj = Object.create(null); // create an object with "null" prototype

console.log(`normalObj is: ${normalObj}`); // shows "normalObj is: [object Object]"
try {
    console.log(`nullProtoObj is: ${nullProtoObj}`); // throws error: Cannot convert object to primitive value
} catch (e) {
    console.log(e.message + '\n' + e.stack)
}

console.log(normalObj.valueOf());
try {
    nullProtoObj.valueOf();
} catch (e) {
    console.log(e.message + '\n' + e.stack)
}

console.log(normalObj.hasOwnProperty("p"));
try {
    nullProtoObj.hasOwnProperty("p");
} catch (e) {
    console.log(e.message + '\n' + e.stack)
}

console.log(normalObj.constructor);
console.log(nullProtoObj.constructor);

nullProtoObj.toString = Object.prototype.toString;

console.log(nullProtoObj.toString());
console.log(`nullProtoObj is: ${nullProtoObj}`);

//--- (4) creating from NULL prototype can be interesting, this function working wrong
console.log(`
--- (Ob#4) ---`)

let ages = { alice: 18, bob: 27 };

function hasPerson(name) {
    return name in ages;
}

function getAge(name) {
    return ages[name];
}

console.log(hasPerson("hasOwnProperty"));
console.log(getAge("toString"));

//--- (5) but this working correctly
console.log(`
--- (Ob#5) ---`)

ages = Object.create(null, {
    alice: { value: 18, enumerable: true },
    bob: { value: 27, enumerable: true },
});

console.log(hasPerson("hasOwnProperty"));
console.log(getAge("toString"));

//--- (6) Making your sensitive object not inherit from Object.prototype also prevents prototype pollution attacks. 
console.log(`
--- (Ob#6) ---`)

const user = {};

Object.prototype.authenticated = true; // A malicious script:

// Unexpectedly allowing unauthenticated user to pass through
if (user.authenticated) {
    // access confidential data
}

//--- (7) Constructing empty objects
console.log(`
--- (Ob#7) ---`)

const o1 = new Object();
const o2 = new Object(undefined);
const o3 = new Object(null);

//--- (8) create Boolean objects
console.log(`
--- (Ob#8) ---`)

let o = new Object(true);
o = new Object(Boolean()); // the same declaration

//--- (9) Modifying the object prototype property 
console.log(`
--- (Ob#9) ---`)

const current = Object.prototype.valueOf;

// Since my property "-prop-value" is cross-cutting and isn't always
// on the same prototype chain, I want to modify Object.prototype:
Object.prototype.valueOf = function (...args) {
    if (Object.hasOwn(this, "-prop-value")) {
        return this["-prop-value"];
    } else {
        // It doesn't look like one of my objects, so let's fall back on
        // the default behavior by reproducing the current behavior as best we can.
        // The apply behaves like "super" in some other languages.
        // Even though valueOf() doesn't take arguments, some other hook may.
        return current.apply(this, args);
    }
};

//--- (10) get keys and value from Object
console.log(`
--- (Ob#10) ---`)

var obj2 = [{
    "1": "one"
}, {
    "2": "two"
}]
obj2.forEach(function (item) {
    Object.keys(item).forEach(function (key) {
        console.log("key:" + key + "value:" + item[key]);
    });
});


//--- (11) JSON Indented format (usefull function)
console.log(`
--- (Ob#11) ---`)

var jsObj =
{
    abc: "hello",
    bca: "allo",
    cab: "dd:cc",
    d: ["hello", "llo", "dd:cc"],
    e: { abc: "hello", bca: "allo", cab: "dd:cc" }
};

function format(obj) {
    var str = JSON.stringify(obj, 0, 4),
        arr = str.match(/".*?":/g);

    for (var i = 0; i < arr.length; i++)
        str = str.replace(arr[i], arr[i].replace(/"/g, ''));

    return str;
}

console.log(format(jsObj));


//--- (12) Detecting an undefined object property with hasOwnProperty or with ====
console.log(`
--- (Ob#12) ---`)

console.log(jsObj.e === undefined)
console.log(jsObj.f === undefined)

console.log(!jsObj.hasOwnProperty('e'))
console.log(!jsObj.hasOwnProperty('f'))

//--- (13) object methods create/defineProperty/getOwnPropertyDescriptor/getOwnPropertyNames/getPrototypeOf/keys https://www.w3schools.com/JS/js_object_es5.asp
console.log(`
--- (Ob#13) ---`)

// Create object with an existing object as prototype
const j1 = Object.create(jsObj)
console.log('j1', j1)

// Adding or changing an object property
const j2 = Object.defineProperty(jsObj, "sum", {
    enumerable: true,
    configurable: true,
}, 'description');
console.log('j2', j2)

// Adding or changing object properties
const j3 = Object.defineProperties(jsObj, {
    property1: {
        value: 42,
        writable: true,
    },
    property2: {},
});
console.log('j3', j3)

// Accessing Properties
const j4 = Object.getOwnPropertyDescriptor(jsObj, "sum")
console.log('j4', j4)

// Returns all properties as array
const j5 = Object.getOwnPropertyNames(jsObj)
console.log('j5', j5)

// Accessing the prototype
const j6 = Object.getPrototypeOf(jsObj)
console.log('j6', j6)

// Returns enumerable properties as an array
const j7 = Object.keys(jsObj)
console.log('j7', j7)

//--- (14) protection object methods preventExtensions/isExtensible/seal/isSealed/freeze/isFrozen   https://www.w3schools.com/JS/js_object_es5.asp
console.log(`
--- (Ob#14) ---`)

// Prevents adding properties to an object
console.log(Object.preventExtensions(jsObj))

// Returns true if properties can be added to an object
console.log(Object.isExtensible(jsObj))

// Prevents changes of object properties (not values)
console.log(Object.seal(jsObj))

// Returns true if object is sealed
console.log(Object.isSealed(jsObj))

// Prevents any changes to an object
console.log(Object.freeze(jsObj))

// Returns true if object is frozen
console.log(Object.isFrozen(jsObj))

//--- serialise Obj with circular reference
console.log(`
--- (Ob#15) ---`)
globalThis.p = 5;  //define something variable

const CircularJSON = require('circular-json');
var serializedGlobalThis = CircularJSON.stringify(globalThis, null, 4);

console.log(1, serializedGlobalThis)
// and compare what print JS engine
console.log(2, globalThis)

