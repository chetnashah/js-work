Can use as of Node 6.11 or above. in repl can be tested easily.

The Proxy object is used to define custom behavior for fundamental operations (e.g. property lookup, assignment, enumeration, function invocation, etc).

### Really good talk

https://www.youtube.com/watch?v=95haj8RqR5o

### Terminology

1. Target: the object which is being virtualized user handlers.

2. Handler: Placeholder object which contains traps. Using handler specific behaviour can be specified for stuff like get or set or assignment and rest is automatically delegated to target. A handler is the most crucial part of the proxy.

3. Traps: methods (of the handler) that provide property access.

### Syntax

``` js
const p = new Proxy(target, handler);

let h = {
    get: function(obj, prop) {
        return prop in obj ? obj[prop] : 37;
    }
};

const proxy = new Proxy({}, h);

proxy.a = 1;
console.log(proxy.a); // 1
console.log(proxy.b); // 37
```

### Reflect apis

Best practices for emulating the original set/get is to use `Reflect.set/Reflect.get`.

The signature of all the Reflect APIs matches the signature of all the proxy trap methods.


## Reactive pattern using proxies

```js
const effect = (oldValue, newValue) => {
    console.log('old value was: ' + oldValue + " new value is : "+newValue);
}

const person = {
    name: 'jz'
};

function createReactive(obj, effect) {
    const proxy = new Proxy(obj, {
        set(target, p, val) {
            const success = Reflect.set(target, p, val);
            // trigger effect only after successful set to original
            if(success && target[p] != val) {
                effect(target[p], val);
            }
        }
    });
    return proxy;
};

const reactivePerson = createReactive(person, effect);

reactivePerson.name = "hola";// effect prints: old value was: jz new value is : hola 
reactivePerson.name = "oops";// effect prints: old value was: hola new value is : oops 
```



Some more examples at: https://github.com/johnlindquist/has-bad-ideas/tree/master/src

## Lens pattern

Lens is a getter/setter pointer for a deeply nested property. also called optics sometimes.
example: https://github.com/yelouafi/focused

https://github.com/immerjs/immer - no more deep cloning, merging needed

