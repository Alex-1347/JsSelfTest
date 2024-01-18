//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

//--- Proxy object can intercept and redefine fundamental operations for that object. The Reflect method still interacts with the object through object internal methods — it doesn't "de-proxify" the proxy if it's invoked on a proxy. 
console.log(`
--- (Pl#1) ---`);

const targetObj = {
    message1: "hello",
    message2: "everyone",
};

const handlerHandler = {
    get(target, prop, receiver) {
        if (prop === "message2") {
            return "world";
        }
        return Reflect.get(...arguments);
    },
};

const proxyTest = new Proxy(targetObj, handlerHandler);

console.log(proxyTest.message1); // hello
console.log(proxyTest.message2); // world

//--- (2) Before Reflect, you typically use the Function.prototype.apply() method to call a function with a given this value and arguments provided as an array (or an array-like object).
console.log(`
--- (Pl#2) ---`);

const X = Function.prototype.apply.call(Math.floor, undefined, [1.75]);
console.log(X)

//--- (3) With Reflect.apply this becomes less verbose and easier to understand
console.log(`
--- (Pl#3) ---`);

console.log(Reflect.apply(Math.floor, undefined, [1.75])); // 1
console.log(Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111])); // "hello"
console.log(Reflect.apply(RegExp.prototype.exec, /ab/, ["confabulation"]).index); // 4
console.log(Reflect.apply("".charAt, "ponies", [3])); // "i"

//see more in CookieProxy.html