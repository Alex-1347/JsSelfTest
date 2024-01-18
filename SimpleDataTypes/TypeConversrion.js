//--- All type coercion algorithms look up this symbol on objects for the method that accepts a preferred type and returns a primitive representation of the object, before falling back to using the object's valueOf() and toString() methods https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive
//--- https://tc39.es/ecma262/multipage/abstract-operations.html#sec-toprimitive

//---  An object without Symbol.toPrimitive property.
console.log(`
--- (Cn#1) ---`);

const obj1 = {};
console.log(+obj1); // NaN
console.log(`${obj1}`); // "[object Object]"
console.log(obj1 + ""); // "[object Object]"

//--- An object with Symbol.toPrimitive property.
console.log(`
--- (Cn#2) ---`);

const obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return 10;
    }
    if (hint === "string") {
      return "hello";
    }
    return true;
  },
};
console.log(+obj2);     // 10        — hint is "number"
console.log(`${obj2}`); // "hello"   — hint is "string"
console.log(obj2 + ""); // "true"    — hint is "default"


//--- there's no strong preference for what the actual type should be. This is usually when a string, a number, or a BigInt are equally acceptable 
//--- Objects are converted to primitives by calling its [@@toPrimitive]() (with "default" as hint), valueOf(), and toString() methods, in that order.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#type_coercion

console.log(`
--- (Cn#3) ---`);

const obj = { foo: 1 };
console.log(obj.valueOf() === obj); // true

console.log(Object.prototype.valueOf.call("aaa")); // [String: 'aaa'] (a wrapper object)

//--- Unary plus performs number coercion on its operand, which, for most objects without @@toPrimitive, means calling its valueOf().https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
console.log(`
--- (Cn#4) ---`);

console.log(1, +new Date()); // the current timestamp; same as new Date().getTime()
console.log(2, +{}); // NaN (toString() returns "[object Object]")
console.log(3, +[]); // 0 (toString() returns an empty string list)
console.log(4, +[1]); // 1 (toString() returns "1")
console.log(5, +[1, 2]); // NaN (toString() returns "1,2")
console.log(6, +new Set([1])); // NaN (toString() returns "[object Set]")
console.log(7, +{ valueOf: () => 42 }); // 42

