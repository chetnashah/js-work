
#### the "constructor" property

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor

The `constructor` property returns a reference to the Object constructor function that created the instance object. Note that the value of this property is a reference to the function itself, not a string containing the function's name.

The constructor property sits on the `.prototype`,
and holds a reference to the function that created a given instance e.g.

``` js
function Dog(name) {
  this.name = name;
}

let d = new Dog('chet');
console.log(d.constructor);// function Dog {}

// so you can make new instances even if you
// don't know what class creates such instances
// e.g.

let d2 = new d.constructor('goofy');// d2 is a dog.

// for plain literal objects,
// constructor is base Object/Array, and constructor property sits on Object.prototype object
console.log({}.constructor);// Object
console.log([].constructor);// Array

//verification check
Dog.prototype.constructor == Dog; // true

// verification check
({}).constructor === Object
```

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

In summary, the iterator interfaces are shown as below :
``` js
interface Iterable {
    [Symbol.iterator]() : Iterator;
}
interface Iterator {
    next() : IteratorResult;
    return?(value? : any) : IteratorResult;
}
interface IteratorResult {
    value : any;
    done : boolean;
}
```

### Why bind `this` in constructor?

If you call `someInstance.method` then `this` is correctly resolved as `someInstance`.
But if you somehow get a reference to the instance method, and directly call is `this` is resolved to undefined.

```js
class Logger {
  printName (name = 'there') {
    this.print(`Hello ${name}`);
  }

  print (text) {
    console.log(text); 
  }
}

// case 1
const l1 = new Logger();
l1.printName(); // prints "Hello there" correctly, this is l1

// case 2
const logger = new Logger();
const { printName } = logger;
printName();
// <- Uncaught TypeError: Cannot read property 'print' of undefined
```

IN order to solve the problem where someone obtains reference to method directly
like case `2` one needs to put 
`this.printName = this.printName.bind(this)` inside constructor

### javascript `in` operator

The `in` operator returns true for properties in current object and also the prototype chain. 
(If you want to check for only non-inherited properties, use `Object.prototype.hasOwnProperty()` instead.)
**Note**: LHS i.e. propname coerces into a string, RHS should be an object.

```js
const arr = [1,2,3]
console.log(2 in arr);
console.log(Symbol.iterator in arr); //  in prototype chain
console.log('map' in arr)// true, in prototype chain, a property on Array.prototype
console.log(Array.prototype.map in arr);// false, Array.prototype.map coerces to a string i.e. [object object]
```


`Symbol.iterator` symbol specifies the default iterator for an object. Used by `for...of`.

### instanceof operator

Takes two arguments i.e obj and Constructor to test - e.g. `obj instanceof Constructor`.

checks if proto-link-chain of `obj` contains `Constructor.prototype` object.



### class properties of arrow functions

There is a babel proposal for doing following:
```js
class A {
  static color = "red";
  counter = 0;
  
  handleClick = () => {
    this.counter++;
  }
  
  handleLongClick() {
    this.counter++;
  }
}
```

Which essentially transpiles to following:
```js
class A {
  constructor(){
    // we see this is fixed to the construction-instance always.
    // not present on prototype
    this.handleClick = () => {
      this.counter++;
    }
  }

  // this can vary depending on callsite
  // present on prototype
  handleLongClick(){
    this.counter++;
  }
}
A.color = 'red';
```

##### Spread operator

* Spread operator works for expanding all iterables(Array, Set, Map, Generator objects)

* Spread operator is also defined for objects

* Spread does a shallow copy

`undefined` and `null` are spreadable in object context, but not in array context:
```js
const a = {...undefined}; // Ok! a = {}
const b = {...null}l // Ok! b = {}

// Error cases!
const c = [...undefined]; // undefined is not iterable
const d = [...null]// null is not iterable
```

Spreading of numbers/boolean primitives is a no-op
```js
const a = {...1} // {}
const b = {...true} // {}
```

Spreading of strings work like spreading of arrays.

#### What are constructs that can be used when working with iterables?

Ans: `for-of` loop and `...iterable` i.e spread operator.

#### Destructuring

