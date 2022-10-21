/**
 * 
 * Pick<T, K>, as the name implies, returns a new type by picking properties in K from T.

    Please implement MyPick<T, K> by yourself.
 */

// we use extends in an intelligent way for K keys to substract all Keys that do not fall in T.
type MyPick<T, K extends keyof T> = {
    [K1 in K]: T[K1]
}

type Foo4 = {
    a: string
    b: number
    c: boolean
}

type A = MyPick<Foo4, 'a' | 'b'> // {a: string, b: number}
type B = MyPick<Foo4, 'c'> // {c: boolean}
type C = MyPick<Foo4, 'd'> // Error
