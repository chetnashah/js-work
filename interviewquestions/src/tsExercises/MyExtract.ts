/**
 * As ann opposite of DropKeys<T,K>
Extract<T, U> returns a type by extracting union members from T that are assignable to U.

Please implement MyExtract<T, U> by yourself.

 */
// Distributint T over K and picking the useful parts in final union set of types
type MyExtract<T, K> = T extends K ? T : never;

type Foo6 = 'a' | 'b' | 'c'

type A6 = MyExtract<Foo6, 'a'> // 'a'
type B6 = MyExtract<Foo6, 'a' | 'b'> // 'a' | 'b'
type C6 = MyExtract<Foo6, 'b' | 'c' | 'd' | 'e'>  // 'b' | 'c'
type D6 = MyExtract<Foo6, never>  // never
