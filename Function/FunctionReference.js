//---  function can apply to any array elements, pass function reference as parameter
console.log(`
--- (Fe#1) ---`);

const factorial = function fac(n) {
    return n < 2 ? 1 : n * fac(n - 1);
};

function applyForEach(f, a) {
    const result = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
        result[i] = f(a[i]);
    }
    return result;
}

//factorial - this is reference, instead factorial()
console.log(applyForEach(factorial, [2, 3, 4]))