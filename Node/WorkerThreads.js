//https://medium.com/nodejsmadeeasy/workers-threads-in-node-js-part2-ec45ac084963

//--- start longcalculations and measure time console.end
console.log(`
--- (Wt#1) ---`)

const threadCount = +process.argv[2] || 2;
const start = require('./LongCalc.js');
console.time(`primes-with-${threadCount}-worker-threads`);
start(threadCount).then(function (res) {
    console.timeEnd(`primes-with-${threadCount}-worker-threads`);
});