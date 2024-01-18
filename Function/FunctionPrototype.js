//---  The function with custom prototype
console.log(`
--- (Fp#1) ---`);

function MyFun() {
    if (!this) {
        return new MyFun();
    }

    var f = function () {
        return "thanks for calling!";
    }
    f.__proto__ = MyFun.prototype;
    f.constructor = MyFun;

    return f;
}

MyFun.prototype = {
    foo: function () {
        return "foo:" + this();
    },
    __proto__: Function.prototype
};

var f = new MyFun();

console.log(MyFun.prototype)                           // Function { foo: [Function: foo] }
console.log(f)                                         // [Function: f] MyFun { constructor: [Function: MyFun] }
console.log("proto method:", f.foo());                 // proto method: foo:thanks for calling!
console.log("function method:", f.call());             // function method: thanks for calling!
console.log("function call:", f());                    // function call: thanks for calling!
console.log('typeof:', typeof f);                      // typeof: "function", not "object". No way around it in current js versions
console.log('is MyFun:', (f instanceof MyFun));        // is MyFun: true
console.log('is Function:', (f instanceof Function));  // is Function: true


