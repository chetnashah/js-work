
import { parse } from 'graphql';
import { print } from 'graphql';
import { visit } from 'graphql';

const doc = parse(`
type Character {
  name: String!
  appearsIn: [Episode]!
}
`);

const doc2 = parse(`
{
  hello
}
`)

console.log(doc);

console.log(print(doc));

console.log(doc2);

console.log(print(doc2));

console.log('------------------------visit printing doc---------------------------');
// depth first traversal, behaviour can be altered using enter, leave config, see more in language/visit.js
visit(doc,{ enter: (node) => { console.log(node.kind,' ',node.name);} });

console.log('------------------------visit printing doc2---------------------------');
// depth first traversal, behaviour can be altered using enter, leave config, see more in language/visit.js
visit(doc2,{ enter: (node) => { console.log(node.kind,' ',node.name);} });
