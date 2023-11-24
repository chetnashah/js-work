
## limitations

Decorators can only be used on a class method not on a regular function, so that is one limitation.

## wycats / legacy babel decorators proposal semantics

https://github.com/wycats/javascript-decorators

A decorator is:
1. an expression - means it returns value (a final descriptor)
2. Evaluates to a function that will be called at runtime with information about the decorated declaration.
3. The arguments taken by decorator - `target`, `name` and the `descriptor` it is trying to modify.
4. Returns the new descriptor that shalle be installed on the target object.

### class decorator transpilation semantics

```js
@F("color")
@G
class Foo {
}
```
is transpiled to
```js
var Foo = (function () {
  class Foo {
  }

  Foo = F("color")(Foo = G(Foo) || Foo) || Foo;
  return Foo;
})();
```

### Method transpilation semantics

```js
class Foo {
  @F("color")
  @G
  bar() { }
}
```
is transpiled to
```js
var Foo = (function () {
  class Foo {
    bar() { }
  }

  var _temp;
  _temp = F("color")(Foo.prototype, "bar",
    _temp = G(Foo.prototype, "bar",
      _temp = Object.getOwnPropertyDescriptor(Foo.prototype, "bar")) || _temp) || _temp;
  if (_temp) Object.defineProperty(Foo.prototype, "bar", _temp);
  return Foo;
})();
```

## Function declarations cannot be decorated

https://github.com/tc39/proposal-decorators/issues/40#issuecomment-370010647

https://saul-mirone.github.io/a-complete-guide-to-typescript-decorator/

https://www.typescriptlang.org/docs/handbook/decorators.html

https://www.typescriptlang.org/play?#code/FAMwrgdgxgLglgewgAgM4EMC2AHANgUwAoBKZAb2GSuSiVQQIDpcEBzQgcgxwOQBN8tAE7oYCIR2IBuStSH4YYISnDR4SQjHRDWCgFzJ0EAJ4AaZNiEJsBo2f75UUIXGxihtk6QrVfNOgz4zGycWjoKyAC8yBzmYbow5hwWVthRMeaW1tKyfg5OLm7ijABu6Lhg+OmqsIgQJOS5edS0EPRMLOxcAO7o2Nj4fMg16hCSMs3IAL5NMzPAULjoqKjIAEKNVAAC3HhExLKYCgAWDT5+re1BnZxHMMc05QR8AITjsvMzyMAEMMgARukIPhuusSDIAPQQgGMO6naTIKHIACShkwyEwCCgAGtBhiTsAgA

## Class declarations, class methods, and class properties can be decorated

Decorators are functions called on classes, class elements.

decorators can be applied to the following existing types of values:

* Classes
* Class fields (public, private, and static)
* Class methods (public, private, and static)
* Class accessors (public, private, and static)

Here are all of them:
```ts
@classDecorator
class Bird {
  @propertyDecorator
  name: string;
  
  @methodDecorator
  fly(
    @parameterDecorator
      meters: number
  ) {}
  
  @accessorDecorator
  get egg() {}
}
```

A sample TS decorator:
```ts
function enumerable(value: boolean) {
  // think this place as configure step.
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // think this place as executable step.
    descriptor.enumerable = value;
  };
}
```

## decorator factory

If we want to customize how a decorator is applied to a declaration, we can write a decorator factory. A Decorator Factory is simply a function that returns the expression that will be called by the decorator at runtime

Almost all decorator fns can be considered decorator factories:

```js
function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}
```

## decorator evaluation

Decorators execute only once, when a class definition is first evaluated at runtime.



## Current proposal semantics


## Babel legacy decorators semantics

```js
@Hey
class A {
}
```

converts to:
```js
var _class;

let A = Hey(_class = class A {}) || _class;
```

## Typescript experimental decorators semantics

Decorators use the form `@expression`, where `expression` must evaluate to a function that will be called at runtime with information about the decorated declaration.

### Class decorator

A Class Decorator is declared just before a class declaration. The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition.

**The expression for the class decorator will be called as a function at runtime, with the constructor of the decorated class as its only argument.**

e.g.
```ts
// class decorators are plain functions that get Constructor function as only argument
function f(Cons: any) {// Cons = class A{}
  console.log('apply decorator: Constructor = ', Cons);// constructor function
  Cons.prototype.hey = "hello";
  return Cons;// returned Constructor is used exported.
}

@f  // note how extra parens/call not needed for class decorators
class A {
}

let a = new A();
console.log(a.hey); // hello
```

One can even subclass the target class being decorated inside the decorator 

```ts
function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    reportingURL = "http://www...";
  };
}
 
@reportableClassDecorator
class BugReport {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
}
 
const bug = new BugReport("Needs dark mode");
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"
 
// Note that the decorator _does not_ change the TypeScript type
// and so the new property `reportingURL` is not known
// to the type system:
console.log(bug.reportingURL); // http://www....
```

One can even hide/mock implementation of whole class by ignoring the passed ConstructorFunction,
and returning an entirely different implementation

```ts
function mocked(cons: any): B {// ignore cons
    return class C{ // return entirely new implementation that will be used
        meth(){
            console.log('I am mocked meth');
        }
    };
}

@mocked
class B {
  meth() {
      console.log('meth called!');
  }

}
 
let b = new B();
b.meth(); // I am mocked meth
```

### Method decoration

A Method Decorator is declared just before a method declaration. **The decorator is applied to the Property Descriptor for the method, and can be used to observe, modify, or replace a method definition.**

You would most likely want to use this is in a decoracor factory fashion,
which mostly returns a method that takes in `target, propertyKey, descriptor`, and you can use `descriptor`
to get full control, here is a way method decorator is used to swap implementation:
```js
function sample() {
    console.log('sample decorator config');
    return function(target: any, prop: any, descriptor: any) {
        console.log('decorator eval setup: target = ', target, ' prop = ', prop);
        descriptor.value = function() {
            console.log('swapped function');
        }
    }
}

class B {
  @sample()
  meth() {
      console.log('meth called!');
  }

}

let b = new B();
b.meth(); // swapped function
```

Order of evaluation :
1. "sample decorator config"
2. "decorator eval setup"
And then wehn method actually called:
3. "swapped function"

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