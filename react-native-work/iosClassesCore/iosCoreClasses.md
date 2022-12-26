

## RCTBridgeDelegate Protocol

**AppDelegate implements this protocol**


```objc
@protocol RCTBridgeDelegate <NSObject>

/**
 * The location of the JavaScript source file. When running from the packager
 * this should be an absolute URL, e.g. `http://localhost:8081/index.ios.bundle`.
 * When running from a locally bundled JS file, this should be a `file://` url
 * pointing to a path inside the app resources, e.g. `file://.../main.jsbundle`.
 */
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge;

@optional
/**
 * The bridge will automatically attempt to load the JS source code from the
 * location specified by the `sourceURLForBridge:` method, however, if you want
 * to handle loading the JS yourself, you can do so by implementing this method.
 */
- (void)loadSourceForBridge:(RCTBridge *)bridge
                 onProgress:(RCTSourceLoadProgressBlock)onProgress
                 onComplete:(RCTSourceLoadBlock)loadCallback;

/**
 * Similar to loadSourceForBridge:onProgress:onComplete: but without progress
 * reporting.
 */
- (void)loadSourceForBridge:(RCTBridge *)bridge withBlock:(RCTSourceLoadBlock)loadCallback;

@end
```

Protocol implementation:
```objc
// AppDelegate.m implementing sourceURLForBridge method of RCTBridgeDelegate protocol
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
```


## RCTRootView


RootView to host view that will run react/native

```objc
/**
 * Native view used to host React-managed views within the app. Can be used just
 * like any ordinary UIView. You can have multiple RCTRootViews on screen at
 * once, all controlled by the same JavaScript application.
 */
@interface RCTRootView : UIView

/**
 * - Designated initializer -
 */
- (instancetype)initWithFrame:(CGRect)frame
                       bridge:(RCTBridge *)bridge
                   moduleName:(NSString *)moduleName
            initialProperties:(nullable NSDictionary *)initialProperties NS_DESIGNATED_INITIALIZER;

/**
 * - Convenience initializer -
 * The frame will default to CGRectZero.
 */
- (instancetype)initWithBridge:(RCTBridge *)bridge
                    moduleName:(NSString *)moduleName
             initialProperties:(nullable NSDictionary *)initialProperties;

/**
 * - Convenience initializer -
 * A bridge will be created internally.
 * This initializer is intended to be used when the app has a single RCTRootView,
 * otherwise create an `RCTBridge` and pass it in via `initWithBridge:moduleName:`
 * to all the instances.
 */
- (instancetype)initWithBundleURL:(NSURL *)bundleURL
                       moduleName:(NSString *)moduleName
                initialProperties:(nullable NSDictionary *)initialProperties
                    launchOptions:(nullable NSDictionary *)launchOptions;

/**
 * This API allows RCTRootView users to know if the root view is backed by the bridge.
 */
@property (nonatomic, readonly) BOOL hasBridge;

/**
 * This API allows users of RCTRootView to access other NativeModules, without
 * directly accessing the bridge.
 */
@property (nonatomic, strong, readonly) RCTModuleRegistry *moduleRegistry;

@property (nonatomic, strong, readonly) id<RCTEventDispatcherProtocol> eventDispatcher;

/**
 * The name of the JavaScript module to execute within the
 * specified scriptURL (required). Setting this will not have
 * any immediate effect, but it must be done prior to loading
 * the script.
 */
@property (nonatomic, copy, readonly) NSString *moduleName;

/**
 * The bridge used by the root view. Bridges can be shared between multiple
 * root views, so you can use this property to initialize another RCTRootView.
 */
@property (nonatomic, strong, readonly) RCTBridge *bridge;

/**
 * The properties to apply to the view. Use this property to update
 * application properties and rerender the view. Initialized with
 * initialProperties argument of the initializer.
 *
 * Set this property only on the main thread.
 */
@property (nonatomic, copy, readwrite, nullable) NSDictionary *appProperties;

/**
 * The size flexibility mode of the root view.
 */
@property (nonatomic, assign) RCTRootViewSizeFlexibility sizeFlexibility;

/*
 * The minimum size of the root view, defaults to CGSizeZero.
 */
@property (nonatomic, assign) CGSize minimumSize;

/**
 * The delegate that handles intrinsic size updates.
 */
@property (nonatomic, weak, nullable) id<RCTRootViewDelegate> delegate;

/**
 * The backing view controller of the root view.
 */
@property (nonatomic, weak, nullable) UIViewController *reactViewController;

/**
 * The React-managed contents view of the root view.
 */
@property (nonatomic, strong, readonly) UIView *contentView;

