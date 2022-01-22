
### Array.isArray

`typeof` is not sufficient because: 
`typeof [1,2,3]` is `object`, Array is a complex object type so to speak.

http://web.mit.edu/jwalden/www/isArray.html

Return true if passed in value is an array.
```js
// all following calls return true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(new Array('a', 'b', 'c', 'd'));
Array.isArray(new Array(3));
// Little known fact: Array.prototype itself is an array:
Array.isArray(Array.prototype); 
```

### concat

concatenate/merge multiple arrays into single one by returning a new one.
```js
const new_array = old_array.concat([value1[, value2[, ...[, valueN]]]])
```
if `value` is not an array, it is simply added to the result.

`NOte`: 
1. Object references (and not the actual object): concat copies object references into the new array. Both the original and new array refer to the same object. That is, if a referenced object is modified, the changes are visible to both the new and original arrays. This includes elements of array arguments that are also arrays.
2. Data types such as strings, numbers and booleans (not String, Number, and Boolean objects): concat copies the values of strings and numbers into the new array.

### slice

The `slice()` method returns a `shallow copy` of a portion of an array into a new array object selected from `begin` to `end` (end not included) where begin and end represent the index of items in that array.

slice does not alter the original array. It returns a shallow copy of elements from the original array. Elements of the original array are copied into the returned array as follows:

For objects, slice copies object references into the new array. Both the original and new array refer to the same object. If an object changes, the changes are visible to both the new and original arrays.
For strings, numbers and booleans (not String, Number and Boolean objects), slice copies the values into the new array. Changes to the string, number, or boolean in one array do not affect the other array.

```js
arr.slice([begin[, end]])  // note begin, end are both optional
```
Behavior for optional args:
If `begin` is undefined, slice begins from index 0.
If `begin` is greater than the length of the sequence, an empty array is returned.

If `end` is omitted, slice extracts through the end of the sequence (arr.length).
If `end` is greater than the length of the sequence, slice extracts through to the end of the sequence (arr.length).

`Retruns:` new array containing the slice

### find

Returns the `first value` that passes the predicate test.
If no element passes the test, `undefined` is returned.
```js
arr.find(callback(element[, index[, array]])[, thisArg])
```

### push

mutates array in place by adding element at the end

### splice

Modifies array in place.
takes `startIndex`, `deleteCount`, and comma separated elements to be added.
```js
var arrDeletedItems = array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```
As a side effect of mutation, length is updated to reflect the deletion/addition of items.

`Returns:` An array containing the deleted elements. If only one element is removed, an array of one element is returned. If no elements are removed, an empty array is returned.

### remove

JS arrays do not have a remove method, use `filter` instead, or `splice` if want to remove in place.

### unshift

The `unshift()` method adds one or more elements to the beginning of an array and returns the new length of the array. mutates the array i.e destructive

`arr.unshift(element1[, ...[, elementN]])`: The new length property of the object upon which the method was called.

```js
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// expected output: 5

console.log(array1);
// expected output: Array [4, 5, 1, 2, 3]
```

### shift

The `arr.shift()` method removes the first element from an array and returns that removed element. This method changes the length of the array. 
Mutates the array.
Destructively removes first element

Returns: The removed element from the array; undefined if the array is empty.
```js
const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// expected output: Array [2, 3]

console.log(firstElement);
// expected output: 1
```

### pop

destructively remove last element


### Symbol.isConcateSpreadable to configure spreading behavior of array

```js
const alpha = ['a', 'b', 'c'];
const numeric = [1, 2, 3];
let alphaNumeric = alpha.concat(numeric);

console.log(alphaNumeric);
// expected output: Array ["a", "b", "c", 1, 2, 3]

numeric[Symbol.isConcatSpreadable] = false;
alphaNumeric = alpha.concat(numeric);

console.log(alphaNumeric);
// expected output: Array ["a", "b", "c", Array [1, 2, 3]]
```

### length

`length` is a non-enumerable property on an array, i.e. won't appear in `Object.keys` or won't 
be copied in case of object spread `{...arr}`. 


### Holes

An Array is sparse if the range of indices has holes in it. That is, some indices are missing.

1. We can create holes by skipping indices when assigning elements:

```js
const arr = [];
arr[0] = 'a';
arr[2] = 'c';
```

2. Another way of creating holes is to skip elements in Array literals:

```js
const arr = ['a', , 'c'];
assert.deepEqual(Object.keys(arr), ['0', '2']);
```

3. We can also delete Array elements:

```js
const arr = ['a', 'b', 'c'];
assert.deepEqual(Object.keys(arr), ['0', '1', '2']);
delete arr[1];
assert.deepEqual(Object.keys(arr), ['0', '2']);
```

#### Array operations and holes

nothing to remember, better test in console

`filter` will remove holes:
```js
['a',,'b'].filter(x => true) //[ 'a', 'b' ]
```

`every/any` will ignore holes
```js
['a', ,'a'].every(x => x === 'a')// true
```

`map` will preserve holes
```js
['a',,'b'].map(x => 'c') //[ 'c', , 'c' ]
```

