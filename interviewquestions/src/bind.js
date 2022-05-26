
// bind takes a thisArg and some fixed args and returns a new function with fixed this value and fixed args
// we can internally use apply/call to do the actual calling!
Function.prototype.mybind = function bind(thisArg, ...callArgs) {
    var originalFn = this;// it is originalFn on which bind is called

    return function(){
        originalFn(callArgs);// use call or apply instead
    }
}