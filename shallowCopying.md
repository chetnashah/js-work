
https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy

In JavaScript, all standard built-in object-copy operations -> create shallow copies rather than deep copies.
1. `spread` syntax, 
2. `Array.prototype.concat()`, 
3. `Array.prototype.slice()`, 
4. `Array.from()`, 
5. `Object.assign()`, and 
6. `Object.create()` 



### Spread based shallow copying of objects

Only own properties are copied by object spreading, stuff like protoLinks, internal slots, symbols etc is missed.

```js
const copyOfObj = {...originalObject};
```
Works mostly fine

#### Issue: objects instantiated from class, have their protolink wiped lost while shallow copying via spread

```js
class A{}
const a = new A();
console.log(a instanceof A);// true
const b = {...a};// only own properties of a spread
console.log(b instanceof A);// false
```

This can be fixed by adding extra line:
```js
Object.setPrototypeOf(b, Object.getPrototypeOf(a));
```
or
```js
{
    __proto__: Object.getPrototypeOf(originalObj),
    ...originalObj
}
```

#### Object property attributes are not faithfully copied by spreading

descriptor attributes like `writable` etc are not respected while copying.

```js
const obj = Object.defineProperty({}, 'h', {
    value: 11,
    writable: false,
    enumerable: true
});
console.log(obj);

const objCopy = {...obj};
console.log(Object.getOwnPropertyDescriptors(objCopy));
/**
 * { h: 
   { value: 11,
     writable: true,        // should have been false
     enumerable: true,
     configurable: true } }
     */
```

#### keys are copied, primitive values are copied, object value references are shared on spreading.

```js
const k = {a: 1, b: {d: 1}};
const j = {...k};

j.a = 11;// k unaffected for primitive values.
console.log(k);// { a: 1, b: { d: 1 } }

j.b.c = 111;// k also updated
console.log(k);// { a: 1, b: { d: 1, c: 111 } }
```

### Object.assign vs spreading

`Object.assign` uses assignment (invoking setters) to create properties in the copy,
`spread operator` defines new properties on the copy.

### More faithful copying via descriptors

By a combination of `defineProperties` and `getOwnPropertyDescriptors`, we can have a better copy, 

This solves two problems:
1. ignored getters/setters of properties
2. ignored configurable/writable attributes of properties

```js
function copyAllProperties(original) {
    return Object.defineProperties({}, Object.getOwnPropertyDescriptors(original));
}
const k = {a: 1, b: {d: 1}};
const we = copyAllProperties(k);
console.log(we);
```