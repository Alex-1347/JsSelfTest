//https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API

//https://github.com/mdn/dom-examples/tree/main/web-workers/simple-web-worker

//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing_workers

//https://html.spec.whatwg.org/multipage/workers.html

//https://mdn.github.io/dom-examples/

//--- worker threading
console.log(`
--- (Ww#1) ---`)

const Worker = require('node:worker_threads');

if (typeof (Worker) !== "undefined") {
  console.log('Yes! Web worker support!')

} else {
  console.log('Sorry! No Web Worker support.')
}

//https://nodejs.org/api/worker_threads.html

const {
   isMainThread, parentPort, workerData,
} = require('node:worker_threads');

if (isMainThread) {
  module.exports = function parseJSAsync(script) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: script,
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
} else {
  const { parse } = require('some-js-parsing-library');
  const script = workerData;
  parentPort.postMessage(parse(script));
} 

