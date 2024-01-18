//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
//any function declaration to the top of the current scope

//--- (1) Constructor new Function
console.log(`
--- (Fu#1) ---`);

const f1 = new Function("x", "y", "return x * y");
console.log(f1(2, 3))

//--- (2) Declaration
console.log(`
--- (Fu#2) ---`);

function f2(x, y) {
    return x * y;
} // No need for semicolon here
console.log(f2(3, 4))

//--- (3) Function expressions; the function is anonymous but assigned to a variable
console.log(`
--- (Fu#3) ---`);

const f3 = function (x, y) {
    return x * y;
};
console.log(f3(3, 4))

//--- (4) Expression; the function has its own name
console.log(`
--- (Fu#4) ---`);

const f4 = function funcName(x, y) {
    return x * y;
};
console.log(f4(4, 5))

//--- (5) Arrow function
console.log(`
--- (Fu#5) ---`);

const f5 = (x, y) => x * y;
console.log(f5(5, 6))

//--- (6) define Method and Get/Set function in object
console.log(`
--- (Fu#6) ---`);

const obj = {
    f6(x, y) {
        return x * y;
    },
    get f10() {
        return this.a * this.b;
    },
    a: 0,
    b: 0
};

console.log(obj.f6(6, 7), obj.f6(7, 8), obj.f10)
obj.a = 10;
obj.b = 20;
console.log(obj.f10)

//--- Object, Default and Array (with Spread syntax) as function parameters 
console.log(`
--- (Fu#7) ---`);

function f7({ a, b }, c = 3, ...rest) {
    console.log(a);
    console.log(b);
    console.log(c);
    for (let one of rest) {
        console.log(one);
    }
    return a * b * c;
}

console.log(f7(obj, null, 4, 5, 6, 7))

//--- pass obj as parameters
console.log(`
--- (Fu#8) ---`);

console.log(f7(obj, '', 4, 5, 6, 7))
console.log(f7(obj))

//--- Invoking a Function with a Function Constructor NEW
console.log(`
--- (Fu#9) ---`);

function f9(a, b, c) {
    console.log(arguments[0]); //a
    console.log(arguments[1]); //b
    console.log(arguments[2]); //c
    return a + b + c;
}

const f10 = new f9(2, 3, 4)
console.log(f10)

//--- Named function expression
console.log(`
--- (Fu#10) ---`);

const mat = {
    factit: function factorial(n) {
        console.log(n);
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    },
};

mat.factit(3); //3;2;1;

