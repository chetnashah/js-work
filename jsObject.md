

## Ways to create objects

### Object literal

`{}`

### Object.create

`var k = Object.create(protoObject)`

### Object Constructor

`var obj = Object()`

## all object literals `{}` have a protolink chain to `Object.prototype` object (which has useful methods)

e.g.
```js
({}).toString(); // toStringMethod comes from Object.prototype object
```

If you want to avoid this, You can use `Object.create(null)` to create object without protolink.

```js
var vv = Object.create(null)
// vv.toString() // Syntax Error!
``` 

### assignment vs definition

https://2ality.com/2012/08/property-definition-assignment.html

**Definition** -. To define a property, one uses a function such as
    `Object.defineProperty(obj, propName, propDesc)`
The primary purpose of this function is to add an own (direct) property to obj, whose attributes (writable etc., see below) are as specified by propDesc. The secondary purpose is to change the attributes of a property, including its value.


**Assignment** - To assign to a property, one uses an expression such as
    `obj.prop = value`
    The primary purpose of such an expression is to change the value.
    Assignment has the side effect of creating a property if it doesn’t exist, yet – as an own property of obj, with default attributes

**Note** - babel-plugin-class-properties When loose is true, class properties are compiled to use an assignment expression instead of Object.defineProperty.

## Object's protolink is Function.prototype

```js
Object.__proto__ === Function.prototype; // true
```

## Host vs Native objects

`Host` are global objects are provided by environment for convinence like `Intl`, `Math`, `FormData`. These are serialized as `[object Intl]`, `[object Math]` and `[object FormData]` respectively

`Native` objects are the one created by the programmer using `{}` literal or `Object.define` api. These will usually serialize to `[object Object]`.

Function to determine if passed object is a host object (like `[object Intl]` etc):
```js
// testing : 
// typeof (""+Intl) // [object Intl]
// typeof ({}) // [object Object]
function isHostObj(obj: any) {
    if(obj && typeof obj === 'object' && !Array.isArray(obj) && Object.prototype.toString.call(obj)!== '[object Object]') {
        return true;
    }
    return false;
}
```
