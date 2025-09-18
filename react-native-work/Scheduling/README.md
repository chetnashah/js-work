
## React Native


> Thread & Queue Setup

  - `ReactAndroid/src/main/java/com/facebook/react/bridge/queue/MessageQueueThreadImpl.java` — JS Looper thread implementation (`runOnQueue`, `quitSynchronous`, background thread bootstrap).
  - `ReactAndroid/src/main/java/com/facebook/react/bridge/queue/MessageQueueThreadHandler.java` — handler wrapper catching exceptions on the JS thread.
  - `ReactAndroid/src/main/java/com/facebook/react/bridge/queue/ReactQueueConfigurationImpl.java` — wires JS/native/UI queues and tears them down.

  Bridge Wiring (Java ⇄ C++)

  - `ReactAndroid/src/main/java/com/facebook/react/bridge/CatalystInstanceImpl.java` — passes the JS `MessageQueueThread` and native-module queue into C++, exposes runtime executor/scheduler to Java.
  - `ReactAndroid/src/main/jni/react/jni/CatalystInstanceImpl.cpp` — native half of the bridge (`initializeBridge`, `getRuntimeExecutor`, `getRuntimeScheduler`); creates `JMessageQueueThread`.
  - `ReactAndroid/src/main/jni/react/jni/JMessageQueueThread.cpp` / `.h` — JNI façade around the Java message queue (`runOnQueue`, `runOnQueueSync`).

  C++ Bridge & Executor

  - `ReactCommon/cxxreact/Instance.cpp` — bridge bootstrap (`initializeBridge`), definition of `RuntimeExecutor`, JS call invoker buffering.
  - `ReactCommon/cxxreact/NativeToJsBridge.cpp` — all scheduling onto the JS queue (`runOnExecutorQueue`, `callFunction`, `destroy`).
  - `ReactCommon/jsiexecutor/jsireact/JSIExecutor.cpp` — bundle evaluation, module.method dispatch (`callFunction`, `invokeCallback`), draining microtasks (`performMicrotaskCheckpoint`), flushing native calls.

  Runtime Scheduler (New Architecture & React scheduling)

  - `ReactCommon/react/renderer/runtimescheduler/RuntimeScheduler.cpp` — task queue loop (`scheduleTask`, `startWorkLoop`, `callExpiredTasks`).
  - `ReactCommon/react/renderer/runtimescheduler/Task.cpp` — wraps each scheduled `jsi::Function` and runs it; key spot for naming/tracing.
  - `ReactCommon/react/renderer/runtimescheduler/RuntimeScheduler.h` — API surface and atomic flags for yielding/sync execution.
  - `ReactCommon/react/renderer/runtimescheduler/RuntimeSchedulerBinding.cpp` / `.h` — installs `nativeRuntimeScheduler` host object for JS scheduling primitives.
  - `ReactCommon/react/renderer/runtimescheduler/RuntimeSchedulerCallInvoker.cpp` — funnels native requests through the scheduler.

  JNI Holders for Scheduler/Executor

  - `ReactAndroid/src/main/jni/react/jni/JRuntimeScheduler.cpp` / `.h` — Java holder around the native `RuntimeScheduler`.
  - `ReactAndroid/src/main/jni/react/jni/JRuntimeExecutor.cpp` / `.h` — exposes `RuntimeExecutor` back to Java.

  Supporting Types & Interfaces

  - `ReactCommon/cxxreact/MessageQueueThread.h` — abstract C++ interface implemented by `JMessageQueueThread`.
  - `ReactCommon/cxxreact/NativeToJsBridge.h`, `ReactCommon/cxxreact/Instance.h` — declarations for the bridge work queue interactions.
  - `ReactCommon/runtimeexecutor/ReactCommon/RuntimeExecutor.h` — helper wrappers for synchronous/asynchronous execution on the runtime.


## Hermes codebase

> Hermes Runtime Glue

  - `API/hermes/hermes.cpp:1358` (`HermesRuntimeImpl::evaluatePreparedJavaScript`) – entry point for running RN’s JS bundle under Hermes.
  - `API/hermes/hermes.cpp:1415` (`HermesRuntimeImpl::drainMicrotasks`) – host-facing microtask drain; delegates to the VM job queue.
  - `API/hermes/hermes.cpp:1372` (`HermesRuntimeImpl::prepareJavaScriptWithSourceMap`) – compilation path if you need to follow how RN loads bundles.

  VM Job Queue & Execution

  - `include/hermes/VM/Runtime-inline.h:19` (`Runtime::enqueueJob`) – queues Promise/microtask thunks.
  - `lib/VM/Runtime.cpp:1662` (`Runtime::drainJobs`) – FIFO execution of queued jobs; uses `Callable::executeCall0` to run the continuation.
  - `include/hermes/VM/Runtime.h:855` and `include/hermes/VM/VMExperiments.h:33` – experiment flag gate (`experiments::JobQueue`) that enables the engine-managed microtask queue RN relies on.

  HermesInternal Hooks Exposed to JS

  - `lib/VM/JSLib/HermesInternal.cpp:599` (`hermesInternalHasPromise`) – lets internal bytecode check whether `Promise` support is on.
  - `lib/VM/JSLib/HermesInternal.cpp:605` (`hermesInternalUseEngineQueue`) – drives the `useEngineQueue` flag in the `Promise` polyfill.
  - `lib/VM/JSLib/HermesInternal.cpp:609` (`hermesInternalEnqueueJob`) – JS-visible hook that funnels `Promise` reactions into `Runtime::enqueueJob`.
  - `lib/VM/JSLib/HermesInternal.cpp:623` (`hermesInternalDrainJobs`) – optional JS-side drain used by dev tooling/tests.

  Promise & Async Internal Bytecode

  - `lib/InternalBytecode/01-Promise.js:70` (`handleResolved`/`finale`) – where fulfilled/rejected reactions call `HermesInternal.enqueueJob` (or `setImmediate` when the job queue is disabled).
  - `lib/InternalBytecode/01-Promise.js:214` onwards – core `Promise` resolution logic, useful for tracing how continuations are produced.
  - `lib/InternalBytecode/02-AsyncFn.js:11` (`spawn`) – `async`/`await` lowering; chains `Promise.resolve(...).then(...)`, which ultimately schedules the post-await microtasks.
  - `lib/InternalBytecode/02-AsyncFn.js:24` (`step`) – illustrates how generator steps are wrapped so that each `await` yields a promise and resumes via the `Promise` job queue.

  Configuration & Capability Checks

  - `lib/VM/Runtime.cpp:923` – guards preventing async bytecode when `Promises` are disabled (ties RN requirements to Hermes runtime flags).
  - `lib/ConsoleHost/ConsoleHost.cpp:217` (optional) – example of enabling the engine microtask queue in host programs, mirroring RN’s setup.

  Studying these files end-to-end gives the full picture: RN invokes Hermes via `HermesRuntimeImpl`, Hermes schedules async work through `Runtime::enqueueJob`/`drainJobs`, and the `Promise`/`async` bytecode (plus the `HermesInternal` shims) is what
  actually creates and runs the microtasks that cover `await` continuations and `Promise.then` handlers.
