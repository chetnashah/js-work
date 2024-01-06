
## Get a reference to the typechecker from program

```ts
// Initialize a type checker for the program
const checker = program.getTypeChecker();
```

## Get signature of a function/node

```ts
    const signature = checker.getSignatureFromDeclaration(node);
```

Signature declaration is defined as:

```ts
type SignatureDeclaration = CallSignatureDeclaration | ConstructSignatureDeclaration | MethodSignature | IndexSignatureDeclaration | FunctionTypeNode | ConstructorTypeNode | JSDocFunctionType | FunctionDeclaration | MethodDeclaration | ConstructorDeclaration | AccessorDeclaration | FunctionExpression | ArrowFunction;
```

## Utility methods to work with a Signature

```ts
    signatureToString(signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind): string;
    typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
    symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): string;
    typePredicateToString(predicate: TypePredicate, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
```



## Example: print all function signatures

```ts
const typechecker = program.getTypeChecker();
const rootFileNames = program.getRootFileNames();
for(const fileName of rootFileNames) {
    console.log(fileName);
    const sourceFile = program.getSourceFile(fileName);
    sourceFile.forEachChild((node) => {
        if(ts.isFunctionDeclaration(node)) {
            const signature = typechecker.getSignatureFromDeclaration(node);
            console.log('signature->', typechecker.signatureToString(signature));
        }
    })
}

// output:
// fun.ts
// signature-> (...numbers: number[]): number
```