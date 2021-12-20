

### What is tsconfig.json

The presence of a `tsconfig.json` file in a directory indicates that the directory is the root of a TypeScript project. The tsconfig.json file specifies the root files and the compiler options required to compile the project.


### top level fields

`files`,`extends`,`include`,`exclude` and `references`, `compilerOptions`

### files

Specifies an allowlist of files to include in the program.
This is useful when you only have a small number of files and don’t need to use a glob to reference many files. If you need that then use `include`.

### include

Specifies an array of filenames or patterns to include in the program. These filenames are resolved relative to the directory containing the tsconfig.json file.

```
{
  "include": ["src/**/*", "tests/**/*"]
}
```

```
.
├── scripts                ⨯
│   ├── lint.ts            ⨯
│   ├── update_deps.ts     ⨯
│   └── utils.ts           ⨯
├── src                    ✓
│   ├── client             ✓
│   │    ├── index.ts      ✓
│   │    └── utils.ts      ✓
│   ├── server             ✓
│   │    └── index.ts      ✓
├── tests                  ✓
│   ├── app.test.ts        ✓
│   ├── utils.ts           ✓
│   └── tests.d.ts         ✓
├── package.json
├── tsconfig.json
└── yarn.lock
```

### rootDir

The longest common path of all non-declaration input files
When TypeScript compiles files, it keeps the same directory structure in the output directory as exists in the input directory.

```
MyProj
├── tsconfig.json
├── core
│   ├── a.ts
│   ├── b.ts
│   ├── sub
│   │   ├── c.ts
├── types.d.ts
```
Inferred `rootDir` = `core`

If `outdir` was `dist`
```
MyProj
├── dist
│   ├── a.js
│   ├── b.js
│   ├── sub
│   │   ├── c.js
```

### outDir

If specified, `.js` (as well as `.d.ts`, `.js.map`, etc.) files will be emitted into this directory. The directory structure of the original source files is preserved

```
{
  "compilerOptions": {
    "outDir": "dist"
  }
}
```

```
$ tsc
example
├── dist
│   └── index.js
├── index.ts
└── tsconfig.json
```

### Typescript build mode `tsc -b` or `tsc --build`

This is effectively a new entry point for tsc that behaves more like a build orchestrator than a simple compiler.

Running tsc --build (tsc -b for short) will do the following:

1. Find all referenced projects
2. Detect if they are up-to-date
3. Build out-of-date projects in the correct order
4. `tsc -b` effectively acts as if noEmitOnError is enabled for all projects

### configuration file inheritance

With more tsconfig.json files, you’ll usually want to use Configuration file inheritance to centralize your common compiler options

### Project references

allow you to structure your TypeScript programs into smaller pieces.

`tsconfig.json` files have a new top-level property, references. It’s an array of objects that specifies projects to reference:

The `path` property of each reference can point to a directory containing a `tsconfig.json` file, or to the config file itself

When you reference a project, new things happen:

1. Importing modules from a referenced project will instead load its output declaration file (.d.ts)
2. If the referenced project produces an outFile, the output file .d.ts file’s declarations will be visible in this project
3. Build mode (see below) will automatically build the referenced project if needed


tsconfig.json
```json
{
    "compilerOptions": {
        // The usual
    },
    "references": [
        { "path": "../src" }
    ]
}
```
Another good practice is to have a “solution” tsconfig.json file that simply has references to all of your leaf-node projects and sets files to an empty array (otherwise the solution file will cause double compilation of files). Note that starting with 3.0, it is no longer an error to have an empty files array if you have at least one reference in a tsconfig.json file.


### composite

`composite`
Referenced projects must have the new `composite` setting enabled. This setting is needed to ensure TypeScript can quickly determine where to find the outputs of the referenced project.

Enabling the composite flag changes a few things:

1. The `rootDir` setting, if not explicitly set, defaults to the directory containing the tsconfig file.
2. All implementation files must be matched by an `include` pattern or listed in the `files` array. If this constraint is violated, tsc will inform you which files weren’t specified
3. declaration must be turned on