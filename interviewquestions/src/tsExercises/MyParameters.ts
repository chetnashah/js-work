/**
For function type T, Parameters<T> returns a tuple type from the types of its parameters.

Please implement MyParameters<T> by yourself.
*/

type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => infer R ? P : never;

type Foo8 = (a: string, b: number, c: boolean) => string

type A8 = MyParameters<Foo8> // [a:string, b: number, c:boolean]
type B8 = A8[0] // string
type C8 = MyParameters<{ a: string }> // Error
