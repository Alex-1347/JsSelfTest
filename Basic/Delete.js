// Delete operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete

//--- (1) delete and the prototype chain
console.log(`
--- (Dl#1) ---`);

function Foo() {
    this.bar = 10;
}

Foo.prototype.bar = 42;

const foo = new Foo();

console.log(foo.bar); // 10

delete foo.bar; // returns true

// foo.bar is still available in the prototype chain.
console.log(foo.bar); // 42

// Delete the property on the prototype.
delete Foo.prototype.bar; // returns true

// The "bar" property can no longer exist
console.log(foo.bar); // undefined

//--- (2) delete global this (don't working in strict mode) htps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete#deleting_global_properties
console.log(`
--- (Dl#2) ---`);

// Since "nameOther" is added using with the  var keyword, it is marked as non-configurable
var nameOther = "XYZ";

// We can access this global property using:
console.log(Object.getOwnPropertyDescriptor(globalThis, "nameOther"));
// {
//   value: "XYZ",
//   writable: true,
//   enumerable: true,
//   configurable: false
// }

delete globalThis.nameOther; // return false
console.log(nameOther);

