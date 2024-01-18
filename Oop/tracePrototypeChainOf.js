//nodejs does not know include, you should use only require or import
//https://nodejs.org/docs/v0.3.2/api/modules.html

console.log(`
--- (Pc#1) ---`)

exports.tracePrototypeChainOf = function tracePrototypeChainOf(object) {
    var proto = null
    if (Object.getPrototypeOf(object) !== null) {
        var proto = object.constructor.prototype
    }
    let result = `${typeof object.name === 'undefined' ? '(.)' : '(' + object.name + ')'}`;
    if (proto === null) {
        return `${result} -> (null)`
    }
    else {
        while (proto) {
            result += ' -> ' + proto.constructor.name;
            proto = Object.getPrototypeOf(proto)
        }
        return result;
    }
}

