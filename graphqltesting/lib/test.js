'use strict';

var _graphql = require('graphql');

var doc = (0, _graphql.parse)('\ntype Character {\n  name: String!\n  appearsIn: [Episode]!\n}\n');

var doc2 = (0, _graphql.parse)('\n{\n  hello\n}\n');

console.log(doc);

console.log((0, _graphql.print)(doc));

console.log(doc2);

console.log((0, _graphql.print)(doc2));

console.log('------------------------visit printing doc---------------------------');
// depth first traversal, behaviour can be altered using enter, leave config, see more in language/visit.js
(0, _graphql.visit)(doc, { enter: function enter(node) {
    console.log(node.kind, ' ', node.name);
  } });

console.log('------------------------visit printing doc2---------------------------');
// depth first traversal, behaviour can be altered using enter, leave config, see more in language/visit.js
(0, _graphql.visit)(doc2, { enter: function enter(node) {
    console.log(node.kind, ' ', node.name);
  } });