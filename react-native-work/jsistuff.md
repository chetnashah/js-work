### JNI stuff

Managed by using utility library `fbjni` - check github (https://github.com/facebookincubator/fbjni), 
has some handy methods like `makeNativeMethod` etc.

jni in depth: https://www.youtube.com/watch?v=Av40FvqX_zE

### jsi::Runtime interface

Represents a JS runtime interface. Implementers are engines like JSC or hermes.
Movable, but not copyable.

* Useful methods like `global()` which return the global object in the runtime
* Another useful method is `evaluateJavascript`

### JSExecutor Interface
```cpp
virtual void initializeRuntime() = 0;
virtual void loadBundle(
    std::unique_ptr<const JSBigString> script;
    std::string sourceURL) = 0;

/*
* Executes a BatchedBridge.callFunctionReturnFlushedQueue with module ID,
method ID and optional additional arguments in JS. The executor is responsible
for using Bridge -> callNativeModules to invoke any necessary native module methods.
*/
virtual void callFunction(
    const std::string &moduleId,
    const std::string &methodId,
    const folly::dynamic &arguments
) = 0;

virtual void invokeCallback(
    const double callbackId,
    const folly::dynamic &arguments
) = 0;

virtual void setGlobalVariable(
    std::string propName,
    std::unique_ptr<const JSBigString> jsonValue
) = 0;
virtual void *getJavaScriptContext(){
    return nullptr;
}
virtual std::string getDescription() = 0;
```

### JSIExecutor

It extends upon `JSExecutor` interface mentioned above.
Useful generic class whose constructor depends on jsi::Runtime to be agnostic
of the implementers e.g. (JSC/hermes etc).

### JSCRuntime

`JSCRuntime` extends/implements `jsi::Runtime` interface.

### What does JSC core api look like (independent of react-native) ?

It looks like :
* JSValueRef
* JSStringRef
* JSContextRef
* JSObjectRef
* JSEvaluateScript - evaluate JS
* JSValue
* JSGlobalContextRef

### HostFunctionType

A function which has this type can be registered as a function 
callable from JS using `Function::createFromHostFunction()`

```cpp
using HostFunctionType = std::function<Value(Runtime& rt, const Value& thisVal, const Value* args, size_t count)>;
```
