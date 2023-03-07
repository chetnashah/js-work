

## How JS bundle is loaded (Release mode)

1. first preference go to JS bundle file if it it's absolute path is returned from `getJSBUndleFile()`
2. If above function returns `null`,  then js asset file name that is returned from `getBundleAssetFilename` - and the asset file is located in `android/app/src/main/assets/index.android.bundle` is picked for loading.

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

