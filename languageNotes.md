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

* for .. of loop is allowed over iterable objects. Array, Set and Map are iterables. 

* For-of loop is useful over arr.forEach for using statement like break, return etc.

* Iterable objects return an iterator, and an iterator has a method called next() which when called
upon returns values like { value: v1, done: bool };
also convention is when done is true, value is undefined.

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
// james is now an iterable
const james = {
    name: 'James',
    height: `5'10"`,
    weight: 185,
    [Symbol.iterator]() {
        const keys = Object.keys(this);
        let i = 0;
        let _this = this;
        // return the iterator
        return {
            next() {
                const done = i === keys.length;// at len+1 return { done: true, value: undefined}
                const key = keys[i];
                const value = _this[key];
                console.log({ done, key, value, i});
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
console.log(iterator.next()); // { value: undefined, done: true }
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

* Currying becomes easy: Currying is now easy with arrow functions like so.
``` js
const add = (arg1) => (arg2) => (arg3) => (arg1 + arg2 + arg3)
console.log(add(9))           // function that takes two arguments and adds 9 to it
console.log(add(9)(10))       // function that takes one argument and adds 19 to it
console.log(add(9)(10)(11))   // 19 + 11 = 30
```

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
  [Symbol('apple')]: { color: 'red', weight: 136.078 },    // the square brackets on left are for computed property not array
  [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
  [Symbol('orange')]: { color: 'orange', weight: 170.097 },
  [Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
console.log(bowl);
```

#### Sets

Set constructor optionally takes an iterable, whose elements will be added to set e.g. 
``` js
s = new Set([1,2,3]); // set constructor taking iterable whose items will be added to set
s2 = new Set(); // set with no items.
```
, ignoring duplicates.
Set has appropriately named `.add(value)` and `.delete(value)` and `.has(value)` methods.
`set.clear()` clears all elements from the set.

**Note** : `set.add(value)` and `set.delete(value)` do not throw error, if a 
duplicate element is added or we are trying to delete a value that is not present.

Check membership in set with `set.has(value)`

Get the set iterator with `set.values()` or `set.keys()`. Both methods are exactly same for a set.

the best way to iterate over items of a set 
is `for (let item of set){ doSomethingWithItem }`.

**NOTE** - Set items iteration happens in insertion order.

#### WeakSet

A Set where you are 
1. only allowed to add objects (mostly references of objects).
2. it is not iterable
3. does not have a clear method.

``` js
const student1 = { name: 'James', age: 26, gender: 'male' };
const student2 = { name: 'Julia', age: 27, gender: 'female' };
const student3 = { name: 'Richard', age: 31, gender: 'male' };

const ws = new WeakSet([student1, student2, student3]);
console.log(ws); // James Julia and Richard.
student2 = null; // reference student2 points to null so Julia can be gc'ed. and set will let go.
console.log(ws); // only James ard Richard.
```

##### Why does weakset only allow objects and why doesn't it have a clear method ?

Garbage collection comes into picture.

#### Maps

Maps are usually initialized with an empty constructor like `let m = new Map()`.
Optionally there is a fancier way passing iterables:
An Array or other iterable object whose elements are key-value pairs (arrays with two elements, e.g. [[ 1, 'one' ],[ 2, 'two' ]]).

**Iteration and Iteration Order** - A Map object iterates its elements in insertion order — a for...of loop returns an array of [key, value] for each iteration.

`m.entries()` is the default way of iterating over a map
because `m.entries === m[Symbol.iterator]`

`m.keys()` return an iterable over keys in map.
`m.values()` return an iterable over values in the map.

Idiomatic key/value iteration with a map using destructuring:
``` js
for (let [key, value] of map.entries()) {
    console.log(key, value);
}
```

**Useful Methods** - `m.set(key,value)` for setting up key value pairs. 
`m.delete(key)` to delete a key-value pair from the map.
Like Sets, these methods do not throw errors on unexpected conditions.

##### differences between Map and regular Object

1. The keys of an Object are Strings and Symbols, whereas they can be any value for a Map, including functions, objects, and any primitive.
2. You can get the size of a Map easily with the size property, while the number of properties in an Object must be determined manually.
3. A Map is an iterable and can thus be directly iterated, whereas iterating over an Object requires obtaining its keys in some fashion and iterating over them.
4. An Object has a prototype, so there are default keys in the map that could collide with your keys if you're not careful. As of ES5 this can be bypassed by using map = Object.create(null), but this is seldom done.
5. A Map may perform better in scenarios involving frequent addition and removal of key pairs.
