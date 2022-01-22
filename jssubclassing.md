class/constructor fn chain on left
instance prototype chain on right
```
      Function.prototype           Object.prototype
           ▲                            ▲
▼          │ __proto__                  │ __proto__
           │                            │
    ┌──────┴──────┐            ┌────────┴───────────┐
    │             │            │                    │
    │             │            │                    │
    │ Person      │            │  Person.prototype  │
    │             │            │                    │
    └─────▲───────┘            └─────────▲──────────┘
          │                              │
          │                              │
          │                              │ __proto__
          │ __proto__                    │
          │                              │
   ┌──────┴───────┐            ┌─────────┴─────────────┐
   │              │            │                       │
   │              │            │                       │
   │  Employee    │            │  Employee.prototype   │
   │              │            │                       │
   │              │            │                       │
   └──────────────┘            └───────────▲───────────┘
                                           │
                                           │__proto__
                                           │
                                ┌──────────┴──────────┐
                                │                     │
                                │     John            │
                                │                     │
                                └─────────────────────┘
```

```js
class Person {
    static k = 6;
    constructor(name) {
        this.name = name;
    }
    printName(){
        console.log('base class this = ', this);
        console.log('name is ' + this.name);
    }
}

class Employee extends Person{
    constructor(name, id) {
        super(name);// super first, only then can access this
        this.id = id;
    }
    printInfo(){
        super.printName();
        console.log('id = ', this.id);
    }
    static printstaticinfo(){
        console.log(' static info: ' + this.k);
    }
}

const emp = new Employee('chet', 8);

emp.printInfo();
Employee.printstaticinfo();

emp instanceof Employee//true
emp instanceof Person//true
emp instanceof Object//true
```


### Mixins

their sole purpose is to add functionality to objects or classes without inheritance.
https://javascript.info/mixins
```js
class Dog {
  constructor(name) {
    this.name = name;
  }
}

const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!")
};

Object.assign(Dog.prototype, dogFunctionality);

```