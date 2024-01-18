//--- look to Html Folder to list of all global function on Node.JS and Browser
//--- The decodeURI() function decodes a Uniform Resource Identifier (URI) previously created by encodeURI or by a similar routine.    
//--- The encodeURI() method encodes a Uniform Resource Identifier (URI) by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character (will only be four escape sequences for characters composed of two "surrogate" characters).       -
console.log(`
--- (Pf#1) ---`)

const uri = 'https://mozilla.org/?x=шеллы';
const encoded = encodeURI(uri);
console.log(encoded);
// Expected output: "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"

try {
    console.log(decodeURI(encoded));
    // Expected output: "https://mozilla.org/?x=шеллы"
} catch (e) {
    // Catches a malformed URI
    console.error(e);
}

//--- The decodeURIComponent() method decodes a Uniform Resource Identifier (URI) component previously created by encodeURIComponent or by a similar routine. 
//--- The encodeURIComponent() method encodes a Uniform Resource Identifier (URI) component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character (will only be four escape sequences for characters composed of two "surrogate" characters).    
console.log(`
--- (Pf#2) ---`)

function containsEncodedComponents(x) {
    // ie ?,=,&,/ etc
    return decodeURI(x) !== decodeURIComponent(x);
  }
  
  console.log(containsEncodedComponents('%3Fx%3Dtest')); // ?x=test
  // Expected output: true
  
  console.log(containsEncodedComponents('%D1%88%D0%B5%D0%BB%D0%BB%D1%8B')); // шеллы
  // Expected output: false
    
//--- redirect standard console.log by redefine function console.log to variable
console.log(`
--- (Pf#3) ---`)
globalThis.p = 5;  //define something variable

console.oldLog = console.log;
let log
console.log = (v) => {
    log = v
}
console.log(p)
//restore
console.log = console.oldLog
console.log(3, log)



