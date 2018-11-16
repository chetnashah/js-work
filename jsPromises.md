
### Promise Anti patterns

http://taoofcode.net/promise-anti-patterns/

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

### Thenable Gotchas
Whenever you return (non-promise value) inside of onFullfilled or onRejected automatically gets converted to promises and passed down the chain.

But if you return a promise e.g. via Promise.resolve or Promise.reject, it is passed as it is.

If you don't return anything a promise resolved with undefined value is passed onto next then block.

``` js
const p3 = Promise.resolve('aha');
p3.then(function(){
    console.log('pass');
    return Promise.resolve(42);
}, function(){
    console.log('fail');
    return Promise.resolve(0);
});
```

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

### Use cases for Promise.resolve and Promise.reject

Promise.resolve is useful to make a promise of a non-promise value you already have.
Promise.resolve is useful in making a promise which is inside some other promise given to us by some library etc.

Promise.resolve & Promise.reject (they are new promises with executors that don't do any computation but straight out call resolve or reject with value provided) are also useful inside thenables, i.e. when you yourself have not made a promise with an executor. but want to change values within the chain.
e.g.
``` js
let p2 = Promise.resolve('32');
p2.then(function(value) {
    console.log(value);
    return Promise.reject('oops');
}).then(
    function(v){ console.log('yaay');},
    function(k) { console.log(k+'nooo'); }
    );
```
### Promise onRejected vs catch

`p.catch(function f(e){ //stuff })`
is just sugar for `p.then(null, function f(e){ //stuff })`.


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
const first = g.next(); // {value: 1, done: false}, g is an iterator

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

#### Generator functions with yeild and return

**Note** : iterable utilities like `for-of` loop and spread operator ignore the return value given with {done:true}

``` js
function* genFuncWithReturn() {
    yield 'a'; // { value: 'a', done: false }
    yield 'b'; // { value: 'b', done: false }
    return result; // { value: 'result', done: true }
}

for (let x of genFuncWithReturn()) {
    console.log(x);
}
// Output:
// a
// b

let arr = [...genFuncWithReturn()]; // ['a', 'b']
```

Job of `return` statement in generator function:

return deliveres a return value for an iterators last iteration (when done equals true).
Other wise it is usually `{ value: undefined, done: true}`.

### Generators help with simplified iterable implementation via yield

Normally to implement iterable behavior, one would need to implement `[Symbol.iterator]()` method,
but since generator objects are iterable, returning values from generator via yield acts like an iterable implementation.

e.g.
``` js
function* objectEntries(obj) {
    // In ES6, you can use strings or symbols as property keys,
    // Reflect.ownKeys() retrieves both
    let propKeys = Reflect.ownKeys(obj);

    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}

let jane = { first: 'Jane', last: 'Doe' };
for (let [key,value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}
// Output:
// first: Jane
// last: Doe
```

### yield limitations

You can only use `yield` keyword inside generator functions, not inside regular functions or arrow functions, it will be a SyntaxError.

A significant limitation of generators is that you can only yield while you are (statically) inside a generator function. That is, yielding in callbacks doesn’t work.

### yield* keyword

the `yield *` keyword takes an iterable and spreads out yield over
each one of them.

e.g.
``` js
function* foo(){
    yield 1;
    yield 2;
}

function* bar() {
    yield 'a';
    yield* ['of','tho'];
    yield* foo();
    yield 'z';
}

let arr = [...bar()]; // ['a', 'of', 'tho', 1, 2, 'z']
// yield* iterable converts to
// for (let value of iterable)
// { yield value; }
```

`yield *` also considers end-of-iteration values, i.e. values given with done: true, as a part. 
e.g. let's say we have generator whose last statement is return, then
if this genobj is passed to yield*, yield* will also do yield for the last return value.

e.g.
``` js
function* genfwithreturn() {
    yield 'a';
    yield 'b';
    return 'theres'; 
}
function* logreturned(genobj) {
    let result = yield* genobj;// yield* accepts iterables, remember?
}
for(let v of logreturned(genfwithreturn())) { 
    console.log(v); // 'a', 'b', 'theres'
}
```

### role of first .next() called on generator object

When using a generator as an observer, 
it is important to note that 
the only purpose of the first invocation of `next()`
is to start the observer.

If you try to send information via first `next`, it will throw error.

### The actual generator interface.

``` js
interface Iterator { // data producer
    next() : IteratorResult;
    return?(value? : any) : IteratorResult;
}

interface Observer { // data consumer
    next(value? : any) : void;
    return(value? : any) : void;
    throw(error) : void;
}
// Generator interface is combination of both
interface Generator {
    // also in here somewhere [Symbol.Iterator]()
    next(value? : any) : IteratorResult;
    throw(value? : any) : IteratorResult;
    return(value? : any) : IteratorResult;
}
interface IteratorResult {
    value : any;
    done : boolean;
}
```

### Terminating generators midway by calling return(val) on generator object

While `next()` sends normal input,
`return(val)` terminates the generator,
and `throw()` signals an error.

```js
function* testgenerator(){
    console.log('start');
    yield 1;
    yield 50;
    yield 99;
    console.log('end');
}

const tgo = testgenerator();
tgo.next(); // start
// { value: 1, done: false }
tgo.return(22); // generator terminated midway.
// { value: 22, done: true }
tgo.next();
// { value: undefined, done true }
```

### Async/Await and their roles with promises.

https://developers.google.com/web/fundamentals/primers/async-functions

Every async function you write will return a promise, and that promise
resolves with whatever async function returns or rejects with whatever
async function throws.

and every single thing you await will ordinarily be a promise.

