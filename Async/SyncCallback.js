//--- async function show the same time because it invoke synchronously
console.log(`
--- (Sc#1) ---`);

function Calc(number, callback) {
    setTimeout(function () {
        if (typeof number !== 'number') {
            callback(new Error("Wrong type of argument"))
            return
        }
        const result = number * number;
        callback(null, result);
    }, 1000)
}

var now1 = new Date();
console.log(now1.getSeconds());

Calc(1, function (err, res) {
    var now2 = new Date();
    console.log(res + " " + now2.getSeconds())
})

Calc(2, function (err, res) {
    var now3 = new Date();
    console.log(res + " " + now3.getSeconds())

    Calc(3, function (err, res) {
        var now4 = new Date();
        console.log(res + " " + now4.getSeconds())
    })
})



