// https://bigfrontend.dev/problem/implement-general-memoization-function

/**
 * Creates a function that memoizes the result of func. 
 * If resolver is provided, it determines the cache key for storing the result 
 * based on the arguments provided to the memoized function. 
 * 
 * By default, the first argument provided to the memoized function is used as the map cache key. 
 * The func is invoked with the this binding of the memoized function.

Note: The cache is exposed as the cache property on the memoized function. 
Its creation may be customized by replacing the _.memoize.Cache constructor 
with one whose instances implement the Map method interface of clear, delete, get, has, and set.
 */

/**
 * Implementaiton considerations: if objects are cache keys,
 * each object needs to be uniquely identified, otherwise, all 
 * all the objects collide to form same key "[object Object]".
 * 
 * One of the ways to mitigate this is to use JSON.stringify to form
 * cache key instead of letting all objects co-erce to "[object Object]"
 * 
 * One slow way to do this: store cache keys and their calculated values
 * in array where both keys and values are stored by references.
 * Then do an array comparision/search by references, 
 * this way we eliminate co-ercion problem
 * 
 * Elegant solution: Remember Js Map data structure allows object like key-value
 * storage without the problem of key coercion to string!
 * 
 * @param {} fn 
 * @param {*} resolver 
 * @returns 
 */

function memoize(fn, resolver){

    // Map does not have problem of key co-ercion like objects
    let memo = new Map();

    return (...args) =>{
        const firstArg = args[0];
        
        if(memo.has(firstArg)) {
            return memo.get(firstArg);
        }
        const value = fn(...args);
        memo.set(firstArg, value);

        return value;
    };
}

module.exports = {
    memoize
};