
Function.prototype.myBind = function (thisContext, ...args) {
    let thatFn = this;
    // return a function that uses given thisContext as well as first few given args applied ahead of time
    return function(...a) { // capture outisde args and thatFn, which will be used when we call fn at this line
      let s = Symbol();
      thisContext[s] = thatFn;
      let ret = thisContext[s](...args,...a);// args given to bind + args given to actual fn applied together
      delete thisContext[s];
      return ret;
    };
  };
  