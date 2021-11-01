
### How touch propogation happens?

RNGestureHanlderRootView.java -> `dispatchTouchEvent` override passes
on to various RNGestureHandleOrchestrator and RNGestureHanlder via bounds checking etc.


Note: If you are explicitly not using `GestureHandlerRootView`, then `react-navigation` is probably using it in its stack views.

### findNodeHandle : viewRef => viewTag

A public export of `react-native` package, takes a ref and 
returns a view tag for that ref.


### 

1. first createHanlder, handler tags are auto incrementing, separate from view tags.

2. attach handler to a view viewtag

3. native calls forwarded to `RNGestureHandlerModule`.

