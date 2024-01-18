//https://nodejs.dev/en/api/v19/events/#emittereventnames

//--- (1) emit events with EventEmitter.emit and process events
console.log(`
--- (Ee#1) ---`)

const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

let myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');

//--- (2) pass arguments
console.log(`
--- (Ee#2) ---`)

myEmitter.on('event', function(a, b) {
  console.log(a, b, this, this === myEmitter);
});
myEmitter.emit('event', '1', '2');