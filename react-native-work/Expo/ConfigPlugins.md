

## What are plugins?

**They are synchronous functions that accept an ExpoConfig and return an modified ExpoConfig**

* Naming - `with<Plugin functionality>`
* return value should be serializable
* second arg can be passed to plugin to configure it
* `plugins` are always invoked when the config is read by `expo/config` method `getConfig`.
* However `mods` are only invoked during `syncing` phase of `npx expo prebuild`.



