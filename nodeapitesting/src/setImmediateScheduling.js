// scheduling of setImmediate is fair,
// does not starve the loop

var fs = require('fs');
// schedules itself via setImmediate
var cb = function(){
    setImmediate(cb);
}
fs.write(process.stdout.fd,'hello',function(){
    fs.writeSync(process.stdout.fd, 'done');
})
cb();