

##

Hoisting is a behavior in JavaScript where variable and function declarations are moved to the top of their containing scope during the compilation phase, before the code is executed. This means that you can use a variable or invoke a function even before it is declared in the code. However, it's important to note that only the declarations are hoisted, not the initializations or assignments.

## Var hoisting

**var: Variables declared with var are hoisted to the top of their scope, but only the declarations are hoisted, not the initializations.**

```js
console.log(x); // Output: undefined
var x = 5;
console.log(x); // Output: 5
```

let and const: Variables declared with let and const are also hoisted, but they are not initialized until the actual code execution reaches the point of the declaration. This is known as the "temporal dead zone." Attempts to access the variable before the declaration results in a ReferenceError.


## Function declaration hoisting

```js
// use before declaration is possible due to hoisting
sayHello(); // Output: "Hello, world!"

function sayHello() {
  console.log("Hello, world!");
}
```

## class hoisting


## import hoisting


