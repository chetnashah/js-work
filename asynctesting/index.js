
var async = require('async');

var functionOne = function(cb) {
    cb(null, 'First result');
};

var functionTwo = function(cb) {
    setTimeout(function() {
        cb('SEcond errors out', null);       
    }, 200);
};

var functionThree = function(cb) {
    cb(null, 'Third result');
};

async.parallel([functionOne, functionTwo, functionThree],
    function(err, result) {
        console.log('result = ', result);
    }
);

// usage with object

var user = {};

user.getUserName = function(cb) {
    cb(null, 'cc');
};

user.getAge = function(cb) {
    cb(null, 42)
};

async.parallel(user, function(err, result) {
    if(err) {
        console.error(err);
        return;
    }
    console.log(result);
})