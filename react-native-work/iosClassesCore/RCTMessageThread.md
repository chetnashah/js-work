
It's a thin wrapper around a run loop which implements a C++ interface

## Inherits from MessageQueueThread

```cpp
#include <condition_variable>
#include <functional>
#include <mutex>

namespace facebook {
namespace react {

class MessageQueueThread {
 public:
  virtual ~MessageQueueThread() {}
  virtual void runOnQueue(std::function<void()> &&) = 0;
  // runOnQueueSync and quitSynchronous are dangerous.  They should only be
  // used for initialization and cleanup.
  virtual void runOnQueueSync(std::function<void()> &&) = 0;
  // Once quitSynchronous() returns, no further work should run on the queue.
  virtual void quitSynchronous() = 0;
};

} // namespace react
} // namespace facebook
```

## Public API

```cpp
class RCTMessageThread : public MessageQueueThread,
                         public std::enable_shared_from_this<RCTMessageThread> {
 public:
  RCTMessageThread(NSRunLoop *runLoop, RCTJavaScriptCompleteBlock errorBlock);
  ~RCTMessageThread() override;
  void runOnQueue(std::function<void()> &&) override;
  void runOnQueueSync(std::function<void()> &&) override;
  void quitSynchronous() override;
  void setRunLoop(NSRunLoop *runLoop);

 private:
  void tryFunc(const std::function<void()> &func);
  void runAsync(std::function<void()> func);
  void runSync(std::function<void()> func);

  CFRunLoopRef m_cfRunLoop;
  RCTJavaScriptCompleteBlock m_errorBlock;
  std::atomic_bool m_shutdown;
};

} // namespace react
} // namespace facebook
```