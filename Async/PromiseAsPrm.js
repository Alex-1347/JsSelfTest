//--- this function accept promise as prm
console.log(`
--- (Pb#1) ---`);

function Log(prm){
    prm.then(val => console.log(val))
}

const somePromise = new Promise(
    (resolve, reject) => resolve("ok 1")
)

//smple correct call
Log(somePromise)

//--- create Promise from any value
console.log(`
--- (Pb#2) ---`);

const val = "ok 2"
const promisiedValue = Promise.resolve(val)
Log(promisiedValue)

//--- created rejected Promise
console.log(`
--- (Pb#3) ---`);

const rejectedValue = Promise.reject(new Error('Not OK'))
Log(rejectedValue)

console.log('end')



