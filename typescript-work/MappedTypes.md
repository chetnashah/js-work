
## useful for looping over object keys and values for type level operations

## using as keyword and template literals in mapped types

```ts

type ops = {
    add: string;
    remove: string;
    move: string;
}

type opsKeys = keyof ops; // 'add' | 'remove' | 'move'

const userActions: OnEvents = {
    onAdd: (event) => {
        console.log(event);
    },
    onRemove: (event) => {
        console.log(event);
    },
    onMove: (event) => {
        console.log(event);
    }
}

type OnEvents = {
    [K in opsKeys as `on${Capitalize<K>}`]: (event: K) => void;
}

```
