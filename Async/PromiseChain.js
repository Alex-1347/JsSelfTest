//--- (1) Promise onFulfill and onReject functions
console.log(`
--- (Ph#1) ---`)

function calc(number) {
    const promise = new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (typeof number !== 'number') {
                return reject(new Error('wrong argument type'));
            }
            const result = number * number;
            resolve(result);
        }, 1000);
    });
    return promise;
};

calc('a').then(val => { console.log(val) }, reason => { console.log('Error ' + reason) })
    //--- promise chain - one Than after another
    .then(
        calc(2).then(val => { console.log(val) }, reason => { console.log('Error ' + reason) })
    );

//--- (2) capture error in next chian
console.log(`
--- (Ph#2) ---`)

calc(3).then(val => {
    console.log(val)
    return val;
},
    reason => {
        console.log('Error ' + reason)
    })
    .then(
        val => {
            console.log(val)
        }, reason => {
            console.log('Error ' + reason
            )
        });

//--- (3) pass Error to second chain
console.log(`
--- (Ph#3) ---`)

calc(4).then(val => {
    console.log(val)
    throw new Error("Err1")
},
    reason => {
        console.log('Error ' + reason)
    })
    .then(
        val => {
            console.log(val)
        }, reason => {
            console.log('Error ' + reason
            )
        });

//--- (4) pass promise to second chain
console.log(`
--- (Ph#4) ---`)

calc(4).then(val => {
    console.log(val)
    return calc(5)
},
    reason => {
        console.log('Error ' + reason)
    })
    .then(
        val => {
            console.log(val)
        }, reason => {
            console.log('Error ' + reason
            )
        });

//--- (5) pass wrong promise with error to second chain        
console.log(`
--- (Ph#5) ---`)

calc(4).then(val => {
    console.log(val)
    return calc('a')
},
    reason => {
        console.log('Error ' + reason)
    })
    .then(
        val => {
            console.log(val)
        }, reason => {
            console.log('Error ' + reason
            )
        });

console.log('end')
