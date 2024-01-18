//https://stackoverflow.com/questions/32450516/what-is-new-target
//https://262.ecma-international.org/6.0/#sec-meta-properties
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target

//--- The new.target meta-property lets you detect whether a function or constructor was called using the new operator. new.target is guaranteed to be a constructable function value or undefined.
console.log(`
--- (Nt#1) ---`)

class Parent {
  constructor() {
    // implicit (from the `super` call)
    //    new.target = Child;
    // implicit (because `Parent` doesn't extend anything):
    //    this = Object.create(new.target.prototype);
    console.log(1, new.target) // Child!
  }
}
class Child extends Parent {
  constructor() {
    // `this` is uninitialised (and would throw if accessed)
    // implicit (from the `new` call):
    //    new.target = Child 
    super(); // this = Reflect.construct(Parent, [], new.target);
    console.log(2, this);
  }
}
new Child;

//--- use new.target to check that class instantiated with new
console.log(`
--- (Nt#2) ---`)

function Foo() {
  if (!new.target) {
    throw new Error("Foo() must be called with new");
  }
  console.log("Foo instantiated with new");
}

new Foo(); // Logs "Foo instantiated with new"
try {
  Foo(); // Throws "Foo() must be called with new"
} catch (error) {
  console.log(error);
}

//--- extend Map (KeyValuePair from lib.es2015.collection.d.ts) with operation InsertOrUpdate
console.log(`
--- (Nt#3) ---`)

class BetterMap extends Map {
  // The constructor is omitted because it's just the default one

  upsert(key, actions) {
    if (this.has(key)) {
      console.log('update')
      this.set(key, actions.update(this.get(key)));
    } else {
      console.log('insert')
      this.set(key, actions.insert());
    }
  }
}

const map = new BetterMap([["a", 1]]);
console.log(map);
map.upsert("a", {
  update: (value) => value + 1,
  insert: () => 0,
});
console.log(map.get("a")); // 2
