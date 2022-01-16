
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

In fact below definitions are equivalent:

```js

function n1(a1) {
    if(typeof a1 === 'number' && isNaN(a1)) {
        return true;
    }
    return false;
}

// same semantics as above
function n2(a2) {
    return Number.isNaN(a2);
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