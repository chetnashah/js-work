function promisify(callback) {
    // Write your code here.
    // return a function, which when called triggers callback execution and returns promise
    return function(...args) {
      
      return new Promise((resolve, reject) => {
        // executed synchronously
        callback.call(this, ...args, function(err, val){
          if(err) {
            return reject(err);
          } 
          resolve(val);
        })
      });
    }
  }