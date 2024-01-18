//--- local file read/write sync and async
console.log(`
--- (Fs#2) ---`)

// this function don't working in Browser
const fs = require("fs");

function print1() {
    console.log(1);
}

function print2() {
    function getNumber2() {
        return 2;
    }
    console.log(getNumber2());
}

function print3() {
    fs.readFile("./number3.txt", "utf-8", function (err, data) {
        console.log(3, data);
    })
}

function print4() {
    fs.readFile("./number3.txt", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(4, data);
    })
}

function print5() {
    const data = fs.readFileSync("./number3.txt", "utf-8")
    console.log(5, data);
}

console.log(6)
setTimeout(print4, 1000);
setTimeout(print5, 1000);

print1();
print2();
print3();
print4();
print5();
