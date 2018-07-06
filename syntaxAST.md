
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

### ASTs for module system

* `ModuleDeclarations` are complete statements having the `import` or `export` keyword.
```
interface ModuleDeclaration <: Node { }
```

* `ModuleSpecifier`s are identifiers used in `ModuleDeclaration` statements.

```
interface ModuleSpecifier <: Node {
  local: Identifier;
}
```

#### ImportDeclaration

```
interface ImportDeclaration <: ModuleDeclaration {
  type: "ImportDeclaration";
  specifiers: [ ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier ];// array of specifiers
  source: Literal;// filename/module name string
}
```

import foo from "mod";// mod is the source, foo is the specifier.

#### Default Exports

```
interface OptFunctionDeclaration <: FunctionDeclaration {
  id: Identifier | null;
}

interface OptClassDeclaration <: ClassDeclaration {
  id: Identifier | null;
}

interface ExportDefaultDeclaration <: ModuleDeclaration {
  type: "ExportDefaultDeclaration";
  declaration: OptFunctionDeclaration | OptClassDeclaration | Expression;
}
```
An export default declaration, e.g., `export default function () {};` or `export default 1;`.

#### Named Exports

```
interface ExportNamedDeclaration <: ModuleDeclaration {
  type: "ExportNamedDeclaration";
  declaration: Declaration | null;
  specifiers: [ ExportSpecifier ];
  source: Literal | null;
}
```
An export named declaration, e.g., `export {foo, bar};`, `export {foo} from "mod";`, `export var foo = 1;` or `export * as foo from "bar";`.


```
interface ExportSpecifier <: ModuleSpecifier {
  type: "ExportSpecifier";
  exported: Identifier;
}
```
**Note** there are two identifiers: `local` and `exported` when using `ExportSpecifier`.
Due to following:
An exported variable binding, e.g., `{foo}` in `export {foo}` or `{bar as foo}` in `export {bar as foo}`. The exported field refers to the name exported in the module. The local field refers to the binding into the local module scope. If it is a basic named export, such as in `export {foo}`, both exported and local are equivalent Identifier nodes; in this case an Identifier node representing foo. If it is an aliased export, such as in `export {bar as foo}`, the exported field is an Identifier node representing foo, and the local field is an Identifier node representing bar.

