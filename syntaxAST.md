
Official source : https://github.com/babel/babylon/blob/master/ast/spec.md#variabledeclarator
and test with https://astexplorer.net/

* Expressions are typically (terms) that return a value.

* Statements are typically (blocks) and don't usally return a value.

* All Declaration are statements.

* Patterns usually occur to the left of assignment.

* Literals are values, and hence also expressions of very simple nature.

* Identifiers are Expressions and patterns.

Two useful constructs

#### VariableDeclaraion

All variable declarations take this form:
```
interface VariableDeclaration <: Declaration {
  type: "VariableDeclaration";
  declarations: [ VariableDeclarator ];
  kind: "var" | "let" | "const";
}
```

#### VariableDeclarator

```
interface VariableDeclarator <: Node {
  type: "VariableDeclarator";
  id: Pattern;
  init: Expression | null;
}
```

#### Function

```
interface Function <: Node {
  id: Identifier | null;
  params: [ Pattern ];
  body: BlockStatement;
  generator: boolean;
  async: boolean;
}
```