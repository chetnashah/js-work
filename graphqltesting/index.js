
var express = require('express');
var graphqlHTTP = require('express-graphql');

import { root, schema } from './schema';

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000);