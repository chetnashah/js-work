const { PassThrough, Writable } = require('stream');
const pass = new PassThrough();
const writable = new Writable();
// readableFLowing is null
pass.pipe(writable);
console.log(pass.readableFlowing);
// readable flowing is true
pass.unpipe(writable);// if we comment this, above line will crash because _write is not implemented for writable
// readableFlowing is now false

pass.on('data', (chunk) => { console.log(chunk.toString()); });
pass.write('ok');  // Will not emit 'data'
console.log('will resume now!');
pass.resume();     // Must be called to make stream emit 'data'
// readableFlowing is true


console.log('----source2-----');
const { Readable } = require('stream');

class CounterReadable extends Readable {
  constructor(options) {
    super(options);
  }
  _read() {
    for (let i = 0; i < 1000; i += 2) {
      // push will queue it in internal buffer
      // and will take care of emitting 'data' event
      // in cases where listener is attached.
      this.push(i.toString() + '\n');
    }
    this.push(null);
  }
}

const ctrReadable = new CounterReadable();
ctrReadable.pause();
// should use read() in paused mode
for (let j = 0; j < 100; j++) {
    console.log(ctrReadable.read(2).toString());
}
ctrReadable.resume();
console.log('<<resuming>>>');
// use listeners in flow mode.
ctrReadable.pipe(process.stdout);


