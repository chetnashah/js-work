type MyRequired<T> = {
    // interesting sytax to remove optional from iterated key types of the type parameter T
    [K in keyof T]-?: T[K]
}

// all properties are optional
type Foo1 = {
    a?: string
    b?: number
    c?: boolean
}

const a1: MyRequired<Foo1> = {}
// Error

const b1: MyRequired<Foo1> = {
    a: 'BFE.dev'
}
// Error
const c1: MyRequired<Foo1> = {
    b: 123
}
// Error

const d1: MyRequired<Foo1> = {
    b: 123,
    c: true
}
// Error

const e1: MyRequired<Foo1> = {
    a: 'BFE.dev',
    b: 123,
    c: true
}
  // valid
