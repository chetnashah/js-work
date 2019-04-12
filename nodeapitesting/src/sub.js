
process.on('message', (m) => {
  console.log('child i.e. sub.js got message: ', m);
});

// send message to connected process
process.send({ foo: 'bar', baz: NaN });

process.on('exit', () => {
  console.log('sub.js exit event on process');
})

process.on('close', () => {
  console.log('sub.js close event on process');
});

process.on('error', () => {
  console.log('sub.js error event on process');
});

process.on('beforeExit', () => {
  console.log('sub.js beforeExit event on process');
});

process.on('disconnect', () => {
  console.log('disconnect event on processss');
});

process.on('uncaughtException', () => {
  console.log('unCaughtException event on process');
});

process.on('warning', (w) => {
  console.log('warning event on proces:  ', w);
});

process.on('SIGINT', (signal) => {
  console.log('received SIGINT: ', signal);
});

//process.on('SIGTERM', (signal) => {
//  console.log('received SIGTERM: ', signal);
//  process.exitCode = 1;
//});


