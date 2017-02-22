
https://github.com/Microsoft/ChakraCore/wiki/JavaScript-Runtime-%28JSRT%29-Overview#concepts

Every Javascript engine will expose API around some of the following
concepts:

1. Runtime(CHAKRA)/JSVirtualMachine(JSCORE)/isolate(v8) =

represents a complete JavaScript execution environment. Each runtime that is created has its own isolated garbage-collected heap and, by default, its own just-in-time (JIT) compiler thread and garbage collector (GC) thread. Only one runtime can be active on a thread. Multiple runtimes cannot talk to each other because of having their own memory/gc etc.

2. Execution Context/JSContext = Tied to particual runtime and execute code within that runtime. Multiple execution context can be active within a runtime, and execution contexts of the same runtime can talk to each other. You can think its equivalent in web development equivalent as browsing context with window.

3. JSValue: Primary data type that represents any possible javascript value.
An instance of JSValue is tied to JSContext object it lives in. Any object
that comes from context object will be of JSValue type.


Evaluating javascript code with engines
JsRunScriptUtf8/evaluateScript/


More on JsCreateObject/JsGetGlobalObject.


