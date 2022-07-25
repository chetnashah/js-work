/**
 * Implementing call without using native call/apply/bind
 * @param {*} thisContext 
 * @param  {...any} args 
 * @returns 
 */
Function.prototype.myCall = function (thisContext, ...args) {
    // cannot modify thisContext
    // cannot use original call/apply/bind
    let s = Symbol();
    thisContext[s] = this;
    let ret = thisContext[s](...args);
    delete thisContext[s];
    return ret;
};