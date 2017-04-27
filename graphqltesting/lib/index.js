'use strict';

var _schema = require('./schema');

var express = require('express');
var graphqlHTTP = require('express-graphql');

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: _schema.schema,
  rootValue: _schema.root,
  graphiql: true
}));
app.listen(4000);