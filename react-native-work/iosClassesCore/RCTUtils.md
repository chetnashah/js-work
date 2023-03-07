


## Getting Main queue/Executing block on main queue

```objc
dispatch_async(dispatch_get_main_queue(), ^{
  [[UIApplication delegate] fooBar];
});

// or 
void RCTExecuteOnMainQueue(dispatch_block_t block)
{
  if (RCTIsMainQueue()) {
    block();
  } else {
    dispatch_async(dispatch_get_main_queue(), ^{
      block();
    });
  }
}
```

## Check if we running on main queue/SEtting a marker on main queue (for later identification)

```objc
BOOL RCTIsMainQueue()
{
  static void *mainQueueKey = &mainQueueKey;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    dispatch_queue_set_specific(dispatch_get_main_queue(), mainQueueKey, mainQueueKey, NULL);
  });
  return dispatch_get_specific(mainQueueKey) == mainQueueKey;
}
```

## Run a block on JS thread

We use `performSelector:onThread:withObject:waitUntilDone:` in order to run a selector on any specific thread.

```objc
/**
 * Ensure block is run on the JS thread. If we're already on the JS thread, the block will execute synchronously.
 * If we're not on the JS thread, the block is dispatched to that thread. Any errors encountered while executing
 * the block will go through handleError:
 */
- (void)ensureOnJavaScriptThread:(dispatch_block_t)block
{
  RCTAssert(_jsThread, @"This method must not be called before the JS thread is created");

  // This does not use _jsMessageThread because it may be called early before the runloop reference is captured
  // and _jsMessageThread is valid. _jsMessageThread also doesn't allow us to shortcut the dispatch if we're
  // already on the correct thread.

  if ([NSThread currentThread] == _jsThread) {
    [self _tryAndHandleError:block];
  } else {
    [self performSelector:@selector(_tryAndHandleError:) onThread:_jsThread withObject:block waitUntilDone:NO];
  }
}
```