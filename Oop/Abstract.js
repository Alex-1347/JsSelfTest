//Abstract class can't be instantiated, but can be extended. https://stackoverflow.com/questions/597769/how-do-i-create-an-abstract-base-class-in-javascript
let X = require('./tracePrototypeChainOf.js');

//--- (1) Abstract Method
console.log(`
--- (Ab#1) ---`)

/** 
 @constructor
 @abstract
 */
var Animal = function () {
    if (this.constructor === Animal) {
        throw new Error("Can't instantiate abstract class!");
    }
    // Animal initialization...
};

/**
 @abstract
 */
Animal.prototype.say = function () {
    throw new Error("Abstract method!");
}

var Cat = function () {
    Animal.apply(this, arguments);
    // Cat initialization...
};

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.say = function () {
    console.log('meow');
}

var cat = new Cat();

console.log('cat', X.tracePrototypeChainOf(cat))
console.log('Cat', X.tracePrototypeChainOf(Cat))
console.log('Animal', X.tracePrototypeChainOf(Animal))

cat.say();

//--- (2) Abstract Class
console.log(`
--- (Ab#2) ---`);

/**
 * Abstract Class Animal1.
 *
 * @class Animal1
 */
class Animal1 {

    constructor() {
        if (this.constructor == Animal1) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    say() {
        throw new Error("Method 'say()' must be implemented.");
    }
    eat() {
        console.log("eating");
    }
}

/**
 * Dog.
 *
 * @class Dog
 * @extends {Animal}
 */
class Dog extends Animal1 {
    say() {
        console.log("bark");
    }
}

/**
 * Cat.
 *
 * @class Cat
 * @extends {Animal}
 */
class Cat1 extends Animal1 {
    say() {
        console.log("meow");
    }
}

/**
 * Horse.
 *
 * @class Horse
 * @extends {Animal}
 */
class Horse extends Animal1 { }


console.log('new Horse()', X.tracePrototypeChainOf(new Horse()))
console.log('Horse', X.tracePrototypeChainOf(Horse))
console.log('Animal1', X.tracePrototypeChainOf(Animal1))


new Dog().eat(); // eating
new Cat1().eat(); // eating
new Horse().eat(); // eating

new Dog().say(); // bark
new Cat1().say(); // meow

try {
    new Horse().say(); // Error: Method say() must be implemented.
} catch (error) {
    console.log(error)
}

try {
    new Animal1(); // Error: Abstract classes can't be instantiated.
} catch (error) {
    console.log(error)
}


