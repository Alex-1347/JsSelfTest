// Iterators and generators https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
// https://stackoverflow.com/questions/37124006/iterator-and-a-generator-in-javascript

//--- function generator function* gen() { yield* [];} gen().next()
console.log(`
--- (Gn#1) ---`)

function* gen() {
    yield* ["a", "b", "c"];
}

console.log(gen().next());


//--- Generator Function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
console.log(`
--- (Gn#2) ---`)

const x1 = function* (y) {
    yield y * y;
};
console.log(1, x1)
console.log(2, x1(5))
console.log(3, x1(5).next())
console.log(4, x1().next())

//--- GeneratorFunction.prototype.constructor return  instance of GeneratorFunction
console.log(`
--- (Gn#3) ---`)

const GeneratorFunction = function* () { }.constructor;

const foo = new GeneratorFunction(`
   yield 'a';
   yield 'b';
   yield 'c';
 `);

let str = '';
for (const val of foo()) {
    str = str + val;
}

console.log(str);

//--- infinite generator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator
console.log(`
--- (Gn#4) ---`)

function* infinite() {
    let index = 0;

    while (true) {
        yield index++;
    }
}

const generator = infinite(); // "Generator { }"

console.log(generator.next().value); // 0
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
console.log(generator.next().value); // 3

//--- async generator function async function* [yield await Promise]
console.log(`
--- (Gn#5) ---`)

async function* foo1() {
    yield await Promise.resolve('a');
    yield await Promise.resolve('b');
    yield await Promise.resolve('c');
}

let str1 = '';

async function generate() {
    for await (const val of foo1()) {
        str1 = str1 + val;
    }
    console.log(5, str1);
}

generate();   // Expected output: "abc"

//--- operators yield* vs yield 
console.log(`
--- (Gn#6) ---`)

function* func1(x) {
    yield x;
}

function* func2(x) {
    yield* func1(x);
}

const iterator2 = func2(5);

console.log(6, iterator2.next().value);

console.log(`
--- (end) ---`)