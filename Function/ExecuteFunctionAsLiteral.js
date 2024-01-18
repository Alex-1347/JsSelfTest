//--- execute function as literal
console.log(`
--- (Fl#1) ---`);

const html = (strings, ...values) => String.raw({ raw: strings }, ...values);

//ordinary execute
doc1 = html(`01234567890123456789`,'xx','yyy','zzzzz','','qqq',null);
console.log(1, doc1); //0xx1yyy2zzzzz34qqq5null67890123456789

//as literal
const doc2 = html`<!doctype html>
  <html lang="en-US">
    <head>
      <title>Hello</title>
    </head>
    <body>
      <h1>Hello world!</h1>
    </body>
  </html>`;
console.log(2, doc2)
