//--- IIFE (Immediately Invoked Function Expression) https://developer.mozilla.org/en-US/docs/Glossary/IIFE
console.log(`
--- (Fi#1) ---`);;

(function () {
    console.log(1)
    return
})();

//--- IIFE with arrow Function
console.log(`
--- (Fi#2) ---`);

(() => {
    console.log(2)
    return
})();

//---  Async Function 
console.log(`
--- (Fi#3) ---`);

(async () => {
    console.log(3)
    return
})();

console.log(`
--- (end) ---`);