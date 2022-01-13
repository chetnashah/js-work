
### Summary

Even in order to use with existing apps, use below: (`ReactRootView` + `InstanceManager` + `rootView.startApplication` + `setContentView(rootView)`)

```java
// This needs to be done when not using ReactActivity
public class MyReactActivity extends Activity implements DefaultHardwareBackBtnHandler {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setCurrentActivity(this)
                .setBundleAssetName("index.android.bundle")
                .setJSMainModulePath("index")
                .addPackage(new MainReactPackage())
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();
        // The string here (e.g. "MyReactNativeApp") has to match
        // the string in AppRegistry.registerComponent() in index.js
        mReactRootView.startReactApplication(mReactInstanceManager, "MyReactNativeApp", null);
        setContentView(mReactRootView);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
}
```

### ReactApplication

An interface with method `getReactNativeHost`.

### ReactNativeHost

Holds reference to a `private ReactInstanceManager`
Also has a protected method `createReactInstanceManager` which is kind or private.
The access/creation to reactInstanceManager only happens through `getReactInstanceManager`.

### ReactRootView

Holds a private reference to `private @Nullable ReactInstanceManager mReactInstanceManager;`


Default root view for catalyst apps.
Has following important public api:
```java
  /**
   * Schedule rendering of the react component rendered by the JS application from the given JS
   * module (@{param moduleName}) using provided {@param reactInstanceManager} to attach to the JS
   * context of that manager. Extra parameter {@param launchOptions} can be used to pass initial
   * properties for the react component.
   */
public startReactApplication(ReactInstanceManager reactInstanceManager, String moduleName){
    // blah blah
    mReactInstanceManager = reactInstanceManager;
    mJSModuleName = moduleName;
    mReactInstanceManager.createReactContextInBackground();
    attachToReactInstanceManager(); // see next
}
```

private impl of 
```java
private void attachToReactInstanceManager() {
    Assertions.assertNotNull(mReactInstanceManager).attachRootView(this);
}
```

Another public api is `runApplication`:
Calls into JS to start the React application. Can be called multiple times with the same
   * rootTag, which will re-render the application from the root
```java
  public void runApplication() { 
      /// blah blah
        catalystInstance.getJSModule(AppRegistry.class).runApplication(mJSModuleName, appParams);
   }
```

### CatalystInstance

 A higher level API on top of the asynchronous JSC bridge. This provides an environment allowing
 the invocation of JavaScript methods and lets a set of Java APIs be invokable from JavaScript as
 well.

```java
  void runJSBundle();

  // Returns the status of running the JS bundle; waits for an answer if runJSBundle is running
  boolean hasRunJSBundle();

  /**
   * Return the source URL of the JS Bundle that was run, or {@code null} if no JS bundle has been
   * run yet.
   */
  @Nullable
  String getSourceURL();

  // This is called from java code, so it won't be stripped anyway, but proguard will rename it,
  // which this prevents.
  @Override
  @DoNotStrip
  void invokeCallback(int callbackID, NativeArrayInterface arguments);

  @DoNotStrip
  void callFunction(String module, String method, NativeArray arguments);
  /**
   * Destroys this catalyst instance, waiting for any other threads in ReactQueueConfiguration
   * (besides the UI thread) to finish running. Must be called from the UI thread so that we can
   * fully shut down other threads.
   */
  void destroy();

  boolean isDestroyed();

  /** Initialize all the native modules */
  @VisibleForTesting
  void initialize();

  ReactQueueConfiguration getReactQueueConfiguration();

  <T extends JavaScriptModule> T getJSModule(Class<T> jsInterface);

  <T extends NativeModule> boolean hasNativeModule(Class<T> nativeModuleInterface);

  <T extends NativeModule> T getNativeModule(Class<T> nativeModuleInterface);

  NativeModule getNativeModule(String moduleName);

  JSIModule getJSIModule(JSIModuleType moduleType);

  Collection<NativeModule> getNativeModules();

  /**
   * This method permits a CatalystInstance to extend the known Native modules. This provided
   * registry contains only the new modules to load.
   */
  void extendNativeModules(NativeModuleRegistry modules);

  /**
   * Adds a idle listener for this Catalyst instance. The listener will receive notifications
   * whenever the bridge transitions from idle to busy and vice-versa, where the busy state is
   * defined as there being some non-zero number of calls to JS that haven't resolved via a
   * onBatchCompleted call. The listener should be purely passive and not affect application logic.
   */
  void addBridgeIdleDebugListener(NotThreadSafeBridgeIdleDebugListener listener);

  /**
   * Removes a NotThreadSafeBridgeIdleDebugListener previously added with {@link
   * #addBridgeIdleDebugListener}
   */
  void removeBridgeIdleDebugListener(NotThreadSafeBridgeIdleDebugListener listener);

  /** This method registers the file path of an additional JS segment by its ID. */
  void registerSegment(int segmentId, String path);

  @VisibleForTesting
  void setGlobalVariable(String propName, String jsonValue);

  /**
   * Get the C pointer (as a long) to the JavaScriptCore context associated with this instance.
   *
   * <p>Use the following pattern to ensure that the JS context is not cleared while you are using
   * it: JavaScriptContextHolder jsContext = reactContext.getJavaScriptContextHolder()
   * synchronized(jsContext) { nativeThingNeedingJsContext(jsContext.get()); }
   */
  JavaScriptContextHolder getJavaScriptContextHolder();

  void addJSIModules(List<JSIModuleSpec> jsiModules);

  /**
   * Returns a hybrid object that contains a pointer to a JS CallInvoker, which is used to schedule
   * work on the JS Thread. Required for TurboModuleManager initialization.
   */
  CallInvokerHolder getJSCallInvokerHolder();

  /**
   * Returns a hybrid object that contains a pointer to a Native CallInvoker, which is used to
   * schedule work on the NativeModules thread. Required for TurboModuleManager initialization.
   */
  CallInvokerHolder getNativeCallInvokerHolder();

  /**
   * For the time being, we want code relying on the old infra to also work with TurboModules.
   * Hence, we must provide the TurboModuleRegistry to CatalystInstance so that getNativeModule,
   * hasNativeModule, and getNativeModules can also return TurboModules.
   */
  void setTurboModuleManager(JSIModule getter);

```

