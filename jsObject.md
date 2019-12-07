

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

