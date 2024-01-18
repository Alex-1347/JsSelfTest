// Grouping operator - always on top https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping

//--- In an arrow function expression body (one that directly returns an expression without the keyword return),  the grouping operator can be used to return an object literal expression
console.log(`
--- (Gr#1) ---`);

const f = () => ({ a: 1 });
console.log(f())

//--- since when the parser sees the left parenthesis, it knows that what follows must be an expression instead of a declaration.
console.log(`
--- (Gr#2) ---`);

(function () {
    console.log('IIFE ')
})();

//--- using for without block
console.log(`
--- (Gr#2) ---`);
for (let i = 0; i < 10; i++) console.log(i);

//--- Empty statement
console.log(`
--- (Gr#3) ---`);

const arr = [1, 2, 3];

//--- Assign all array values to 0 with empty statement
for (let i = 0; i < arr.length; arr[i++] = 0) /* empty statement */;

console.log(arr); // [0, 0, 0]

//--- Using a block statement to encapsulate data
console.log(`
--- (Gr#4) ---`);
let sector;
{
    // These variables are scoped to this block and are not
    // accessible after the block
    const angle = Math.PI / 3;
    const radius = 10;
    sector = {
        radius,
        angle,
        area: (angle / 2) * radius ** 2,
        perimeter: 2 * radius + angle * radius,
    };
}
console.log(sector);
// {
//   radius: 10,
//   angle: 1.0471975511965976,
//   area: 52.35987755982988,
//   perimeter: 30.471975511965976
// }
console.log(typeof radius); // "undefined"


//--- Many style guides recommend putting additional parentheses as a grouping operator around the assignment:
console.log(`
--- (Gr#5) ---`);

const html = (strings, ...values) => String.raw({ raw: strings }, ...values);
const doc = html`<!doctype html>
  <html lang="en-US">
    <head>
      <title>Hello</title>
    </head>
    <body>
      <div id="1">a</div>
      <div id="2">b</div>
    </body>
  </html>`;

const jsdom = require("jsdom");
const dom = new jsdom.JSDOM(doc);

const iterator = dom.window.document.createNodeIterator(dom.window.document);  //https://developer.mozilla.org/en-US/docs/Web/API/Document/createNodeIterator
let currentNode;
while ((currentNode = iterator.nextNode())) {
    console.log(currentNode, currentNode.nodeName);
}

//--- code inside braces ({}) is parsed as a sequence of statements, where foo is a label, not a key in an object literal. To fix this, wrap the object literal in parentheses:
console.log(`
 --- (Gr#6) ---`);

const a5 = () => { foo: 1 };

// To fix this, wrap the object literal in parentheses:
const a6 = () => ({ foo: 1 });

console.log(a5(), a6())

