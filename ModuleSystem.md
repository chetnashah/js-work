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

### Styles of writing modules

1. IIFEs
2. CommonJS style: require and exports/module.exports
3. AMD style
4. ES6 style: import and exports (named and default)
