
Also known as `fabric`.

**Only works with react 18.**

https://www.youtube.com/watch?v=FtzckYLN7q8&list=PLSk21zn8fFZC3UIvyRjDb4Uog3244BwM6&index=21

## Migration points
If app uses any of following, then it must migrate:

1. `setNativeProps()`
2. `findNodeHandle()`
3. `UIManager.measure()`
4. `dispatchViewManagerCommand()`

More details here: https://reactnative.dev/docs/next/new-architecture-library-intro#preparing-your-javascript-codebase-for-the-new-react-native-renderer-fabric

## All the app dependencies/libraries/third party modules need to support new architechture

## New architechture sample app

https://github.com/react-native-community/RNNewArchitectureApp

## New architechture library migration

https://github.com/react-native-community/RNNewArchitectureLibraries

## JSI modules vs Turbo modules

### JSI modules
JSI modules enable direct communication between JS/C++, but to install functions/functionality, we must
use global hooks/functions.

e.g.
```js
// called from module init 
// this function can be called in JS and get native created objects and work with them
jsiRuntime.global().setProperty(jsiRuntime, "mmkvCreateNewInstance", std::move(mmkvCreateNewInstance));
```

see this to know how: https://www.youtube.com/watch?v=MtKaCtNh6UE

Installation part: https://www.youtube.com/watch?v=cfq369ttOc8

### Turbo modules

