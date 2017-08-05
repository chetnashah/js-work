// codepoint is what unicode defines as a unique identifier
// non bmp codepoints start after 0xffff

// to convert codepoint to string use String.fromCodePoint(0xabcde)

var fs = require('fs');

let i =0;

let arr = [];
let base = 0x0a80;
for(i = 0; i<10000; i++) {
  arr.push(String.fromCodePoint(base + i));
}
// console.log('arr = ', arr);
const charstring = arr.reduce((a, b) => (a + b));

// console.log(charstring);

fs.writeFile('message.txt', charstring, 'utf8', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});

let testChar = "ખ"; // bmp char
console.log("bmp testchar.length = ", testChar.length);
let testChar2 = "𠮷"; // non bmp char - has surrogate pairs
console.log("non bmp testchar2.length = ", testChar2.length);
