
### JS Error object.

Main properties:
1. name
2. message
3. stack

### Six built-in Error types

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

### Extending Errors for fun and profit.

https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript

#### ES5

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