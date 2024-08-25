
## JS Error object.

Main properties:
1. name: string
2. message: string
3. stack: string

## Best practice 1 - Always throw error object instead of literals

It is possible to throw literals, but it is not recommended. It is better to throw an error object.

```js
// bad
throw 'error';

// good - has stack trace
throw new Error('error');
```
**Note** - to enforce this, you can use eslint rule `no-throw-literal` (https://eslint.org/docs/latest/rules/no-throw-literal)



## Capturing (current) stack trace without involving Error

Available in chrome and V8

A static method `Error.captureStackTrace` takes an `obj` and populates a `stack` property
within obj with the current stack trace. e.g.
```js
const tt = {};
Error.captureStackTrace(tt);
console.log(tt);
// { stack: "Error↵    at <anonymous>:1:7"}
```

Trimming inner stack frames while capturing:
If the second argument is provided a `func`, the function passed will be considered the ending point of the call stack and therefore the stack trace will only display the calls that happened before this function was called.

```js
const myObj = {};

function d() {
    // Here we will store the current stack trace into myObj
    // This time we will hide all the frames after `b` and `b` itself
    Error.captureStackTrace(myObj, b);
}

function c() {
    d();
}

function b() {
    c();
}

function a() {
    b();
}

// First we will call these functions
a();

// Now let's see what is the stack trace stored into myObj.stack
console.log(myObj.stack);

// This will print the following stack to the console:
//    at a (repl:2:1) <-- As you can see here we only get frames before `b` was called
//    at repl:1:1 <-- Node internals below this line
```

## What does a single stack frame like

Mostly the structure is VM dependent, but there are usually common fields
 like `lineNumber`, `fileName`, `functionName` etc. for a single stack frame 
 e.g.
 Here is one common abstraction in form of a library:
 https://github.com/stacktracejs/stackframe
 ```js
 // Create StackFrame and set properties
var stackFrame = new StackFrame({
    functionName: 'funName',
    args: ['args'],
    fileName: 'http://localhost:3000/file.js',
    lineNumber: 1,
    columnNumber: 3288, 
    isEval: true,
    isNative: false,
    source: 'ORIGINAL_STACK_LINE'
});
 ```


## Six built-in Error types

1. EvalError: using eval in an incorrect manner.

2. ReferenceError:

3. TypeError:

4. URIError:

5. SyntaxError:

6. RangeError:

Typed catching with checking `error.name`:
```js
try {

} catch(err) {
    if (error.name = 'RangeError'){

    }
    if (error.name = 'ReferenceError') {

    }
    //...
}
```

### TypeError

The TypeError object represents an error when an operation could not be performed, typically (but not exclusively) when a value is not of the expected type.

A TypeError may be thrown when:

* an operand or argument passed to a function is incompatible with the type expected by that operator or function; or
* when attempting to modify a value that cannot be changed; or
* when attempting to use a value in an inappropriate way.

e.g. 
`null.f()` or `null.k = 2;` throws a `TypeError`.

### ReferenceError

The ReferenceError object represents an error when a variable that doesn't exist (or hasn't yet been initialized) in the current scope is referenced.

e.g.
`let a = undefinedVariable`

## Extending Errors for fun and profit.

https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript

### ES5

```js
function MyError(message) {
    this.name = 'MyError';
    this.message = message;
    this.stack = (new Error()).stack;
}
MyError.prototype = new Error();  // <-- remove this if you do not 
                                //     want MyError to be instanceof Error
MyError.prototype.name = 'MyError';
```