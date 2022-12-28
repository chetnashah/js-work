

## implements DevSupportManager interface

But it is still not a concrete class, `BridgeDevSupportManager` is a real concrete class.


## Important methods like `void handleReloadJS();` are abstract

Taken care of by `BridgeDevSupportManager` [here](BridgeDevSupportManager.md)


## creates/owns reference to DevServerHelper via `new`

See [devserverhelper](DevServerHelper.md)

## Creates/owns reference to DevSettings via `DevSettings mSettings = new DevInternalSettings`

See [DevSettings](DevSettings.md)

## Manages Redbox

## Manages a bundle downloadlistener

## Imp method: reloadJSFromServer

### ReactInstancemanager gets a callback via ReactInstanceDevHelper whenever bundle reloads

ReactInstancemanager will reload newJS from server via following method:
```java
// ReactInstanceManager.java
// callback from DevSupportManagerBase
    private void onJSBundleLoadedFromServer() {
        FLog.d("ReactNative", "ReactInstanceManager.onJSBundleLoadedFromServer()");
        JSBundleLoader bundleLoader = JSBundleLoader.createCachedBundleFromNetworkLoader(this.mDevSupportManager.getSourceUrl(), this.mDevSupportManager.getDownloadedJSBundleFile());
        this.recreateReactContextInBackground(this.mJavaScriptExecutorFactory, bundleLoader);
    }
```