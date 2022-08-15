// https://bigfrontend.dev/problem/implement-lodash-get

/**
 * Given an object and a nested-path and a defaultValue,
 * return value at nested-path on object, or return defaultValue if does not exist
 *
 * Note- the input can be a string path 
 * or string[] where each string is one access prop inside object
 * 
 * Things to keep in mind: we might have path like 'a.b.c[1]' so array index access
 * has to be converted to dotted prop access for simple parsing i.e.
 * 'a.b.c[1]' -> 'a.b.c.1' so that we can split on basis of "." and recurse the access
*/

function get(obj, path, defaultValue) {
    let propsPath = path;
    if(!path) {// path can be '',null, undefined
        // clarify: // some implementations would want you to return obj instead of defaultValue
        return defaultValue;
    }

    if(!Array.isArray(path)) {
        // need to convert array index notation to dot notation for easier split and parse
        propsPath = path.replace("[",".").replace("]", "").split(".");
    }
    if(propsPath.length === 0) {
        // clarify: some implementation might want to return obj instead of defaultValue
        return defaultValue;
    }
    let curr = obj;// recursive trace
    for(let i=0;i<propsPath.length;i++) {
        const prop = propsPath[i];
        if(!curr.hasOwnProperty(prop)) {
            return defaultValue;
        }
        curr = curr[prop];
    }
    return curr;
}

module.exports = {
    get
};
