


## RCTAppDelegate

The RCTAppDelegate is an **utility class that implements some base configurations for all the React Native apps**.
It is not mandatory to use it, but it could simplify your AppDelegate code.
 
**To use it, you just need to make your AppDelegate a subclass of RCTAppDelegate***
 
```objc
#import <React/RCTAppDelegate.h>
@interface AppDelegate: RCTAppDelegate
@end
```

All the methods implemented by the RCTAppDelegate can be overriden by your AppDelegate if you need to provide a custom implementation.
