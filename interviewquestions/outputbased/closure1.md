

## Output of follwoing:
```js
let a = 1;
(function() {
  debugger; // this is the birth env of foo, to which we close
  let foo = () => a
  a = 5;
  console.log(foo())
}())
```

or 
```js
let a = 1;
(function() {
  // this is birth environment of foo where we close over by reference
  function foo() { 
      return a; 
    }
  let a = 2;
  console.log(foo())
}())
```

## Ans: `5`

The closure is the birth environment of foo i.e. the function with debugger written where value of `a` is 5.

## https://dmitripavlutin.com/javascript-closures-interview-questions/

## tell output

```js
function createIncrement() {
  let count = 0;
  function increment() { 
    count++;
  }
  let message = `Count is ${count}`;
  function log() {
    console.log(message);
  }
  
  return [increment, log];
}
const [increment, log] = createIncrement();
increment(); 
increment(); 
increment(); 
log(); // What is logged?
```
Ans: `Count is 0`.