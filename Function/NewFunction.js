//---  Function() constructor https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function
console.log(`
--- (Fn#1) ---`);

const recursiveFn = new Function(
    "count",
    `
  (function recursiveFn(count) {
    if (count < 0) {
      return;
    }
    console.log(count);
    recursiveFn(count - 1);
  })(count);
  `,
);

recursiveFn(10)

//---  The function constructor can take in multiple statements separated by a semicolon. Function expressions require a return statement with the function's name
console.log(`
--- (Fn#2) ---`);

// Observe that new Function is called. This is so we can call the function we created directly afterwards
const sumOfArray = new Function(
    "const sumArray = (arr) => arr.reduce((previousValue, currentValue) => previousValue + currentValue); return sumArray",
)();

console.log(sumOfArray([1, 2, 3, 4]))// 10

// If you don't call new Function at the point of creation, you can use the Function.call() method to call it
const findLargestNumber = new Function(
    "function findLargestNumber (arr) { return Math.max(...arr) }; return findLargestNumber",
);

console.log(findLargestNumber.call({}).call({}, [2, 4, 1, 8, 5]))// 8

// Function declarations do not require a return statement
const sayHello = new Function(
    "return function (name) { return `Hello, ${name}` }",
)();

console.log(sayHello("world"));// Hello, world



