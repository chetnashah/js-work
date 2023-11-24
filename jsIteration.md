
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

## Built-in iterables

1. `String`, 
2. `Array`, 
3. `TypedArray`, 
4. `Map`, 
5. `Set`
6. `arguments` object
7. `NodeList` objects
6. Segments (returned by Intl.Segmenter.prototype.segment()) are all built-in iterables, because each of their prototype objects implements an `@@iterator` method.

### Built-in async iterable

1. `ReadableStream`

## Built in APIs accepting iterables

1. Map()
2. WeakMap()
3. Set()
4. WeakSet()
5. Promise.all()
6. Promise.allSettled()
7. Promise.race()
8. Promise.any()
9. Array.from()
10. Object.groupBy()
11. Map.groupBy()
12. `for...of` loop - `for (const value of ["a", "b", "c"]) { console.log(value); }`
13. `...` spread operator
14. `yield*` operator
15. `destructuring` assignment