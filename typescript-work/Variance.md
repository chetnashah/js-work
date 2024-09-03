

https://www.youtube.com/watch?v=EInunOVRsUU


## General rules for variance

1. If it comes "out" of the implementation (including readonly fields), it is **Co-variant**
2. If it goes "in"to the implementation, it is **Contra-variant**

## Variance by position

### Covariant - Readonly field type is type parameter type 

```ts
interface Cage<T> {
    // readonly field - covariant
    readonly animal: T;
}
```

### Return types are covariant

### Parameters are contravariant

