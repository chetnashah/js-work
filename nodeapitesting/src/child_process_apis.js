const { spawn } = require('child_process');
const OS = require('os');

if (OS.platform() === 'win32') {
    // dir is not an actual executable on windows.
    const ls = spawn('cmd', ['/c', 'dir']);
    // spawn returns an instance of "ChildProcess" which are event emitters for proces

    // ls has properties like stdin, stdout which are event emitters.
    ls.stdout.on('data', (data) => {
    console.log('stdout data event: ', data.toString());
    });

    ls.stderr.on('data', (data) => {
        console.log('stderr data event: ', data);
    });

    ls.on('close', (code) => {
        console.log('spawned process exited with exit-code: ', code);
    });

    ls.on('error', (err) => {
        throw new Error(err);
    });
} else {
  // we are in linux world now
  const { exec } = require('child_process');
  exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
 
   const { fork } = require('child_process');
  const childProc = fork(`${__dirname}/sub.js`);
  childProc.on('message', (m) => {
      console.log('parent got message: ', m);
  });
  childProc.send({ hello: 'world' });
  console.log(__dirname);
  setTimeout(() => {
      childProc.kill();
  }, 5000);
}




