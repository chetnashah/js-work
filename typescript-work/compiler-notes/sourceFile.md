

## program.getSourceFile(fileName)


## children traversal via sourceFile.forEachChild((childNode) => ...)

sourceFile has a collection of children nodes, which can be traversed using 
`sourceFile.forEachChild((childNode) => ...)`


## Shape
```ts
SourceFileObject {
  pos: 0,
  end: 187,
  flags: 0,
  modifierFlagsCache: 0,
  transformFlags: 4457601,
  parent: undefined,
  kind: 312,
  statements: [
    NodeObject {
      pos: 0,
      end: 88,
      flags: 0,
      modifierFlagsCache: 0,
      transformFlags: 4457601,
      parent: undefined,
      kind: 243,
      modifiers: undefined,
      declarationList: [NodeObject],
      jsDoc: undefined,
      flowNode: undefined
    },
    NodeObject {
      pos: 88,
      end: 184,
      flags: 0,
      modifierFlagsCache: 0,
      transformFlags: 4195457,
      parent: undefined,
      kind: 262,
      symbol: undefined,
      localSymbol: undefined,
      modifiers: [Array],
      asteriskToken: undefined,
      name: [IdentifierObject],
      typeParameters: undefined,
      parameters: [Array],
      type: [TokenObject],
      body: [NodeObject],
      typeArguments: undefined,
      jsDoc: undefined,
      locals: undefined,
      nextContainer: undefined,
      endFlowNode: undefined,
      returnFlowNode: undefined
    },
    pos: 0,
    end: 184,
    hasTrailingComma: false,
    transformFlags: 4457601
  ],
  endOfFileToken: TokenObject {
    pos: 184,
    end: 187,
    flags: 0,
    modifierFlagsCache: 0,
    transformFlags: 0,
    parent: undefined,
    kind: 1
  },
  text: 'const add = (first: number, second: number): number => {\n' +
    '    return first + second;\n' +
    '  };\n' +
    '  \n' +
    '  export function sum(...numbers: number[]): number {\n' +
    '    return numbers.reduce(add, 0);\n' +
    '  }\n' +
    '  ',
  fileName: 'fun.ts',
  path: '/users/jayshah/documents/programming/ts-compiler-api-fun/fun.ts',
  resolvedPath: '/users/jayshah/documents/programming/ts-compiler-api-fun/fun.ts',
  originalFileName: 'fun.ts',
  languageVersion: 1,
  languageVariant: 0,
  scriptKind: 3,
  isDeclarationFile: false,
  hasNoDefaultLib: false,
  locals: undefined,
  nextContainer: undefined,
  endFlowNode: undefined,
  nodeCount: 40,
  identifierCount: 12,
  symbolCount: 0,
  parseDiagnostics: [],
  bindDiagnostics: [],
  bindSuggestionDiagnostics: undefined,
  lineMap: undefined,
  externalModuleIndicator: NodeObject {
    pos: 88,
    end: 184,
    flags: 0,
    modifierFlagsCache: 0,
    transformFlags: 4195457,
    parent: undefined,
    kind: 262,
    symbol: undefined,
    localSymbol: undefined,
    modifiers: [
      [TokenObject],
      pos: 88,
      end: 100,
      hasTrailingComma: false,
      transformFlags: 0
    ],
    asteriskToken: undefined,
    name: IdentifierObject {
      pos: 109,
      end: 113,
      flags: 0,
      modifierFlagsCache: 0,
      transformFlags: 0,
      parent: undefined,
      kind: 80,
      escapedText: 'sum',
      jsDoc: undefined,
      flowNode: undefined,
      symbol: undefined
    },
    typeParameters: undefined,
    parameters: [
      [NodeObject],
      pos: 114,
      end: 134,
      hasTrailingComma: false,
      transformFlags: 1025
    ],
    type: TokenObject {
      pos: 136,
      end: 143,
      flags: 0,
      modifierFlagsCache: 0,
      transformFlags: 1,
      parent: undefined,
      kind: 150
    },
    body: NodeObject {
      pos: 143,
      end: 184,
      flags: 0,
      modifierFlagsCache: 0,
      transformFlags: 4194432,
      parent: undefined,
      kind: 241,
      statements: [Array],
      multiLine: true,
      jsDoc: undefined,
      locals: undefined,
      nextContainer: undefined
    },
    typeArguments: undefined,
    jsDoc: undefined,
    locals: undefined,
    nextContainer: undefined,
    endFlowNode: undefined,
    returnFlowNode: undefined
  },
  setExternalModuleIndicator: [Function: callback],
  pragmas: Map(0) {},
  checkJsDirective: undefined,
  referencedFiles: [],
  typeReferenceDirectives: [],
  libReferenceDirectives: [],
  amdDependencies: [],
  commentDirectives: undefined,
  identifiers: Map(7) {
    'add' => 'add',
    'first' => 'first',
    'second' => 'second',
    'number' => 'number',
    'sum' => 'sum',
    'numbers' => 'numbers',
    'reduce' => 'reduce'
  },
  packageJsonLocations: undefined,
  packageJsonScope: undefined,
  imports: [],
  moduleAugmentations: [],
  ambientModuleNames: [],
  classifiableNames: undefined,
  impliedNodeFormat: undefined,
  jsDocParsingMode: 0
}
```