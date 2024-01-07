
## target (syntax to be used in the output/emitted code)

More about the ES version: [ECMAScript compatibility table](https://kangax.github.io/compat-table/es6/)

## module (module system to be used in the output/emitted code)

More about the module system to use. Can be `CommonJS`, `AMD`, `System`, `UMD`, `ES6`, `ES2015` or `ESNext`.

In addition to the base functionality of ES2015/ES6, ES2020 adds support for dynamic imports, and import.meta while ES2022 further adds support for top level await.

## IsolatedModules

While you can use TypeScript to produce JavaScript code from TypeScript code, it’s also common to use other transpilers such as Babel to do this. However, other transpilers only operate on a single file at a time, which means they can’t apply code transforms that depend on understanding the full type system. This restriction also applies to TypeScript’s ts.transpileModule API which is used by some build tools.

These limitations can cause runtime problems with some TypeScript features like const enums and namespaces. Setting the isolatedModules flag tells TypeScript to warn you if you write certain code that can’t be correctly interpreted by a single-file transpilation process.

It does not change the behavior of your code, or otherwise change the behavior of TypeScript’s checking and emitting process.

