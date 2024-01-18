//--- all Gof pattern, singlton chai test  https://github.com/fbeline/design-patterns-JS/blob/master/test/singleton_es6-test.js
console.log(`
--- (Gf#1) ---`)

class Person {
  constructor() {
    if (typeof Person.instance === 'object') {
      return Person.instance;
    }
    Person.instance = this;
    return this;
  }
}
module.exports = Person;

