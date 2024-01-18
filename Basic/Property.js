//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names

//--- computed property names like [`foo${++i}`]
console.log(`
--- (Pr#1) ---`)

let i = 0;
const a = {
  [`foo${++i}`]: i,
  [`foo${++i}`]: i,
  [`foo${++i}`]: i,
};

console.log(a.foo1); // 1
console.log(a.foo2); // 2
console.log(a.foo3); // 3

//--- computed property names like [Array]
console.log(`
--- (Pr#2) ---`)

const items = ["A", "B", "C"];
const obj = {
  [items]: "Hello",
};
console.log(obj); // A,B,C: "Hello"
console.log(obj["A,B,C"]); // "Hello"

//--- computed property names like [variables]
console.log(`
--- (Pr#3) ---`)

const param = "size";
const config = {
  [param]: 12,
  [`mobile${param.charAt(0).toUpperCase()}${param.slice(1)}`]: 4,
};

console.log(config); // {size: 12, mobileSize: 4}

//--- Spread object properties to merged object with ...  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#spread_properties
console.log(`
--- (Pr#4) ---`)

const obj1 = { foo: "bar", x: 42 };
const obj2 = { foo: "baz", y: 13 };

const clonedObj = { ...obj1 };// { foo: "bar", x: 42 }
const mergedObj = { ...obj1, ...obj2 }; // { foo: "baz", x: 42, y: 13 }

console.log(mergedObj)

