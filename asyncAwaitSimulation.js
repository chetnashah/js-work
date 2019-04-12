// async await simulation assuming you already have generators and promises.
function retAfter3Secs(cb){
    setTimeout(() => {
        cb('after3sec');
    }, 3000);
}

function retAfter7Secs(cb) {
    setTimeout(() => {
        cb('after7sec');
    }, 7000);
}

function promisify(regFn) {
    return new Promise((resolve, reject) => {
        regFn(resolve);
    });
}

// async await simulated using bsync and generators
// given a generator that can generate promises (makeGenerator),
// bsync can iterate the promise by resolving one and calling next in chain as needed.
function bsync(makeGenerator){
  return function () {
    var generator = makeGenerator.apply(this, arguments);

    function handle(result){
      // result => { done: [Boolean], value: [Object] }
      if (result.done) return Promise.resolve(result.value);
      // Promise.resolve is used to wrap result.value because 
      // result.value may or may not be a promise... (typical library code)
      return Promise.resolve(result.value).then(function (res){
        return handle(generator.next(res));
      }, function (err){
        return handle(generator.throw(err));
      });
    }

    try {
      return handle(generator.next());
    } catch (ex) {
      return Promise.reject(ex);
    }
  }
}

var login = bsync(function* (username, password, session) {
  // yield works like await
  var user = yield promisify(retAfter3Secs);
  console.log('user = ', user);
  // yield works like await
  var hash = yield promisify(retAfter7Secs);
  console.log('hash = ', hash);
  console.log('login done!');
  return 'haha';
});

login('abc', 'def').then(function(res) {
    console.log('login promise got: ', res);
});







