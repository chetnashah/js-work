

const _counter = Symbol('counter');
const _action = Symbol('action');

class CountDown {// Countdown that fires action when count reaches 0;
  constructor(counter, action) {
    this[_counter] = counter;
    this[_action] = action;
  }

  dec() {
    if(this[_counter] < 1){
      return;
    }
    this[_counter]--;
    if(this[_counter] === 0) {
      this[_action]();
    }
  }
}

let c = new CountDown(4, () => {console.log('countdown over ')});
c.dec();
console.log(Object.keys(c)); // []
// we can get symbols via other Object property descriptor inspection methods
console.log(Object.getOwnPropertyDescriptors(c)); // [[Symbole(counter)]: {value: 3, writable: true, enumerable: true, configurable: true}, [Symbol(action)]: ...]
console.log(Object.getOwnPropertySymbols(c));// [Symbol(counter), Symbole(action)]
