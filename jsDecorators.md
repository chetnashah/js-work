
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