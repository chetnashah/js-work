"use strict";

var x = 3;
var f = function f(z) {
  return 11 + x + z;
};
var x = 0;
var y = f(2);
console.log(y);