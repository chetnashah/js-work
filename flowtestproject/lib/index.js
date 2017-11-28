'use strict';

var _templateObject = _taggedTemplateLiteral(['Hello world ', ' done'], ['Hello world ', ' done']),
    _templateObject2 = _taggedTemplateLiteral(['', ' items cost $', '.'], ['', ' items cost $', '.']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/* @flow */
var k = '3';
console.log("running src/index.js");

// template literals
// multiline string
var multilineString = 'aha\ndude\nbest';

console.log(multilineString);

// string substitution
// the thing inside ${} can be any valid JS expression
var other = 'number saved in k is ' + k;
console.log(other);

// HTML escaping

// tagged templates
// a tag is simply a function called with processed template literal data
// the input we get are array of literals and array of processed substitutions
function mytag(literals) {
  for (var _len = arguments.length, substitutions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    substitutions[_key - 1] = arguments[_key];
  }

  console.log('mytag execution : literals -> ', literals, ' substitutions -> ', substitutions);
  return 'Hi';
}

// A template tag performs a transformation
// on the template literal and returns the final string value
// tag is specified just before `
var message = mytag(_templateObject, 1 + 1); // mytag will do some transformation on `Hello world`
console.log('message = ', message);

// default template literal behaviour
function passthru(literals) {
  var result = '';

  for (var _len2 = arguments.length, substitutions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    substitutions[_key2 - 1] = arguments[_key2];
  }

  for (var i = 0; i < substitutions.length; i++) {
    result += literals[i];
    result += substitutions[i];
  }
  // add last literal
  result += literals[literals.length - 1];
  return result;
}

var count = 10;
var price = 0.25;
var ans = passthru(_templateObject2, count, (count * price).toFixed(2));
console.log(ans);