### ReactContext

Extending an android `ContextWrapper` to have a reference to `CatalystInstance` shown above using
private variable using `mCatalystInstance`.
which is supplied via `public void initializeWithInstance(CatalystInstance catalystInstance) { .. }`

Also has 3 important threads:
```java
  private @Nullable MessageQueueThread mUiMessageQueueThread;
  private @Nullable MessageQueueThread mNativeModulesMessageQueueThread;
  private @Nullable MessageQueueThread mJSMessageQueueThread;
```

Has useful public api like:
```java
// these public apis indirectly call into mCatalystInstance
public <T extends JavaScriptModule> T getJSModule(Class<T> jsInterface) { ... }
public <T extends NativeModule> T getNativeModule(Class<T> nativeModuleInterface) { ... }
```

### ReactApplicationContext

Ensures the context used by `ReactContext` is applicationContext by doing following:
```java
public class ReactApplicationContext extends ReactContext {
  // We want to wrap ApplicationContext, since there is no easy way to verify that application
  // context is passed as a param, we use {@link Context#getApplicationContext} to ensure that
  // the context we're wrapping is in fact an application context.
  public ReactApplicationContext(Context context) {
    super(context.getApplicationContext());
  }
```

### ReactInstanceManager

Mainly manages `ReactContext` and `CatalystInstance`, and public API is used with `ReactRootView`.

An instance of this manager is required to start JS application in `ReactRootView`.
The lifecycle of the instance of  `ReactInstanceManager` should be bound to the activity
that owns the `ReactRootView` that is used to render react application using this instance
manager. 

Holds a private reference to `private ReactContext mCurrentReactContext`

Has a private method `private ReactApplicationContext createReactContext( JavaScriptExecutor jsExecutor, JSBundleLoader jsBundleLoader) { ... }`, which initialzes a catalystInstance. also this is where `reactContext` is created using `final ReactApplicationContext reactContext = new ReactApplicationContext(mApplicationContext);` follwed by giving reactContext being given to catalystInstance using `initializeWithInstance`.
Before returning, it calls `catalystInstance.runJSBundle();`

Has a private method `setupReactContext`. Calls `catalystInstance.initialize()`

Has a private method `private void attachRootViewToInstance(final ReactRoot reactRoot) { ... }`, inside
which we set reactRoot is set on UIManager using `uiManager.addRootView(reactRoot.getRootViewGroup())`,
and also calls runApplication of reactRoot i.e. `reactRoot.runApplication()`

Has a public api (most likely point of context creation):
Trigger react context initialization asynchronously in a background async task. This enables
applications to pre-load the application JS, and execute global code before {@link
ReactRootView} is available and measured. To be Called from UI thread
`public void createReactContextInBackground() { ... }`