/**
 * A view to display while the JavaScript is loading, so users aren't presented
 * with a blank screen. By default this is nil, but you can override it with
 * (for example) a UIActivityIndicatorView or a placeholder image.
 */
@property (nonatomic, strong, nullable) UIView *loadingView;

/**
 * When set, any touches on the RCTRootView that are not matched up to any of the child
 * views will be passed to siblings of the RCTRootView. See -[UIView hitTest:withEvent:]
 * for details on iOS hit testing.
 *
 * Enable this to support a semi-transparent RN view that occupies the whole screen but
 * has visible content below it that the user can interact with.
 *
 * The default value is NO.
 */
@property (nonatomic, assign) BOOL passThroughTouches;

/**
 * Timings for hiding the loading view after the content has loaded. Both of
 * these values default to 0.25 seconds.
 */
@property (nonatomic, assign) NSTimeInterval loadingViewFadeDelay;
@property (nonatomic, assign) NSTimeInterval loadingViewFadeDuration;

@end

```


## RCTBridgeModule protocol

Any custom native module on react-native must implement this protocol.
All members are optional

E.g. usage:
```objc
//  RCTCalendarModule.h
#import <React/RCTBridgeModule.h>
@interface RCTCalendarModule : NSObject <RCTBridgeModule>
@end
```
implementation:
```objc
// RCTCalendarModule.m
#import "RCTCalendarModule.h"

@implementation RCTCalendarModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

@end
```
Usage on JS side happens with `RCT` removed e.g.
```js
const {CalendarModule} = ReactNative.NativeModules;
```

Protocol specifics:
```objc
/**
 * Provides the interface needed to register a bridge module.
 */
@protocol RCTBridgeModule <NSObject>

/**
 * Place this macro in your class implementation to automatically register
 * your module with the bridge when it loads. The optional js_name argument
 * will be used as the JS module name. If omitted, the JS module name will
 * match the Objective-C class name.
 */
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

/**
 * Same as RCT_EXPORT_MODULE, but uses __attribute__((constructor)) for module
 * registration. Useful for registering swift classes that forbids use of load
 * Used in RCT_EXTERN_REMAP_MODULE
 */
#define RCT_EXPORT_MODULE_NO_LOAD(js_name, objc_name)                           \
  RCT_EXTERN void RCTRegisterModule(Class);                                     \
  +(NSString *)moduleName                                                       \
  {                                                                             \
    return @ #js_name;                                                          \
  }                                                                             \
  __attribute__((constructor)) static void RCT_CONCAT(initialize_, objc_name)() \
  {                                                                             \
    RCTRegisterModule([objc_name class]);                                       \
  }

/**
 * To improve startup performance users may want to generate their module lists
 * at build time and hook the delegate to merge with the runtime list. This
 * macro takes the place of the above for those cases by omitting the +load
 * generation.
 *
 */
#define RCT_EXPORT_PRE_REGISTERED_MODULE(js_name) \
  +(NSString *)moduleName                         \
  {                                               \
    return @ #js_name;                            \
  }

// Implemented by RCT_EXPORT_MODULE
+ (NSString *)moduleName;

@optional

/**
 * A reference to the RCTModuleRegistry. Useful for modules that require access
 * to other NativeModules. To implement this in your module, just add `@synthesize
 * moduleRegistry = _moduleRegistry;`. If using Swift, add
 * `@objc var moduleRegistry: RCTModuleRegistry!` to your module.
 */
@property (nonatomic, weak, readwrite) RCTModuleRegistry *moduleRegistry;

/**
 * A reference to the RCTViewRegistry. Useful for modules that query UIViews,
 * given a react tag. This API is deprecated, and only exists to help migrate
 * NativeModules to Venice.
 *
 * To implement this in your module, just add `@synthesize
 * viewRegistry_DEPRECATED = _viewRegistry_DEPRECATED;`. If using Swift, add
 * `@objc var viewRegistry_DEPRECATED: RCTViewRegistry!` to your module.
 */
@property (nonatomic, weak, readwrite) RCTViewRegistry *viewRegistry_DEPRECATED;

/**
 * A reference to the RCTBundleManager. Useful for modules that need to read
 * or write to the app's bundle URL.
 *
 * To implement this in your module, just add `@synthesize bundleManager =
 * _bundleManager;`. If using Swift, add `@objc var bundleManager:
 * RCTBundleManager!` to your module.
 */
@property (nonatomic, weak, readwrite) RCTBundleManager *bundleManager;

/**
 * A reference to an RCTCallableJSModules. Useful for modules that need to
 * call into methods on JavaScript modules registered as callable with
 * React Native.
 *
 * To implement this in your module, just add `@synthesize callableJSModules =
 * _callableJSModules;`. If using Swift, add `@objc var callableJSModules:
 * RCTCallableJSModules!` to your module.
 */
