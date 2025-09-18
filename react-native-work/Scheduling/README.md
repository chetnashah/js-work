
## React Native


  Bottom line


  - `ReactAndroid/src/main/java/com/facebook/react/bridge/queue/MessageQueueThreadImpl.java:24` — creation, posting, quitting of the Android JS Looper.
  - `ReactAndroid/src/main/java/com/facebook/react/bridge/queue/MessageQueueThreadHandler.java:15` — Handler wrapper catching exceptions on the JS thread.
  - `ReactAndroid/src/main/java/com/facebook/react/bridge/queue/ReactQueueConfigurationImpl.java:14` — selection and teardown of JS/native/UI queue threads.
  - `ReactAndroid/src/main/jni/react/jni/JMessageQueueThread.cpp:34` & `JMessageQueueThread.h:24` — JNI bridge exposing the Java MessageQueueThread to C++.
  - `ReactCommon/react/renderer/runtimescheduler/RuntimeSchedulerCallInvoker.cpp:18` — native callers funnelling work through the scheduler.

  RuntimeScheduler Setup (JNI)
  Promise / Async Context (Hermes)

  - `ReactCommon/jsiexecutor/jsireact/JSIExecutor.cpp:207` (again) — only place RN has control during microtask execution; the hook for tracing post-await.
  - Hermes promise jobs are internal, so examine Hermes sources if deeper instrumentation is required (`ReactCommon/hermes/...` runtime).

  Native Module Example (fetch)

  - `Libraries/Network/fetch.js:1` — JS shim calling native networking.
  - `ReactAndroid/src/main/java/com/facebook/react/modules/network/NetworkingModule.java:55` — native module handling fetch requests.

  Studying those functions end-to-end reveals how React Native schedules JS work, how async continuations are run, and where to insert Perfetto traces for both synchronous execution and promise/await resumptions.

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

  - `lib/VM/JSLib/HermesInternal.cpp:599` (`hermesInternalHasPromise`) – lets internal bytecode check whether Promise support is on.
  - `lib/VM/JSLib/HermesInternal.cpp:605` (`hermesInternalUseEngineQueue`) – drives the `useEngineQueue` flag in the Promise polyfill.
  - `lib/VM/JSLib/HermesInternal.cpp:609` (`hermesInternalEnqueueJob`) – JS-visible hook that funnels Promise reactions into `Runtime::enqueueJob`.
  - `lib/VM/JSLib/HermesInternal.cpp:623` (`hermesInternalDrainJobs`) – optional JS-side drain used by dev tooling/tests.

  Promise & Async Internal Bytecode

  - `lib/InternalBytecode/01-Promise.js:70` (`handleResolved/finale`) – where fulfilled/rejected reactions call `HermesInternal.enqueueJob` (or `setImmediate` when the job queue is disabled).
  - `lib/InternalBytecode/01-Promise.js:214` onwards – core Promise resolution logic, useful for tracing how continuations are produced.
  - `lib/InternalBytecode/02-AsyncFn.js:11` (`spawn`) – async/await lowering; chains `Promise.resolve(...).then(...)`, which ultimately schedules the post-await microtasks.
  - `lib/InternalBytecode/02-AsyncFn.js:24` (`step`) – illustrates how generator steps are wrapped so that each await yields a promise and resumes via the Promise job queue.

  Configuration & Capability Checks

  - `lib/VM/Runtime.cpp:923` – guards preventing async bytecode when Promises are disabled (ties RN requirements to Hermes runtime flags).
  - `lib/ConsoleHost/ConsoleHost.cpp:217` (optional) – example of enabling the engine microtask queue in host programs, mirroring RN’s setup.

  Studying these files end-to-end gives the full picture: RN invokes Hermes via `HermesRuntimeImpl`, Hermes schedules async work through `Runtime::enqueueJob/drainJobs`, and the Promise/async bytecode (plus the `HermesInternal` shims) is what
  actually creates and runs the microtasks that cover await continuations and `Promise.then` handlers.
