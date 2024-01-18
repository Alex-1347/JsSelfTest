//--- The void operator evaluates the given expression and then returns undefined. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
console.log(` 
--- (Vd#1) ---`);

const output = void 1;
console.log(output);                            // Expected output: undefined

//--- void console.log
console.log(` 
--- (Vd#2) ---`);

void console.log('expression evaluated');       // Expected output: "expression evaluated"

//--- iife console.log
console.log(` 
--- (Vd#3) ---`);

void (function iife() {
    console.log('iife is executed');            // Expected output: "iife is executed"
})();

//--- void block executing function at all
console.log(` 
--- (Vd#4) ---`);

void function test() {
    console.log('test function executed');
};
try {
    test();
} catch (e) {
    console.log('test function is not defined');  // Expected output: "test function is not defined"
}