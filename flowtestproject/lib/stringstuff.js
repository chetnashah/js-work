'use strict';

// code unit is 16 bits, string.length returns no. of code units.

// codepoint is what unicode defines as a unique identifier
// non bmp codepoints start after 0xffff

// to convert codepoint to string use String.fromCodePoint(0xabcde)
// and use str.codePointAt(index) for vice versa

var fs = require('fs');

var i = 0;

var arr = [];
var base = 0x0a80;
for (i = 0; i < 10000; i++) {
  arr.push(String.fromCodePoint(base + i));
}
// console.log('arr = ', arr);
var charstring = arr.reduce(function (a, b) {
  return a + b;
});

// console.log(charstring);

fs.writeFile('message.txt', charstring, 'utf8', function (err) {
  if (err) throw err;
  console.log('The file has been saved!');
});

var testChar = "ખ"; // bmp char
console.log("bmp testchar.length = ", testChar.length);
var testChar2 = "𠮷"; // non bmp char - has surrogate pairs
console.log("non bmp testchar2.length = ", testChar2.length);