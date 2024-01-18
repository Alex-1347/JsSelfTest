//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment

//--- assignment like x = y = 5
console.log(`
--- (Da#1) ---`);

const x = y = 5;
console.log(x, y) //y is assigned the value 5, and x is initialized with the value of the y = 5 expression, which is also 5

//--- Assignment with destructuring, Unpacking values from a regular expression match
console.log(`
--- (Da#2) ---`);

const result = /(a+)(b+)(c+)/.exec("aaabcc");
let u = "", v = "", w = "";
[, u, v, w] = result;
console.log(u, v, w); // "aaa" "b" "cc"

//--- common syntax of destructing Assignment
console.log(`
--- (Da#3) ---`);

const array = ['a', 'b', 'c', 'd', 'e']

const [a1, b1] = array;
console.log(1, a1, b1)

const [a2, , b2] = array;
console.log(2, a2, b2)

const [a3 = 101, b3] = array; //override default value
console.log(3, a3, b3)

const [a4, , , , , , , , , , , b4 = 101] = array;
console.log(4, a4, b4)

//Rest property
const [a5, b5, ...c5] = array;
console.log(5, a5, b5, c5)

//Ignoring some returned values
const [a6, , b6, ...c6] = array;
console.log(6, a6, b6, c6)

const [a7, b7, ...{ c7, d7 }] = array;
console.log(7, a7, b7, c7, d7)

const [a8, b8, ...[c8, d8]] = array;
console.log(8, a8, b8, c8)

const obj = { a10: 'aa', b10: 'bb' };

const { a10, b10 = 'def' } = obj;
console.log(9, a10, b10)

//Assigning to new variable names
const { a10: a11, b10: b11 } = obj;
console.log(10, a11, b11)

const { [a10]: a13 } = obj
console.log(13, a13)

const n = [];
({ a10: n[0], b10: n[1] } = obj);
console.log(14, n)

const [a = 1] = []; // a is 1
const { b = 2 } = { b: undefined }; // b is 2
const { c = 2 } = { c: null }; // c is null
console.log(15, a, b, c)

//--- Swapping variables
console.log(`
--- (Da#4) ---`);

const arr = [1, 2, 3];
[arr[2], arr[1]] = [arr[1], arr[2]];
console.log(16, arr); // [1, 3, 2]

//--- Using a binding pattern as the rest property
console.log(`
--- (Da#5) ---`);

const [i, j, ...{ length }] = [1, 2, 3];
console.log(17, i, j, length); // 1 2 1

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

//--- Unpacking properties from objects passed as a function parameter
console.log(`
--- (Da#7) ---`);

const user = {
    id: 42,
    displayName: "jdoe",
    fullName: {
        firstName: "Jane",
        lastName: "Doe",
    },
};

function userDisplayName({ displayName: dname }) {
    return dname;
}

console.log(20, userDisplayName(user)); // "jdoe"

//--- unpacking object
console.log(`
--- (Da#8) ---`);

const metadata = {
    title: "Scratchpad",
    translations: [
        {
            locale: "de",
            localizationTags: [],
            lastEdit: "2014-04-14T08:43:37",
            url: "/de/docs/Tools/Scratchpad",
            title: "JavaScript-Umgebung",
        },
    ],
    url: "/en-US/docs/Tools/Scratchpad",
};

const {
    title: englishTitle, // rename
    translations: [
        {
            title: localeTitle, // rename
        },
    ],
} = metadata;

console.log(21, englishTitle); // "Scratchpad"
console.log(21, localeTitle); // "JavaScript-Umgebung"

//--- inside for-of
console.log(`
--- (Da#9) ---`);

const people = [
    {
        name: "Mike Smith",
        family: {
            mother: "Jane Smith",
            father: "Harry Smith",
            sister: "Samantha Smith",
        },
        age: 35,
    },
    {
        name: "Tom Jones",
        family: {
            mother: "Norah Jones",
            father: "Richard Jones",
            brother: "Howard Jones",
        },
        age: 25,
    },
];

for (const {
    name: n,
    family: { father: f },
} of people) {
    console.log(`Name: ${n}, Father: ${f}`);
}

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"


//--- the prototype chain is looked up when the object is deconstructed
console.log(`
--- (Da#10) ---`);

const Yobj = {
    self: "123",
    __proto__: {
        prot: "456",
    },
};
const { self, prot } = Yobj;

console.log(self); // "123"
console.log(prot); // "456"
