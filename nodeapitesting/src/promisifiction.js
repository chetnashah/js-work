
const { randomBytes } =  require('crypto');
const randomBytesP = promisify(randomBytes);

randomBytesP(32)
.then(buffer => {
  console.log(`Random bytes: ${buffer.toString()}`)
})

function promisify(callbackBasedApi) {
  return function promisifed(...args){
    return new Promise((resolve, reject) => {
      callbackBasedApi(...args, function(err, result){
        if(err) {
          return reject(err);
        }
        resolve(result);
      })
    });
  }
}