@property (nonatomic, weak, readwrite) RCTCallableJSModules *callableJSModules;

/**
 * A reference to the RCTBridge. Useful for modules that require access
 * to bridge features, such as sending events or making JS calls. This
 * will be set automatically by the bridge when it initializes the module.
 * To implement this in your module, just add `@synthesize bridge = _bridge;`
 * If using Swift, add `@objc var bridge: RCTBridge!` to your module.
 */
@property (nonatomic, weak, readonly) RCTBridge *bridge;

/**
 * The queue that will be used to call all exported methods. If omitted, this
 * will call on a default background queue, which is avoids blocking the main
 * thread.
 *
 * If the methods in your module need to interact with UIKit methods, they will
 * probably need to call those on the main thread, as most of UIKit is main-
 * thread-only. You can tell React Native to call your module methods on the
 * main thread by returning a reference to the main queue, like this:
 *
 * - (dispatch_queue_t)methodQueue
 * {
 *   return dispatch_get_main_queue();
 * }
 *
 * If you don't want to specify the queue yourself, but you need to use it
 * inside your class (e.g. if you have internal methods that need to dispatch
 * onto that queue), you can just add `@synthesize methodQueue = _methodQueue;`
 * and the bridge will populate the methodQueue property for you automatically
 * when it initializes the module.
 */
@property (nonatomic, strong, readonly) dispatch_queue_t methodQueue;

/**
 * Wrap the parameter line of your method implementation with this macro to
 * expose it to JS. By default the exposed method will match the first part of
 * the Objective-C method selector name (up to the first colon). Use
 * RCT_REMAP_METHOD to specify the JS name of the method.
 *
 * For example, in ModuleName.m:
 *
 * - (void)doSomething:(NSString *)aString withA:(NSInteger)a andB:(NSInteger)b
 * { ... }
 *
 * becomes
 *
 * RCT_EXPORT_METHOD(doSomething:(NSString *)aString
 *                   withA:(NSInteger)a
 *                   andB:(NSInteger)b)
 * { ... }
 *
 * and is exposed to JavaScript as `NativeModules.ModuleName.doSomething`.
 *
 * ## Promises
 *
 * Bridge modules can also define methods that are exported to JavaScript as
 * methods that return a Promise, and are compatible with JS async functions.
 *
 * Declare the last two parameters of your native method to be a resolver block
 * and a rejecter block. The resolver block must precede the rejecter block.
 *
 * For example:
 *
 * RCT_EXPORT_METHOD(doSomethingAsync:(NSString *)aString
 *                           resolver:(RCTPromiseResolveBlock)resolve
 *                           rejecter:(RCTPromiseRejectBlock)reject
 * { ... }
 *
 * Calling `NativeModules.ModuleName.doSomethingAsync(aString)` from
 * JavaScript will return a promise that is resolved or rejected when your
 * native method implementation calls the respective block.
 *
 */
#define RCT_EXPORT_METHOD(method) RCT_REMAP_METHOD(, method)

/**
 * Same as RCT_EXPORT_METHOD but the method is called from JS
 * synchronously **on the JS thread**, possibly returning a result.
 *
 * WARNING: in the vast majority of cases, you should use RCT_EXPORT_METHOD which
 * allows your native module methods to be called asynchronously: calling
 * methods synchronously can have strong performance penalties and introduce
 * threading-related bugs to your native modules.
 *
 * The return type must be of object type (id) and should be serializable
 * to JSON. This means that the hook can only return nil or JSON values
 * (e.g. NSNumber, NSString, NSArray, NSDictionary).
 *
 * Calling these methods when running under the websocket executor
 * is currently not supported.
 */
#define RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(method) RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(id, method)

#define RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(returnType, method) \
  RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(, returnType, method)

/**
 * Similar to RCT_EXPORT_METHOD but lets you set the JS name of the exported
 * method. Example usage:
 *
 * RCT_REMAP_METHOD(executeQueryWithParameters,
 *   executeQuery:(NSString *)query parameters:(NSDictionary *)parameters)
 * { ... }
 */
#define RCT_REMAP_METHOD(js_name, method)       \
  _RCT_EXTERN_REMAP_METHOD(js_name, method, NO) \
  -(void)method RCT_DYNAMIC;

/**
 * Similar to RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD but lets you set
 * the JS name of the exported method. Example usage:
 *
 * RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(executeQueryWithParameters,
 *   executeQuery:(NSString *)query parameters:(NSDictionary *)parameters)
 * { ... }
 */
