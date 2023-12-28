https://docs.google.com/document/d/1c-COD2kaK__5iMM5SEx-PzNA7HFmgttcYfOHHX0HaOM/edit#heading=h.e6mz7k1mw34a

Hermes implements being a target: a debuggable entity that can be discovered via `chrome://inspect`, and can be debugged.

## Protocol "runtime/debugger/profiler" implementation

https://chromedevtools.github.io/devtools-protocol/tot/Runtime/ is implemented by hermes target via following: https://github.com/facebook/hermes/blob/main/API/hermes/inspector/chrome/MessageTypes.h#L208

## Get devtools url at "localhost:8081/json"

This one is done by metro,
but other tools like stetho also implement this to convince `chrome://inspect` that they are debuggable - https://github.com/facebookarchive/stetho/blob/main/stetho/src/main/java/com/facebook/stetho/inspector/ChromeDiscoveryHandler.java

