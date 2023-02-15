
Details: https://teabreak.e-spres-oh.com/swift-in-react-native-the-ultimate-guide-part-1-modules-9bb8d054db03

## Create swift file with `@objc` annotation on class file

```swift
import Foundation

// CalendarManager.swift

@objc(CalendarManager)
class CalendarManager: NSObject {
  
  @objc func addEvent(name: String, location: String, date: NSNumber) -> Void {
    // Date is ready to use!
  }
  
}
```

## Create Obj-c implementation file with both module & methods externalized via macros

```swift
//
//  CalendarManagerBridge.m
//  SwiftBridge
//
//  Created by Michael Schwartz on 12/11/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

// CalendarManagerBridge.m
#import "RCTBridgeModule.h"

// refers to swift class
@interface RCT_EXTERN_MODULE(CalendarManager, NSObject)

// refers to the swift class method
RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(NSNumber *)date)

@end
```