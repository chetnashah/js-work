

## How is dev vs prod bundle/location decided?

We have RCTBridgeDelegate implemented right inside our AppDelegate.

see the following method/implementation:
```objc
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];// localhost:8081?options....
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
```