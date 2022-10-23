/**
 * Parameters<T> handles function type. Similarly, ConstructorParameters<T> is meant for class, it returns a tuple type from the types of a constructor function T.

Please implement MyConstructorParameters<T> by yourself.

 */

type MyConstructorParameters = null;

class Foo9 {
    constructor(a: string, b: number, c: boolean) { }
}

type C9 = MyConstructorParameters<typeof Foo9>
  // [a: string, b: number, c: boolean]
