

## Promise state

1. 'state'= FULLFILLED/REJECTED/PENDING , always starts out in PENDING state.
2. value = value if fulfilled
3. reason = reason if rejected
4. thenQueue = list of then callbacks to run for this promise

## Executor execution is sync

## Executor methods given to client - onSuccess/onFailure, must be bound to current promise!!

Since we are passing references of function, this binding in advance to the promise helps.

## onSuccess/onFailure code should have checks for state, and only execute something if promise is in PENDING state



## Callbacks are always executed in separate tick

## Does then return same promise or new promise?

## Multiple resolve calls from executor should only entertain the first one

## How is resolved value propogated to then callbacks queue items?

is it via `this.value` modified in onSuccess/onFailure, or directly calling calling runCallbacks from `onSuccess(value)` ?

E.g. which one of following?
```js
onSuccess(value) {
 // change state to fullfilled
 this.state = 'FULFILLED';
 queueMicrotask(() => {
     this.runCallbacks(value);
 });
}
``` 
or
```js
onSuccess(value) {
 // change state to fullfilled
 this.state = 'FULFILLED';
 this.value = value;
 queueMicrotask(() => {
     this.runCallbacks(); // internally uses this.value as necessary
 });
}
```

## finally queue is different than thenQueue

## Dummy not working implementation

```js
// new MyPromise((resolve, reject) => {
//   // ... code ...

//   resolve(/* with result */);
//   reject(/* with error */);
// });

// MyPromise.resolve(/* with result */);
// MyPromise.reject(/* with error */);


class MyPromise {
  constructor(executor) {
    this.state = 'PENDING';
    this.thenCbs = [];
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
    executor(this.onSuccess, this.onFailure);
  }

  runCallbacks(value){
    // if value is a promise, we need to unwrap
    // TODO revisit this
    // capture return value of fullfilledCb to pass to next then...
    // 1 => 
    // 2() =>
    // 3()
    let valueSeen = value;// assume this is always a promise
    // give client control to have async looping

    // 
         
    for(let i=0;i<this.thenCbs.length;i++) {
      const thenCb = this.thenCbs[i];
      const ret = thenCb(valueSeen,failureReason);
      valueSeen = ret;
    }
    // this.thenCbs.forEach(fullfilledCb => fullfilledCb(value));
  }
  
  onSuccess(value) {
    // change state to fullfilled
    this.state = 'FULFILLED';
    queueMicrotask(() => {
        this.runCallbacks(value);
    });
  }
  
  onFailure(reason) {
    // change state to rejected
    this.state = 'REJECTED';
    queueMicrotask(() => {
        this.runCallbacks();
    });
  }
  
  // accepts and registers a callback
  // 
  then(fullfilledCb) {
    // register callbacks for invocation
    this.thenCbs.push(fullfilledCb);
    // fire thencbs if adding a then on already resolved promise
    return this;
  }  
}




new MyPromise((resolve) => {
  setTimeout(() => resolve(true), 1000);
})
  .then((result) => {
    console.log('result = ', result);
    // return "done";
    if (result === true) {
      return MyPromise.resolve("done");
    }
  })
  .then((result) => {
    console.log('second then = '+result);
    // return MyPromise.reject("Unusual Error");
  });
//   .catch((error) => {
//     console.error(error);
//     return MyPromise.resolve("truly done");
//   })
//   .then((result) => console.log(result));
```