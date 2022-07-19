
Every JavaScript function is actually a Function object. 

This can be seen with the code `(function () {}).constructor === Function`, which returns true.

- `[[Prototype]]` as per specification is accessible via `__proto__` in mordern browsers. Should be referred to as "**protoLink**" instead to avoid confusion with "prototype" property on function object
- What does `Object.create(arg)` do?
    - Helps you create a **protoLink(**`__proto__`) **to** **arg** along with the created object.
- What does **new** keyword do?
    - Create an object via `Object.create(ConstructorFunction.prototype)` (setting up protoLink for created objects).
        - ProtoLink setup simultaneously with obj creation ☝🏼
    - Make it refereable as `this` inside ConstructorFunction
    - return it automatically at the end of the ConstructorFunction
- What happens when I declare a simple function `function f(){}`?
    - It is a function/object combo with `prototype` property, referred by `f.prototype` if needed.
    - `typeof f` is a function (not object)
    - `f.hasOwnProperty('prototype')` is true
    - `f.constructor` is not f itself, but the constructor function that created `f`, which is actually `Function`
    - `f.hasOwnProperty('constructor')` is false, because it lives on `f.prototype`, not on `f` itself.
    - `f.prototype.hasOwnProperty('constructor')` is true, because constructor property lives on `f.prototype`.
    - `f's protoLink` is setup to `Function.prototype` to get some useful methods like `call`, `apply`, `bind`. (All function instance protolink refers this common methods)

- All functions are actually function objects i.e (**Function object combo**, having a prototype property in the object part) i.e what function expression returns are `Function` objects having all the usual properties like `call`, `apply` and `bind`
    
    ```jsx
    (function(){}).constructor === Function
    ```
    
- Function constructor is also Function
    
    ```jsx
    Function.constructor === Function
    ```
    
- Object constructor is Function
    
    ```jsx
    Object.constructor === Function
    ```
    
- Function objects `[[prototype]]` is defined as `Function.prototype`
    
    ```jsx
    (function(){}).__proto__ === Function.prototype
    ```
    
## Why `Object instanceof Function === true` and `Function instanceof Object === true`

https://stackoverflow.com/questions/23622695/why-in-javascript-both-object-instanceof-function-and-function-instanceof-obj

![Functions and Objects](img/FunctionsAndObjects.png)
