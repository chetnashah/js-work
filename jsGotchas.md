

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