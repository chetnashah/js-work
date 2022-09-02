// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// https://bigfrontend.dev/problem/implement-JSON-stringify
// https://bigfrontend.dev/problem/implement-JSON-parse

function JSONParse() {

}


/**
 * Edge cases: passing undefined directly returns undefined value instead of "undefined" string
 * But undefined in a array is converted to null e.g. JSON.stringify([1, undefined, 22]) -> "[1,null,22]"
 * 
 * undefined, Functions, and Symbols are not valid JSON values.
 *  If encountered as value in an object, both key-value are ignored, 
 * but if encountered in array, they are converted to null
 * 
 * Note how they can never be found in JSON
 * that is transferred over the wire and used by other languages
 * 
 * The numbers Infinity and NaN, as well as the value null, are all considered null
 * 
 * numbers, booleans if encountered as values in object or array, they are not converted to strings 
 * 
 * @param {} v 
 * @returns 
 */
let visited = new Set(); // to check for cyclic references Set is a good choice, since it stores objects as is
function JSONStringify(v) {
    visited = new Set();
    return JSONStringifyHelper(v, false);
}

function JSONStringifyHelper(v, isInArrayOrObject) {
    // base
    if(typeof v === "string" || v instanceof String) { // special check for String objects i.e. new String("hi")
        return isInArrayOrObject ? `"${v}"` : v;
    }
    /**
     *
     *  * undefined, Functions, and Symbols are not valid JSON values.
     *  If encountered as value in an object, both key-value are ignored, (guareded check should be made before recursing)
    * but if encountered in array, they are converted to null
    * 
    * at top level they returned undefined
     */
    if(v === undefined || typeof v === "symbol" || typeof v === "function") {
        return isInArrayOrObject ? "null" : undefined;
    }

    /**
     *  * The numbers Infinity and NaN, as well as the value null, are all considered null
     */
    if(v === null || Number.isNaN(v) || v === Infinity) {
        return "null";
    }
    if(typeof v !== "object" || v instanceof Boolean || v instanceof Number) {
        return v.toString();
    }

    // check for cyclick references
    if(visited.has(v)) {
        throw new Error("cyclic object value");
    }

    // typeof v is object: either array or object
    let ans = '';
    if(Array.isArray(v)) {
        ans = ans + '[';
        visited.add(v);
        v.forEach((k, idx) => {
            let s = JSONStringifyHelper(k, true);
            ans = ans+s + (idx == v.length - 1 ? '' : ',');
        })
        ans = ans + ']';
        return ans;
    }

    if(v.constructor === Date) {
        return `"${v.toISOString()}"`;
    }

    if(typeof v === "object") {
        ans = ans + '{';
        visited.add(v);
        const keys = Object.keys(v);
        keys.forEach((k, idx) => {
            let keyPart = JSONStringifyHelper(k, true);// TODO, key part is string coercion, not stringification
            // if value part is one of undefined, symbol or function, skip that key/value
            if(v[k] === undefined || typeof(v[k]) === "symbol" || typeof(v[k]) === "function") {
                return;// skip this k/v in forEach
            }
            let valuePart = JSONStringifyHelper(v[k], true);
            ans = ans + (keyPart+ ":" +valuePart) + (idx === (keys.length - 1) ? '' : ',');
        });
        ans = ans + '}';
        return ans;
    }
}

module.exports = {
    JSONParse,
    JSONStringify
};