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

