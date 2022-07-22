

## For loop and let

`for(let i;;){}`
`i` gets a new binding for every iteration of the loop.

This means that every closure captures a different i instance.

Here is how babel will transform:
```js
for (let i = 0; i < 3; i++) {
    i++;
    setTimeout(function() {
        console.log(i );
    }, 100);
    i--;
}
```
into 
```js
"use strict";

var _loop = function _loop(_i) {// different i binding per i
  _i++;
  setTimeout(function () {
    console.log(_i);
  }, 100);
  _i--;
  i = _i;
};

for (var i = 0; i < 3; i++) {
  _loop(i);
}
```

### What would be answer for following?

```js
let num

for (let i = 0; i < 5; i++) {
  num = i
  setTimeout(() => {
    console.log(num)
  }, 100)
}

//Ans: because num binding is a long lived reference, and not per loop variable binding
/*
4
4
4
4
4
*/
```


### NaN is not equal to itself

```js
NaN == NaN // false
NaN === NaN // false

typeof NaN // "number"
```




### `isNaN()` vs `Number.isNaN()`

`isNaN` tries to convert passed-in value to number and returns true/false based on whether it was successfull by using `ToNumber`.

```js
isNaN({}); // true
isNaN(""); // false, 
isNaN('dude'); // true
isNaN([]); // false
isNaN(true); // false
isNaN(false); // false
isNaN(NaN); // true
isNaN(null);// false
isNaN(undefined);// true
```

**ToNumber** - See table below

| Argument type | Result |
|---|-----|
| Number | Return without conversion |
| Undefined | return NaN |
| null | return +0 |
| symbol | throw TypeError |
| string | if not stringnumericalliteral, return NaN |
| boolean | arg is true -> ret 1, arg is false -> ret 0|
| object | conver to primitive and apply ToNumber |
| NaN | return NaN |


`Number.isNaN` does not try to do any conversion and simply checks if value is `NaN`. In every other case it returns false.

```js
Number.isNaN(NaN); // true

// Number.isNaN is false for all other 
```

`NaN` interaction with `Math.min/Math.max` - ans is `NaN` if any argument is `NaN`.

To get a value that might be a number : use`parseInt`,it can be used to convert int/numering strings -> numbers.
and to `NaN` in all other cases, which can be followed by an `isNaN`/`Number.isNaN` check.

In fact below definitions are equivalent:
```js

function n1(a1) {
    if(typeof a1 === 'number' && isNaN(a1)) {// isNaN alone is not enough, guard it with typeof check or parseInt check
        return true;
    }
    return false;
}

// same semantics as above
function n2(a2) {
    return Number.isNaN(a2); // will not do any conversion, plain check for NaN
}
```

Reference implementation: (that only checks pure numbers, no string numbers e.g. `'123'` not allowed)
```js
function isValidNumber(n){
    if(typeof n == 'number' && Number.isNaN(n)) {
        return false;
    }
    if(typeof n != 'number') {
        return false;
    }
    return true;
}
```

### `undefined` is stringified as `null` in JSON.stringify

```js
JSON.stringify([1,2,undefined,3])
// "[1,2,null,3]"
```

### `in` operator vs `hasOwnProperty`

in will also return true if key gets found somewhere in the prototype chain, whereas Object.hasOwnProperty (like the name already tells us), will only return true if key is available on that object directly (its "owns" the property).


### Object keys that are symbols dont take part in stringification (JSON.stringify)

```js
const ll = {
    [Symbol.for('hi')]: 111, // omitted in JSON.stringify
    abc: 12
};
console.log(JSON.stringify(ll));// {"abc": 12}
```


## Associative `+` prefix (acts as parseInt)

Give output for following:
```js
console.log(1 + 1) // 2
console.log(1 + + 1) // 2
console.log(1 + + 1 + 1) // 3
console.log(1 + + 1 + + 1) // 3
console.log(1 + + + 1) // 2

console.log(1 + + '1' + + '1')   // 1 + (+'1') + (+'1') = 3
console.log('1' + + '1' + + '1') // '1' + (+'1') + (+'1') = 111
console.log('a' + + 'b')         // a + (+'b') = aNaN
console.log('a' + + 'b' + 'c')   // a + (+'b') + ('c') = aNaNc
console.log('a' + + 'b' + + 'c') // 'a' + NaN + NaN = aNaNNaN
```

