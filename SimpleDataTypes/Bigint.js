//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#bigint_coercion

//---  bigint  created by appending n to the end of an integer literal, or by calling the BigInt() function (without the new operator), Only use a BigInt value when values greater than 2^53 are reasonably expected.
console.log(`
 --- (Bg#1) ---`);
const MaxSafeBigInt = 9007199254740991n;

const alsoHuge = BigInt(9007199254740991);// 9007199254740991n

const hugeString = BigInt("9007199254740991");// 9007199254740991n

const hugeHex = BigInt("0x1fffffffffffff");// 9007199254740991n

const hugeOctal = BigInt("0o377777777777777777");// 9007199254740991n

const hugeBin = BigInt(
    "0b11111111111111111111111111111111111111111111111111111",// 9007199254740991n
);

console.log(MaxSafeBigInt, alsoHuge, hugeString, hugeHex, hugeBin)


//--- Operation with Bigint - most do not permit operands to be of mixed types — both operands must be BigInt
console.log(`
 --- (Bg#2) ---`);

const previousMaxSafe = BigInt(Number.MAX_SAFE_INTEGER); // 9007199254740991n
const maxPlusOne = previousMaxSafe + 1n; // 9007199254740992n
const theFuture = previousMaxSafe + 2n; // 9007199254740993n, this works now!
const multi = previousMaxSafe * 2n; // 18014398509481982n
const subtr = multi - 10n; // 18014398509481972n
const mod = multi % 10n; // 2n
const bigN = 2n ** 54n; // 18014398509481984n
const negative = previousMaxSafe * -1n; // -18014398509481984n
const expected = 4n / 2n; // 2n
const truncated = 5n / 2n; // 2n, not 2.5n

console.log(previousMaxSafe, maxPlusOne, theFuture, multi, subtr, mod, bigN, negative, expected, truncated)

//--- compare Bigint with zero
console.log(`
 --- (Bg#3) ---`);

console.log(1, 0n === 0); // false
console.log(2, 0n == 0) // true
console.log(3, 1n < 2); // true
console.log(4, 2n > 1); // true
console.log(5, 2 > 2); // false
console.log(6, 2n > 2); // false
console.log(7, 2n >= 2); // true
const mixed = [4n, 6, -12n, 10, 4, 0, 0n];
console.log(8, mixed.sort())

//--- comparisons with Object-wrapped BigInt
console.log(`
 --- (Bg#4) ---`);

console.log(1, Object(0n) === 0n); // false
console.log(2, Object(0n) === Object(0n)); // false

const o = Object(0n);
console.log(3, o === o); // true

//--- logical compare with Bigint
console.log(`
 --- (Bg#5) ---`);

if (0n) {
    console.log("1");
} else {
    console.log("2"); //2
}

console.log(1, 0n || 12n); // 12n
console.log(2, 0n && 12n); // 0n
console.log(3, Boolean(0n)); // false
console.log(4, Boolean(12n)); // true
console.log(5, !12n); // false
console.log(6, !0n); // true

//--- BigInt values aren't serialized in JSON by default, 
console.log(`
 --- (Bg#6) ---`);

try {
    console.log(JSON.stringify({ a: 1n }));
} catch (error) {
    console.log(error)
}

//--- However, JSON.stringify() has toJSON() method
console.log(`
 --- (Bg#7) ---`);
BigInt.prototype.toJSON = function (x) {
    return x.toString();
};
console.log(BigInt.prototype.toJSON(1n))

//--- custom parser function of BigInt object
console.log(`
 --- (Bg#8) ---`);
const replacer = (key, value) =>
    typeof value === "bigint" ? value.toString() : value;

const data = {
    number: 1,
    big: 18014398509481982n,
};
const stringified = JSON.stringify(data, replacer);

console.log(stringified);


//--- Transform string to BigNumber value on Json
console.log(`
 --- (Bg#9) ---`);
const reviver = (key, value) => (key === "big" ? BigInt(value) : value);

const payload = '{"number":1,"big":"18014398509481982"}';
const parsed = JSON.parse(payload, reviver);

console.log(parsed); // { number: 1, big: 18014398509481982n }


//--- example calculation with Bigint
console.log(`
 --- (Bg#10) ---`);

// Returns true if the passed BigInt value is a prime number
function isPrime(p) {
    for (let i = 2n; i * i <= p; i++) {
        if (p % i === 0n) return false;
    }
    return true;
}

// Takes a BigInt value as an argument, returns nth prime number as a BigInt value
function nthPrime(nth) {
    let maybePrime = 2n;
    let prime = 0n;

    while (nth >= 0n) {
        if (isPrime(maybePrime)) {
            nth--;
            prime = maybePrime;
        }
        maybePrime++;
    }

    return prime;
}

console.log(nthPrime(20n)); // 73n
