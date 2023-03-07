

## Public API

```cpp
// This interface describes the delegate interface required by
// Executor implementations to call from JS into native code.
class ExecutorDelegate {
 public:
  virtual ~ExecutorDelegate() {}

  virtual std::shared_ptr<ModuleRegistry> getModuleRegistry() = 0;

  virtual void callNativeModules(
      JSExecutor &executor,
      folly::dynamic &&calls,
      bool isEndOfBatch) = 0;
  virtual MethodCallResult callSerializableNativeHook(
      JSExecutor &executor,
      unsigned int moduleId,
      unsigned int methodId,
      folly::dynamic &&args) = 0;
};
```