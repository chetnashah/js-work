/* @flow */
const k: string = '3';
console.log("running src/index.js");

// template literals
// multiline string
const multilineString = `aha
dude
best`;

console.log(multilineString);

// string substitution
// the thing inside ${} can be any valid JS expression
const other = `number saved in k is ${k}`;
console.log(other);

// HTML escaping

// tagged templates
// a tag is simply a function called with processed template literal data
// the input we get are array of literals and array of processed substitutions
function mytag(literals, ...substitutions) {
  console.log('mytag execution : literals -> ', literals, ' substitutions -> ', substitutions);
  return 'Hi';
}

// A template tag performs a transformation
// on the template literal and returns the final string value
// tag is specified just before `
let message = mytag`Hello world ${1 + 1} done`; // mytag will do some transformation on `Hello world`
console.log('message = ', message);

// default template literal behaviour
function passthru(literals, ...substitutions) {
  let result = '';
  for (let i = 0; i < substitutions.length; i++) {
    result += literals[i];
    result += substitutions[i];
  }
  // add last literal
  result += literals[literals.length - 1];
  return result;
}

const count = 10;
const price = 0.25;
const ans = passthru`${count} items cost $${(count * price).toFixed(2)}.`;
console.log(ans);

