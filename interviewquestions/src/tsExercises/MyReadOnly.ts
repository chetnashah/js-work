/**
 * Readonly < T > returns a type that sets all properties of T to readonly.

Pleaes implement MyReadonly < T > by yourself.
*/

type MyReadonly<T> = {
    readonly [K in keyof T]: T[K]
};

type Foo2 = {
    a: string
}

const a2: Foo2 = {
    a: 'BFE.dev',
}
a2.a = 'bigfrontend.dev'
// OK

const b2: MyReadonly<Foo2> = {
    a: 'BFE.dev'
}
b2.a = 'bigfrontend.dev'
// Error
