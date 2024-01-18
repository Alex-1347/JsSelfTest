//+++ Use brackets as Dynamic property names

//--- Using bracket accessors to access properties dynamically. 
console.log(`
--- (Ev#14) ---`)

const obj = { a: 20, b: 30 };

const propName = Object.keys(obj); // returns "a" or "b"
console.log(propName)

const result1 = eval(`obj.${propName[1]}`);
console.log(result1)

const result2 = obj[propName[1]]; // obj["a"] is the same as obj.a
console.log(result2)

//--- computed property names
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

//--- (5) Reformatting Array Objects
console.log(`
--- (Mp#5) ---`)

const myUsers = [
    { name: 'shark', likes: 'ocean' },
    { name: 'turtle', likes: 'pond' },
    { name: 'otter', likes: 'fish biscuits' }
]

const usersByLikes = myUsers.map(item => {
    const container = {};

    container[item.name] = item.likes;
    container.age = item.name.length * 10;

    return container;
})

console.log(usersByLikes);

//--- (5) Symbols and for...in iteration
console.log(`
--- (Sm#5) ---`)

obj[Symbol("a")] = "a";
obj[Symbol.for("b")] = "b";
obj["c"] = "c";
obj.d = "d";

for (const i in obj) {
    console.log(i);
}

//+++ use bracket as property key

//--- (7) Symbol wrapper objects as property keys
console.log(`
--- (Sm#7) ---`)

const sym4 = Symbol("foo");
const obj1 = { [sym4]: 1 };
console.log(obj1[sym4]); // 1
console.log(obj1[Object(sym4)]); // still 1

//+++ Use brackets as destructuring to array

//--- Assignment with destructuring, Unpacking values from a regular expression with exec
console.log(`
--- (Rg#2) ---`)

const result = /(a+)(b+)(c+)/.exec("aaabcc");
let u = "", v = "", w = "";
[, u, v, w] = result;
console.log(u, v, w); // "aaa" "b" "cc"

//--- unpacking from any iterable
console.log(`
--- (Da#6) ---`);

const [k, l] = new Map([
    [1, 2],
    [3, 4],
]);
console.log(18, k, l); // [1, 2] [3, 4]

const Xobj = {
    *[Symbol.iterator]() {
        for (const v of [0, 1, 2, 3]) {
            console.log(v);
            yield v;
        }
    },
};
const [r, t, ...rest] = Xobj; // Logs 0 1 2 3
console.log(19, r, t, rest); // [2, 3] (an array)


//--- (5) array and parameters spreading ... from *[Symbol.iterator]() {}
console.log(`
--- (It#6) ---`)

const myIterable = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    },
};

console.log([...myIterable]);