Has another public API:
Attach given {@param reactRoot} to a catalyst instance manager and start JS application using
   JS module provided by {@link ReactRootView#getJSModuleName}. If the react context is currently
   being (re)-created, or if react context has not been created yet, the JS application associated
   with the provided reactRoot reactRoot will be started asynchronously, i.e this method won't
   block. This reactRoot will then be tracked by this manager and in case of catalyst instance
   restart it will be re-attached
```java
  public void attachRootView(ReactRoot reactRoot) {
    mAttachedReactRoots.add(reactRoot);
    ReactContext currentContext = getCurrentReactContext();
    if (mCreateReactContextThread == null && currentContext != null) {
      attachRootViewToInstance(reactRoot);
    }
  }
```

### ReactActivity

Holds a reference of a `ReactActivityDelegate`, which is created during constructor,
All common methods like `onCreate, onResume, ...` are forwarded to also call `mReactActivityDelegate`.

To provide your own `ReactActivityDelegate`, override `createReactActivityDelegate`.



### ReactActivityDelegate

Holds a reference `private ReactDelegate mReactDelegate`, which is instantiated in `onCreate`. also loads the actual app snowballing the loading process into action...
```java
onCreate(){
    mReactDelegate =
            new ReactDelegate(
                getPlainActivity(), getReactNativeHost(), mainComponentName, getLaunchOptions()) {
            @Override
            protected ReactRootView createRootView() {
                return ReactActivityDelegate.this.createRootView();
            }
            };
        if (mMainComponentName != null) {
            loadApp(mainComponentName);
        }
}

  protected ReactRootView createRootView() {
    return new ReactRootView(getContext());
  }

  protected void loadApp(String appKey) {
    mReactDelegate.loadApp(appKey);
    getPlainActivity().setContentView(mReactDelegate.getReactRootView());
  }

```

All commnon operations like `onCreate, onResume, onDestroy ...` are forwarded to `mReactDelegate`
Has a method `protected createRootView` which returns an instance of `ReactRootView`.

To provide your own `ReactRootView`, override `createRootView`.


### ReactDelegate

Apart from all the methods being forwarded from `ReactActivityDelegate`.
One imp public api:
```java
  public void loadApp(String appKey) {
    if (mReactRootView != null) {
      throw new IllegalStateException("Cannot loadApp while app is already running.");
    }
    mReactRootView = createRootView();
    mReactRootView.startReactApplication(
        getReactNativeHost().getReactInstanceManager(), appKey, mLaunchOptions);
  }
```

### ReactRoot interface

```java
  /** Return cached launch properties for app */
  @Nullable
  Bundle getAppProperties();

  @Nullable
  String getInitialUITemplate();

  String getJSModuleName();

  /** Fabric or Default UI Manager, see {@link UIManagerType} */
  @UIManagerType
  int getUIManagerType();

  int getRootViewTag();
  void setRootViewTag(int rootViewTag);

  /** Calls into JS to start the React application. */
  void runApplication();

  /** Handler for stages {@link com.facebook.react.surface.ReactStage} */
  void onStage(int stage);

  /** Return native view for root */
  ViewGroup getRootViewGroup();

  /** @return Cached values for widthMeasureSpec and heightMeasureSpec */
  int getWidthMeasureSpec();
  int getHeightMeasureSpec();
  /** Sets a flag that determines whether to log that content appeared on next view added. */
  void setShouldLogContentAppeared(boolean shouldLogContentAppeared);

```


### RootView Interface

```java
/** Interface for the root native view of a React native application. */
public interface RootView {

  /**
   * Called when a child starts a native gesture (e.g. a scroll in a ScrollView). Should be called
   * from the child's onTouchIntercepted implementation.
   */
  void onChildStartedNativeGesture(MotionEvent androidEvent);

  void handleException(Throwable t);
}
```

### UIManager

Has a method `addRootView`


### Core renderer implementation

Check in `react-native/LIbraries/Renderer/implementations/ReactNativeRenderer-prod.fb.js`


### catalystinstanceImpl.cpp

For `initializeBridge`: 

Java CatalystImpl -> C++ CatalystImpl -> Bridge -> Bridge::callback --weak/global ref -> ReactCallback -> JavaCatalystInstanceImpl.

### NativeToJSBridge.cpp

* Manages calls from native to JS, and 
* also manages executors and threads.

Manages a reference to executor in `std::uniqe_ptr<JSExecutor> m_executor`,
to which it delegates/forwards everything,
insitantiates m_executor via:
```
m_executr(jsExecutorFactor ->createJSExecutor(m_delegate, jsQueue))
```

### INstance.cpp

Creates and has reference to instance of `NativeToJSBridge` and initializes
it in `initializeBridge` method.

Also forwards following calls to `NativeToJSBridge`:
1. `callJSFunction`
2. `registerBundle`
3. `loadBundle`
4. `loadBundleSync`
5. `handleMemoryPressure`.
6. `setGlobalVariable`
7. `jniCallJSCallback` -> `callJSCallback`.

common methods
`instance_->loadScriptFromString`, which might call into `loadBundle` or `loadBundleSync` depending on `loadSynchronously` bool flag


### JS -> Native modules call

1. goes through `NativeModulesProx` JS -> cpp

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

An instance of `ExecutorDelegate` is `JSToNativeBridge`
```cpp
m_delegate(std::make_shared<JsToNativeBridge>(registry, callback)),
```

Both `NativeToJSBridge` and `JSToNativeBridge` live in a common file: `NativeToJsBridge.cpp/.h`
```cpp
class JsToNativeBridge : public react::ExecutorDelegate {
class NativeToJsBridge {
 public:
  friend class JsToNativeBridge;
//...
}
```

On doing following on JS side:
`NativeModules.MyReactNativeModule.callMe()`, i.e JS -> Cpp -> JS -> Cpp -> Java for `@ReactMethod` call in JS. for cpp -> java see ref(https://github.com/facebookincubator/fbjni/blob/main/docs/quickref.md#basic-method-usage-java-to-c-and-c-to-java)
We get following Logs:


```
 I/ReactNativeJNI: NativeModuleProxy get: MyReactNativeModule
 I/ReactNativeJNI: JSINativeModules.createModule:: name = MyReactNativeModule
I/ReactNativeJS: 'NativeModules.js genModule: moduleName: ', 'MyReactNativeModule'
 I/ReactNativeJS: 'MessageQueue.js enqueueNativeCall moduleID: ', 'MyReactNativeModule', ' methodID: ', 'callMe'
 I/ReactNativeJS: global.nativeFlushQueueImmediate(queue) 
 I/ReactNativeJNI: JSIExecutor.nativeFlushQueueImmediate()
 I/ReactNativeJNI: JSIExecutor::callNativeModules
I/ReactNativeJNI: JSToNative: callNativeModules::  call.moduleId: 27 call.methodId: 0 call.callId : 4
 I/ReactNativeJNI:  ModuleRegistry.cpp callNativeMethod does invoke on moduleId: 27 methodId : 0 callId: 4
 I/ReactNativeJNI: JavaNativeModule::invoke : reactMethodId: 0 callId : 4
D/JavaModuleWrapper: JavaModuleWrapper.java invoke: methodId: 0
 D/MyReactNativeModule: callMe()
```

NativeModules creation sequence logs:
```
 I/ReactNativeJNI: NativeModuleProxy get: Timing
 I/ReactNativeJNI: JSINativeModules.createModule:: name = Timing
 I/ReactNativeJS: 'NativeModules.js genModule: moduleName: ', 'Timing'
```

### JavascriptModuleRegistry

```java
/**
 * Interface denoting that a class is the interface to a module with the same name in JS. Calling
 * functions on this interface will result in corresponding methods in JS being called.
 *
 * <p>When extending JavaScriptModule and registering it with a CatalystInstance, all public methods
 * are assumed to be implemented on a JS module with the same name as this class. Calling methods on
 * the object returned from {@link ReactContext#getJSModule} or {@link CatalystInstance#getJSModule}
 * will result in the methods with those names exported by that module being called in JS.
 *
 * <p>NB: JavaScriptModule does not allow method name overloading because JS does not allow method
 * name overloading.
 */
@DoNotStrip
public interface JavaScriptModule {}

/* Class responsible for holding all the {@link JavaScriptModule}s. Uses Java proxy objects to
 * dispatch method calls on JavaScriptModules to the bridge using the corresponding module and
 * method ids so the proper function is executed in JavaScript.
 */
public final class JavaScriptModuleRegistry {
  private final HashMap<Class<? extends JavaScriptModule>, JavaScriptModule> mModuleInstances;
}
```

`invoke` on this `JavascriptModule` forwards to CatalystInstance and finally JS via:
```java
mCatalystInstance.callFunction(getJSModuleName(), method.getName(), jsArgs);
```


### NativeModuleRegistry

Mainly holds a map of Java native modulename to ModuleHolder
```java
public class NativeModuleRegistry {
  private final ReactApplicationContext mReactApplicationContext;
  private final Map<String, ModuleHolder> mModules;
  private final String TAG = NativeModuleRegistry.class.getSimpleName();
}
```

`ModuleHolder` instances are constructed during processPackage i.e. before context/catalyst creation,
but `initialize` is done post `notifyJSInstanceInitialized()`.


### JSIExecutor

Native -> JS calls:
`JSIExecutor::callFunction` and `JSIExecutor::invokeCallback` calls into `MessageQueue.js callFunctionReturnFlushedQueue` and `MessageQueue.js invokeCallbackAndReturnFlushedQueue` 
via comman global variable: `__fbBatchedBridge` (See `JSIExecutor.bindBridge` for details).


Main flow of queue for JS -> Native calls:
`MessageQueue.js -> nativeEnqueueCall` -> `global.nativeFlushQueueImmediate(queue);`
-> `JSIExecutor.nativeFlushQueueImmediate()` -> `JSIExecutor::callNativeModules` -> `JSToNative: callNativeModules:`