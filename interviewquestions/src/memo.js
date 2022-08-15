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

