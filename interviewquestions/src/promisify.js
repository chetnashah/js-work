/**
 * Take in a function fn, that returns its control flow via a accepting a callback (as last argument)
 * and return promisified version of fn.
 * @param {*} fn 
 * @returns 
 */
function promisify(fn) {
    // Write your code here.
    // return a function, which when called triggers callback execution and returns promise
    return function(...args) {
      
      return new Promise((resolve, reject) => {
        // executed synchronously
        // convention: last argument callback
        fn.call(this, ...args, function(err, val){
          if(err) {
            return reject(err);
          } 
          resolve(val);
        })
      });
    }
  }