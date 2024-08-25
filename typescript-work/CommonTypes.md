
Learn more at: https://typehero.dev/explore

## Equal type

1. Prerequisite - learn about distributivity in conditional types, and that distributivity can be prevented by using `[T]` in conditional types.

```ts
type EqEq<T,U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false;

// edge cases:
type tt = EqEq<{a: 'A'}, { readonly a: 'A'}>; // true
type tt2 = EqEq<{ readonly a: 'A'}, {a: 'A'}>; // true
```
Gotchas - `any` and `never`.

There is one more implementation, that takes care of `readonly` also:
```ts
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
	? true
	: false;

// works well with readonly also, I don't know why!
type tt = EqEq<{a: 'A'}, { readonly a: 'A'}>; // false
type tt2 = EqEq<{ readonly a: 'A'}, {a: 'A'}>; // false
```

## Convert Array into union of literal types

```ts
const fruits = ['apple', 'banana', 'orange'] as const;
type Fruit = typeof fruits[number]; // this is because number = 1 | 2 | 3 | ...
// Fruit is 'apple' | 'banana' | 'orange'
```

## `ReadOnly<T>`

Make all properties in T readonly - implemented via mapped types.

## TupleToObject

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

Ans:
```ts
type TupleToObject<T extends readonly (string|number|symbol)[]> = {
	[K in T[number]]: K
}
```

How to think about this?
1. `number` is `1 | 2 | 3 | 4 | ..... `
2. so `T[number]` is `T[1] | T[2] | T[3] | T[4] | ....`
3. `K in` in mapped types can work on any type union set, not just `keyof T`.


## `First<T>`

Implement a generic `First<T>` that takes an Array T and returns its first element's type.


### approach 1
Do tests via `extends`, and create variables via `infer`
```ts
type First<T extends any[]> = T extends [infer K, ...infer U] ? K : never


import type { Equal, Expect } from '@type-challenges/utils'
type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]
```

### approach 2
You can use indexed types like `T[0]` to get the type of the first element of the array.
```ts
type First<T extends any[]> = T extends [] ? never: T[0]
```

## `Length<T>`

For given a tuple, you need create a generic Length, pick the length of the tuple.

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

### Solution

Since `T` is an array i.e. extends `any[]`, we can use `length` on `T` to get the length of the array.

```ts
type Length<T extends readonly any[]> = T['length']
```

## `If<C,T,F>`

Implement the util type `If<C, T, F>` which accepts condition C, a truthy value T, and a falsy value F. C is expected to be either true or false while T and F can be any type.

```ts
type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
```

### Solution

```ts
type If<C extends boolean, T, F> = C extends true ? T : F;
```

## `Exclude<T,U>`

Implement the built-in `Exclude<T, U>`

Exclude from T those types that are assignable to U

For example:
```ts
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

### Solution 

```ts
type MyExclude<T, U> = T extends U ? never: T
```

**Distributivity** of conditionals come into play, along with subtyping rules
1. Distributivity of a union of types under conditionals: If `T` is `A | B | C`, then `T extends U ? X : Y` becomes:
`(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)`
2. Subtyping: `'a' extends 'a' | 'b' | 'c' = true`, because `'a'` is assignable to `'a' | 'b' | 'c'`, or subtype of `'a' | 'b' | 'c'`

## `Awaited<P>`

Implement the built-in `Awaited<T>`

Uses `infer` to get inner type, and recursion to handle nested promises.

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer Inner> 
  ? Inner extends PromiseLike<any> 
		? MyAwaited<Inner> 
		: Inner
	: never;
```

## `Concat<T,U>`
Implement the JavaScript Array.concat function in the type system. A type takes the two arguments. The output should be a new array that includes inputs in ltr order

```ts
type Result = Concat<[1], [2]> // expected to be [1, 2]
```

Since `T`, and `U` are both valid arrays (by type boundaries), we can use `...` spread operator to concatenate them.

```ts
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U]
```

## `Includes<T,U>`

Implement the JavaScript Array.includes function in the type system. A type takes the two arguments. The output should be a boolean true or false.

```ts
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
```

