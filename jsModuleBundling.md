

### Module map/graph

One of the important parts of module bundle
It is list of modules, where each module structure is
structure like following: module structure will contain id, code and dependencies/dependency ids.
Note: here we have just parsed the files and created this dep graph, no involvement of factory wrapper yet.
e.g.
```js
[
  {
    id: 0,
    filename: './example/entry.js',
    dependencies: [ './message.js' ],
    code: '"use strict";\n' +
      '\n' +
      'var _message = require("./message.js");\n' +
      '\n' +
      'var _message2 = _interopRequireDefault(_message);\n' +
      '\n' +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n' +
      '\n' +
      'console.log(_message2.default);',
    mapping: { './message.js': 1 }
  },
  {
    id: 1,
    filename: 'example/message.js',
    dependencies: [ './name.js' ],
    code: '"use strict";\n' +
      '\n' +
      'Object.defineProperty(exports, "__esModule", {\n' +
      '  value: true\n' +
      '});\n' +
      '\n' +
      'var _name = require("./name.js");\n' +
      '\n' +
      'exports.default = "hello " + _name.name + "!";',
    mapping: { './name.js': 2 }
  },
  {
    id: 2,
    filename: 'example/name.js',
    dependencies: [],
    code: '"use strict";\n' +
      '\n' +
      'Object.defineProperty(exports, "__esModule", {\n' +
      '  value: true\n' +
      '});\n' +
      "var name = exports.name = 'world';",
    mapping: {}
  }
]
```

### Require implementation

Signature: takes an `id` and loads a module in module cache,
`return module.exports/exports` of the module loaded with the given id.



### Runtime bootstrapping

Here `modules` is the graph created in first section, along with factory wrapper applied i.e. `function (require, module, exports) {`, in a simplfied form:
```
{
  0: [
    function (require, module, exports) {
      "use strict";

      var _message = require("./message.js");

      var _message2 = _interopRequireDefault(_message);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }

      console.log(_message2.default);
    },
    {
      "./message.js": 1
    },
  ],
  1: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _name = require("./name.js");

      exports.default = "hello " + _name.name + "!";
    },
    {
      "./name.js": 2
    },
  ],
  2: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var name = exports.name = 'world';
    },
    {},
  ]
}
```
The bootstrapping happens with `require(0)`

```js
  const result = `
    (function(modules) {
      function require(id) {// takes an id, returns module.exports
        const [fn, mapping] = modules[id];// fn is factory fn, mapping is dependency mapping

        function localRequire(name) {
          return require(mapping[name]);
        }

        const module = { exports : {} };// fresh module/exports per module needed, setup each time for first load

        fn(localRequire, module, module.exports);// order of arguments should match that of factory wrapper

        return module.exports;
      }

      require(0);
    })({${modules}})
  `;
```