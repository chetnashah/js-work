var fs = require('fs');
// schedules itself via nextTick
var cb = function(){ process.nextTick(cb); }
fs.write(process.stdout.fd, 'hi', function(){
    // this is never printed due to starvation.
    fs.writeSync(process.stdout.fd, 'done');
});
cb();



