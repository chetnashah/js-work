
## JS does not support function overloading

## TS provides overloading support to break complex type signature into distinct use cases

The actual implementation would actually take a union of all function signatures:

```ts

// better than function add(a: string | number, b: string | number): string | number
// more specific declarations on input and output
function add(a: number, b: number): number;
function add(a: string, b: string): string;

// implementation should accept a union of all function signatures
function add(a: string | number, b: string | number): string | number {
  if (typeof a === 'string' && typeof b === 'string') {
    return `${parseInt(a)} + ${parseInt(b)}`;
  }
  return a + b;
}
```

## type matching for function overloads works from top to bottom - put specific signatures on top, wider ones on the bottom