
##

https://www.youtube.com/watch?v=X8k_4tZ16qU&list=PLYUbsZda9oHu-EiIdekbAzNO0-pUM5Iqj&index=5

Credits to the Book: https://typescriptcompilerapi.com/

## Literals

```ts
const a = 1n; // BigIntLiteral
const b = true; // BooleanLiteral ~ TrueLiteral
const c = false; // BooleanLiteral ~ FalseLiteral
const d = null; // NullLiteral
const e = {}; // ObjectLiteralExpression
const f = []; // ArrayLiteralExpression
const g = `g`; // TemplateLiteral ~ NoSubstitutionTemplateLiteral
```

## Expressions

```ts
hello() // CallExpression
process.env // PropertyAccessExpression
new Car() // NewExpression
1 + 2 // BinaryExpression
() => {} // ArrowFunctionExpression
[1,2,3] // ArrayExpression
{a: 1, b: 2} // ObjectExpression
await hello() // AwaitExpression
hello`world` // TaggedTemplateExpression
this // ThisExpression
!ok // UnaryExpression
1 === 2 // BinaryExpression
i++ // UpdateExpression
5 > 8 ? 'yes' : 'no' // ConditionalExpression
```

## Statements

```ts
const a = 1 // VariableStatement/Declaration
if (5 > 9) {} // IfStatement
for (let i in [1,2,3]) {} // ForInStatement
switch () {} // SwitchStatement
debugger; // DebuggerStatement
throw 'my error' // ThrowStatement
try {} catch () {} // TryStatement
continue // ContinueStatement
break // BreakStatement
return // ReturnStatement
```

## Declarations

```ts
import a from "./a"; // ImportDeclaration
type Car = {}; // TypeAliasDeclaration
interface Animal {} // InterfaceDeclaration
class Human {} // ClassDeclaration
const a = 1; // VariableStatement/Declaration
let b = 2; // VariableStatement/Declaration
var c = 3; // VariableStatementDeclaration
function d() {} // FunctionDeclaration
export {}; // ExportDeclaration
function g<T>() {} // T is a TypeParameterDeclaration
class A {
  hello() {} // MethodDeclaration
}
```

## Type references

```ts
type Age = {};
function myFunc(age: Age) {}
```
From that snippet, the part that says `: Age` is the `TypeReference`.
If it was just `: number` then it wouldn't be a `TypeReference` because `TypeReference` is just for types we create, and not for built-in types like number or string or any.


