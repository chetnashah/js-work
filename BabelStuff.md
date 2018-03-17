
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