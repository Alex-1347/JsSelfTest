//https://nodejs.dev/en/learn/asynchronous-flow-control/

//--- (1) calback stack
console.log(`
--- (Ac#1) ---`)

function f1(callback){
    setTimeout(()=>callback(),0);
}
function f2(callback){
    callback();
}
f1(()=> console.log('this is callback 1'));
f2(()=> console.log('this is callback 2'));


//--- (2) serius of callback. A middleware function will return another function, and a terminator function will invoke the callback. 

console.log(`
--- (Ac#2) ---`)

function final(someInput, callback) {
    callback(`${someInput} and terminated by executing callback `);
  }
  
  function middleware(someInput, callback) {
    return final(`${someInput} touched by middleware `, callback);
  }
  
  function initiate() {
    const someInput = 'hello this is a function ';
    middleware(someInput, function (result) {
      console.log(result);
      // requires callback to `return` result
    });
  }
  
  initiate();