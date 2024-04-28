
## Function subtyping


A function `A->B` exists.
Another function `C->D` <: `A->B`, if `C` is a supertype(more general) of `A` and `D` is a subtype of `B`(more specific).

C can be more general than A i.e. `A <: C`, and D can be more specific than B, i.e. `D <: B`.

Why?

* Argument type - Callers can send in a type, but the function (`C->D`) can decide to work on more general strucuture (i.e. only caring about a small part of the structure). 
* Return type - Callers expect atleast the same number of properties (`B`) of return value as the original function, or more specific is fine, i.e `D <: B`.

### How to remember this?
1. start with return type - it has to be same or more specific, or callers will break.
2. argument type has to be opposite - i.e. more general instead of more specific.

Another way people quote this - contravariant in the argument type and covariant in the return type.

https://www.youtube.com/watch?v=6moaoAJui_4

## in/out

https://github.com/microsoft/TypeScript/pull/48240


given a generic type `G<T>` and any two type arguments `Super` and `Sub` for which `Sub` is a subtype of `Super`, the following rules apply:

* An `out` annotation indicates that a type parameter is covariant, only allowed in outputs. if `T` is covariant (declared as `out T`), `G<Sub>` is a subtype of `G<Super>`,

* An `in` annotation indicates that a type parameter is contravariant, only allowed in inputs. if T is contravariant (declared as in T), `G<Super>` is a subtype of `G<Sub>`, and

* An `in out` annotation indicates that a type parameter is invariant, allowed in both inputs and outputs. if T is invariant (declared as in out T), neither `G<Super>` nor `G<Sub>` is a subtype of the other.


```ts
type A = { p: string; };
type B = { p: string; q: string; }; // B is a subtype of A, B <: A

type IsSubTypeOf<X,Y> = X extends Y ? true : false;

type asubtypeofb = IsSubTypeOf<A,B>; // false
type bsubtypeofa = IsSubTypeOf<B,A>;// true

// -------------------------------------------
// composite type
type MyType<in T> = { doSomething(t: T): any }; // "in T" makes MyType invariant!

function doSomethingA(abc: A){
    console.log('hi' +abc);
}

function doSomethingB(abc: B){
    console.log('hi' +abc);
}
let x: MyType<A> = { doSomething: doSomethingA };
let y: MyType<B> = { doSomething: doSomethingB };

type mytypeasubtypeofmytypeB = IsSubTypeOf<MyType<A>,MyType<B>>; // true
type mytypebsubtypeofmytypeA = IsSubTypeOf<MyType<B>,MyType<A>>; // false
```