#define RCT_REMAP_BLOCKING_SYNCHRONOUS_METHOD(js_name, returnType, method) \
  _RCT_EXTERN_REMAP_METHOD(js_name, method, YES)                           \
  -(returnType)method RCT_DYNAMIC;

/**
 * Use this macro in a private Objective-C implementation file to automatically
 * register an external module with the bridge when it loads. This allows you to
 * register Swift or private Objective-C classes with the bridge.
 *
 * For example if one wanted to export a Swift class to the bridge:
 *
 * MyModule.swift:
 *
 *   @objc(MyModule) class MyModule: NSObject {
 *
 *     @objc func doSomething(string: String! withFoo a: Int, bar b: Int) { ... }
 *
 *   }
 *
 * MyModuleExport.m:
 *
 *   #import <React/RCTBridgeModule.h>
 *
 *   @interface RCT_EXTERN_MODULE(MyModule, NSObject)
 *
 *   RCT_EXTERN_METHOD(doSomething:(NSString *)string withFoo:(NSInteger)a bar:(NSInteger)b)
 *
 *   @end
 *
 * This will now expose MyModule and the method to JavaScript via
 * `NativeModules.MyModule.doSomething`
 */
#define RCT_EXTERN_MODULE(objc_name, objc_supername) RCT_EXTERN_REMAP_MODULE(, objc_name, objc_supername)

/**
 * Like RCT_EXTERN_MODULE, but allows setting a custom JavaScript name.
 */
#define RCT_EXTERN_REMAP_MODULE(js_name, objc_name, objc_supername) \
  objc_name:                                                        \
  objc_supername @                                                  \
  end @interface objc_name(RCTExternModule)<RCTBridgeModule>        \
  @end                                                              \
  @implementation objc_name (RCTExternModule)                       \
  RCT_EXPORT_MODULE_NO_LOAD(js_name, objc_name)

/**
 * Use this macro in accordance with RCT_EXTERN_MODULE to export methods
 * of an external module.
 */
#define RCT_EXTERN_METHOD(method) _RCT_EXTERN_REMAP_METHOD(, method, NO)

/**
 * Use this macro in accordance with RCT_EXTERN_MODULE to export methods
 * of an external module that should be invoked synchronously.
 */
#define RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(method) _RCT_EXTERN_REMAP_METHOD(, method, YES)

/**
 * Like RCT_EXTERN_REMAP_METHOD, but allows setting a custom JavaScript name
 * and also whether this method is synchronous.
 */
#define _RCT_EXTERN_REMAP_METHOD(js_name, method, is_blocking_synchronous_method)                            \
  +(const RCTMethodInfo *)RCT_CONCAT(__rct_export__, RCT_CONCAT(js_name, RCT_CONCAT(__LINE__, __COUNTER__))) \
  {                                                                                                          \
    static RCTMethodInfo config = {#js_name, #method, is_blocking_synchronous_method};                       \
    return &config;                                                                                          \
  }

/**
 * Most modules can be used from any thread. All of the modules exported non-sync method will be called on its
 * methodQueue, and the module will be constructed lazily when its first invoked. Some modules have main need to access
 * information that's main queue only (e.g. most UIKit classes). Since we don't want to dispatch synchronously to the
 * main thread to this safely, we construct these modules and export their constants ahead-of-time.
 *
 * Note that when set to false, the module constructor will be called from any thread.
 *
 * This requirement is currently inferred by checking if the module has a custom initializer or if there's exported
 * constants. In the future, we'll stop automatically inferring this and instead only rely on this method.
 */
+ (BOOL)requiresMainQueueSetup;

/**
 * Injects methods into JS.  Entries in this array are used in addition to any
 * methods defined using the macros above.  This method is called only once,
 * before registration.
 */
- (NSArray<id<RCTBridgeMethod>> *)methodsToExport;

/**
 * Injects constants into JS. These constants are made accessible via NativeModules.ModuleName.X. It is only called once
 * for the lifetime of the bridge, so it is not suitable for returning dynamic values, but may be used for long-lived
 * values such as session keys, that are regenerated only as part of a reload of the entire React application.
 *
 * If you implement this method and do not implement `requiresMainQueueSetup`, you will trigger deprecated logic
 * that eagerly initializes your module on bridge startup. In the future, this behaviour will be changed to default
 * to initializing lazily, and even modules with constants will be initialized lazily.
 */
- (NSDictionary *)constantsToExport;

/**
 * Notifies the module that a batch of JS method invocations has just completed.
 */
- (void)batchDidComplete;

/**
 * Notifies the module that the active batch of JS method invocations has been
 * partially flushed.
 *
 * This occurs before -batchDidComplete, and more frequently.
 */
- (void)partialBatchDidFlush;

@end
```