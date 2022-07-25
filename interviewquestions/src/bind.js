
Function.prototype.myBind = function (thisContext, ...args) {
    let thatFn = this;
    // return a function that uses given thisContext as well as first few given args applied ahead of time
    return function(...a) {
      let s = Symbol();
      thisContext[s] = thatFn;
      let ret = thisContext[s](...args,...a);
      delete thisContext[s];
      return ret;
    };
  };
  