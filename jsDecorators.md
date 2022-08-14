

## Function declarations cannot be decorated

https://github.com/tc39/proposal-decorators/issues/40#issuecomment-370010647

## Class declarations, class methods, and class properties can be decorated

Decorators are functions called on classes, class elements.

decorators can be applied to the following existing types of values:

* Classes
* Class fields (public, private, and static)
* Class methods (public, private, and static)
* Class accessors (public, private, and static)

## Current proposal semantics


## Babel legacy decorators semantics

## Typescript experimental decorators semantics

Decorators use the form `@expression`, where `expression` must evaluate to a function that will be called at runtime with information about the decorated declaration.

### Property decoration 

Now, before installing the descriptor onto Person.prototype, the engine first invokes the decorator:

HOw normal Property works: Normally the property for e.g. `name` below is isntalled on `Person.Prototype`
using `Object.defineProperty(Person.Prototype, 'name', { value: specifiedFunction, enumerable: false, configurable: true, writable: true})`

When a decorator is present on a property,
then the decorator is run instead:

```js
// how it is declared ---------------
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}

// how it is run -------------
let description = {
  type: 'method',
  initializer: () => specifiedFunction,
  enumerable: false,
  configurable: true,
  writable: true
};

description = readonly(Person.prototype, 'name', description) || description;
defineDecoratedProperty(Person.prototype, 'name', description);

function defineDecoratedProperty(target, { initializer, enumerable, configurable, writable }) {
  Object.defineProperty(target, { value: initializer(), enumerable, configurable, writable });
}

```