Can use as of Node 6.11 or above. in repl can be tested easily.

The Proxy object is used to define custom behavior for fundamental operations (e.g. property lookup, assignment, enumeration, function invocation, etc).


### Terminology

1. Target: the object which is being virtualized user handlers.

2. Handler: Placeholder object which contains traps. Using handler specific behaviour can be specified for stuff like get or set or assignment and rest is automatically delegated to target. A handler is the most crucial part of the proxy.

3. Traps: method that provide property access.

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

