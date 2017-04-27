
var fs = require('fs');
var Rx = require('rx');
var path = require('path');

// rename signature is
// rename(name1, name2, cb)

//wrapping rename
var rename = Rx.Observable.fromNodeCallback(fs.rename);


// When rx wraps no need to pass callback
var source = rename(path.join(__dirname,'file1.txt'),path.join(__dirname,'file2.txt'));

source.subscribe(
  function() {
    console.log('Next: success');
  },
  function(err) {
    console.log('Error: '+err);
  },
  function() {
    console.log('Completed');
  }
);


