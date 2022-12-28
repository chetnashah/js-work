

## Interface for listening to devserver updates

Implemented by an anonymous class within ReactInstanceManager to listen to bundle/devserver updates.

```java
public interface ReactInstanceDevHelper {
    // Request react instance recreation with JS debugging enabled
    void onReloadWithJSDebugger(JavaJSExecutor.Factory proxyExecutorFactory);

    // NotifyReactInstance manager about new JS bundle version downloaded from dev server
    void onJSBundleLoadedFromServer();

    // request to toggle react element inspector
    void toggleElementInspector();

    // get currentActivity
    Activity getCurrentActivity();

    View createRootView(String appKey);

    void destroyRootView(View rootView);
}
```