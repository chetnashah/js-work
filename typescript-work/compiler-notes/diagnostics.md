
## Depends on program

Refer [here](./createProgram.md) for how to create a program.

```ts
const result = program.emit();

const diagnostics = ts
  .getPreEmitDiagnostics(program)
  .concat(result.diagnostics);

  console.log('diagnostics = ', diagnostics);

diagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
        const { line, character } = ts.getLineAndCharacterOfPosition(
          diagnostic.file,
          diagnostic.start
        );
        const message = ts.flattenDiagnosticMessageText(
          diagnostic.messageText,
          "\n"
        );
        console.log(
          `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
        );
      } else {
        console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
      }
    });

```