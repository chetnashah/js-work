

## Implementors are

1. `class RCTObjcExecutor : public JSExecutor` in `RCTObjcExecutor.mm`.
2. `class JSIExecutor : public JSExecutor {` in `JSIExecutor.h`

## Public API

```cpp
class RN_EXPORT JSExecutor {
 public:
  /**
   * Prepares the JS runtime for React Native by installing global variables.
   * Called once before any JS is evaluated.
   */
  virtual void initializeRuntime() = 0;
  /**
   * Execute an application script bundle in the JS context.
   */
  virtual void loadBundle(
      std::unique_ptr<const JSBigString> script,
      std::string sourceURL) = 0;

  /**
   * Add an application "RAM" bundle registry
   */
  virtual void setBundleRegistry(
      std::unique_ptr<RAMBundleRegistry> bundleRegistry) = 0;

  /**
   * Register a file path for an additional "RAM" bundle
   */
  virtual void registerBundle(
      uint32_t bundleId,
      const std::string &bundlePath) = 0;

  /**
   * Executes BatchedBridge.callFunctionReturnFlushedQueue with the module ID,
   * method ID and optional additional arguments in JS. The executor is
   * responsible for using Bridge->callNativeModules to invoke any necessary
   * native modules methods.
   */
  virtual void callFunction(
      const std::string &moduleId,
      const std::string &methodId,
      const folly::dynamic &arguments) = 0;

  /**
   * Executes BatchedBridge.invokeCallbackAndReturnFlushedQueue with the cbID,
   * and optional additional arguments in JS and returns the next queue. The
   * executor is responsible for using Bridge->callNativeModules to invoke any
   * necessary native modules methods.
   */
  virtual void invokeCallback(
      const double callbackId,
      const folly::dynamic &arguments) = 0;

  virtual void setGlobalVariable(
      std::string propName,
      std::unique_ptr<const JSBigString> jsonValue) = 0;

  virtual void *getJavaScriptContext() {
    return nullptr;
  }

  /**
   * Returns whether or not the underlying executor supports debugging via the
   * Chrome remote debugging protocol.
   */
  virtual bool isInspectable() {
    return false;
  }

  /**
   * The description is displayed in the dev menu, if there is one in
   * this build.  There is a default, but if this method returns a
   * non-empty string, it will be used instead.
   */
  virtual std::string getDescription() = 0;

  virtual void handleMemoryPressure([[maybe_unused]] int pressureLevel) {}

  virtual void destroy() {}
  virtual ~JSExecutor() {}

  virtual void flush() {}

  static std::string getSyntheticBundlePath(
      uint32_t bundleId,
      const std::string &bundlePath);

  static double performanceNow();
};

} // namespace react
} // namespace facebook
```