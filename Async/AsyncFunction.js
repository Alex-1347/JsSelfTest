//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

//--- Await is Promise
console.log(`
--- (Af#1) ---`);

async function foo1() {
    await 1;
}

// is the same as

function foo2() {
    return Promise.resolve(1).then(() => undefined);
}

//--- Async functions and execution order - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
console.log(`
 --- (Af#2) ---`);

function resolveAfter2Seconds() {
    console.log("starting slow promise");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
}

function resolveAfter1Second() {
    console.log("starting fast promise");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
}

async function sequentialStart() {
    console.log("== sequentialStart starts ==");

    // 1. Start a timer, log after it's done
    const slow = resolveAfter2Seconds();
    console.log(await slow);

    // 2. Start the next timer after waiting for the previous one
    const fast = resolveAfter1Second();
    console.log(await fast);

    console.log("== sequentialStart done ==");
}

async function sequentialWait() {
    console.log("== sequentialWait starts ==");

    // 1. Start two timers without waiting for each other
    const slow = resolveAfter2Seconds();
    const fast = resolveAfter1Second();

    // 2. Wait for the slow timer to complete, and then log the result
    console.log(await slow);
    // 3. Wait for the fast timer to complete, and then log the result
    console.log(await fast);

    console.log("== sequentialWait done ==");
}

async function concurrent1() {
    console.log("== concurrent1 starts ==");

    // 1. Start two timers concurrently and wait for both to complete
    const results = await Promise.all([
        resolveAfter2Seconds(),
        resolveAfter1Second(),
    ]);
    // 2. Log the results together
    console.log(results[0]);
    console.log(results[1]);

    console.log("== concurrent1 done ==");
}

async function concurrent2() {
    console.log("== concurrent2 starts ==");

    // 1. Start two timers concurrently, log immediately after each one is done
    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))(),
        (async () => console.log(await resolveAfter1Second()))(),
    ]);
    console.log("== concurrent2 done ==");
}

sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"

// wait above to finish
setTimeout(sequentialWait, 4000); // after 2 seconds, logs "slow" and then "fast"

// wait again
setTimeout(concurrent1, 7000); // same as sequentialWait

// wait again
setTimeout(concurrent2, 10000); // after 1 second, logs "fast", then after 1 more second, "slow"


//--- always Use Promise.all instead awaiting many results
console.log(`
--- (Af#3) ---`);

async function foo3() {
    const p1 = new Promise((resolve) => setTimeout(() => resolve("1"), 1000));
    const p2 = new Promise((_, reject) => setTimeout(() => reject("2"), 500));
    const results = [await p1, await p2]; // Do not do this! Use Promise.all or Promise.allSettled instead.
}
/*
foo3().catch(() => { }); // Attempt to swallow all errors...
*/