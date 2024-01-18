//--- (1) setTimeut return Promise
console.log(`
--- (Pw#1) ---`);

function Promise1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(1000), 1000); //1 sec + return 1000 as resolve
    })
}

function Promise2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(2000), 2000); //1 sec + return 1000 as resolve
    })
}

console.time('start');
Promise.all([Promise1(), Promise2()])
    .then(val => {
        console.log(console.timeEnd('start', 0))
        console.log(val)
    })

//--- (2) working even simple value instead Promise  
console.log(`
--- (Pw#2) ---`);

Promise.all([Promise1(), Promise2(), "string"])
    .then(val => console.log(val))

//--- (3) handle reject
console.log(`
--- (Pw#3) ---`);

function Promise3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(5000), 2000); //1 sec + return 1000 as resolve
    })
}

Promise.all([Promise1(), Promise3().catch(err => { return err })])
    .then(val => console.log(val))


//--- (4) unhaddled rejection  
console.log(`
--- (Pw#4) ---`);

Promise.all([Promise1(), Promise3()])
    .then(val => console.log(val))

//--- (5) imediate rejection 
console.log(`
--- (Pw#5) ---`);

/*
Promise.all([Promise1(), Promise.reject('instant reject')])
    .then(val => console.log(val))

*/

//--- (6) continue on PromiseWaitAny