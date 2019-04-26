const { PassThrough, Writable } = require('stream');
const pass = new PassThrough();
const writable = new Writable();
// readableFLowing is null
pass.pipe(writable);
// readable flowing is true
pass.unpipe(writable);// if we comment this, above line will crash because _write is not implemented for writable
// readableFlowing is now false

pass.on('data', (chunk) => { console.log(chunk.toString()); });
pass.write('ok');  // Will not emit 'data'
console.log('will resume now!');
pass.resume();     // Must be called to make stream emit 'data'
// readableFlowing is true
