


## How function evaluation works? (Substitution model of evaluation, note no assignment)

1. evaluate function expression to get the function to be applied
2. evaluate argument expression to get the final argument values
3. Apply arguments to the function.

e.g.
```js
let isOdd = (x) => x % 2 == 1;
let isEven = (x) => x % 2 == 0;
var manyFns = [isOdd, isEven];

(manyFns(0))(1 + 1); 
// step 1: get the function to be applied i.e. manyFns[0] = isOdd
// step 2: evaluate arguments to get the final argument: 1 + 1 = 2
// step 3: apply final function to final arguments i.e. isOdd(2) = false
```

## Applicative order evaluation vs normal order evaluation

`Applicative order evaluation` - first evaluate arguments then apply function.
This is the most common evaluation order seen everywhere.
```js
sum_of_squares(5 + 1, 5 * 2);
sum_of_squares(6, 10);
square(6) + square(10);
6 * 6 + 10 * 10
36 + 100
136
```

`Normal order evaluation` - first evaluate the function, evaluate arguments only when needed.
```js
sum_of_squares(5 + 1, 5 * 2);
square(5 + 1) + square(5 * 2);
(5 + 1) * (5 + 1) + (5 * 2) * (5 * 2)
6 * 6 + 10 * 10
36 + 100
136
```

`How to test if a given system is using normal order evaluation or applicative order evaluation`?
Use a infinitely recursive function as one of the arguments. 
It will cause stackoverflow in applicative order evaluation, 
and return 0 in case of normal order evaluation
e.g.
```js
function prec() { prec(); }
function test(a, b) { a === 0 ? 0 : b};
test(0, prec());// in case of applicative order, this will be stuck in infinite loop of prec
```

## Function abstraction

A user of a function should not need to known how a function is implemented in order to be able to use it.

The parameters of a function are local to the body of the function. The best way to make things private in javascript is to use declare them in a function. i.e. **anything declared inside a function (e.g. more functions) are private to the function, unless returned**

If functions have only local utility within other functions, they can be declared inside other functions to achieve implementation hiding while still preserving blackbox like abstraction.

e.g. newton raphson method of calc square root 
```js
function sqrt(x) {
    function is_good_enough(guess, x) {// if we want, we can make x free
        return abs(square(guess) - x) < 0.001;
    }
    function improve(guess, x) {
        return average(guess, x/guess);
    }
    function sqrt_iter(guess, x) {
        return is_good_enough(guess, x) ? guess : sqrt_iter(improve(guess, x), x);
    }
    return sqrt_iter(1, x);
}
```

