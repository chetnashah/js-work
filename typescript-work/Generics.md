
## Naming your type parameters


It's common (and acceptable) in situations like this where we really don't know anything else about the Generic type parameter to use a single letter like `T`. 

But the moment you have multiple arguments (or more context for what this type will be) it's a good idea to use more descriptive names.

e.g.
```ts
type GroceryItem<Name, Price, InStock> = {
  name: Name;
  price: Price;
  inStock: InStock;
};
```

## Why do we need type constraints?

Plain type parameters i.e. `T` are too loose, and we want consumers of API to do limited things with our types. 

Just how terms/variables are restricted by types, to provide better guarantees about the behavior of our code, type parameters can be restricted by constraints.

### Most likely your code is not ready to handle all types `T`, constrain its possibilities via type bounds/constraints!

e.g.
That means that if we make a type like this:

```ts
type Row<T> = {
  value: T;
  label: string;
  orientation: 'vertical' | 'horizontal';
};
```
A consumer of this type could pass literally anything for Row. All of these would be valid:

```ts
// valid but unnencessary, we should probably restrict what T can be based on ops we do on T
type BooleanRow = Row<boolean>;
type RegexRow = Row<RegExp>;
type RowRowRowStringRow = Row<Row<Row<Row<string>>>>;
type VoidFuncRow = Row<() => void>;
```

**That's kinda what Generic type constraints are: type constraints for your parameterized types!**

### A better design with type constraints

So, let's say that our component is advanced enough to handle three things:
```
string: a row with a string value
number: a row with a numeric value
() => string | number: a row with a lazily evaluated value that can itself be a string or a number
```
Let's make a type alias for our constraints:

```ts
type RowConstraints = string | number | (() => string | number);
```
Note: Function type notation must be parenthesized when used in a union type (otherwise it might be ambiguous).

To tell TypeScript that we only want to allow Row to accept types that fall into one of these categories we specified in RowConstraints we use the extends keyword.

```ts
type Row<T extends RowConstraints> = {
  value: T;
  label: string;
  orientation: 'vertical' | 'horizontal';
};
```
Now, if we try to use our Row generic with anything that doesn't match the above, TypeScript will report an error:

```ts
type StringArrayRow = Row<string[]>;
//                        ^?
```

### Restraining type parameters at input

```ts
// way 1 - dynamically check, but does not throw type error - checking dynamically
// type AllowString<S> = S extends string ? string : never;

// better way! - throws type error
// way 2 checking at input of type parameter for shape
type AllowString<String extends string> = String;
```

## Generic arrow function syntax

```ts
const identity = <T>(x: T) => x;
```

## map fn with arr
```ts
const mapArray = <T, U>(arr: T[], fn: (val: T, idx: number, arr: T[]) => U) => arr.map(fn);
```

## filter fn with arr (uses type predicates)

```ts
filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
```
