
const events = require('events');

const EventEmitter = events.EventEmitter;

const ee = new EventEmitter();
// named listeners and emitting
ee.addListener('some', (...args) => {
  console.log('args = ', args);// [1,2,3]
})

ee.addListener('some', (...args2) => {
  console.log('args2 = ', args2);// [1,2,3]
});

ee.emit('some', 1, 2, 3);

setTimeout(() => {
  console.log('apps life is over');
}, 100000);


setTimeout(() => {
  ee.emit('error', new Error('sample error'))
}, 3000);

ee.addListener('error', () => {
  console.log('error happened on ee');
});

console.log(EventTarget);
const target = new EventTarget();

target.addEventListener('foo', (event) => {
  console.log('foo event happened!');
});

// this one
target.addEventListener('foo', (arg) => {
  console.log('another foo listener triggered! ', arg);
});

target.dispatchEvent(new Event('foo'))

