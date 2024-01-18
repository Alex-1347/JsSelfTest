//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function*

//--- simple example with: yield await Promise
console.log(`
 --- (Aa#1) ---`);

async function* foo() {
    yield await Promise.resolve('a');
    yield await Promise.resolve('b');
    yield await Promise.resolve('c');
}

let str = '';

async function generate() {
    for await (const val of foo()) {
        str = str + val;
    }
    console.log(str);
}

generate();


//--- Async generator functions always produce promises of results — even when each yield step is synchronous.
console.log(`
 --- (Aa#2) ---`);

async function* myGenerator(step) {
    await new Promise((resolve) => setTimeout(resolve, 10));
    yield 0;
    yield step;
    yield step * 2;
}

const gen = myGenerator(2);
gen
    .next()
    .then((res) => {
        console.log(res); // { value: 0, done: false }
        return gen.next();
    })
    .then((res) => {
        console.log(res); // { value: 2, done: false }
        return gen.next();
    })
    .then((res) => {
        console.log(res); // { value: 4, done: false }
        return gen.next();
    })
    .then((res) => {
        console.log(res); // { value: undefined, done: true }
        return gen.next();
    });


 //--- Using an async generator function to read a series of files https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function*#using_an_async_generator_function_to_read_a_series_of_files   
 console.log(`
 --- (Aa#3) ---`);