
## Visitor pattern via recursion

```ts
/**
 * @param {ts.IfStatement} node
 */
function lintIfStatement(node) {
  lintNode(node.expression);
  lintBlock(node.thenStatement);
  if (node.elseStatement) {
    lintBlock(node.elseStatement);
  }
}

/**
 * @param {ts.ReturnStatement} node
 */
function lintReturnStatement(node) {
  if (node.expression) {
    lintNode(node.expression);
  }
}

/**
 * @param {ts.VariableStatement} node
 */
function lintVariableStatement(node) {
  lintVariableDeclarationList(node.declarationList);
}

/**
 * @param {ts.VariableDeclarationList} node
 */
function lintVariableDeclarationList(node) {
  node.declarations.forEach(lintVariableDeclaration);
}

/**
 * @param {ts.VariableDeclaration} node
 */
function lintVariableDeclaration(node) {
  if (node.initializer) {
    lintNode(node.initializer);
  }
}

/**
 * @param {ts.FunctionDeclaration} node
 */
function lintFunctionDeclaration(node) {
  if (node.body) {
    lintBlock(node.body);
  }
}

/**
 * @param {ts.ArrowFunction} node
 */
function lintArrowFunction(node) {
  if (node.body) {
    lintNode(node.body);
  }
}

/**
 * @param {ts.ClassDeclaration} node
 */
function lintClassDeclaration(node) {
  node.forEachChild(lintNode);
}

/**
 * @param {ts.MethodDeclaration} node
 */
function lintMethodDeclaration(node) {
  if (node.body) {
    lintBlock(node.body);
  }
}

/**
 * @param {ts.Block} node
 */
function lintBlock(node) {
  node.forEachChild(lintNode);
}

/**
 * @param {ts.ConstructorDeclaration} node
 */
function lintConstructor(node) {
  if (node.body) {
    lintBlock(node.body);
  }
}

/**
 * @param {ts.BinaryExpression} node
 */
function lintBinaryExpression(node) {
  throwIfNaN(node.left);
  throwIfNaN(node.right);
  lintNode(node.left);
  lintNode(node.right);
}

/**
 * @param {ts.Expression} node
 */
function throwIfNaN(node) {
  if (ts.isIdentifier(node) && node.text === "NaN") {
    throw node;
  }
}
```
 


## Recursive case based linting

```ts
/**
 * @param {ts.Node} node
 */
function lintNode(node) {
  switch (node.kind) {
    case ts.SyntaxKind.VariableStatement:
      return lintVariableStatement(node);
    case ts.SyntaxKind.VariableDeclarationList:
      return lintVariableDeclarationList(node);
    case ts.SyntaxKind.VariableDeclaration:
      return lintVariableDeclaration(node);
    case ts.SyntaxKind.FunctionDeclaration:
      return lintFunctionDeclaration(node);
    case ts.SyntaxKind.ClassDeclaration:
      return lintClassDeclaration(node);
    case ts.SyntaxKind.MethodDeclaration:
      return lintMethodDeclaration(node);
    case ts.SyntaxKind.Block:
      return lintBlock(node);
    case ts.SyntaxKind.Constructor:
      return lintConstructor(node);
    case ts.SyntaxKind.IfStatement:
      return lintIfStatement(node);
    case ts.SyntaxKind.ReturnStatement:
      return lintReturnStatement(node);
    case ts.SyntaxKind.BinaryExpression:
      return lintBinaryExpression(node);
    case ts.SyntaxKind.ArrowFunction:
      return lintArrowFunction(node);
  }
}

```