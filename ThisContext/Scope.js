//https://www.w3schools.com/JS/js_function_closures.asp
//Variables created without a declaration keyword (var, let, or const) are always global, even if they are created inside a function.

//--- (1) what is scope
console.log(`
--- (Se#1) ---`)

// p is a global variable
globalThis.p = 5;
console.log(1, this)
console.log(2, globalThis)

function myFunc() {
  // p is a local variable
  const p = 9;
  console.log(3, this)

  function decl() {
    console.log(5, p);       // 9
    console.log(6, this.p);  // 5
    console.log(7, this)
  }
  const expr = function () {
    console.log(8, p);       // 9
  };
  const cons = new Function("\tconsole.log(9, p);");  // 5

  decl();
  expr();
  cons();
}

myFunc();
// 9 (for 'decl' by function declaration (current scope))
// 9 (for 'expr' by function expression (current scope))
// 5 (for 'cons' by Function constructor (global scope))

//--- (2) var declarations are globally scoped or function/locally scoped.
console.log(`
--- (Se#2) ---`)

var greeter = "hey hi";
var times = 4;

if (times > 3) {
    var greeter = "say Hello instead"; 
}

console.log(greeter) 

//--- (3) let is block scoped, Unlike var which is initialized as undefined, the let keyword is not initialized
console.log(`
--- (Se#3) ---`)

let greeting = "say Hi";

if (times > 3) {
     let hello = "say Hello instead";
     console.log(hello);// "say Hello instead"
 }
 try {
    console.log(hello) // hello is not defined
 } catch (e) {
    console.log(e.message)
 }
 
//--- (4) let can be updated but not re-declared.
console.log(`
--- (Se#4) ---`)

 if (true) {
     let greeting = "say Hello instead";
     console.log(greeting); // "say Hello instead"
 }
 console.log(greeting); // "say Hi"

 //--- (5) const declarations are block scoped, const cannot be updated or re-declared
 console.log(`
--- (Se#5) ---`)

 const greetingC = {
    message: "say Hi",
    times: 4
}
greetingC.message = "say Hello instead";

console.log(greetingC.message )