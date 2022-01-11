const fs = require('fs');

function concatFiles(dest, cb, ...srcFiles) {
  if(srcFiles.length === 0) {
    return cb(null, Buffer.from(''));
    // return '';
  }
  const [fileToConcatenate, ...remaining] = srcFiles;
  console.log('fileToConcatenate = ', fileToConcatenate);
  fs.readFile(fileToConcatenate, (err, data) => {
    if(err) {
      console.error(err);
      return;
    }
    console.log(data);
    concatFiles(dest, (er, dt) => {
      cb(er, Buffer.concat([data, dt]))
    }, ...remaining);
  });
}

const ans = concatFiles(null, (er, dt) => {
  console.log(dt.toString());
} , 'multitask.js', 'sub.js', 'threads.js');
console.log(ans);