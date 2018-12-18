
console.log('before');

function f(arg0) {
  console.log('f executing!, arg0 = ', arg0);
}

setTimeout(f, 0, 'scheduled-by-settimeout');

// setImmediate: (f, argsArr) => ImmediateId
setImmediate(f, 'scheduled-by-setImmediate');

// nextTick: (f, argsArr) => void
process.nextTick(f, 'scheduled-by-process.nextTick');

console.log('after');


