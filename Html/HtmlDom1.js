//--- Create Html dom with jsdom

console.log(`
--- (Dm#1) ---`)

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

const jsdom = require("jsdom");   //https://stackoverflow.com/questions/11398419/trying-to-use-the-domparser-with-node-js
const dom = new jsdom.JSDOM(doc); // more html parsers https://stackoverflow.com/questions/11398419/trying-to-use-the-domparser-with-node-js

console.log(dom)
exports.dom = dom


