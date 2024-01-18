//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

//--- escape char and long string - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#escape_sequences
console.log(`
--- (Ts#1) ---`);

const longString =
  "This is a very long string which needs \
to wrap across multiple lines because \
otherwise my code is unreadable.";

console.log(longString)

//--- Raw strings allows without processing escape sequences. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#raw_strings
console.log(`
--- (Ts#2) ---`);

function tag1(strings) {
  console.log(strings.raw[0]);
}

tag1`string text line 1 \n string text line 2`

//--- template litheral on String.raw 
console.log(`
--- (Ts#3) ---`);

const str2 = String.raw`Hi\n${2 + 3}!`; // "Hi\\n5!"
console.log(str2)

//--- string array join
console.log(`
--- (Ts#4) ---`);

console.log(str2.length); // 6
console.log(Array.from(str2).join(","));

//--- escape a backtick and dollar
console.log(`
--- (Ts#5) ---`)

console.log(`\`` === "`"); // true
console.log(`\${1}` === "${1}") // true

//--- Use backtick to create multiline string
console.log(`
--- (Ts#6) ---`)

console.log("string text line 1\n" + "string text line 2");
console.log(`string text line 1
string text line 2`);

//--- String interpolation
console.log(`
--- (Ts#7) ---`)

const a = 5;
const b = 10;
console.log("Fifteen is " + (a + b) + " and\nnot " + (2 * a + b) + ".");

console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.`);

//---  Nesting templates
console.log(`
--- (Ts#8) ---`)

const isLargeScreen = () => ""
class item {
    get isCollapsed() {
        return "expander"
    }
}
const classes = `header 
        ${isLargeScreen() ? "" : `icon-${item.isCollapsed ? "expander" : "collapser"}`
    }`;

//--- Tagged templates
console.log(`
--- (Ts#9) ---`)

const person = "Mike";
const age = 28;

function myTag(strings, personExp, ageExp) {
    const str0 = strings[0]; // "That "
    const str1 = strings[1]; // " is a "
    const str2 = strings[2]; // "."

    const ageStr = ageExp > 99 ? "centenarian" : "youngster";

    // We can even return a string built using a template literal
    return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

const output = myTag`That ${person} is a ${age}.`;

console.log(output);
// That Mike is a youngster.

//--- The tag does not have to be a plain identifier. 
console.log(`
--- (Ts#10) ---`)

console.log`Hello`; // [ 'Hello' ]
console.log.bind(1, 2)`Hello`; // 2 [ 'Hello' ]
new Function("console.log(arguments)")`Hello`; // [Arguments] { '0': [ 'Hello' ] }

function recursive(strings, ...values) {
    console.log(strings, values);
    return recursive;
}
recursive`Hello``World`;
// [ 'Hello' ] []
// [ 'World' ] []

//--- Nesting templates literal syntax and closures https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#nesting_templates
console.log(`
--- (Ts#11) ---`)

function template(strings, ...keys) {
    return (...values) => {
        const dict = values[values.length - 1] || {};
        const result = [strings[0]];
        keys.forEach((key, i) => {
            const value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join("");
    };
}

const t1Closure = template`${0}${1}${0}!`;
console.log(1, t1Closure("Y", "A")); // "YAY!"

const t1Closure1 = template(["", "", "", "!"], 0, 1, 0);
console.log(2, t1Closure1("Y", "A")) // "YAY!""

const t2Closure = template`${0} ${"foo"}!`;
console.log(3, t2Closure("Hello", { foo: "World" })); // "Hello World!"

const t2Closure1 = template(["", " ", "!"], 0, "foo");
console.log(4, t2Closure1(["", " ", "!"], 0, "foo")); // ", ,! !""

const t3Closure1 = template`I'm ${"name"}. I'm almost ${"age"} years old.`;
console.log(5, t3Closure1("foo", { name: "MDN", age: 30 })); // "I'm MDN. I'm almost 30 years old."
console.log(6, t3Closure1({ name: "MDN", age: 30 })); // "I'm MDN. I'm almost 30 years old."

const t3Closure2 = template(["I'm ", ". I'm almost ", " years old."], "name", "age");
console.log(7, t3Closure2()) // "I'm . I'm almost  years old.""

//--- For any particular tagged template literal expression, the tag function will always be called with the exact same literal array, no matter how many times the literal is evaluated.
console.log(`
--- (Ts#12) ---`)

const callHistory = [];

function tag2(strings, ...values) {
    callHistory.push(strings);
    // Return a freshly made object
    return {};
}

function evaluateLiteral() {
    return tag2`Hello, ${"world"}!`;
}

console.log(evaluateLiteral() === evaluateLiteral()); // false; each time `tag` is called, it returns a new object
console.log(callHistory[0] === callHistory[1]); // true; all evaluations of the same tagged literal would pass in the same strings array

//--- passes literal array to String.raw
console.log(`
--- (Ts#13) ---`)

const identity = (strings, ...values) =>
    String.raw({ raw: strings }, ...values);
console.log(identity`Hi\n${2 + 3}!`);
// Hi
// 5!

//--- (14) format this literal's content as HTML
console.log(`
--- (Ts#14) ---`)

const html = (strings, ...values) => String.raw({ raw: strings }, ...values);
const doc = html`<!doctype html>
  <html lang="en-US">
    <head>
      <title>Hello</title>
    </head>
    <body>
      <h1>Hello world!</h1>
    </body>
  </html>`;
console.log(doc)

//--- (15) Tagged templates and escape sequences \unicode
console.log(`
--- (Ts#15) ---`)

function latex(str) {
    return { cooked: str[0], raw: str.raw[0] };
}

console.log(latex`\unicode`)
// { cooked: undefined, raw: "\\unicode" }
