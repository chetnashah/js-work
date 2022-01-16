
Globals have two parts actually, global environment(declarative environment record) and global object(object environment record), and global environment fallsback on global object.
https://tc39.es/ecma262/#sec-global-environment-records

* An object environment record has the same interface as a normal environment record,
but keeps its bindings in a JavaScript object. In this case, the object is the `global object` also known as `globalthis`.
* A normal (declarative) environment record that has its own storage for its bindings, if things not present in this
record, it falls back on above object.

* Top-level `const, let, and class` create bindings in the declarative environment
record, i.e. global environment.
* Top-level `var` and `function` declarations create bindings in the object environment
record, i.e. global object.

e.g.
```js
// top level
const one = 1;// declarative environment record
var two = 2;// object environment record
console.log(one); // declarative environment record wins
console.log(globalThis.one); // undefined, explicitly asked in global object, not present
console.log(globalThis.two); // 2
```