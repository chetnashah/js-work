## Deleting variables is not allowed in strict mode

the delete keyword could also delete entire variables: `delete user`. However, in strict mode, trying to do that causes an error.

```js
'use strict';
const user = {name: 'Amir', age: 36}
delete user;
18:28:55.578 VM753:3 Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
```

Certain object properties are also undeletable. For example, trying to delete the `Object.prototype` property will cause an error. (Deleting that property would wreak havoc on JavaScript's prototype-based object system.)
