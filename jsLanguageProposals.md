
### proposal-class-fields

Enable declaring `fields` in class instead of within constructor.

A public field declarations define fields on instances with the internals of `Object.defineProperty` (which we refer to in TC39 jargon as `[[Define]]` semantics), rather than with `this.field = value;` (referred to as `[[Set]]` semantics) (https://github.com/tc39/proposal-class-fields/issues/151#issuecomment-431597270)

`[[Define]]` is the standard when declaring and initiaizing object properties; `[[Set]]` is the standard when assigning to them. The argument generally stood on the idea that anything declaratively placed in the class body is declaring and initializing things, not assigning to them - hence, class fields should be consistent with initializing properties in object literals, not consistent with assigning properties to objects.

babel plugin for this: `babel-plugin-proposal-class-properties`

`loose` option: When true, class properties are compiled to `use an assignment expression (Set semantics)` instead of `Object.defineProperty (Define semantics)`.

```js
class Counter extends HTMLElement {
  // this is allowed...
  x = 0;

  clicked() {
    this.x++;
    window.requestAnimationFrame(this.render.bind(this));
  }

  constructor() {
    super();
    this.onclick = this.clicked.bind(this);
  }

  connectedCallback() { this.render(); }

  render() {
    this.textContent = this.x.toString();
  }
}

```


### proposal-decorators

https://github.com/tc39/proposal-decorators

