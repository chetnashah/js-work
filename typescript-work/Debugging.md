## Explain all file/import graph traversed by tsc

```sh
tsc --explainFiles
```

## Trace module resolution

```sh
tsc --traceModuleResolution
```

## Show overall config

```sh
tsc --showConfig
tsc --showConfig -p tsconfig.json
```

## enable ts server logging

In `settings.json` add following:

```json
"typescript.tsserver.log": "verbose",
```
