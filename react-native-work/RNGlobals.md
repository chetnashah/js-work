

### __fbGenNativeModule

defined in js, used by cpp

```cpp
folly::Optional<Object> JSINativeModules::createModule(
    Runtime &rt,
    const std::string &name) {
      if (!m_genNativeModuleJS) {
        m_genNativeModuleJS =
        rt.global().getPropertyAsFunction(rt, "__fbGenNativeModule");
      }
    Value moduleInfo = m_genNativeModuleJS->call(
      rt,
      valueFromDynamic(rt, result->config),
      static_cast<double>(result->index));
  folly::Optional<Object> module(
      moduleInfo.asObject(rt).getPropertyAsObject(rt, "module"));

        return module;
    }
```

### __fbBatchedBridge

Defined in JS i.e `BatchedBridge.js`, used by `cpp`.
```js
const MessageQueue = require('./MessageQueue');
const BatchedBridge: MessageQueue = new MessageQueue();

// Wire up the batched bridge on the global object so that we can call into it.
// Ideally, this would be the inverse relationship. I.e. the native environment
// provides this global directly with its script embedded. Then this module
// would export it. A possible fix would be to trim the dependencies in
// MessageQueue to its minimal features and embed that in the native runtime.

Object.defineProperty(global, '__fbBatchedBridge', {
  configurable: true,
  value: BatchedBridge,
});
``` 

### __fbBatchedBridgeConfig

### nativeModuleProxy

Used by `NativeModules.js`

Implementation present in cpp: `JSIExecutor::NativeModuleProxy : public jsi::HostObject`,
setup of this global property happens in `JSIExecutor::initializeRuntime`

### nativeFlushQueueImmediate

`callNativeModules()`

### nativeCallSyncHook


## setup from core (window, self, process, process.env)

```js
/**
 * Sets up global variables for React Native.
 * You can use this module directly, or just require InitializeCore.
 */
if (global.window === undefined) {
  // $FlowFixMe[cannot-write]
  global.window = global;
}

if (global.self === undefined) {
  // $FlowFixMe[cannot-write]
  global.self = global;
}

// Set up process
global.process = global.process || {};
global.process.env = global.process.env || {};
if (!global.process.env.NODE_ENV) {
  global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production';
}
```

## Full list (from eslint-config-react-native-community )

```js
  globals: {
    __fbDisableExceptionsManager: false,
    __DEV__: true,
    __dirname: false,
    __fbBatchedBridgeConfig: false,
    AbortController: false,
    alert: false,
    cancelAnimationFrame: false,
    cancelIdleCallback: false,
    clearImmediate: true,
    clearInterval: false,
    clearTimeout: false,
    console: false,
    document: false,
    ErrorUtils: false,
    escape: false,
    Event: false,
    EventTarget: false,
    exports: false,
    fetch: false,
    FileReader: false,
    FormData: false,
    global: false,
    Headers: false,
    Intl: false,
    Map: true,
    module: false,
    navigator: false,
    process: false,
    Promise: true,
    requestAnimationFrame: true,
    requestIdleCallback: true,
    require: false,
    Set: true,
    setImmediate: true,
    setInterval: false,
    setTimeout: false,
    queueMicrotask: true,
    URL: false,
    URLSearchParams: false,
    WebSocket: true,
    window: false,
    XMLHttpRequest: false,
  },

```