//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays
//typed arrays are array-like objects that provide a mechanism for reading and writing raw binary data in memory buffers.
//There are two types of buffers: ArrayBuffer and SharedArrayBuffer that provide four methods Allocate, Copy, Transfer, Resize

//--- Type of TypedArray
//Int8Array 	        -128 to 127 	1 	byte
//Uint8Array 	           0 to 255 	1 	octet
//Uint8ClampedArray 	   0 to 255 	1 	octet
//Int16Array 	    -32768 to 32767 	2 	short
//Uint16Array 	         0 to 65535 	2 	unsigned short
//Int32Array -2147483648 to 2147483647 	4 	long
//Uint32Array 	    0 to 4294967295 	4 	unsigned long
//Float32Array 	   -3.4e38 to 3.4e38 	4 	unrestricted float
//Float64Array 	-1.8e308 to 1.8e308 	8 	unrestricted double
//BigInt64Array 	-263 to 263 - 1 	8 	bigint
//BigUint64Array 	   0 to 264 - 1 	8 	bigint


//--- (1) Different way to create Int9Array https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array
console.log(`
--- (At#1) ---`);

// From a length
const int8 = new Int8Array(2);
int8[0] = 42;
console.log(int8[0]); // 42
console.log(int8.length); // 2
console.log(int8.BYTES_PER_ELEMENT); // 1

// From an array
const x = new Int8Array([21, 31]);
console.log(x[1]); // 31

// From another TypedArray
const y = new Int8Array(x);
console.log(y[0]); // 21

// From an ArrayBuffer
const buffer8 = new ArrayBuffer(8);
const z = new Int8Array(buffer8, 1, 4);
z[1]=1
console.log(buffer8); 
console.log(z.byteOffset); // 1

// From an iterable
const iterable = (function* () {
    yield* [1, 2, 3];
})();
const int8FromIterable = new Int8Array(iterable);  // Int8Array [1, 2, 3]
console.log(int8FromIterable)


//--- (2) example to access data 
console.log(`
--- (At#2) ---`)

const typedArray1 = new Int8Array(8);
typedArray1[0] = 32;
const typedArray2 = new Uint8Array(typedArray1);
typedArray2[1] = 42;
console.log(typedArray1);// Expected output: Int8Array [32, 0, 0, 0, 0, 0, 0, 0]
console.log(typedArray2);// Expected output: Int8Array [32, 42, 0, 0, 0, 0, 0, 0]


//--- (3) set up Array and access to it as octet
console.log(`
--- (At#3) ---`);

const buffer = new ArrayBuffer(16);
const uint8 = new Uint8Array(buffer);
uint8.set([228, 189, 160, 229, 165, 189]);

if (buffer.byteLength === 16) {
    console.log("Yes, it's 16 bytes.", buffer);
} else {
    console.log("Oh no, it's the wrong size!");
}
const int32View = new Int32Array(buffer);

//--- (4) Multiple views on the same data
console.log(`
--- (At#4) ---`);

console.log(int32View)
for (let i = 0; i < int32View.length; i++) {
    console.log(int32View[i])
}

const int32Array =new Uint32Array (buffer);
console.log(int32Array)

const int16View = new Int16Array(buffer);
for (let i = 0; i < int16View.length; i++) {
    console.log(`${i}: ${int16View[i]}`);
}

const float32View = new Float32Array(buffer);
console.log(float32View[0])


//--- (5) TextDecoder
console.log(`
--- (At#5) ---`);

const text = new TextDecoder().decode(uint8);
console.log(text)

//--- (6) FromCharCode
console.log(`
--- (At#6) ---`);

console.log(String.fromCharCode(...uint8))

//--- (7) Conversion to normal arrays
console.log(`
--- (At#7) ---`);

const typedArray = new Uint8Array([1, 2, 3, 4]);
console.log(Array.from(typedArray));
console.log([...typedArray]);  //using spread syntax

//--- (8) DataView method (+ArrayBuffer and Array.From)
console.log(`
--- (At#8) ---`);

function toBinary(
    x,
    { type = "Float64", littleEndian = false, separator = " ", radix = 16 } = {},
) {
    const bytesNeeded = globalThis[`${type}Array`].BYTES_PER_ELEMENT;
    const dv = new DataView(new ArrayBuffer(bytesNeeded));
    dv[`set${type}`](0, x, littleEndian);
    const bytes = Array.from({ length: bytesNeeded }, (_, i) =>
        dv
            .getUint8(i)
            .toString(radix)
            .padStart(8 / Math.log2(radix), "0"),
    );
    return bytes.join(separator);
}

console.log(toBinary(1.1)); // 3f f1 99 99 99 99 99 9a
console.log(toBinary(1.1, { littleEndian: true })); // 9a 99 99 99 99 99 f1 3f
console.log(toBinary(20, { type: "Int8", radix: 2 })); // 00010100


