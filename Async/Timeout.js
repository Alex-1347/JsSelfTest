//--- Promise timeout merge to one
//https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick

console.log(`
--- (Tt#1) ---`)

function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const start = Date.now();

for (let i = 0; i < 5; i++) {
    Sleep(1000).then(() => {
        const millis = Date.now() - start
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
        console.log('+', i, `${Math.floor(millis / 1000)}`)
    })
}

//each one sec

for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        const millis = Date.now() - start
        console.log('-',i, `${Math.floor(millis / 1000)}`), 1000
    })
}


console.log(`end`)
