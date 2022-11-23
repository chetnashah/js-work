
## Native code generation

Native code is generated based on following factors:
1. expo config (app.json)
2. Arguments passed to `npx expo prebuild` command
3. **Version of expo installed**
4. `Autolinking`


## Running pre build

`npx expo prebuild` will generate `ios/` and `android/` folder.
Modifying generated dirs is not recommended since we can risk losing changes when we run `npx expo prebuild --clean`.
Instead of doing that, one should write [Config Plugins](ConfigPlugins.md)

