// to run use $npm run execute
console.log('hello world');

var Rx = require('rxjs/Rx');

Rx.Observable.of(1,2,3); // etc

let obs = Rx.Observable.of(1,2,55).map((x) => { return x + '!!!'});
obs.subscribe(value => console.log(value));// this is simplest debugger for a observable

// Observable.from can be used on arrays, maps and sets
let news = Rx.Observable.from([1,2,55,11,22,45]).delay(15000);// delays whole observable by 10s
news.subscribe(value => console.log(value)); // -> 10000 ms -> [1,2,55,11,22,45]

let nums = Rx.Observable.from([99, 66, 33, 717, 22]);
// put individual delay 2000ms per item and concat them into single observable
let delayedNums = nums.concatMap((v) => Rx.Observable.of(v).delay(1500));
delayedNums.subscribe(value => console.log('value = ', value));// 99 -> 1500 ms -> 66 -> 1500 ms -> 33 ...

//contrast flatmap to concatmap
