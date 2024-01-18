//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in

//--- (1)  The in operator returns true if the specified property is in the specified object or its prototype chain
console.log(`
--- (In#1) ---`)

const car = { make: 'Honda', model: 'Accord', year: 1998 };

console.log('make' in car);

delete car.make;
if ('make' in car === false) {
    car.make = 'Suzuki';
}

console.log(car.make);

//---  (2) In on array used as property (index or other)
console.log(`
--- (In#2) ---`)

const trees = ["redwood", "bay", "cedar", "oak", "maple"];
console.log(0 in trees); // returns true
console.log(3 in trees); // returns true
console.log(6 in trees); // returns false
console.log("bay" in trees); // returns false (you must specify the index number, not the value at that index)
console.log("length" in trees); // returns true (length is an Array property)
console.log(Symbol.iterator in trees); // returns true

//--- (3) Using the in operator with deleted or undefined properties
console.log(`
--- (In#3) ---`)

const mycar = { make: "Honda", model: "Accord", year: 1998 };
delete mycar.make;
console.log("make" in mycar); // returns false

delete trees[3];
console.log(3 in trees); // returns false

//--- (4) If you set a property to undefined but do not delete it, the in operator returns true for that property.
console.log(`
--- (In#4) ---`)

trees[3] = undefined;
console.log(3 in trees); // returns true

//--- (5) Inherited properties object - hasOwn
console.log(`
--- (In#5) ---`)

const ages = { alice: 18, bob: 27 };

function hasPerson(name) {
    return Object.hasOwn(ages, name);
}

console.log(hasPerson("hasOwnProperty")); // false

//--- (6) Using the in operator to implement branded checks
console.log(`
--- (In#6) ---`)

class Person {
    #age;                     //Private properties get created by using a hash # prefix and cannot be legally referenced outside of the class.
    constructor(age) {
        this.#age = age;
    }
    static isPerson(o) {
        return #age in o;
    }
    ageDifference(other) {
        return this.#age - other.#age;
    }
}

const p1 = new Person(20);
const p2 = new Person(30);
console.log(p1.ageDifference(p2)); // -10
console.log(Person.isPerson(p1)); // true

if (Person.isPerson(p1) && Person.isPerson(p2)) {
    console.log(p1.ageDifference(p2)); // -10
}

//--- (7) You can also implement this as a @@hasInstance [Symbol.hasInstance] method of the class, so that you can use the instanceof operator to perform the same check
console.log(`
--- (In#7) ---`)

class Person1 {
    #age;
    constructor(age) {
      this.#age = age;
    }
    static [Symbol.hasInstance](o) {
      // Testing `this` to prevent false-positives when
      // calling `instanceof SubclassOfPerson`
      return this === Person && #age in o;
    }
    ageDifference(other) {
      return this.#age - other.#age;
    }
  }
  
  const p3 = new Person1(20);
  const p4 = new Person1(30);
  
  if (p3 instanceof Person1 && p4 instanceof Person1) {
    console.log(p3.ageDifference(p4)); // -10
  }
  