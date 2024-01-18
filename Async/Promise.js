//--- (1) fist call executor function creates finalstate
console.log(`
--- (Pm#1) ---`)

const myPromise = new Promise(function (resolve, reject) {
    resolve('1'); //only first call make sense
    resolve('2')
    reject(3)
})

const myPromise3 = new Promise(function (resolve, reject) {
    reject(3)
})

console.log(1, myPromise)

//--- (2) correct syntax
console.log(`
--- (Pm#2) ---`)

const myPromise1 = new Promise(function (resolve, reject) {       //correct syntax - we need to define callback function
    resolve('1');
})
const myPromise2 = new Promise(() => function (resolve, reject) { //wrong syntax - arrow function
    resolve('2');                                                 //() => function() defines a function that returns a function
})
myPromise1.then(console.log(2, myPromise1));
myPromise2.then(console.log(3, myPromise2));

//--- (3) min access to Promise result from onFulfilled function
console.log(`
--- (Pm#3) ---`)

myPromise1.then(function (value) {
    console.log(4, 'onFullFiled =' + value)
});

//--- (4) and onRejected
console.log(`
--- (Pm#4) ---`)

myPromise3.then(function (value) {
    console.log(5, 'onFullFiled =' + value)
}, (reason) => { console.log(6, 'rejected reason =' + reason) });


console.log('code end')


