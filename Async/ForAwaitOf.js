//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of


//--- Iterating over async iterables
console.log(`
--- (Ao#1) ---`);

const LIMIT = 3;

const asyncIterable = {
    [Symbol.asyncIterator]() {
        let i = 0;
        return {
            next() {
                const done = i === LIMIT;
                const value = done ? undefined : i++;
                return Promise.resolve({ value, done });
            },
            return() {
                // This will be reached if the consumer called 'break' or 'return' early in the loop.
                return { done: true };
            },
        };
    },
};

(async () => {
    for await (const num of asyncIterable) {
        console.log(num);
    }
})();

//--- Iterating over async generators
console.log(`
--- (Ao#2) ---`);

async function* asyncGenerator() {
    let i = 0;
    while (i < 3) {
        yield i++;
    }
}

(async () => {
    for await (const num of asyncGenerator()) {
        console.log(num);
    }
})();

//--- Iterating over sync iterables and generators
console.log(`
--- (Ao#3) ---`);

function* generator() {
    yield 0;
    yield 1;
    yield Promise.resolve(2);
    yield Promise.resolve(3);
    yield 4;
}

(async () => {
    for await (const num of generator()) {
        console.log(num);
    }
})();


for (const numOrPromise of generator()) {
    console.log(numOrPromise);
}

//--- yielding rejected promises from a sync generator -  In such case, for await...of throws when consuming the rejected promise and DOESN'T CALL finally blocks within that generator.
console.log(`
--- (Ao#4) ---`);

function* generatorWithRejectedPromises() {
    try {
        yield 0;
        yield 1;
        yield Promise.resolve(2);
        yield Promise.reject(3);
        yield 4;
        throw 5;
    } finally {
        console.log("called finally");
    }
}

(async () => {
    try {
        for await (const num of generatorWithRejectedPromises()) {
            console.log(num);
        }
    } catch (e) {
        console.log("caught", e);
    }
})();
// 0
// 1
// 2
// caught 3

// compare with for-of loop:

try {
    for (const numOrPromise of generatorWithRejectedPromises()) {
        console.log(numOrPromise);
    }
} catch (e) {
    console.log("caught", e);

}
// 0
// 1
// Promise { 2 }
// Promise { <rejected> 3 }
// 4
// caught 5
// called finally

