var { graphql, buildSchema } = require('graphql');


// Construct a schema, using GraphQL schema language
// type Query is the first type to be built where you put all your incoming fields
 var schema = buildSchema(`
  type Query {
    hello: String
  }
 `);
/* or something bigger like
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);


and implement root resolvers using classes:

// This class implements the RandomDie GraphQL type
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}
*/


 // root provides a resolver function
 // for each api endpoint

 var root = {
   hello: function() {
     return 'Hello world!';
   }
 }


export {
  schema,
  root
};
