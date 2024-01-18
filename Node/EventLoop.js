//

//that the arguments and local variables may continue to exist, as they are stored outside the stack — so they can be accessed by any nested functions long after their outer function has returned.

//--- JavaScript runtime collecting events, and executing queued sub-tasks of accumulated event - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
console.log(`
--- (El#1) ---`)

const seconds = new Date().getTime() / 1000;

setTimeout(() => {
    // prints out "Ran after 2.003000020980835 seconds", meaning that the callback is not called immediately after 500 milliseconds.
    console.log(`Ran after ${new Date().getTime() / 1000 - seconds} seconds`);
}, 500);

while (true) {
    if (new Date().getTime() / 1000 - seconds >= 2) {
        console.log("Good, looped for 2 seconds");
        break;
    }
}

//https://medium.com/nodejsmadeeasy/nodejs-event-loop-lag-5d5928fd03c

//---  (2) how Node call simple thread JS-program
console.log(`
--- (El#2) ---`)

let stop = false;

//event-loop timer phase
//set stop to true after 100 ms
setTimeout(() => stop = true, 100);

/*blocking code
 Event loop timer phase or any other phase  could not be executed 
*/

let i = 0 //debug only - stop after 10 iteration
while (i < 10 && !stop) {
    i++
    console.log(i, "I am blocking event loop");
}

//--- IIFE function executed immediatelly, but callaback with setTimeout after all main stack calculation finished
console.log(`
--- (El#3) ---`);

(() => {
    console.log("this is the start");

    setTimeout(() => {
        console.log("Callback 1: this is a msg from call back");
    }); // has a default time value of 0

    console.log("this is just a message");

    setTimeout(() => {
        console.log("Callback 2: this is a msg from call back");
    }, 0);

    console.log("this is the end");
})();

//--- prints out "Ran after 2.003000020980835 seconds", meaning that the callback is not called immediately after 500 milliseconds.
console.log(`
--- (end) ---`);

// "this is the start"
// "this is just a message"
// "this is the end"
// "Callback 1: this is a msg from call back"
// "Callback 2: this is a msg from call back"


