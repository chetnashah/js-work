// https://bigfrontend.dev/problem/create-a-middleware-system

/**
 * Question: Implement a simple middleware that must meet the following requirements:

- It exposes a use function which can be used to add tasks or hooks to be executed by the middleware for every call to go.

- It exposes a go function which is used to trigger the middleware hooks sequentially with a fresh context each time.

- The hooks could be asynchronous and take in a callback (named ‘next’) to signal that they’ve finished executing.
 * 
 */

// constructor
// var Middleware = function () {};
class Middleware {
    constructor() {
      this.tasks = [];
    }
    use(task) {
      this.tasks.push(task);
    }
    go(cb) {
      let i = 0;
      const tasksList = this.tasks;
      const thisContext = {};
      function iterate() {
        if (i >= tasksList.length) {
          cb.call(thisContext);
          return;
        }
        const fn = tasksList[i];
        i++;
        fn.call(thisContext, iterate);
      }
      iterate();
    }
  }
  
  // usage
  var middleware = new Middleware();
  
  /* use takes taskFn to execute */
  middleware.use(function (next) {
    // next is the continuation/return flow callback
    var self = this;
    setTimeout(function () {
      self.hook1 = true;
      next();
    }, 50);
  });
  
  middleware.use(function (next) {
    var self = this;
    setTimeout(function () {
      self.hook2 = true;
      next();
    }, 100);
  });
  
  var start = new Date();
  /** go function takes a callback: trigger hooks sequentially with fresh context and go Fn executes after all the middlewares have been executed */
  middleware.go(function () {
    console.log(this.hook1); // true
    console.log(this.hook2); // true
    console.log(new Date() - start); // around 20
  });
  