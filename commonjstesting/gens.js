

function* foo(x) {
    yield x + 1;// yield is allowed anywhere an expression is e.g. yield 2 + yield 3
    var y = yield null;
    return x + y;
}

// calling a generator looks like a function but its just create generator obj
var gen = foo(999);

// call next to resume generator, optionally passing in a value
console.log(gen.next());
console.log(gen.next());
console.log(gen.next(22));
// there is no send method, only next.



