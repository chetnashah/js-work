
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

1. For **objects**, *slice copies object references into the new array*. Both the original and new array refer to the same object. If an object changes, the changes are visible to both the new and original arrays.
2. For `strings`, `numbers` and `booleans` (not String, Number and Boolean objects), **slice copies the values into the new array. Changes to the string, number, or boolean in one array do not affect the other array**.

```js
arr.slice([begin[, end]])  // note begin, end are both optional
```
Behavior for optional args:
If `begin` is undefined, slice begins from index 0.
If `begin` is greater than the length of the sequence, an empty array is returned.

If `end` is omitted, slice extracts through the end of the sequence (arr.length).
If `end` is greater than the length of the sequence, slice extracts through to the end of the sequence (arr.length).

`Retruns:` new array containing the slice


### map

signaturE:
```js
map(function(element, index, array) { /* … */ }, thisArg)
```

returns new array after mapping each element.

It is **not called for missing elements of the array**; that is:

* indexes that have never been set;
* indexes which have been deleted.

### find

Returns the `first value` that passes the predicate test.
If no element passes the test, `undefined` is returned.
```js
arr.find(callback(element[, index[, array]])[, thisArg])
```

### indexOf

`indexOf` uses strict equality i.e. `===` for comparision

### includes

`includes` uses `Object.is` for comparision, instead of `===`.

### push

mutates array in place by adding element at the end

### flat (upto a level if specified)

The `flat()` method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.

```js
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());
// expected output: [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];

console.log(arr2.flat(2));
// expected output: [0, 1, 2, [3, 4]]
```

### flatMap

The `flatMap()` method returns a **new array** formed by applying a given callback function to each element of the array, and then `flattening the result by one level`. It is identical to a `map()` followed by a `flat()` of `depth 1` **(arr.map(...args).flat())**, but slightly more efficient than calling those two methods separately.


Signature
```js
flatMap(function(currentValue, index, array) { /* … */ }, thisArg)
```

Example:
```js
const arr1 = [1, 2, [3], [4, 5], 6, []];

const flattened = arr1.flatMap(num => num);

console.log(flattened);
// expected output: Array [1, 2, 3, 4, 5, 6]
```

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


### at method

The `at()` method takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.

This is not to suggest there is anything wrong with using the square bracket notation. For example array[0] would return the first item. However instead of using array.length for latter items; e.g. `array[array.length-1]` for the last item, you can call `array.at(-1)`. (See the examples below)



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


### `sort` is in place, return value is the same array

Returns The reference to the original array, now sorted. 
**Note that the array is sorted in place, and no copy is made.**

**Note** - **default `sort` is  not numerical, but lexicographical**, even if all array elements are numbers.
e.g.
```js
const a = [999, 1111, 111, 2, 0] 
const b = a.sort()

console.log(a)// [0,111,1111,2,999]
console.log(b)// [0,111,1111,2,999]
```

In order to do numerical sort, you must pass a comparator as an argument to sort:
e.g.
```js
const numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

// [1, 2, 3, 4, 5]
```

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

## ForEach

For Each signature:
```js
forEach((element, index, array) => { /* … */ }, thisArg);
```

There is no way to stop or break a `forEach()` loop other than by throwing an exception. If you need such behavior, the `forEach()` method is the wrong tool.

Array methods: `every()`, `some()`, `find()`, and `findIndex()` test the array elements with a predicate returning a truthy value to determine if further iteration is required.

`forEach` does not wait for promises. Make sure you are aware of the implications while using promises.

**forEach() does not make a copy of the array before iterating.**

## reverse

`arr.reverse()` does not return anything and reverses in place.

## Reduce

The `reduce()` method itself does not mutate the array it is used on. However, it is possible for code inside the callback function to mutate the array.

Reduce full signature:
```js
reduce((previousAccValue, currentValue, currentIndex, array) => { /* … */ }, initialValue)
```

### Typical behaviors and edge cases

* If elements are appended to the array after reduce() begins to iterate over the array, the callback function does not iterate over the appended elements.
* If existing elements of the array do get changed, the values passed to the callback function will be the values from the time that `reduce()` was first called on the array.
* Array elements that are deleted after the call to reduce() begins and before being iterated over are not visited by reduce().

If the array only has one element (regardless of position) and no initialValue is provided, or if initialValue is provided but the array is empty, the solo value will be returned without calling callbackFn.

If initialValue is provided and the array is not empty, then the reduce method will always invoke the callback function starting at index 0.

If initialValue is not provided then the reduce method will act differently for arrays with length larger than 1, equal to 1 and 0, as shown in the following example:



### Parameters

`callbackFn`:
A "reducer" function.

The function is called with the following arguments:

`previousValue`: the value resulting from the previous call to callbackFn. On first call, initialValue if specified, otherwise the value of `array[0]`.

`currentValue`: the value of the current element. On first call, the value of `array[0]` if an initialValue was specified, otherwise the value of `array[1]`.

`currentIndex`: the index position of currentValue in the array. On first call, 0 if initialValue was specified, otherwise 1.

`array`: the array to traverse.

`initialValue` Optional
A value to which previousValue is initialized the first time the callback is called. If initialValue is specified, that also causes currentValue to be initialized to the first value in the array. If initialValue is not specified, previousValue is initialized to the first value in the array, and currentValue is initialized to the second value in the array.

### Array to String co-ercion

String co-ercion for arrays is simply comma separated items of array all in one string
e.g.
```js
[1,"hey"].toString() === "1,hey" // true
["hey"].toString() === "hey" // single element to string is same as the element as string
```