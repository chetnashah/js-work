
### Promise States
A promises has three mutually exclusive states:
1. fullfilled/resolved, if `promise.then(f)` will call f as soon as possible.
2. rejected, if `promise.then(undefined, r)` will call r as soon as possible.
3. pending is neither fullfilled nor rejected.

### Promise Fates
A promise has two mutually exclusive fateS:
1. resolved: A promise is resolved if trying to resolve or reject it has no effect. Means it is locked in to either follow another promise or has been fullfilled or rejected.
2. unresolved: means not resolved. trying to reject or resolve it will have impact on the promise.

A promise can be resolved to:
1. a non-promise value, in which case it is fullvilled with that value
2. a promise or thenable, in which case it will store the promise or
thenable for later unwrapping.

### Relating fates and states.

A promise whose fate is resolved can be in fullfilled state if it has
been resolved to a non-promise value, or it has been resolved to another promise that is fullfilled.

A promise whose fate is resolved can have Rejected state if it has been
rejected directly, or it has been resolved to a promise that is rejected.

A promise whose fate is resolved can be in pending state, iff it has bee
resolved to a promise that is pending.

An unresolved promise is always in pending state. A resolved promise may be in pending, fullfilled or rejected state as mentioned in above three sentences.


### Promise.resolve method

The `Promise.resolve(value)` method returns a Promise object that is resolved with the given value. 

If the value is a promise, then it is unwrapped so that the resulting promise adopts the state of the promise passed in as value. This is useful for converting promises created by other libraries. Suppose you call a function that might return a value or a promise, then you can use Promise.resolve on it to return a promise that holds eventual value.

``` js
var original = Promise.resolve(true);
var cast = Promise.resolve(original);
cast.then(function(v) {
  console.log(v); // true
});
```

Promise.resolve is a static method on Promise.
`Promise.resolve(x)`; is basically the same as
 `new Promise(function(r){ r(x); });`, but there is some subtlety regarding throwing.

``` js
new Promise(function(resolve, reject) {
  resolve(something);// something can be a value or a promise
}).then(function() {
  console.log("Yey");
}, function() {
  console.log("Boo");
});
```

When do you think "Boo" gets console logged ?

If something is undefined, it is JS error and turned into rejection,
or if something is a promise that is rejected.

You can resolve a value without worrying if it's a value, a promise, or a promise that resolves to a promise that resolves to a promise etc etc.


### Promise scheduling

Promises are usually run as micro tasks before the start of next tick and the programmer has little to no control over when it is scheduled.
Due to recursive nature of creation/chaining of promises, 
Promises can starve your event loop.

### converting callback based API to promise based API

Let's say we have an api that takes callbacks like Node's readFile API, 
but we want to convert it to promis style api.

``` js
// readfle client using callback
var fs = require("fs");
fs.readFile("name", function(err, data) {
    console.log('data = ', data);
});
// readfile implementation using callback
readFile(fileName, cb) {
    fileString = doLongrunningWorkToReadFileIntoString();
    cb(null, fileString); // node convention of cb(err, data)      
}


// readFile2 client using promises
readFile2("name").then(function(data) {
    console.log('data = ', data);
});

// readFile2 implementation that returns promise
readFile2(fileName) {
    return new Promise(resolve, reject) {
        fileString = doLongrunningWorkToReadFileIntoString();
        resolve(fileString); 
    }
}
```

### Generator function and generator objects

Facebook's tool regenerator allows us to run generator code 
in ES5 environments.

A Generator function is a function which when called returns a generator.
The syntax is usually `function *genFun(){ // stuff }`.
Generator functions are functions that can be paused or resumed,

A Generator object is return on calling the generator function.
`let genObj = genFun()`. No code in genFun is executed, until `genObj.next` is called.
A Generator object confirms to both iterable and iterator protocol.

``` js
function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

var g = gen(); // "Generator { }"
const first = g.next()i; // {value: 1, done: false}, g is an iterator

for (var i of g) {// g is iterable, so we can use for-of loop
    console.log(i);// prints 2 and 3, because 1 is already iterated over
}

```

When `yeild;` is done without any value in gen fn,
the .next() returns { value: undefined, done: trueorfalse }

Generator can play three roles:
1. iterators (data producers) : return value via yield on each call to next.

2. observers (data consumers): take in values via a parameter to next, which is received in genfun as a return value from yeild.

3. coroutines - iterators and observers combine to be coroutines.


### Async/Await and their roles with promises.

https://developers.google.com/web/fundamentals/primers/async-functions

Every async function you write will return a promise, and that promise
resolves with whatever async function returns or rejects with whatever
async function throws.

and every single thing you await will ordinarily be a promise.

