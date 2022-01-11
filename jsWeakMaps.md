**Prerequisite** - `All keys` in weakmaps `have to be objects`, and values can be arbitrary values.

Keys (which are objects) are weakly refereced, not the values. (Important fact)

* weak stuff like `WeakSet` and `WeakMap` are not iterable. i.e you cannot get keys or iterate over keys of a weakmap.
* If you lose the key, you lose the value as well

Key and the associated value can disappear from the map on garbage collection, i.e. key is weakly held by the map.

Methods on `WeakMap`:
1. `get`
2. `set`
3. `has`
4. `delete` 


Use cases:
1. use dom nodes as keys (temp lifecycle of dom nodes)

2. storing private data within weakmaps:
```js
const privates = new WeakMap();

function Public(name) {
    const me = {
        personalId: 'XX-YY'
        // Private data goes here
    };
    privates.set(this, me);
    this.name= name;
}

Public.prototype.printAllInfo = function () {
  const me = privates.get(this);
  // Do stuff with private data in `me`...
  console.log('All Info of ', this.name, ' is : ', me);
};


const p = new Public('chet');
console.log('p = ', p);
p.printAllInfo();
```