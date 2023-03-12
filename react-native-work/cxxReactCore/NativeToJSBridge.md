

## Public API

`NativeToJSBridge` mostly forwards calls to `JSExecutor` it uses.

```cpp
class NativeToJsBridge {
 public:
  friend class JsToNativeBridge; // This is implemented in NativeToJSBridge.cpp

  /**
   * This must be called on the main JS thread.
   */
  NativeToJsBridge(
      JSExecutorFactory *jsExecutorFactory,
      std::shared_ptr<ModuleRegistry> registry,
      std::shared_ptr<MessageQueueThread> jsQueue,
      std::shared_ptr<InstanceCallback> callback);
  virtual ~NativeToJsBridge();

  /**
   * Executes a function with the module ID and method ID and any additional
   * arguments in JS.
   */
  void callFunction(
      std::string &&module,
      std::string &&method,
      folly::dynamic &&args);

  /**
   * Invokes a callback with the cbID, and optional additional arguments in JS.
   */
  void invokeCallback(double callbackId, folly::dynamic &&args);

  /**
   * Sets global variables in the JS Context.
   */
  void initializeRuntime();

  /**
   * Starts the JS application.  If bundleRegistry is non-null, then it is
   * used to fetch JavaScript modules as individual scripts.
   * Otherwise, the script is assumed to include all the modules.
   */
  void loadBundle(
      std::unique_ptr<RAMBundleRegistry> bundleRegistry,
      std::unique_ptr<const JSBigString> startupCode,
      std::string sourceURL);
  void loadBundleSync(
      std::unique_ptr<RAMBundleRegistry> bundleRegistry,
      std::unique_ptr<const JSBigString> startupCode,
      std::string sourceURL);

  void registerBundle(uint32_t bundleId, const std::string &bundlePath);
  void setGlobalVariable(
      std::string propName,
      std::unique_ptr<const JSBigString> jsonValue);
  void *getJavaScriptContext();
  bool isInspectable();
  bool isBatchActive();

  void handleMemoryPressure(int pressureLevel);

  /**
   * Synchronously tears down the bridge and the main executor.
   */
  void destroy();

  void runOnExecutorQueue(std::function<void(JSExecutor *)> task);

  /**
   * Native CallInvoker is used by TurboModules to schedule work on the
   * NativeModule thread(s).
   */
  std::shared_ptr<CallInvoker> getDecoratedNativeCallInvoker(
      std::shared_ptr<CallInvoker> nativeInvoker);

 private:
  // This is used to avoid a race condition where a proxyCallback gets queued
  // after ~NativeToJsBridge(), on the same thread. In that case, the callback
  // will try to run the task on m_callback which will have been destroyed
  // within ~NativeToJsBridge(), thus causing a SIGSEGV.
  std::shared_ptr<bool> m_destroyed;
  std::shared_ptr<JsToNativeBridge> m_delegate;
  std::unique_ptr<JSExecutor> m_executor;
  std::shared_ptr<MessageQueueThread> m_executorMessageQueueThread;

  // Memoize this on the JS thread, so that it can be inspected from
  // any thread later.  This assumes inspectability doesn't change for
  // a JSExecutor instance, which is true for all existing implementations.
  bool m_inspectable;

  // Keep track of whether the JS bundle containing the application logic causes
  // exception when evaluated initially. If so, more calls to JS will very
  // likely fail as well, so this flag can help prevent them.
  bool m_applicationScriptHasFailure = false;

#ifdef WITH_FBSYSTRACE
  std::atomic_uint_least32_t m_systraceCookie = ATOMIC_VAR_INIT(0);
#endif
};

} // namespace react
} // namespace facebook

```