## `ts.Node`

A node is part of a `SourceFile`

View nodes via https://ts-ast-viewer.com/#code/KYDwDg9gTgLgBAMwK4DsDGMCWEVwIYBGaAFAJRwDeAUHLXFQL5A
or
astExplorer.net

## Shape

```ts
    export interface Node extends TextRange {
        kind: SyntaxKind;
        flags: NodeFlags;
        decorators?: NodeArray<Decorator>;
        modifiers?: ModifiersArray;
        parent: Node;
    }
```

## Kind property of a node is a SyntaxKind enum

`node.kind` prints the kind of node.

### SyntaxKind enum represents the kind of node

https://github.com/microsoft/TypeScript/blob/7c14aff09383f3814d7aae1406b5b2707b72b479/lib/typescript.d.ts#L78

`node.kind` returns an int enum e.g. 241.

e.g. 
```
        VariableDeclaration = 241,
        VariableDeclarationList = 242,
        FunctionDeclaration = 243,
        ClassDeclaration = 244,
```

## Modifiers on a Node

Basically usage of `async`, `const`, `export`, `public`, `private`, `protected`, `readonly`, `static` etc. on a Node.

```ts
export type Modifier = Token<SyntaxKind.AbstractKeyword> | Token<SyntaxKind.AsyncKeyword> | Token<SyntaxKind.ConstKeyword> | Token<SyntaxKind.DeclareKeyword> | Token<SyntaxKind.DefaultKeyword> | Token<SyntaxKind.ExportKeyword> | Token<SyntaxKind.PublicKeyword> | Token<SyntaxKind.PrivateKeyword> | Token<SyntaxKind.ProtectedKeyword> | Token<SyntaxKind.ReadonlyKeyword> | Token<SyntaxKind.StaticKeyword>;
```

## Checking for node kinds

```ts
if (ts.isFunctionDeclaration(childNode)) {
  // ...
}

if (ts.isVariableStatement(childNode)) {
  // ...
}
```

## Getting properties of a node

https://astexplorer.net/

## Code to check for all exported functions

```ts
const rootFileNames = program.getRootFileNames();
for(const fileName of rootFileNames) {
    console.log(fileName);
    const sourceFile = program.getSourceFile(fileName);
    sourceFile.forEachChild((node) => {
        if(ts.isFunctionDeclaration(node)) {
            const hasExportSpecifier = node.modifiers?.some((modifier) => {
                return modifier.kind === ts.SyntaxKind.ExportKeyword;
            });
            if(hasExportSpecifier) {
                console.log('exporeted', node.name.text);
            }
        }
    })
}
```