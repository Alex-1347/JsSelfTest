//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration

//--- do while
console.log(`
--- (Dw#1) ---`);

let i = 0;
do {
  i += 1;
  console.log(i);
} while (i < 5);


//--- while 
console.log(`
 --- (Dw#2) ---`);

let n = 0;
let x = 0;
while (n < 3) {
  n++;
  x += n;
}

//--- create createNodeIterator on dom.window.document https://developer.mozilla.org/en-US/docs/Web/API/Document/createNodeIterator
console.log(`
--- (Dw#4) ---`);

let jsdom = require ('../Html/HtmlDom1.js');
const iterator = jsdom.dom.window.document.createNodeIterator(jsdom.dom.window.document);

//--- Many style guides recommend putting additional parentheses as a grouping operator () around the assignment in While - while ((currentNode = iterator.nextNode())) {}
console.log(`
--- (Dw#5) ---`);
let currentNode;
while ((currentNode = iterator.nextNode())) {
  console.log(currentNode, currentNode.nodeName);
}


