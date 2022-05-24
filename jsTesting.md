

### Jest setup

1. install jest as a dependency
2. add a "test" field in package.json scripts section, and the value of field is "jest"

Jest is a test runner.
It will run all files that are either under `__tests__` or `*.test.js`.

#### Jest API

1. `test(name, fn, timeout)` also known as `it(name, fn, timeout)`


Assertions in Jest:

We use expect in jest, which returns an expectation object, on which we can call
matchers like `.toEqual()` or `.toBe()`
e.g.
``` js
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    // now call matchers on expectation object
    expect(data).toEqual({one: 1, two: 2});
})
```

#### Matchers

1. toBe - Uses Object.is, i.e. shallow comparision
2. isEqual - deep comparision/structural recursive equality checking

##### String related matchers

1. toMatch : `expect('string').toMatch(/stop/)`

##### Array related matchers

1. toContain : `expect(shoppingList).toContain('beer')`

##### Exceptions related matchers

1. toThrow: `expect(compileAndroid).toThrow('wrong jdk')`


#### Async testing in jest

The test is over when it runs to completion, so it needs to know about asynchronicity in one of three ways:
1. use done in cb
2. return a promise from test fn
3. make test fn async and use await inside test fn.

1. Use of callbacks: the function give to test/it should have one argument done which should be called when
task is done.
``` js
test('the data is peanut butter', done => {
    function callback(data) {
        expect(data).toBe('peanut butter');
        done();
    }

    fetchData(callback);
})
```

2. Use of promises: put your assertions in a thenable and return that promise in testcase.
``` js
test('the data is peanut butter', () => {
    // dont forget returning!!
    return fetchData().then(data => {
        expect(data).toBe('peanut butter')
    });
});
```

Using `.resolves/.rejects`:
You can use the `.resolves` matcher in your expect statement, and jest will wait for that promise to resolve.
Be sure to return the assertion.
``` js
test('the data is peanut butter', () => {
    return expect(fetchData()).resolves.toBe('peanut butter');
});
```

3. Use of async await: just pass in async function to test case, and use await wherever retrieving value from promises:
``` js
test('the data is peanut butter', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
})
```

## Supporting external syntax in jest

Jest runs the code in your project as JavaScript, but **if you use some syntax not supported by Node out of the box (such as JSX, TypeScript, Vue templates) then you'll need to transform that code into plain JavaScript, similar to what you would do when building for browsers.**

Jest supports this via the `transform` configuration option.

A transformer is a module that provides a method for transforming source files. For example, if you wanted to be able to use a new language feature in your modules or tests that aren't yet supported by Node, you might plug in a code preprocessor that would transpile a future version of JavaScript to a current one.

Jest will cache the result of a transformation and attempt to invalidate that result based on a number of factors, such as the source of the file being transformed and changing configuration.

`ts-jest` use case: **While babel-jest by default will transpile TypeScript files, Babel will not verify the types. If you want that you can use ts-jest.**

