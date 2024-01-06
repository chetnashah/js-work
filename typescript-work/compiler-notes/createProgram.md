
The API exposes a method called `createProgram` on the ts namespace which creates a compiler host. 

This method takes 
1. a list of filenames and 
2. some compiler options, 

and then **returns a program.** 

Example snippet:
```ts
import ts from 'typescript';
const program = ts.createProgram(fileNames, compilerOptions);
```
With this program, we can call emit() for it to compile all the filenames we provided.

```ts
const result = program.emit();
```