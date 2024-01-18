//--- Tab Session Manager parser
console.log(`
--- (Fs#1) ---`)

const fs = require("fs");
const J = JSON.parse(fs.readFileSync('./MDN.json', 'utf8'));
const nodes = J[0].windows["1076"];
const ind = Array.from({ length: 500 }, (v, k) => k + 1);
//ind.forEach((v,i,arr)=> {arr[i]=arr[i]+190})
//console.log(ind)
const arr = []
ind.forEach((v, i) => {
    const one = nodes[v]
    if (typeof one !== 'undefined') {
        arr.push(one.url)
    }
})
arr.sort()
arr.forEach((x, i) => {
    console.log(`${i} ${x}`)
})

