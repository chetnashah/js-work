

## How JS bundle is loaded (Release mode)

1. first preference go to JS bundle file if it it's absolute path is returned from `getJSBUndleFile()`
2. If above function returns `null`,  then js asset file name that is returned from `getBundleAssetFilename` - and the asset file is located in `android/app/src/main/assets/index.android.bundle` is picked for loading.

## Testing out changes in metro repo:

run `yarn test yarn run jest -- packages/metro/src/integration_tests/__tests__/build-test.js` where `integration_tests` has a example project that is used.

## Resolve step

Resolve would be called like a `resolve(context, modulename,platform)` and returns either `{type: 'sourceFile',filePath: string,}` or `{type: 'assetFiles',filePaths: AssetFileResolution,}`. 

https://facebook.github.io/metro/docs/resolution/#algorithm

It typically would handle one of three cases:
1. relative import
2. absolute import
3. package import

**Note** - `context.originmodulepath` represents the module that is tryint to resolve the current module.

### ResolverMainfields

**When using React Native, `resolverMainFields` defaults to `['react-native', 'browser', 'main']`.**. CLI holds some of this override behavior at https://github.com/react-native-community/cli/tree/main/packages/cli-plugin-metro/src/tools

The list of fields in `package.json` that Metro will treat as describing a package's entry points. The default is `['browser', 'main']`, so the resolver will use the browser field if it exists and main otherwise. All this logic is provided via `context.redirectModulePath` implementation present in `PackageResolve.js`.

Metro's default resolver processes each of these fields according to the browser field spec, including the ability to replace and ignore specific files.


### Package entry point resolution algorithm

* Attempt to resolve a module path as an npm package entry point, or resolve as
* a file if no `package.json` file is present.

* Implements legacy (non-exports) package resolution behaviour based on the
* [browser field spec](https://github.com/defunctzombie/package-browser-field-spec):
* Looks for a "main" entry point based on `context.mainFields`.
* Considers any "main" subpaths after expending source and platform-specific
*     extensions, e.g. `./lib/index` -> `./lib/index.ios.js`.
* Falls back to a child `index.js` file, e.g. `./lib` -> `./lib/index.js`.


## DependencyGraph and ModuleResolution make use of `resolve` functionality

```
resolveFile (resolve.js:406)
resolveModulePath (resolve.js:185)
resolvePackage (resolve.js:323)
resolve (resolve.js:154)
resolveDependency (ModuleResolution.js:145)
resolveDependency (DependencyGraph.js:354)
(anonymous) (transformHelpers.js:211)
_resolveDependencies (Graph.js:577)
_processModule (Graph.js:325)
processTicksAndRejections (node:internal/process/task_queues:96)
await in processTicksAndRejections (async)
_traverseDependenciesForSingleFile (Graph.js:307)
(anonymous) (Graph.js:285)
initialTraverseDependencies (Graph.js:284)
_getChangedDependencies (DeltaCalculator.js:273)
getDelta (DeltaCalculator.js:127)
buildGraph (DeltaBundler.js:90)
buildGraphForEntries (IncrementalBundler.js:116)
processTicksAndRejections (node:internal/process/task_queues:96)
await in processTicksAndRejections (async)
buildGraph (IncrementalBundler.js:202)
build (Server.js:200)
buildBundle (bundle.flow.js:29)
exports.runBuild (index.flow.js:433)
await in exports.runBuild (async)
```

## How react-native-community CLI starts metro server?

This is implementation of `react-native start` command.

https://github.com/react-native-community/cli/blob/main/packages/cli-plugin-metro/src/commands/start/runServer.ts#L96


`@react-native-community/cli-plugin-metro` adds its own config on top of default config: https://github.com/react-native-community/cli/blob/main/packages/cli-plugin-metro/src/tools/loadMetroConfig.ts#L73
```js
export const getDefaultConfig = (ctx: ConfigLoadingContext): MetroConfig => {
  const outOfTreePlatforms = Object.keys(ctx.platforms).filter(
    (platform) => ctx.platforms[platform].npmPackageName,
  );

  return {
    resolver: {
      resolveRequest:
        outOfTreePlatforms.length === 0
          ? undefined
          : reactNativePlatformResolver(
              outOfTreePlatforms.reduce<{[platform: string]: string}>(
                (result, platform) => {
                  result[platform] = ctx.platforms[platform].npmPackageName!;
                  return result;
                },
                {},
              ),
            ),
      resolverMainFields: ['react-native', 'browser', 'main'],
      platforms: [...Object.keys(ctx.platforms), 'native'],
    },
    serializer: {
      // We can include multiple copies of InitializeCore here because metro will
      // only add ones that are already part of the bundle
      getModulesRunBeforeMainModule: () => [
        require.resolve(
          path.join(ctx.reactNativePath, 'Libraries/Core/InitializeCore'),
        ),
        ...outOfTreePlatforms.map((platform) =>
          require.resolve(
            `${ctx.platforms[platform]
              .npmPackageName!}/Libraries/Core/InitializeCore`,
          ),
        ),
      ],
      getPolyfills: () =>
        require(path.join(ctx.reactNativePath, 'rn-get-polyfills'))(),
    },
    server: {
      port: Number(process.env.RCT_METRO_PORT) || 8081,
    },
    symbolicator: {
      customizeFrame: (frame: {file: string | null}) => {
        const collapse = Boolean(
          frame.file && INTERNAL_CALLSITES_REGEX.test(frame.file),
        );
        return {collapse};
      },
    },
    transformer: {
      allowOptionalDependencies: true,
      babelTransformerPath: require.resolve(
        'metro-react-native-babel-transformer',
      ),
      assetRegistryPath: 'react-native/Libraries/Image/AssetRegistry',
      asyncRequireModulePath: require.resolve(
        'metro-runtime/src/modules/asyncRequire',
      ),
    },
    watchFolders: [],
  };
};
```


### ModuleDefinition

```ts
type ModuleID = number;
type Exports = any;
type RequireFn = (id: ModuleId | VerboseModuleNameForDev) => Exports
type Module = {
    id: ModuleID,
    exports: any,
    hot: hotmoduleReloadingData
}
type ModuleDefinition = {
    dependencyMap: DependencyMap,
    error: any,
    factory: FactoryFn,
    hot: hotmodulereloadingdata,
    importedAll: any,
    importedDefault: any,
    isInitialized: boolean,
    path: string,
    publicModule: Module,
    verboseName: string
}

type DependencyMap = Array<ModuleID>;

type FactoryFn = (
    global: Object,
    require: RequireFn,
    metroImportDefault: RequireFn,
    metroImportAll: RequireFn,
    moduleObject: {exports: {...}, ...},// triple dots means inexact/unknown object type
    exports: {...},
    dependencyMap: DependencyMap
)
```

### require

require polyfill in metro code that wraps via

1. `guardedLoadModule(moduleId, moduleDefinition)`
2. `loadModuleImplementation(moduleId, module)`

