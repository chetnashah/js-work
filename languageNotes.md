#### ES6

* Posts from mozilla (https://hacks.mozilla.org/category/es6-in-depth/)

* Iterable protocol allows javascript objects to customize their iteration behaviour, e.g. Array, String, Set and Map implement iterable protocol. https://hacks.mozilla.org/2015/04/es6-in-depth-iterators-and-the-for-of-loop/

* An object that has a [Symbol.iterator]() method is called iterable, and calling the `iterable[Symbol.iterator]()` returns the iterator.

``` js
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
```

* With iterable protocol you have the freedom to define iteration behavior for your object items.

* for .. of loop is allowed over iterable objects. 

* For-of loop is useful over arr.forEach for using statement like break, return etc.

* Iterable objects return an iterator, and an iterator has a method called next() which when called
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

Our very own implementation of iterator:
Go ahead and make your own iterators in js.
``` js
const james = {
    name: 'James',
    height: `5'10"`,
    weight: 185,
    [Symbol.iterator]() {
        const keys = Object.keys(this);
        let i = 0;
        let _this = this;
        return {
            next() {
                const done = i === (keys.length - 1);
                const key = keys[i];
                const value = _this[key];
                i = i + 1;
                return { done, key, value };
            }
        }
    }
};

const iterator = james[Symbol.iterator]();
//
console.log(iterator.next().value); // 'James'
console.log(iterator.next().value); // `5'10`
console.log(iterator.next().value); // 185
```


##### Spread operator

* Spread operator works for expanding all iterables(Array, Set, Map)

* Spread operator is also defined for objects

#### Destructuring

* Destructuring works in left side of variable assignment expressions and 
function parameters, essentially in places where bindings are introduced.

* **Note**: If desctructured part (variable name) cannot find corresponding value in expression value, the variable names are bound to undefined. To get around this in function declarations You can use default parameter values.

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
and even more interesting use of default function parameters with destructuring
where we do not need to pass empty array on call to `createGrid()`
``` js
function createGrid([width = 5, height = 5] = []) {
  return `Generating a grid of ${width} by ${height}`;
}
```

Similarly with objects:
``` js
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}
```

#### ES6 classes

ES6 classes are same as pseudoclassical class pattern.
In fact if you use `typeof Person` when we have declared a Person class, It will return function.

* To add static methods, add static keyword in front of method, **Note**: static methods cannot access instance specific data

``` js
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  static badWeather(planes) {
    for (plane of planes) {
      plane.enginesActive = false;
    }
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}
```

##### Extending Classes

Classes support extending classes, but can also extend other objects. Whatever you extend must be a constructor.

* Using super in classes: When using super in constructor, we use super alone as a function e.g. `super(name, age);` and must be called before this is used in dervied classes' constructor, otherwise it will cause reference error.

* When you want to use super to call parent's methods, super is used as an object e.g. `super.sayName()`.

* For more fine grained details on super references (refer http://2ality.com/2011/11/super-references.html)

* `derivedInstance instanceOf BaseClass` returns true.

#### ES6 builtins

New built-ins in JavaScript are Set, Map, WeakSet, WeakMap and Proxies.


##### Symbols

A symbol is a unique and immutable data type that is often used to identify object properties.

To create a symbol, you use `Symbol()` with an optional string as its description.

``` js
const sym1 = Symbol('apple');// apple is just description not an identity.
console.log(sym1);

const sym2 = Symbol('apple');
console.log(sym1 === sym2); // false, since all symbols have unique identity, and apple was just a description
```

A legitimate use case is for multiple properties of an object with same name:
``` js
const bowl = {
  [Symbol('apple')]: { color: 'red', weight: 136.078 },
  [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
  [Symbol('orange')]: { color: 'orange', weight: 170.097 },
  [Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
console.log(bowl);
```



