## Helps determine the kind of container and whether it has locals etc.

e.g.

```ts
function getContainerFlags(node: Node): ContainerFlags {
  switch (node.kind) {
    case SyntaxKind.ClassExpression:
    case SyntaxKind.ClassDeclaration:
    case SyntaxKind.InterfaceDeclaration:
    case SyntaxKind.EnumDeclaration:
    case SyntaxKind.TypeLiteral:
    case SyntaxKind.ObjectLiteralExpression:
      return ContainerFlags.IsContainer;

    case SyntaxKind.CallSignature:
    case SyntaxKind.ConstructSignature:
    case SyntaxKind.IndexSignature:
    case SyntaxKind.MethodDeclaration:
    case SyntaxKind.MethodSignature:
    case SyntaxKind.FunctionDeclaration:
    case SyntaxKind.Constructor:
    case SyntaxKind.GetAccessor:
    case SyntaxKind.SetAccessor:
    case SyntaxKind.FunctionType:
    case SyntaxKind.ConstructorType:
    case SyntaxKind.FunctionExpression:
    case SyntaxKind.ArrowFunction:
    case SyntaxKind.ModuleDeclaration:
    case SyntaxKind.SourceFile:
    case SyntaxKind.TypeAliasDeclaration:
      return ContainerFlags.IsContainerWithLocals;

    case SyntaxKind.CatchClause:
    case SyntaxKind.ForStatement:
    case SyntaxKind.ForInStatement:
    case SyntaxKind.ForOfStatement:
    case SyntaxKind.CaseBlock:
      return ContainerFlags.IsBlockScopedContainer;

    case SyntaxKind.Block:
      // do not treat blocks directly inside a function as a block-scoped-container.
      // Locals that reside in this block should go to the function locals. Otherwise 'x'
      // would not appear to be a redeclaration of a block scoped local in the following
      // example:
      //
      //      function foo() {
      //          var x;
      //          let x;
      //      }
      //
      // If we placed 'var x' into the function locals and 'let x' into the locals of
      // the block, then there would be no collision.
      //
      // By not creating a new block-scoped-container here, we ensure that both 'var x'
      // and 'let x' go into the Function-container's locals, and we do get a collision
      // conflict.
      return isFunctionLike(node.parent)
        ? ContainerFlags.None
        : ContainerFlags.IsBlockScopedContainer;
  }

  return ContainerFlags.None;
}
```
