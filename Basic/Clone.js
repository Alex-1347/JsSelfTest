//https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy


//--- Shallow_copy - object is a copy whose properties share the same references
console.log(`
--- (Cl#1) ---`)

const one = ["noodles", { list: ["eggs", "flour", "water"] }];

const two = Array.from(one);
console.log(two);

two[1].list = ["rice", "water"];

console.log(one);

//--- deep clone with structuredClone and Object.assign() - https://developer.mozilla.org/en-US/docs/Web/API/structuredClone 
console.log(`
--- (Cl#2) ---`)

// Create an object with a value and a circular reference to itself.
const original = { name: "MDN" };
original.itself = original;

// Clone it
const clone = structuredClone(original);

console.log(clone !== original); // the objects are not the same (not same identity)
console.log(clone.name === "MDN"); // they do have the same values
console.log(clone.itself === clone); // and the circular reference is preserved


//--- Transferring values = clone an array and transfer its underlying resources to the new object. On return, the original uInt8Array.buffer will be cleared
console.log(`
--- (Cl#3) ---`)

const uInt8Array = Uint8Array.from({ length: 1024 * 1024 * 16 }, (v, i) => i); // 16MB = 1024 * 1024 * 16

const transferred = structuredClone(uInt8Array, {
    transfer: [uInt8Array.buffer],
});

console.log(uInt8Array.byteLength); // 0

//--- use ArrayBuffer and then clone the object it is a member of, transferring the buffer.
console.log(`
--- (Cl#4) ---`)

// Create an ArrayBuffer with a size in bytes
const buffer1 = new ArrayBuffer(16);

const object1 = {
    buffer: buffer1,
};

// Clone the object containing the buffer, and transfer it
const object2 = structuredClone(object1, { transfer: [buffer1] });

// Create an array from the cloned buffer
const int32View2 = new Int32Array(object2.buffer);
int32View2[0] = 42;
console.log(int32View2[0]);

try {
    // Creating an array from the original buffer throws a TypeError
    const int32View1 = new Int32Array(object1.buffer);
} catch (error) {
    console.log(error)
}


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
//--- Object.assign() copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object. 
console.log(`
--- (Cl#5) ---`)

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);// Expected output: true


//--- But can not use for deep clone like structuredClone() If the source value is a reference to an object, it only copies the reference value.
console.log(`
--- (Cl#6) ---`)

const obj1 = { a: 0, b: { c: 0 } };
const obj2 = Object.assign({}, obj1);
console.log(obj2); // { a: 0, b: { c: 0 } }

obj1.a = 1;
console.log(obj1); // { a: 1, b: { c: 0 } }
console.log(obj2); // { a: 0, b: { c: 0 } }

obj2.a = 2;
console.log(obj1); // { a: 1, b: { c: 0 } }
console.log(obj2); // { a: 2, b: { c: 0 } }

obj2.b.c = 3;
console.log(obj1); // { a: 1, b: { c: 3 } }
console.log(obj2); // { a: 2, b: { c: 3 } }

// Deep Clone
const obj3 = { a: 0, b: { c: 0 } };
const obj4 = structuredClone(obj3);
obj3.a = 4;
obj3.b.c = 4;
console.log(obj4); // { a: 0, b: { c: 0 } }


//--- Copying symbol-typed properties
console.log(`
--- (Cl#7) ---`)

const o1 = { a: 1 };
const o2 = { [Symbol("foo")]: 2 };

const obj = Object.assign({}, o1, o2);
console.log(obj); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
Object.getOwnPropertySymbols(obj); // [Symbol(foo)]


//--- Copying accessors
console.log(`
--- (Cl#8) ---`)

const obj10 = {
    foo: 1,
    get bar() {
        return 2;
    },
};

let copy = Object.assign({}, obj10);
console.log(copy);
// { foo: 1, bar: 2 }
// The value of copy.bar is obj.bar's getter's return value.

// This is an assign function that copies full descriptors
function completeAssign(target, ...sources) {
    sources.forEach((source) => {
        const descriptors = Object.keys(source).reduce((descriptors, key) => {
            descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
            return descriptors;
        }, {});

        // By default, Object.assign copies enumerable Symbols, too
        Object.getOwnPropertySymbols(source).forEach((sym) => {
            const descriptor = Object.getOwnPropertyDescriptor(source, sym);
            if (descriptor.enumerable) {
                descriptors[sym] = descriptor;
            }
        });
        Object.defineProperties(target, descriptors);
    });
    return target;
}

copy = completeAssign({}, obj10);
console.log(copy);
// { foo:1, get bar() { return 2 } }

//--- alternate way to deap copy on Ar#40 (JSON)