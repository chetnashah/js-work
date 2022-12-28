
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

