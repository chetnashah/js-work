const fs = require('fs');
const path = require('path');

// sequential recursion of walking dirs
function walk(dir, done) {// first arg of done callback will have all results of this walk
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;// fresh iteration count for each walk on a dir
    (function next() {// first next invocation is an IIFE
      var file = list[i++];
      if (!file) return done(null, results);// termination condition for recursion - return all the results of current walk
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next(); // recurse in case of dir
          });
        } else {
          results.push(file);
          next();// recurse in case of regular file
        }
      });
    })();
  });
};

walk('../src', (err, results) => {
  console.log('results = ', results);
})