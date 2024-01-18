//https://stackoverflow.com/questions/9329446/loop-for-each-over-an-array-in-javascript

const arr = [1, 2, 3]

//--- (1) encient stype
console.log(`
--- (Al#1) ---`)

for (let index = 0; index < arr.length; ++index) {
    console.log(arr[index]);
}

//--- (2) for
console.log(`
--- (Al#2) ---`)

for (const x of arr) {
    console.log(x)
}

//--- (3) forEach
console.log(`
--- (Al#3) ---`)

arr.forEach(x => {
    console.log(x)
});

//--- (4) for in 
console.log(`
--- (Al#4) ---`)

// `a` is a sparse array

const a = [];
a[0] = "1";
a[10] = "2";
a[10000] = "3";
for (const name in a) {
    if (Object.hasOwn(a, name) &&       // These checks are  explained on https://stackoverflow.com/questions/9329446/loop-for-each-over-an-array-in-javascript
        /^0$|^[1-9]\d*$/.test(name) &&  
        name <= 4294967294              
    ) {
        const element = a[name];
        console.log(a[name]);
    }
}

//--- (5) for iterator 
console.log(`
--- (Al#5) ---`)

const it = arr.values(); // Or `const it = a[Symbol.iterator]();` if you like
let entry;
while (!(entry = it.next()).done) {
    console.log(entry.value);
}

//--- (6) map
console.log(`
--- (Al#6) ---`)

a.map((v, i) => {
    console.log(i, v)
})

//--- iterate over Array with iterator
console.log(`
--- (Al#7) ---`)

const array = [1, 2, 3, 4, 5];
const iterator = array[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { value: undefined, done: true }