/**
 * Record<K, V> returns an object type with keys of K and values of V.

Please implement MyRecord<K, V> by yourself.

Notice that property key could only be number | string | symbol.


 */

// 'a' | 'b' | 'c' <: number | string | symbol
type MyRecord<K extends number | string | symbol, V> = {
    [K1 in K]: V
};

type Key = 'a' | 'b' | 'c'

const a4: MyRecord<Key, string> = {
    a: 'BFE.dev',
    b: 'BFE.dev',
    c: 'BFE.dev'
}

// a3.a = 'bigfrontend.dev' // OK
// a3.b = 123 // Error
// a3.d = 'BFE.dev' // Error

type Foo3 = MyRecord<{ a: string }, string> // Error

