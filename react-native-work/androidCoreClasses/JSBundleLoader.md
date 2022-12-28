

## JSBundleLoaderDelegate

Interface for delegating bundle loading
```java
public interface JSBundleLoaderDelegate {
    void loadScriptFromAssets(AssetManager var1, String var2, boolean var3);

    void loadScriptFromFile(String var1, String var2, boolean var3);

    void loadSplitBundleFromFile(String var1, String var2);

    void setSourceURLs(String var1, String var2);
}
```

**Known implementers are: `CatalystInstanceImpl`** which delegates script loading etc to jni.

```java
//CatalystInstanceImpl.java
public class CatalystInstanceImpl implements CatalystInstance {
//...
    public void loadScriptFromAssets(AssetManager assetManager, String assetURL, boolean loadSynchronously) {
        this.mSourceURL = assetURL;
        this.jniLoadScriptFromAssets(assetManager, assetURL, loadSynchronously);
    }

    public void loadScriptFromFile(String fileName, String sourceURL, boolean loadSynchronously) {
        this.mSourceURL = sourceURL;
        this.jniLoadScriptFromFile(fileName, sourceURL, loadSynchronously);
    }

    public void loadSplitBundleFromFile(String fileName, String sourceURL) {
        this.jniLoadScriptFromFile(fileName, sourceURL, false);
    }

    private native void jniSetSourceURL(String var1);

    private native void jniRegisterSegment(int var1, String var2);

    private native void jniLoadScriptFromAssets(AssetManager var1, String var2, boolean var3);

    private native void jniLoadScriptFromFile(String var1, String var2, boolean var3);

    // ...
}
```

## JSBUndleLoader: ABstract class with factory methods to create JSBundleLoaders

```java
public abstract class JSBundleLoader {
    public JSBundleLoader() {
    }

    public static JSBundleLoader createAssetLoader(final Context context, final String assetUrl, final boolean loadSynchronously) {
        return new JSBundleLoader() {
            public String loadScript(JSBundleLoaderDelegate delegate) {
                delegate.loadScriptFromAssets(context.getAssets(), assetUrl, loadSynchronously);
                return assetUrl;
            }
        };
    }

    public static JSBundleLoader createFileLoader(String fileName) {
        return createFileLoader(fileName, fileName, false);
    }

    public static JSBundleLoader createFileLoader(final String fileName, final String assetUrl, final boolean loadSynchronously) {
        return new JSBundleLoader() {
            public String loadScript(JSBundleLoaderDelegate delegate) {
                delegate.loadScriptFromFile(fileName, assetUrl, loadSynchronously);
                return fileName;
            }
        };
    }

    public static JSBundleLoader createCachedBundleFromNetworkLoader(final String sourceURL, final String cachedFileLocation) {
        return new JSBundleLoader() {
            public String loadScript(JSBundleLoaderDelegate delegate) {
                try {
                    delegate.loadScriptFromFile(cachedFileLocation, sourceURL, false);
                    return sourceURL;
                } catch (Exception var3) {
                    throw DebugServerException.makeGeneric(sourceURL, var3.getMessage(), var3);
                }
            }
        };
    }

    public static JSBundleLoader createCachedSplitBundleFromNetworkLoader(final String sourceURL, final String cachedFileLocation) {
        return new JSBundleLoader() {
            public String loadScript(JSBundleLoaderDelegate delegate) {
                try {
                    delegate.loadSplitBundleFromFile(cachedFileLocation, sourceURL);
                    return sourceURL;
                } catch (Exception var3) {
                    throw DebugServerException.makeGeneric(sourceURL, var3.getMessage(), var3);
                }
            }
        };
    }

    public static JSBundleLoader createRemoteDebuggerBundleLoader(final String proxySourceURL, final String realSourceURL) {
        return new JSBundleLoader() {
            public String loadScript(JSBundleLoaderDelegate delegate) {
                delegate.setSourceURLs(realSourceURL, proxySourceURL);
                return realSourceURL;
            }
        };
    }

    public abstract String loadScript(JSBundleLoaderDelegate var1);
}
```

