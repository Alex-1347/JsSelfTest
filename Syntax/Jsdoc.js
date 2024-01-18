//--- jsdoc comment https://jsdoc.app/tags-param
console.log(`
--- (Ab#2) ---`);

/**
 * Abstract Class Animal.
 *
 * @class Animal
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

new Dog().say()