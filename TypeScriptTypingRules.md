Use //@ts-check at top of a .js file in vs code to get started fast.

Optional JSDoc types strenghten type checking.

Make a .ts file and tsc (typescript compiler) will convert
it to a .js file with types stripped out.

generate a tsconfig.json at the root of your project using
```tsc --init``

tsc can kind of work like webpack because:
input files, outputDir etc are specified in tsconfig.json
which is read by tsc on invocation. 