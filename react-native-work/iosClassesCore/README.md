
## Main entry point is `AppDelegate.m` method `didFinishLaunchingWithOptions`

Responsibility of this method is:
1. **create bridge and setup itself(i.e. delegate self) as delegate** using `RCTBridge* rctBridge = [[RCTBridge alloc] initWithDelegate: self]`
2. Create rootView with bridge setup ins tep 1: `id rootView = [[RCTRootView alloc] initWithBridge: bridge]`
3. Create window using `[UIWindow alloc]`
4. Create UIViewController and set its rootView to rootView created above: `rootViewController = [UIViewController new]; rootViewController.view = rootView`.
5. Setup UIViewController on UIWindow: `self.window.rootViewController = rootViewController`

## MEthods to implement from `RCTBridgeDelegate`

One needs to implement `-(NSURL*) sourceURLForBridge:(RCTBridge*) bridge`.

## App init

App initialization starts from `main` method.

Which calls into `UIApplicationMain`, which initializes AppDelegate init method

To override `AppDelegate` init, just override `init` method in your app delegate implementation,
with signature `- (instancetype)init`.

Then finally AppDelegate's `didFinishLaunchingWithOptions` is called from UIApplication's _handleDelegateCallbacksWithOptions.

For react-native, we create bridge,rootview, rootviewcontroller in `didFinishLaunchingWithOptions` method of Appdelegate.

## Module Registration

Macro populates code for registration
```c
#define RCT_EXPORT_MODULE(js_name)          \
  RCT_EXTERN void RCTRegisterModule(Class); \
  +(NSString *)moduleName                   \
  {                                         \
    return @ #js_name;                      \
  }                                         \
  +(void)load                               \
  {                                         \
    RCTRegisterModule(self);                \
  }
```

Individual module registration: `RCTBridge RCTRegisterModule(moduleClass)`
`RCTBridge.RCTModuleClasses` holds all the registered module classes.

All the stuff happens in `RCTCxxBridge start`:

1. jsthread start
2. registration of non-lazy modules: `RCTCxxBridge start -> _initializeModules -> _registerModuleForClasses -> foreach module-class { [RCTModuleData initWithModuleClass]}`
3. `make_shared<JSC/hermesExecutor>`
4. Ensure on JS Thread = Inititalisation of modules: `RCTCxxBridge start -> initializeBridge -> initializeBridgeLocked -> createNativeModules`.
5. loadSource
6. async on source load = executeSourceCode


## RCTModuleData

Module metadata class for single module instance

Imp methods:
1. `initWithModuleClass/Instance`
2. `setUp`
3. `setupInstanceAndBridge` - 
4. `_initializeModule`
5. public getter `- id<RCTBridgeModule> instance`

Imp properies (getters for many of these):
1. `NSArray<RCTBridgeMethod> methods`
2. `Dictionary methodsByName`
3. `id<RCTBridgeModule> instance`
4. 

