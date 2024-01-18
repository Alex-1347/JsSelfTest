// https://nodejs.org/api/async_hooks.html
//--- node:async_hooks, If Workers are used, each thread has an independent async_hooks interface, and each thread will use a new set of async IDs.
console.log(`
--- (Ah#1) ---`)

const async_hooks1 = require('node:async_hooks');

// Return the ID of the current execution context.
const eid = async_hooks1.executionAsyncId();

// Return the ID of the handle responsible for triggering the callback of the
// current execution scope to call.
const tid = async_hooks1.triggerAsyncId();

// Create a new AsyncHook instance. All of these callbacks are optional.
const asyncHook1 = async_hooks1.createHook({ init, before, after, destroy, promiseResolve });

// Allow callbacks of this AsyncHook instance to call. This is not an implicit
// action after running the constructor, and must be explicitly run to begin
// executing callbacks.
asyncHook1.enable();

// Disable listening for new asynchronous events.
asyncHook1.disable();

//
// The following are the callbacks that can be passed to createHook().
//

// init() is called during object construction. The resource may not have
// completed construction when this callback runs. Therefore, all fields of the
// resource referenced by "asyncId" may not have been populated.
function init(asyncId, type, triggerAsyncId, resource) { }

// before() is called just before the resource's callback is called. It can be
// called 0-N times for handles (such as TCPWrap), and will be called exactly 1
// time for requests (such as FSReqCallback).
function before(asyncId) { }

// after() is called just after the resource's callback has finished.
function after(asyncId) { }

// destroy() is called when the resource is destroyed.
function destroy(asyncId) { }

// promiseResolve() is called only for promise resources, when the
// resolve() function passed to the Promise constructor is invoked
// (either directly or through other means of resolving a promise).
function promiseResolve(asyncId) { }


//--- Asynchronous context example. The context tracking use case is covered by the stable API AsyncLocalStorage. 
console.log(`
--- (Ah#2) ---`)

const async_hooks = require('node:async_hooks');
const fs = require('node:fs');
const net = require('node:net');
const { fd } = process.stdout;

let indent = 0;
async_hooks.createHook({
    init(asyncId, type, triggerAsyncId) {
        const eid = async_hooks.executionAsyncId();
        const indentStr = ' '.repeat(indent);
        fs.writeSync(
            fd,
            `${indentStr}${type}(${asyncId}):` +
            ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
    },
    before(asyncId) {
        const indentStr = ' '.repeat(indent);
        fs.writeSync(fd, `${indentStr}before:  ${asyncId}\n`);
        indent += 2;
    },
    after(asyncId) {
        indent -= 2;
        const indentStr = ' '.repeat(indent);
        fs.writeSync(fd, `${indentStr}after:  ${asyncId}\n`);
    },
    destroy(asyncId) {
        const indentStr = ' '.repeat(indent);
        fs.writeSync(fd, `${indentStr}destroy:  ${asyncId}\n`);
    },
}).enable();

net.createServer(() => { }).listen(8080, () => {
    // Let's wait 10ms before logging the server started.
    setTimeout(() => {
        console.log('>>>', async_hooks.executionAsyncId());
    }, 10);
});