/**
 * 
 * Omit < T, K > returns a new type by picking the properties in T but not in K.

    Please implement MyOmit < T, K > by yourself.
 */
// type union set substraction helper!
type DropKeys<T, K> = T extends K ? never : T;// extends maps over union/sum type individual elemnts of left argument, distributes over left side union set, i.e. 
// expands left side union set to apply individual extends and them combine them
type tt = DropKeys<'a' | 'b' | 'c', 'a' | 'b'>; // 'c'
// distribute by breaking left side union set
// => ('a' extends 'a'|'b' ? never : 'a')  |   ('b' extends 'a'|'b' ? never : 'b')  |  ('c' extends 'a'|'b' ? never : 'c')
// => never | never | 'c'
// => 'c'

type MyOmit<T, K extends string | number> = {
    [K1 in DropKeys<keyof T, K>]: T[K1]
};

type Foo5 = {
    a: string
    b: number
    c: boolean
};

type A1 = MyOmit<Foo5, 'a' | 'b'> // {c: boolean}
type B1 = MyOmit<Foo5, 'c'> // {a: string, b: number}
type C1 = MyOmit<Foo5, 'c' | 'd'>  // {a: string, b: number}
