//--- private fields https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes#private_fields
console.log(`
--- (Ex#1) ---`);

class Color {
  #values;
  constructor(r, g, b, a = 1) {
    this.#values = [r, g, b, a];
  }
  get alpha() {
    return this.#values[3];
  }
  set alpha(value) {
    if (value < 0 || value > 1) {
      throw new RangeError("Alpha value must be between 0 and 1");
    }
    this.#values[3] = value;
  }
  toString() {
    return this.#values.join(", ");
  }
  static isValid(r, g, b, a){
    return  r >= 0 && r <= 255 && 
            g >= 0 && g <= 255 &&
            b >= 0 && b <= 255
  }
}

class ColorWithAlpha extends Color {
  #alpha;
  constructor(r, g, b, a) {
    super(r, g, b);
    this.#alpha = a;
  }
  static isValid(r, g, b, a) {
    // Call the parent class's isValid() and build on the return value
    return super.isValid(r, g, b) && a >= 0 && a <= 1;
  }
  get alpha() {
    return this.#alpha;
  }
  set alpha(value) {
    if (value < 0 || value > 1) {
      throw new RangeError("Alpha value must be between 0 and 1");
    }
    this.#alpha = value;
  }
}

console.log(new Color(255, 0, 0).toString());
const color = new ColorWithAlpha(200, 0, 0, 0.5);
console.log(color.toString()); 
console.log(ColorWithAlpha.isValid(255, 0, 0, 1))
console.log(ColorWithAlpha.isValid(300, 0, 0, 1))
console.log(ColorWithAlpha.isValid(255, 0, 0, -1))


console.log(color instanceof Color); 
console.log(color instanceof ColorWithAlpha);


//--- (2) A class's constructor can return a different object, which will be used as the new this for the derived class constructor. 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
//don't working as expected !
console.log(`
--- (Ex#2) ---`);

class Stamper extends class {
    // A base class whose constructor returns the object it's given
    constructor(obj) {
        return obj;
    }
}
{   
    // This declaration will "stamp" the private field onto the object
    // returned by the base class constructor
    stamp = 42;
    static getStamp(obj) {
        return obj.stamp;
    }
};

const obj = {};
new Stamper(obj)
// `Stamper` calls `Base`, which returns `obj`, so `obj` is
// now the `this` value. `Stamper` then defines `#stamp` on `obj`

console.log(obj);                    // In some dev tools, it shows {#stamp: 42}
console.log(Stamper.getStamp(obj));  // 42
console.log(obj instanceof Stamper); // false

// You cannot stamp private properties twice
console.log(new Stamper(obj)); // Error: Initializing an object twice is an error with private fields


//--- (3) also see Prototype to extend