## Output for followwing:

```js
var a = 1;
(function() {
    debugger;
    console.log(a + this.a);
  var a = '2'
  console.log(a + this.a);
})();

var name = 1;
(function() {
    debugger;
  console.log(name + this.name);
  var name = '2'
  console.log(name + this.name);
})();
```

NaN - undefined + 1
21
"undefined1" - Its because `window/globalThis.name` will always be converted to a string.
21


###

```js
function* gen() {
  yield 2 * (yield 100)
}

const generator = gen()
console.log(generator.next().value)// first yield value comes from gen fn
console.log(generator.next(1).value)// replace with 1 at yield site
console.log(generator.next(1).value)// 

// 100
// 2
// undefined
```

### Multiple declaration/assignment with same name

```js
function foo(){ console.log(1) }
var foo = 2
function foo(){ console.log(3) }
foo()
// TypeError: foo is not a function
```
Order of Precedence: variable Assigment > function declaration > variable declaration



## Use of comma operator

```js
var obj = {
  a: "BFE",
  b: "dev",
  func: (function foo(){ return this.a; }, function bar(){ return this.b; })
}

console.log(obj.func())
```

Refer Comma operator in [language notes](languageNotes.md)

## in operator 

```js
const obj = {
  foo: 'bar'
}

console.log('foo' in obj)    // true - this is obvious
console.log(['foo'] in obj)  // Array to string co-ercion as per spec: ['foo'].toString() === "foo"
```

### parseInt weirdness

```js
console.log(parseInt(0.00001))  // 0
console.log(parseInt(0.000001)) // 0
console.log(parseInt(0.0000001))// 1
```

### Order of printing

```js

console.log(1)

document.body.addEventListener('click', () => {
  console.log(2)
})

Promise.resolve().then(() => { // micro task queue
  console.log(3)
})

setTimeout(() => { // macro task queue
  console.log(4)
}, 0)

console.log(5)

document.body.click() // click invocation is sqynchronous

console.log(6)
```

### post message asynchrony

```js
console.log(1)

window.onmessage = () => {
  console.log(2)
}

Promise.resolve().then(() => {// microtask queue
  console.log(3)
})

setTimeout(() => { // macrotask
  console.log(4)
}, 0)

console.log(5)

window.postMessage('')// after microtasks, before macrotasks

console.log(6)
```

## empty elements and iteration

```js
const arr = [1]
arr[5] = 6

// forEach
arr.forEach(i => console.log(i)) // ignores empty

// map
console.log(arr.map(i => i * 2))// same size as original with empty

// for ... of
for (const i of arr) {// iteration for all, empty treated as undefined
  console.log(i)
}

// spread
console.log([...arr])// empty treated as undefined, same size as original
```


## This practice 1

```js
const obj = {
  a: 1,
  b: function() {
    console.log(this.a)
  },
  c() {
    console.log(this.a)
  },
  d: () => {
    console.log(this.a)
  },
  e: (function() {
    return () => {
      console.log(this.a);
    }
  })(),
  f: function() {
    return () => {
      console.log(this.a);
    }
  }
}

console.log(obj.a);
obj.b()
;(obj.b)()
const b = obj.b
b()
obj.b.apply({a: 2})
obj.c()
obj.d()
;(obj.d)()
obj.d.apply({a:2})
obj.e()
;(obj.e)()
obj.e.call({a:2})
obj.f()()
;(obj.f())()
obj.f().call({a:2})
```

### This 2

```js
const obj = {
  a: 1,
  b() {
    return this.a
  }
}
console.log(obj.b()) // 1
console.log((true ? obj.b : a)()) // undefined , ternary operator returns reference to function, no context
console.log((true, obj.b)()) // undefined - comma operator returns reference to function, no context 
console.log((3, obj['b'])()) // undefined - comma operator returns reference to function, no context
console.log((obj.b)())//  1, (fn) does nothing
console.log((obj.c = obj.b)()) // undefined - assignment operator returns reference to function,no context
```

