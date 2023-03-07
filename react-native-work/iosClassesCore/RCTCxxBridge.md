

## Imp public API

1. `start` = sets up everything, runs on main thread.
2. `loadSource` = sends load source execution, runs on main thread.
3. `initializeBridge(JSExecutorFactory)` = initialize the bridge, happens on JS thread. Creates a `RCTMessageThread _jsMessageThread` i.e. a runloop-handler, and calls into `_reactInstance->initializeBridge` 
4. `executeSourceCode` = Runs the actual source code, runs on `com.apple.root.user-interactive-qos` thread.


## Core state/instance vars

```cpp
// RCTCxxBridge.mm

@implementation RCTCxxBridge {
  BOOL _didInvalidate;
  BOOL _moduleRegistryCreated;

  NSMutableArray<RCTPendingCall> *_pendingCalls;
  std::atomic<NSInteger> _pendingCount;

  // Native modules
  NSMutableDictionary<NSString *, RCTModuleData *> *_moduleDataByName;
  NSMutableArray<RCTModuleData *> *_moduleDataByID;
  NSMutableArray<Class> *_moduleClassesByID;
  NSUInteger _modulesInitializedOnMainQueue;
  RCTDisplayLink *_displayLink;

  // JS thread management
  NSThread *_jsThread;
  std::shared_ptr<RCTMessageThread> _jsMessageThread;
  std::mutex _moduleRegistryLock;

  // This is uniquely owned, but weak_ptr is used.
  std::shared_ptr<Instance> _reactInstance; // heavy lifting done here.

  // Necessary for searching in TurboModules in TurboModuleManager
  id<RCTTurboModuleRegistry> _turboModuleRegistry;

  RCTModuleRegistry *_objCModuleRegistry;
  RCTViewRegistry *_viewRegistry_DEPRECATED;
  RCTBundleManager *_bundleManager;
  RCTCallableJSModules *_callableJSModules;
}
```