* Destructuring works in left side of variable assignment expressions and 
function parameters, essentially in places where bindings are introduced.

* **Note**: If desctructured part (variable name) cannot find corresponding value in expression value, the variable names are bound to undefined. To get around this in function declarations You can use default parameter values.

#### Symbols in ES6

Symbols are new primitive type in Javascript. They are created via a factory function known as Symbol **Note: No new keyword, otherwise u get error**'
They return a new unique id(which we cannot see), optionally that take a description, but that is not same as the id value they return.
``` js
const mySymbol = Symbol('hello');
```

Everytime you call the factory function, a new and unique symbol is created, and every symbol has its own identity
e.g.
``` js
Symbol() === Symbol() // false
Symbol('hi') === Symbol('hi') //false
```

If you don’t have the reference for the Symbol, you just can’t use it. This also means two symbols will never equal the same value, even if they have the same description.

The primary use case for symbols is library/wrapper functions to have private members.

### Symbol registry and re-use using `Symbol.for`

There is also another way to make `Symbol`s that can be easily fetched and re-used: `Symbol.for()`. 
This method creates a Symbol in a `global Symbol registry`. 

Small aside: this registry is also `cross-realm`, meaning a `Symbol` from an iframe or service worker will be the same as one generated from your existing frame.

```js
var localFooSymbol = Symbol('foo');
var globalFooSymbol = Symbol.for('foo');
globalFooSymbol = Symbol.for('foo');
Symbol.for('dus') === Symbol.for('dus'); // true
```

##### Symbols as property keys

Symbols can be used as property keys
``` js
const MY_KEY = Symbol();
const MK2 = Symbol();
const obj = {};
obj[MY_KEY] = 123;

const obj2 = {
  "abc": 22,
  [MY_KEY]: 'hi',
  [MK2]() {
    console.log('Someone called a method');
  } 
};
console.log(obj[MY_KEY]);
console.log(obj2[MY_KEY]);
console.log(obj2[MK2]());
```

##### Operations related to property keys and symbols

Following operations are aware of symbols as property keys:

* Reflect.ownKeys()
* Property access via []
* Object.assign()

Whereas following operations ignore symbols as property keys:

* Object.keys()
* Object.getOwnPropertyNames()
* for-in loop

##### Sharing of symbols