## This 3

```js
var bar = 1

function foo() {
  return this.bar++
}

const a = {
  bar: 10,
  foo1: foo,
  foo2: function() {
    return foo()
  },
} 


console.log(a.foo1.call())// 1: when call has empty thisArg, this will be global obj
console.log(a.foo1())// 10: this is context obj a, which has 10
console.log(a.foo2.call())// empty thisArg -> global obj is this
console.log(a.foo2());// foo() invoked without context so global obj is context
```

### Promise gotcha

```js
// This is a JavaScript Quiz from BFE.dev

console.log(1)

setTimeout(() => {
  console.log(2)
}, 10)

setTimeout(() => {
  console.log(3)
}, 0);

new Promise((_, reject) => { // promise executor always executes synchronously
  console.log(4)
  reject(5)
  console.log(6)
}).then(() => console.log(7))
.catch(() => console.log(8))
.then(() => console.log(9))
.catch(() => console.log(10))
.then(() => console.log(11))
.then(console.log)
.finally(() => console.log(12))

console.log(13) 
```

### Prototype

```js
function Foo() { }
Foo.prototype.bar = 1
const a = new Foo()
console.log(a.bar)

Foo.prototype.bar = 2
const b = new Foo()// b has protoLink to the Foo.prototype
// think of it as equivalent to Object.create(Foo.prototype)
console.log(a.bar)
console.log(b.bar)

Foo.prototype = {bar: 3}
const c = new Foo()// only c has protolink to this new Foo.prototype object
console.log(a.bar)
console.log(b.bar)// 
console.log(c.bar)
```
Ans:
```
1
2
2
2
2
3
```

### Arrow functions and this

```js
// This is a JavaScript Quiz from BFE.dev

const obj = {
  dev: 'bfe',
  a: function() {
    return this.dev
  },
  b() {
    return this.dev
  },
  c: () => {
    return this.dev
  },
  d: function() {
    return (() => {
      return this.dev
    })()
  },
  e: function() {
    return this.b()
  },
  f: function() {
    return this.b
  },
  g: function() {
    return this.c()
  },
  h: function() {
    return this.c
  },
  i: function() {
    return () => {
      return this.dev
    }
  }
}

console.log(obj.a())
console.log(obj.b())
console.log(obj.c())
console.log(obj.d())
console.log(obj.e())
console.log(obj.f()())
console.log(obj.g())
console.log(obj.h()())
console.log(obj.i()())
```

### Promises and finally

```js
Promise.resolve(1)
.finally((data) => {
    debugger;
  console.log(data)
  return Promise.reject('error')
})
.catch((error) => {
    debugger;
  console.log(error)
  throw 'error2'
})
.finally((data) => {
    debugger;
  console.log(data)
  return Promise.resolve(2).then(console.log)
})
.then(console.log)
.catch(console.log)
```

## Promises and setTimeout

```js
// This is a JavaScript Quiz from BFE.dev

console.log(1)
const promise = new Promise((resolve) => {
  console.log(2)
  resolve()
  console.log(3)
})

console.log(4)

promise.then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
})

console.log(7)

setTimeout(() => {
  console.log(8)
}, 10)

setTimeout(() => {
  console.log(9)
}, 0)
```

### this based

```js
const obj = {
  a: 1,
  b: this.a + 1,
  c: () => this.a + 1,
  d() {
    return this.a + 1
  },
  e() {
    return (() => this.a + 1)()
  }
}
console.log(obj.b)
console.log(obj.c())
console.log(obj.d())
console.log(obj.e())
```


### Imp about promise resolving

```js
const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => resolve(p1))
const p3 = Promise.resolve(p1)
const p4 = p2.then(() => new Promise((resolve) => resolve(p3)))
const p5 = p4.then(() => p4)

console.log(p1 == p2)
console.log(p1 == p3)
console.log(p3 == p4)
console.log(p4 == p5)
```