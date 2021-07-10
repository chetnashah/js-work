
## Babel commands run from CLI

By default cli tools don't do anything but copying unless -> You can give Babel instructions on what to do by installing plugins or presets (groups of plugins) in a .babelrc

It is the job of the babel-cli to look for & run plugins/presets specified in .babelrc when running babel command.

If the plugins are not written on your own, don't forget them to install them from npm

### babel-cli

Babel's CLI is simple way compile files
with babel on command line, (probably uses .babelrc for extra info for doing transformation),
Mostly used in following form in package.json
``` sh
"build": "babel src -d lib"
```

### babel-node

Babel-Node is babel-cli followed by running node.
Helps reduce two steps to a single step.
But it is recommend to not use in production.

Typically used in following form
``` sh
"start": "babel-node script.js"
```

## Programmatic use of Babel

### babel-core

If you need to use babel programmatically,
does not need `.babelrc` but those options need to passed as a parameter to transform function.

``` js
var babel = require('babel-core');
babel.transform("code();", options);
/// => { code, map, ast }

babel.transformFile("filename.js", options, function(err, result) {
    result;/// -> { code, map, ast }
})
```

#### core api

`transform` takes in code and options and returns `{ code, map, ast }`.
```js
babel.transform(code, options, function(err, result) => {
    result; // { code, map, ast}
});
```

you can pass in `ast: true` in options to get an ast.
Babel's default is to generate string and sourcemap, but in some context it can 
be useful to get the AST itself.

```js
const filename = 'example.js';
const sourceString = fs.readFileSync(filename, 'utf-8');

// source,config -> AST ( no transformation )
const sourceAST  = parseSync(sourceString, config);
// source -> AST after transformation
const { ast } = babel.transformSync(sourceString, { filename, ast: true, code: false});
// AST, source -> Transformed code
const { code, map } = babel.transformFromAstSync(ast, sourceString, {
    filename,
    presets: ['minify'],
    configFile: false,
    babelrc: false
});
```

#### babel core api options obj

`overrides` can be provided to override/merge config with existing one.
`overrides` field holds an array of configs that will override existing one.


### babel module transformation es modules -> commonjs

Done via `@babel/plugin-transform-modules-commonjs`
Only syntax is transformed. unaware of resolution.

#### HOw export statements are transformed:
```js
export default 42
```
transforms into:
```js
// non enumerable property
Object.defineProperty(exports, "__esModule", {
    value: true
});
// property named default on exports object
exports.default = 42;
```

#### How import statements are transformed:

```js
import foo from 'foo';
import { bar } from 'bar';
foo;
bar;
```
is transformed to
```js
"use strict";

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var _foo = _interopRequireDefault("foo");
var _bar = require("bar");

// all uses of the required module will have .default property
_foo.default
_bar.bar
```

### @babel/plugin-transform-modules-umd

converts es modules to umd syntax

