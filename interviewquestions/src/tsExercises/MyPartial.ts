
/**
 * Partial<T> represents a partial subset of key-value pairs of the original type parameter T
 */
type MyPartial<T> = {
    // iteration of all keys which shall be optional
    [K in keyof T]?: T[K]
}

type Foo = {
    a: string
    b: number
    c: boolean
}

// below are all valid

const a: MyPartial<Foo> = {}

const b: MyPartial<Foo> = {
    a: 'BFE.dev'
}

const c: MyPartial<Foo> = {
    b: 123
}

const d: MyPartial<Foo> = {
    b: 123,
    c: true
}

const e: MyPartial<Foo> = {
    a: 'BFE.dev',
    b: 123,
    c: true
}
