

## RCT_DEBUG

The RCT_DEBUG macro can be used to exclude error checking and logging code from release builds to improve performance and reduce binary size.

Derived from `DEBUG`
```objc
#ifndef RCT_DEBUG
#if DEBUG
#define RCT_DEBUG 1
#else
#define RCT_DEBUG 0
#endif
#endif
```

## RCT_DEV macro

Also derived from `DEBUG`
The RCT_DEV macro can be used to enable or disable development tools
  such as the debug executors, dev menu, red box, etc.
```objc
#ifndef RCT_DEV
#if DEBUG
#define RCT_DEV 1
#else
#define RCT_DEV 0
#endif
#endif
```

## RCT_DEV_MENU

```objc
/**
 * RCT_DEV_MENU can be used to toggle the dev menu separately from RCT_DEV.
 * By default though, it will inherit from RCT_DEV.
 */
#ifndef RCT_DEV_MENU
#define RCT_DEV_MENU RCT_DEV
#endif
```