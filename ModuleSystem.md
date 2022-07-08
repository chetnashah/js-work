https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/
https://www.youtube.com/watch?v=rblOJD7nfSQ
Remember javascript doesn't have block scope, it has function scope
and global scope, Well It has some consequences.

In the very early days of javascript,
there were only script tags.

Each script tag would just bring in the code globally,
so if two js files had same variable name, 
the one js file that was loaded later, took the name.
So gloabl namespace pollution was there.

Hence the module patten was invented which looked something like this.
``` js
(function () {
   this.myGlobal = function () {};
}());
// or
var Module = (function () {
  return {
    publicMethod: function () {
      // code
    }
  };
})();
```


### Enter CommonJS

CommonJS is a specification, not a library or an implementation.
Nodejs module-system implements this commonjs specification.

```js
//    filename: foo.js
var $ = require('jquery');
var _ = require('underscore');

//    methods
function a(){};    //    private because it's omitted from module.exports (see below)
function b(){};    //    public because it's defined in module.exports
function c(){};    //    public because it's defined in module.exports

//    exposed public methods
module.exports = {
    b: b,
    c: c
};
```

#### Specification aspects
Usually each file represents a module.
Each module has an string id (usually file name).
Each module exports a value.
Each module can "require" another modules' value.

#### Implementation aspects
Makes use of IIFE and surrounds all files with IIFEs.
When a file is loaded. the IIFE with file code, is executed
and return value is kept in a global Map: where string key is id,
and corresponding file's exported value as a value.

Whenever anyone require's a file, if the file is already loaded,
it must have a value in above Map and that is returned.
If the file is require'd for the first time, it will be loaded and the
exported value stored in the Map as described above.
This is also one of the reasons why modules are considered as singletons.

### Enter AMD and Require

Like CommonJS, AMD is a specification.
RequireJS is an implementation of AMD specification.

```js
//    filename: foo.js
define(['jquery', 'underscore'], function ($, _) {
    //    methods
    function a(){};    //    private because it's not returned (see below)
    function b(){};    //    public because it's returned
    function c(){};    //    public because it's returned

    //    exposed public methods
    return {
        b: b,
        c: c
    }
});
```

### Styles of writing modules

1. IIFEs
2. CommonJS style: require and exports/module.exports
3. AMD style
4. ES6 style: import and exports (named and default)

### UMD: A technique for modules that work everywhere

UMD modules check for the existence of a module loader environment.

Provides ability to use modules in browser/node environments
and adjusts the code according to the env in which it is running.
`jQuery`, `moment`, `lodash` are written in UMD due to their ubiquity.

Check runtime variables like `define`, `exports` etc.
to see which one can be used.
```js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'underscore'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'), require('underscore'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.jQuery, root._);
    }
}(this, function ($, _) {
    //    methods
    function a(){};    //    private because it's not returned (see below)
    function b(){};    //    public because it's returned
    function c(){};    //    public because it's returned

    //    exposed public methods
    return {
        b: b,
        c: c
    }
}));
```

**user written module code will always be wrapped in a function usually known as factory function**
**Giving exports object to the module-wrapper/factory is the most important part**

## How babel make UMD module?

only the syntax of import/export statements (`import "./mod.js"`) is transformed, as Babel is unaware of different resolution algorithms.

https://babeljs.io/docs/en/babel-plugin-transform-modules-umd

Input:
```js
export default 42;
```

output:
```js
(function(global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports);
    global.actual = mod.exports;// available under the name actual, could also have used the filename
  }
})(this, function(exports) {
    // this is our cjs style author definition
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true,
  });

  exports.default = 42;
});
```

In case of imports, they are extra arguments to the factory function:
Following:
```js
import j from 'jquery';
import react from 'react';
import express from 'express';

export default 42;
```
gets converted to:
```js
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "jquery", "react", "express"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("jquery"), require("react"), require("express"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jquery, global.react, global.express);// first arg is exports, rest are imported deps
    global.sum = mod.exports;// expose exports on global with same name as file
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _jquery, _react, _express) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _jquery = _interopRequireDefault(_jquery);
  _react = _interopRequireDefault(_react);
  _express = _interopRequireDefault(_express);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var _default = 42;
  _exports.default = _default;
})
```