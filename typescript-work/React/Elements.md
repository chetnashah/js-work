
## `React.Element<P,T>`

This is the shape of the object returned by a React component, i.e. an object with `type`, `key` and `props` properties. It is a generic type with two type parameters:
1. `P` - the type of the props object passed to the component
2. `T` - the type of the component's state object

```ts
interface ReactElement<
  P = any,
  T extends
    | string
    | JSXElementConstructor<any> = string
    | JSXElementConstructor<any>,
> {
  type: T;
  props: P;
  key: string | null;
}
```

## `JSX.Element` is same as `ReactElement` with wider type parameters i.e. `any,any`

```ts
declare global {
  // …
  namespace JSX {
    // …
    interface Element extends React.ReactElement<any, any> {}
    // …
  }
  // …
}
```

## React.ReactNode is the widest in terms of what can be rendered

A ReactNode is a ReactElement, string, number, Iterable<ReactNode>, ReactPortal, boolean, null, or undefined:
```ts
type ReactNode =
  | ReactElement
  | string
  | number
  | Iterable<ReactNode>
  | ReactPortal
  | boolean
  | null
  | undefined;
```