/**
 * Implementing call without using native call/apply/bind
 * @param {*} thisContext 
 * @param  {...any} args 
 * @returns 
 */
Function.prototype.myCall = function (userContext, ...args) {// thisContext is user provided custom context obj
    // cannot modify thisContext
    // cannot use original call/apply/bind
    let s = Symbol();// symbols are unique so no clashes, preferred over property, which we can accidentally override
    userContext[s] = this;// we store original fn which is "this", as a property of custom userContext
    let ret = userContext[s](...args);// making use of fact that when method on an obj, is called, its "this" is obj.
    delete userContext[s];// wipe modification we did
    return ret;
};