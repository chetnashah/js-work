// child_process provides ability to spawn subprocess similar to popen

// main apis
// 1. spawn
// 2. exec
// 3. fork

const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);// spawn process without blocking event loop
// type of ls is "ChildProcessWithoutNullstreams"
// has three emitters: stdout, stdin, stderr
ls.stdout.on('data', data=> {
  console.log(`stdout: ${data}`);
});