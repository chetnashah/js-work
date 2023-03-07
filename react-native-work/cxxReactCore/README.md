
## This Cxx code is Common to both android/ios

### NativeToJSBridge and JSToNativeBridge

```cpp
// This class manages calls from native code to JS.  It also manages
// executors and their threads.  All functions here can be called from
// any thread.
//
// Except for loadBundleSync(), all void methods will queue
// work to run on the jsQueue passed to the ctor, and return
// immediately.
```
