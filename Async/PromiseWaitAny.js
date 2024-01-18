//--- start on Promise WaitAll
console.log(`
--- (Pa#1) ---`);

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

Promise.race([Promise1(), Promise2()])
    .then(val => console.log(val))