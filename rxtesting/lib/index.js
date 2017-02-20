'use strict';

console.log('hello world');

var Rx = require('rxjs/Rx');

Rx.Observable.of(1, 2, 3); // etc

var obs = Rx.Observable.of(1, 2, 55).map(function (x) {
  return x + '!!!';
});
obs.subscribe(function (value) {
  return console.log(value);
}); // this is simplest debugger for a observable

// from can be used on arrays, maps and sets
var news = Rx.Observable.from([1, 2, 55, 11, 22, 45]).delay(15000); // delays whole observable by 10s
news.subscribe(function (value) {
  return console.log(value);
}); // -> 10000 ms -> [1,2,55,11,22,45]

var nums = Rx.Observable.from([99, 66, 33, 717, 22]);
// put individual delay 2000ms per item and concat them into single observable
var delayedNums = nums.concatMap(function (v) {
  return Rx.Observable.of(v).delay(1500);
});
delayedNums.subscribe(function (value) {
  return console.log('value = ', value);
}); // 99 -> 1500 ms -> 66 -> 1500 ms -> 33 ...