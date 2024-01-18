//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

//--- (1) The for await...of statement creates a loop iterating over async iterable objects as well as sync iterables. 
console.log(`
--- (Aw#1) ---`);

async function* foo() {
    yield 31;
    yield 32;
}

(async function () {
    for await (const num of foo()) {
        console.log(1, num);   // Expected output: 1
        break; // Closes iterator, triggers return
    }
})();

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
//The await operator is used to wait for a Promise and get its fulfillment value. It can only be used inside an async function or at the top level of a module.
//--- (2) Thenables

console.log(`
--- (Aw#2) ---`);

const aThenable = {
    then(onFulfilled, onRejected) {
        onFulfilled({
            // The thenable is fulfilled with another thenable
            then(onFulfilled, onRejected) {
                onFulfilled(42);
            },
        });
    },
};
(async () => {
    console.log(2, await Promise.resolve(aThenable))// A promise fulfilled with 42
})();

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

//--- (3) Awaiting a promise to be fulfilled
console.log(`
--- (Aw#3) ---`)

function resolveAfter2Seconds(x) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(x);
        }, 1000);
    });
}

async function f1() {
    const x = await resolveAfter2Seconds(10);
    console.log(3, x); // 10
}

f1();

//--- (4) Thenable objects are resolved just the same as actual Promise objects.
console.log(`
--- (Aw#4) ---`)

async function f() {
    const thenable = {
        then(resolve, _reject) {
            resolve("resolved!");
        },
    };
    console.log(4, await thenable); // "resolved!"
}

f();

//--- (5) Thenable objects can also be rejected:
console.log(`
--- (Aw#5) ---`)

async function f4() {
    //Handling rejected promises
    try {
        const z = await Promise.reject(30);
    } catch (e) {
        console.error(5, e); // 30
    }
}

f4();

//--- (6) demonstrate how the microtask queue is processed when each await expression is encountered.
console.log(`
--- (Aw#6) ---`)

let i = 0;

queueMicrotask(function test() {
    i++;
    console.log(6, "microtask", i);
    if (i < 3) {
        queueMicrotask(test);
    }
});

(async () => {
    console.log(7, "async function start");
    for (let i = 1; i < 3; i++) {
        await null;
        console.log(7, "async function resume", i);
    }
    await null;
    console.log(8, "async function end");
})();

queueMicrotask(() => {
    console.log(9, "queueMicrotask() after calling async function");
});

console.log(10, 'end')
// Logs:
// async function start
// script sync part end
// microtask 1
// async function resume 1
// queueMicrotask() after calling async function
// microtask 2
// async function resume 2
// microtask 3
// async function end



