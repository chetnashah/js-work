#### ES6

* Posts from mozilla (https://hacks.mozilla.org/category/es6-in-depth/)

* Iterable protocol allows javascript objects to customize their iteration behaviour, e.g. Array, String, Set and Map implement iterable protocol. https://hacks.mozilla.org/2015/04/es6-in-depth-iterators-and-the-for-of-loop/

* An object that has a [Symbol.iterator]() method is called iterable


* for .. of loop is allowed over iterable objects. 

* For-of loop is useful over arr.forEach for using statement like break, return etc.

* Iterable objects return an iterator, which has a method called next() which when called
upon returns values like { value: v1, done: bool };

* A rough equivalent of for-of syntax is as below
``` js
for (VAR of ITERABLE) {
  STATEMENTS
}

// converts to 

var $iterator = ITERABLE[Symbol.iterator]();
var $result = $iterator.next();
while (!$result.done) {
  VAR = $result.value;
  STATEMENTS
  $result = $iterator.next();
}
```

##### Spread operator

* Spread operator works for expanding all iterables(Array, Set, Map)

* Spread operator is also defined for objects

#### Arrow functions

* Arrow functions are always expressions, In fact their real name is arrow function
expressions.

* With regular functions, the value of this is set based on how the function is called. With arrow functions, the value of this is based on the functions surrounding context. In other words, the value of this inside an arrow function is same as the value of this outside the arrow function.

* Remember: A function passed to setTimeout is called without new, without call, without apply, and without a context object, so this will usually be global object (if you are using regular functions). Solution is to use arrow functions.

#### DEfault function parameter list
* Default function parameters are placed along with parameters in the parameter list following parameter name with a '=' in between.

``` js
function greet(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}`
}
```

* A nice use of destructuring is with default function parameters

``` js
function createGrid([width = 5, height = 5]) {
  return `Generates a ${width} x ${height} grid`;
}
```







