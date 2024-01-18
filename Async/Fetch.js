//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API - replacement for XMLHttpRequest.
const fetch = require("node-fetch");

//--- (1) simple fetch with JSON
console.log(`
--- (Ft#1) ---`)

fetch('https://www.omdbapi.com/?s=batman&y=2018&apikey=ed4903dc')
    .then((response) => {
        console.log(1, response)
        return response.json()
    })
    .then((json) =>
        console.log(2, json))


//--- (2) Async/Await fitch
//https://stackoverflow.com/questions/48433783/referenceerror-fetch-is-not-defined
console.log(`
--- (Ft#2) ---`);

async function downloadTxt(url) {
    const response = await fetch(url, {
        mode: 'no-cors',
    })
    const txt = await response.text();
    console.log(3)
    return txt
}

//--- (3) async IIFE https://developer.mozilla.org/en-US/docs/Glossary/IIFE
console.log(`
--- (Ft#3) ---`);

(async () => {
    const txt = await downloadTxt("https://dog.ceo/api/breeds/list/all");
    console.log(4, txt);
}
)();

//--- pass result of async function to then
console.log(`
--- (Ft#4) ---`);

txt = downloadTxt("https://dog.ceo/api/breeds/list/all").then(console.log(5))
console.log(6, txt)

//--- (4) error handle http://blog.niftysnippets.org/2018/06/common-fetch-errors.html
console.log(`
--- (Ft#5) ---`);








