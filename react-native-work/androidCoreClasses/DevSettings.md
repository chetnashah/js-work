

## Interface for developer settings of react-native

```java
public interface DeveloperSettings {
    boolean isFpsDebugEnabled();

    boolean isAnimationFpsDebugEnabled();

    boolean isJSDevModeEnabled();

    boolean isJSMinifyEnabled();

    boolean isElementInspectorEnabled();

    boolean isDeviceDebugEnabled();

    boolean isRemoteJSDebugEnabled();

    void setRemoteJSDebugEnabled(boolean var1);

    boolean isStartSamplingProfilerOnInit();

    void addMenuItem(String var1);
}
```

## DevInternalSettings implements DeveloperSettings

Backed by sharedpreferences.
Contains all the common settings like:
1. fps debug
2. remotejs debug
3. sample profiling
4. inspector debug
5. 

```java
public class DevInternalSettings implements DeveloperSettings, OnSharedPreferenceChangeListener {
    private static final String PREFS_FPS_DEBUG_KEY = "fps_debug";
    private static final String PREFS_JS_DEV_MODE_DEBUG_KEY = "js_dev_mode_debug";
    private static final String PREFS_JS_MINIFY_DEBUG_KEY = "js_minify_debug";
    private static final String PREFS_ANIMATIONS_DEBUG_KEY = "animations_debug";
    private static final String PREFS_INSPECTOR_DEBUG_KEY = "inspector_debug";
    private static final String PREFS_HOT_MODULE_REPLACEMENT_KEY = "hot_module_replacement";
    private static final String PREFS_REMOTE_JS_DEBUG_KEY = "remote_js_debug";
    private static final String PREFS_START_SAMPLING_PROFILER_ON_INIT = "start_sampling_profiler_on_init";
    private final SharedPreferences mPreferences;
    private final DevInternalSettings.Listener mListener;
    private final PackagerConnectionSettings mPackagerConnectionSettings;

    public DevInternalSettings(Context applicationContext, DevInternalSettings.Listener listener) {
        this.mListener = listener;
        this.mPreferences = PreferenceManager.getDefaultSharedPreferences(applicationContext);
        this.mPreferences.registerOnSharedPreferenceChangeListener(this);
        this.mPackagerConnectionSettings = new PackagerConnectionSettings(applicationContext);
    }

    public PackagerConnectionSettings getPackagerConnectionSettings() {
        return this.mPackagerConnectionSettings;
    }

    public boolean isFpsDebugEnabled() {
        return this.mPreferences.getBoolean("fps_debug", false);
    }

    public void setFpsDebugEnabled(boolean enabled) {
        this.mPreferences.edit().putBoolean("fps_debug", enabled).apply();
    }

    public boolean isAnimationFpsDebugEnabled() {
        return this.mPreferences.getBoolean("animations_debug", false);
    }

    public boolean isJSDevModeEnabled() {
        return this.mPreferences.getBoolean("js_dev_mode_debug", true);
    }

    public void setJSDevModeEnabled(boolean value) {
        this.mPreferences.edit().putBoolean("js_dev_mode_debug", value).apply();
    }

    public boolean isJSMinifyEnabled() {
        return this.mPreferences.getBoolean("js_minify_debug", false);
    }

    public void onSharedPreferenceChanged(SharedPreferences sharedPreferences, String key) {
        if (this.mListener != null && ("fps_debug".equals(key) || "js_dev_mode_debug".equals(key) || "start_sampling_profiler_on_init".equals(key) || "js_minify_debug".equals(key))) {
            this.mListener.onInternalSettingsChanged();
        }

    }

    public boolean isHotModuleReplacementEnabled() {
        return this.mPreferences.getBoolean("hot_module_replacement", true);
    }

    public void setHotModuleReplacementEnabled(boolean enabled) {
        this.mPreferences.edit().putBoolean("hot_module_replacement", enabled).apply();
    }

    public boolean isElementInspectorEnabled() {
        return this.mPreferences.getBoolean("inspector_debug", false);
    }

    public void setElementInspectorEnabled(boolean enabled) {
        this.mPreferences.edit().putBoolean("inspector_debug", enabled).apply();
    }

    public boolean isDeviceDebugEnabled() {
        return false;
    }

    public boolean isRemoteJSDebugEnabled() {
        return this.mPreferences.getBoolean("remote_js_debug", false);
    }

    public void setRemoteJSDebugEnabled(boolean remoteJSDebugEnabled) {
        this.mPreferences.edit().putBoolean("remote_js_debug", remoteJSDebugEnabled).apply();
    }

    public boolean isStartSamplingProfilerOnInit() {
        return this.mPreferences.getBoolean("start_sampling_profiler_on_init", false);
    }

    public void addMenuItem(String title) {
    }

    public interface Listener {
        void onInternalSettingsChanged();
    }
}

```