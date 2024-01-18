//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion
// When the grammar forbids line terminators in some place but a line terminator is found, a semicolon is inserted.

//expr <here> ++, expr <here> --
//continue <here> lbl
//break <here> lbl
//return <here> expr
//throw <here> expr
//yield <here> expr
//yield <here> * expr
//(param) <here> => {}
//async <here> function, async <here> prop(), async <here> function*, async <here> *prop(), async <here> (param) <here> => {}

//--- Automatically insert semiclon. This code  return undefined, because a semicolon is inserted directly after the return keyword, without evaluating a + b
console.log(`
 --- (Sl#1) ---`);

function sum1(a, b) {
    return
    a + b;
}
function sum2(a, b) {
    return (
        a + b);
}
console.log(sum1(1, 2), sum2(1, 2))