At times one would want different parts of code to share symbols. In that case we use `Symbol.for` method that accepts a single parameter, which is a string identifier for symbol you want to create (don't confuse this with description of a symbol), as this key acts as a key in global symbol registry.

``` js
let uid1 = Symbol.for('uid');

let obj = {
  [uid1]: 12345
};
console.log(obj[uid1]); // 12345

let uid2 = Symbol.for('uid');
console.log(uid1 === uid2); // true
console.log(obj[uid2]); // 12345
```

The `Symbol.for` method first searches global symbol registry to see whether a symbol with key "uid" exists. If so, the method returns existing symbol. If no such symbol exists, a new symbol is created and registered to global symbol registry using specified key.


##### Co-ercion of Symbols

TODO


#### Arrow functions

* Arrow functions are always expressions, In fact their real name is arrow function
expressions.

* With regular functions, the value of this is set based on how the function is called. With arrow functions, the value of this is based on the functions surrounding context. In other words, the value of this inside an arrow function is same as the value of this outside the arrow function.

* Remember: A function passed to setTimeout is called without new, without call, without apply, and without a context object(no well defined this), so this will usually be global object (if you are using regular functions). Solution is to use arrow functions.

* Currying becomes easy: Currying is now easy with arrow functions like so.
``` js
const add = (arg1) => (arg2) => (arg3) => (arg1 + arg2 + arg3)
console.log(add(9))           // function that takes two arguments and adds 9 to it
console.log(add(9)(10))       // function that takes one argument and adds 19 to it
console.log(add(9)(10)(11))   // 19 + 11 = 30
```

* Arrow functions always using enclosing context as "this", also if you call arrow function using `fn.call(thisArg, args)` or `fn.apply(thisArg, args)`, then thisArg is simply ignored.

* Arrow function do not have their own arguments object.

* Arrow functions will throw an error if called with new.

* Arrow function do not have a prototype property
``` js
var foo = function () { };
console.log(foo.prototype); //undefined
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

#### new.target property

new.target is an implicit parameter that all functions have.
The new.target property lets you detect whether a function or constructor was called using the new operator. In constructors and functions instantiated with the new operator, new.target returns a reference to the constructor or function. In normal function calls, new.target is undefined.
When invoking Reflect.construct(), the new.target operator will point to the newTarget parameter if supplied, or target if not.

### quick and dirty way to check if function is used as constructor

```js
function Checkers(){
  if(this instanceof Checkers) {
    console.log('was called with new, i.e as a constructor');
  } else {
    console.log('was called as a regular fn');
  }
}
```

#### Reflect.construct

```js
Reflect.construct(target, argumentsList[, newTarget])
```
Reflect.construct allows you to invoke a constructor with a variable number of arguments, along with specifying which prototype to use.
When invoking Reflect.construct(), on the other hand, the new.target operator will point to the newTarget parameter if supplied, or target if not.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct

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

##### Checks done on JS classes.

* Cannot call them like a function (i.e without new), will throw exception.
```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

let p = Person(); // TypeError exception - cannot call constructor without new
```

* cannot use new for a classes' prototype method.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log('Hello ' + this.name);
  }
}

let p2 = new Person();
let p3 = new p2.sayHello();// cannot call a class method using new
// p2.sayHello is not a constructor
```

Assuming a `class Foo`, the `Foo.prototype` is not a writable property of Foo, but `Foo.prototype.*` is writable for dynamic patching.

##### Extending Classes

Classes support extending classes, but can also extend other objects. Whatever you extend must be a constructor.

* Using super in classes: When using super in constructor, we use super alone as a function e.g. `super(name, age);` and must be called before this is used in dervied classes' constructor, otherwise it will cause reference error.

* When you want to use super to call parent's methods, super is used as an object e.g. `super.sayName()`.

* For more fine grained details on super references (refer http://2ality.com/2011/11/super-references.html)

* `derivedInstance instanceOf BaseClass` returns true.

The instance object is created in different locations in ES6 and ES5:

In ES6, it is created in the base constructor, the last in a chain of constructor calls. The superconstructor is invoked via super(), which triggers a constructor call.
In ES5, it is created in the operand of new, the first in a chain of constructor calls. The superconstructor is invoked via a function call.

Subclassing in ES5 (refer [Subclassing](jssubclassing.md)):
```js
function Person(name) {
    this.name = name;
}

function Employee(name, title) {
    Person.call(this, name);
    this.title = title;
}

Object.setPrototypeof(Employee, Person);// chain between constructor
Employee.prototype = Object.create(Person.prototype);// chain between constructor.prototype
Employee.prototype.constructor = Employee;
```

Subclassing in ES6:
```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Employee extends Person {
  constructor(name, title) {
    super(name);
    this.title = title;
  }
}
```

![ES6 subclassing](img/es6inheritance.png)

Babel transpiled ES6 subclassing:
```js
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Person = function Person(name) {
  _classCallCheck(this, Person);

  this.name = name;
};

var Employee = (function(_Person) {
  _inherits(Employee, _Person);

  function Employee(name, title) {
    _classCallCheck(this, Employee);

    var _this = _possibleConstructorReturn(
      this,
      (Employee.__proto__ || Object.getPrototypeOf(Employee)).call(this, name)
    );

    _this.title = title;
    return _this;
  }

  return Employee;
})(Person);
```

#### Equality Semantics in JavaScript

1. Abstract equality operator(==) : performs co-ercion on input values and compares them.
2. Strict Equality Operator(===) : checks types as well as values. Returns true only if types are same and values are same.
3. SameValue Algorithm: Similar to (===) but with different handling of NaN, and +/- 0.
4. SameValueZero Algorithm Similar to SameValue/(===) with different handling of +/- 0.
5. Object.is use SameValue for equality checking
6. Map, Set, includes use SameValueZero for equality checking.

##### Object equality comparision

Two different object literals with similar contents will fail strict equality comparision, since variable comparision leads to reference/address comparision.

To check structural/value equality of objects, we have to individually look at own-keys, compare primitive values, and if an object is found as key, check recursively.

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
When adding value, set membership is done by equality comparision via using `Object.is()` method.

Check membership in set with `set.has(value)`.

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

`m.set(key, value)` to setup a key value pair,
`m.get(key)` to get value corresponding to given key.

Idiomatic key/value iteration with a map using destructuring:
``` js
for (let [key, value] of map.entries()) {
    console.log(key, value);
}
// or like this
for (const member of map) {
  const [key, value] = member;
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

### Javascript Property descriptors

Each property on an object comes with
a `property descriptor` internally. 
It can be one of `access property descriptor(get,set based)` or `data property descriptor (value based)`.

One can get a descriptor of a given property of a given object using
`Object.getOwnPropertyDescriptor(obj, key)`.
1. `value`: value of property (only for data properties)

2. `writable`: whether value can be changed (only for data properties)

3. `get`: a function that serves as getter for the property (only for accessor properties)

4. `set`: a function that serves as setter for property (only for accessor properties)

5. `configurable`:a boolean specifying if property can be deleted from the object or type of this property descriptor can be changed(accessor to data or vice versa)

6. `enumerable`: true only if property shows up in object properties enumeration.

```js

o = { get foo() { return 17; } };
d = Object.getOwnPropertyDescriptor(o, 'foo');
// d is {
//   configurable: true,
//   enumerable: true,
//   get: /*the getter function*/,
//   set: undefined
// }

o = { bar: 42 };
d = Object.getOwnPropertyDescriptor(o, 'bar');
// d is {
//   configurable: true,
//   enumerable: true,
//   value: 42,
//   writable: true
// }


```


### Decorators

Decorator is a plain function that will modify the property descriptor of the property being decorated. and thus will give additional behavior to the property being decorated.

A decorator function takes `target, key, descriptor` and returns modified descriptor.

Example definition of a `readonly` descriptor:
```js
class Cat{
  @readonly
  meow(){ return 'cat says meow';}
}

function readonly(target, key descriptor) {
  descriptor.writable = false;
  return descriptor;
}
```

#### Decorating a class

`target` is modified in case of decorating a class
```js
function superhero(target){
  target.isSuperhero = true;
}
```



### JS destructuring

Destructuring can happen in two ways:
1. assignment expression
2. function parameter definition

#### JS renaming while destructuring

```js
const {j: k, i: u} = {j: 11};// j is renamed to k, i is renamed to u
```

### default values while destructuring

```js
const {a=1, b=2} = {a: 3};
console.log(a);// 3
console.log(b); // 2
```

### Combined default values and renaming while destructuring

```js
const {a:b = 1, c:d =2} = {};
// b = 1
// d = 2
```

#### Pattern matching algorithm

We are trying to solve `pattern <- value`

A `pattern` is either
1. `variable x`
2. Object pattern: `{ <<properties>>}`
3. Array pattern: `[<<elements>>]`

Case: Rules for variable
```
`x <- value`
Ans: `x = value`
```
Case: Rules for object patterns
1. 
```
{properties} <- undefined
Ans: typeError: cannot destructure properties of undefined
```
2. 
```
{properties} <- null
Ans typeError: cannot destructure properties of null
```
3.
```
{key: pattern, <<properties>>} <- obj
Ans:
pattern <- obj.key // recurse the pattern match
{<<properties>>} <- obj // recurse on remaining
```

4.
```
{key: pattern = default_value, <<properties>>} <- obj

```
Ans:
```js
const tmp = obj.key;
if(tmp!== undefined) {
  pattern <- obj.key
} else {
  pattern <- default_value
}
{<<properties>>} <- obj
```


### Why is this not allowed before super in case of subclassing?

access of `this` in a subclass before `super()` call is not allowed, 
because in ES6 this is being born in the base class, therefore `super()` is needed to initialize it.



### Types of functions:

1. `constructible and callable`: all `function` keyword declaration/expression can work as both callable and constructible
2. `callable` only - `arrow functions` are typically used, as they are not constructible(calling them with new is an error).
3. `constructible` only - `class keyword` based classes, even though they act like functions under the hood, can only be called with new, calling them without new is an error.


### Can you use object as object key in JS?
NO. All object keys are strings.

```js
const j = {};
const o = {};
o[j] = 11;// j as a key is serialized first
console.log(o); // { [object object]: 11}
```


### JS property getter/setters

Kind of act like property handlers and primarily used for derived properties/encapsulation

```js


const obj = {
    name: 'chet',
    surname: 'doe',
    get full(){
        return this.name + ' ' + this.surname;
    },
    set full(fullName){
        this.name = fullName.split(' ')[0];
        this.surname = fullName.split(' ')[1];
    }
}
console.log(obj.full);// chet doe
obj.full = 'John wick';
console.log(obj.name);// John
console.log(obj.surname);// wick
console.log(obj.full);// John wick
```

### this pitfall: method extraction/reference

since functions are first class values, they can be extracted referecned, and saved
as a different variable from their object. 
When called in such a case, this points to the the object to the left of the method call. which can be absent.

In case of `strict mode`, `this` for such referenced method will be undefined, and globalThis in case of sloppy mode.
```js
"use strict"; const j3 = {
  first: 'jane',
  says(text){ 
    return `${this.first} says ${text}`;
  }
}
const ff = j3.says;
ff('hi'); // Error, cannot read property first of undefined
```

Remedy: explicit this binding via `bind`
```js
"use strict"; const j3 = {
  first: 'jane',
  says(text){ 
    return `${this.first} says ${text}`;
  }
}
const ff = j3.says.bind(j3);// says now has a fixed this added already
```


### Reflect.ownKeys

Contains both enumerable, non-enumerable keys.
Also contains symbol keys.


### Prototype pitfall: setting always sets own property and values, even though get will look into the chain.

object setting property/value always sets own key/value.
```js
const p = {
  protoProp: 'a'
};

const o = {
  objProp: 'b'
};
Object.setPrototypeOf(o, p);
console.log(o.protoProp);// a - fetches from chain
o.protoProp = 'something'; // protoProp actually is own property of o, and shadows proto link to p.
```


### Check: an object is prototype(ProtoLink based) of another object (anywhere in the protolink chain) ?

Use `p.isPrototypeOf(o)`. will return true if `p` appears anywhere in protolink chain of `o`.

```js
const a = { k: 1};
const b = Object.create(a);
const c = Object.create(b);
console.log(c.k);
console.log(a.isPrototypeOf(c));
```


### reusing functions between objects by putting them in prototype

```js
const PersonProto = {
  describe() {
    return 'Person named ' + this.name;
  },
};
const jane = {
  __proto__: PersonProto,
  name: 'Jane',
};
const tarzan = {
  __proto__: PersonProto,
  name: 'Tarzan',
};
```

### using constructor property to create similar objects

Even if you dont know class, you can create  a new object by getting hold of constructor function via obj.constructor.

```js
class Person{
  constructor(name) {
    this.name = name;
  }
  describe(){
    console.log('Hi ' + this.name);
  }
}

var p = new Person('jane');
p.describe();// Hi  jane
var p2 = new p.constructor('chet');
p2.describe();// Hi chet
p2 instanceof Person; // true
```

### class fields go on the instances, class methods/getters go on the prototype

```js
class IncrementingCounter {
  _count = 0;// class fields goes on instance

  get value(){// goes on IncrementingCounter.prototype
    return this._count;
  }
  increment(){// goes on IncrementingCounter.prototype
    this._count++;
  }
}

var ii = new IncrementingCounter();
console.log(ii._count);// 0
console.log(ii.value);// 0
ii.increment();
console.log(ii.value); // 1
```

### Get the name of class that created an instance

`instance.constructor.name` gives you name of class/constructor Fn that created a given instance.

### static properties of class directly go on constructor Fn

```js
class C {
    static k = 1;
    static callMe(){
        console.log('call me!');
    }
}

C.callMe();
console.log(C.k);
```


### You cannot assign to this directly

```js
function test(){
    this = {};
    return this;
}
console.log(test());// SyntaxError: Invalid left-hand side in assignment
```

### `__proto__`

```js
class Object {
  get __proto__() {
    return Object.getPrototypeOf(this);
  }
  set __proto__(other) {
    Object.setPrototypeOf(this, other);
  }
  // ···
}
```

### dynamic dispatch for class method call

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return 'Person named '+this.name;
  }
}
const jane = new Person('Jane');

```
the method call `jane.describe()` happens in two steps:

1. Dispatch: In the prototype chain of jane, find the first property whose key is 'describe' and retrieve its value.

`const func = jane.describe;`

2. Call: Call the value, while setting this to jane.

`func.call(jane)`;


ou can make the same method call directly, without dispatching:

`Person.prototype.describe.call(jane)`
Note that this always points to the beginning of a prototype chain. That enables .describe() to access .name



### const and for-of loops

Note: const initialization needs to happen in the same line.

```js
// fine - const and for-of, new binding per iteration
/** // equivalent in for-of
 * {
    const __it = a[Symbol.iterator]();
    let __res;
    while ((__res = __it.next()) && !__res.done) {
        const e = __res.value;
        …
    }
}
*/
for(const i of [1,2,3,4,5]){
    console.log(i);
}

// fine - new binding per iteration
for(const j in {a: 1, b: 2}){
    console.log(j);
}

// syntax error!
for(const i=0; i<10; i++) {
    console.log(i);
}
```

### let and for loops




### Reference Errors

1. `x is not defined` - when variable not defined anywhere in code.

2. `cannot access j before initialisation` - Occurs when variable accessed in TDZ
```js
console.log(j);
let j = 1;
```

### let and const hoisting

The variables are created when their containing Lexical Environment is instantiated (i.e. hoisted to block scope).
let and const declarations define variables that are scoped to the running execution context's LexicalEnvironment
but may not be accessed in any way until the variable’s LexicalBinding is evaluated.


### Reference specification type

A Reference is a resolved name or property binding

Three components:
1. base value component
2. referenced name component: String/symbol
3. boolean valued strict flag

Base value possibilities: 
1. undefined
2. object
3. boolean
4. string
5. symbol
6. number
7. Environment Record

A base value component of `undefined` indicates that reference could not be resolved to a binding.

#### GetBase ( V )
Assert: Type(V) is Reference.
Return the base value component of V.

#### GetReferencedName ( V )
Assert: Type(V) is Reference.
Return the referenced name component of V.

#### HasPrimitiveBase(V)

1. Assert: Type(V) is Reference.
2. If Type(V's base value component) is Boolean, String, Symbol, or Number, return true; otherwise return false.

#### IsPropertyReference(V)
1. Assert: Type(V) is Reference.
2. If either base value component of V is `Object` or `HasPrimitiveBase(V)` is true, then return true, otherwise return false.

If a reference is not property reference, then Base must be Environment record.



### Environment Records

Common Methods:
```
HasBinding(N): determine if environment record has binding for string value N.

CreateMutableBinding(N,D):

CreateImmutableBinding(N, S):

InitializeBinding(N,V):

SetMutableBinding(N, V, S):

GetBindingValue(N,S):

DeleteBinding(N):

HasThisBinding():

HasSuperBinding():

WithBaseObject():
```

Two kinds:
1. Declarative Environment Records: Function Environment Records and module environment records are subclasses of declarative Environment record.
   Each declarative record is associated with program scope containing variable, constant, let, class, module, import and function declarations.
   A declarative environment record binds set of identifiers defined by declarations contained within scope.
2. Object Environment Records:
  Each object Environment Record is associated with an object called its binding object. 
  An object Environment Record binds the set of string identifier names that directly correspond to the property names of its binding object
  Because properties can be dynamically added and deleted from objects, the set of identifiers bound by an object Environment Record may potentially change as a side-effect of any operation that adds or deletes properties. 
  Any bindings that are created as a result of such a side-effect are considered to be a mutable binding even if the Writable attribute of the corresponding property has the value false. 
  Immutable bindings do not exist for object Environment Records.

### function and early activation

This is ok:
```js
assert.equal(foo(), 123); // OK
function foo() { return 123; }
```

If declared via let/const, TDZ comes into play and not ok:
```js
assert.throws(
  () => bar(), // before declaration
  ReferenceError);

const bar = () => { return 123; };

assert.equal(bar(), 123); // after declaration 
```


### Class declaration and in place activation

```js
assert.throws(
  () => new MyClass(),
  ReferenceError);
// TDZ before this declaration
class MyClass {}

assert.equal(new MyClass() instanceof MyClass, true);
```

Reason for inplace activation:
The operand of extends is an expression. Therefore, you can do things like this:
```js
const identity = x => x;
class MyClass extends identity(Object) {}
```


### setting property values in primitive values

If our code runs in the `strict` mode, setting a property on a primitive value will error. 
Otherwise, the assignment is ignored.

```js
'use strict';
let a = true;
a.opposite = false;
console.log(a.opposite);// Uncaught TypeError: Cannot create property 'opposite' on boolean 'true'
```


### Assigning to null (syntax error!)

```js
null = 10; // Uncaught SyntaxError: Invalid left-hand side in assignment
```

### primitives vs objects

null, undefined, booleans, numbers, and strings—have “always existed.” 
We can’t create a new string or a new number, we can only “summon” that value,
Every time we use the `{}` object literal, we create a brand new object value

### Same value equality (Object.is)

Despite `Object` in the method name, `Object.is` is not specific to objects. 
It can compare any two values, whether they are objects or not!

`NaN === NaN` is `false`, although they are the same value.
`-0 === 0` and `0 === -0` are true, although they are different values.

### 

In our JavaScript universe, both variables and properties act like “wires.” However, the wires of properties start from objects rather than from our code:
All wires always point to values

a property always points to a value! 
It can’t point to another property or a variable. In general, all wires in our universe point to values


## Void operator

`void expr` -evaluates expr and returns undefined. 
Examples:
```
    > void 0
    undefined
    > void(0)
    undefined
```

## Expression, statements and declarations.

A `statement` performs an action.

An `expression` usually returns a value.

An `expression` can be used where a `statement` is expected, it is called an `expression statement`.

A statement cannot be used where an expression is expected.

A `declaration` is a statement that usually introduces some variable into scope.

Something like this can be both expression and a statement, depending on where it is used:
```js
{// parsed as statement
    foo: sum(1,2)
}

var abc = {// parsed as object literal expression
    foo: sum(1,2)
}
```

### 
Statements can have labels e.g. following is valid javascript:
```js
function ff() {
    hey: var k = 2;
}
```
but there is no goto statement in js, labels only can be used with `break` or `continue`
e.g.
```js
let str = '';

loop1:
for (let i = 0; i < 5; i++) {
  if (i === 1) {
    continue loop1;
  }
  str = str + i;
}

console.log(str);
```

### Standalone blocks / Curly braces without anything also is a valid block i.e. collection of statemetns

It might surprise you that JavaScript has blocks that can exist on their own.

```js
{ // Parsed as block statement
    let k = 1;
    let j = 2;
    console.log(k+j);
}
```

### Semicolon and comma operator

`Semicolon` can used to chain statements:
```js
function f() {
  ab(); cd();
}
```

`Comma operator` can be used to **chain expressions, within a parantheses**:
```js
var x = ("A", "b");
console.log(x);

// another example
console.log(("a", "b")); // b
```


## hasOwn method on Object

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn

The `Object.hasOwn(instance, propStringOrSymbol)` static method returns true if the specified object has the indicated property as its own property. If the property is inherited, or does not exist, the method returns false.

returns `true` if the specified property is a direct property of the object — even if the property value is null or undefined.

`Note` - Unlike the `in` operator, this method does not check for the specified property in the object's prototype chain.

```js
const object1 = {
  prop: 'exists'
};

console.log(Object.hasOwn(object1, 'prop'));
// expected output: true

console.log(Object.hasOwn(object1, 'toString'));
// expected output: false

console.log(Object.hasOwn(object1, 'undeclaredPropertyValue'));
// expected output: false
```

