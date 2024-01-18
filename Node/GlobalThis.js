
let X = require('./SimplePropertyRetriever.js');

//--- (1) All Node.js global objects, globalThis-getOwnNonenumerables https://nodejs.org/api/globals.html#global
console.log(`
--- (Th#1) ---`)

const arr1 = []
console.log(X.SimplePropertyRetriever.getOwnNonenumerables(globalThis).forEach((value, prop) => { arr1.push(value)}));
arr1.sort().forEach((v, i) => console.log(i, v))

//--- globalThis-getOwnEnumerables
console.log(`
--- (Th#2) ---`)

const arr2 = []
console.log(X.SimplePropertyRetriever.getOwnEnumerables(globalThis).forEach((value, prop) => { arr2.push(value) }));
arr2.sort().forEach((v, i) => console.log(i, v))

//--- globalThis-getPrototypeNonenumerables
console.log(`
--- (Th#3) ---`)

const arr3 = []
console.log(X.SimplePropertyRetriever.getPrototypeNonenumerables(globalThis).forEach((value, prop) => { arr3.push(value)  }));
arr3.sort().forEach((v, i) => console.log(i, v))

//--- globalThis-getPrototypeEnumerables
console.log(`
--- (Th#4) ---`)

const arr4 = []
console.log(X.SimplePropertyRetriever.getPrototypeEnumerables(globalThis).forEach((value, prop) => { arr4.push(value)  }));
arr4.sort().forEach((v, i) => console.log(i, v))



