## Subtyping test!

```ts
type A = { p: string; };
type B = { p: string; q: string; }; // B is a subtype of A, B <: A

type IsSubTypeOf<X,Y> = X extends Y ? true : false;

type asubtypeofb = IsSubTypeOf<A,B>; // false
type bsubtypeofa = IsSubTypeOf<B,A>;// true
```

## Explain all file/import graph traversed by tsc

```sh
tsc --explainFiles
```

## Trace module resolution

```sh
tsc --traceModuleResolution
```

## Show overall config

```sh
tsc --showConfig
tsc --showConfig -p tsconfig.json
```

## enable ts server logging

In `settings.json` add following:

```json
"typescript.tsserver.log": "verbose",
```
