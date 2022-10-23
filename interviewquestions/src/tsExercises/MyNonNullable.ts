/** 
NonNullable<T> returns a type by excluding null and undefined from T.

Please implement MyNonNullable<T> by yourself.
*/

type MyNonNullable<T> = T extends (null | undefined) ? never : T;

type Foo7 = 'a' | 'b' | null | undefined

type A7 = MyNonNullable<Foo7> // 'a' | 'b'
