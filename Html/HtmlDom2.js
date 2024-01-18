//--- Create Html dom with html-element, return Promise

console.log(`
--- (Dm#2) ---`)

const HTML = require('html-element');
const doc = `<body>
            </body>`;
console.log(doc)
const page = HTML.document.createElement(doc)
page.appendChild('<div>1</div>')
page.appendChild('<div>2</div>')
page.appendChild('<div>3</div>')
console.log(page)

exports.page = page